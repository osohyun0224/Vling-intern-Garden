#!/bin/bash
DIR_CURSC="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

set -e
#region global functions definition
source $DIR_CURSC/build.sh
# source $DIR_CURSC/common/util.sh
# source $DIR_CURSC/common/args.sh
# source $DIR_CURSC/config.sh
#endregion

#region info
logger.divider "script info"
logger "current folder: ${Green}$DIR_CURSC${Reset}"
logger "script: ${Green}${BASH_SOURCE##*/}${Reset}"
logger "mode: ${Green}$mode${Reset}"
#endregion

#region configuration
show_config
#endregion

#region check support mode
supportModeSet=('local' 'sandbox' 'dev' 'prod' )
if ! is_in "$mode" "${supportModeSet[@]}"; then #mode option primary priority
  logger "${Red}invalid mode: '$mode' not in [${supportModeSet[@]}] ${Reset}"
  exit 1;
fi
#endregion

#region docker build command
logger.divider "container image build"
dockerfile=$DIR_CURSC/Dockerfile.$mode
echo "$dockerfile"
if [ $mode = 'local' ]; then dockerfile=$DIR_CURSC/Dockerfile.dev ; fi
if $dev_env ; then
  if [ $mode = 'sandbox' ]; then
    logger "${BPurple}--dev-env option enabled in $mode mode.${Reset}"
    dockerfile=$DIR_CURSC/Dockerfile.$mode.node
    logger "using dockerfile: $dockerfile"
  else
    logger "${Red}--dev-env option ignored. it's only for sandbox mode.${Reset}"
  fi
fi

time DOCKER_BUILDKIT=1 docker buildx build --platform=linux/amd64 --pull --cache-from $ECRENDPOINT:$IMAGETAG \
  --build-arg BUILDKIT_INLINE_CACHE=1 \
  --build-arg BUILD_STAGE=$mode \
  --build-arg BUILD_PORT=$PORT \
  -f $dockerfile \
  -t $IMAGENAME:$IMAGETAG \
  -t $ECRENDPOINT:$IMAGETAG $DIR_CURSC/../
#endregion

#region check git status
logger.divider "check git status for tagging"
logger "ignore_gitcheck: ${Green}$ignore_gitcheck${Reset}"

if [ "$mode" = "local" ] ; then 
  logger "${Yellow} pushing container image skipped in $mode mode.${Reset}"
  exit 0;
fi


if [ $mode = "prod" ] && $ignore_gitcheck ; then
  logger "${Red}ignore option disabled in $mode mode.${Reset}"
  ignore_gitcheck=false
elif [ "$mode" = "sandbox" ] || [ "$mode" = "local" ] ; then 
  logger "${Red}ignore option enabled in $mode mode.${Reset}"
  ignore_gitcheck=true; 
fi

if $ignore_gitcheck ; then
  logger "${Red}WARN! skipped checking git.....${Reset}"
else
  git fetch
  CURRENT_BRANCH="$(git rev-parse --abbrev-ref --symbolic-full-name @{u})"
  CURRNET_BRANCH_NAME="$(git branch --show-current)"

  #git에 올라가지 않은 파일이 있으면 푸시안함
  PROD_READY=false
  if [ $(git status --porcelain | wc -l) -ne 0 ]; then
    logger "${Red}WARN! push failed: uncommited files remained.${Reset}"
    git status --porcelain
  elif [ $(git cherry -v ${CURRENT_BRANCH} | wc -l) -ne 0 ]; then
    logger "${Red}WARN! push failed: unpushed commits remained.${Reset}"
    git cherry -v ${CURRENT_BRANCH}
  elif [ $mode = "prod" ] && [ ! -z "$PROD_BRANCH" ] && [ "$CURRNET_BRANCH_NAME" != "$PROD_BRANCH" ]; then
    logger "${Red}WARN! current branch and prod branch must be the same.${Reset}"
    logger "PROD_BRANCH: $PROD_BRANCH"
    logger "CURRNET_BRANCH_NAME: $CURRNET_BRANCH_NAME"    
  elif [ $mode = "prod" ] && [ $(git status -sb | grep behind | wc -l) -ne 0 ]; then
    logger "${Red}WARN! prod branch is behind from the remote.${Reset}"
    git status -sb
  else
    PROD_READY=true
  fi

  if ! $PROD_READY ; then  exit 1; fi
fi
#endregion


#region push image
# logger.divider "aws ecr login"
#############aws ecr registry login
#aws-cli v1.xx 
#$(aws ecr get-login --no-include-email)
#aws-cli v2.xx
# aws ecr get-login-password | docker login --username AWS --password-stdin $ECRPATH

logger.divider "container image push"
#기본 태그명으로 푸시
logger "url: $ECRENDPOINT"
logger "tag: $IMAGETAG"

time docker push $ECRENDPOINT:$IMAGETAG

if ! $ignore_gitcheck ; then
logger.divider "Append commit hash to tag"
SHA1S=(`git show-ref refs/remotes/$CURRENT_BRANCH`)
COMMIT_SHA1=$IMAGETAG-${SHA1S[0]}
logger "BRANCH: $CURRENT_BRANCH"
logger "COMMIT_SHA1: $COMMIT_SHA1"
logger "tag: $COMMIT_SHA1"
time docker tag $IMAGENAME:$IMAGETAG $ECRENDPOINT:$COMMIT_SHA1
time docker push $ECRENDPOINT:$COMMIT_SHA1
fi
#endregion