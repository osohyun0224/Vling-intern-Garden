#!/bin/bash
set -e
#region global functions definition
DIR_CURSC="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
source $DIR_CURSC/common/util.sh
source $DIR_CURSC/common/args.sh
source $DIR_CURSC/config.sh
#endregion


#region info
logger.divider "script info"
logger "current folder: ${Green}$DIR_CURSC${Reset}"
logger "script: ${Green}${BASH_SOURCE##*/}${Reset}"
#endregion

#region args
if [ "$tag" ]; then
  VERSION_TAG="$tag-v`date '+%Y%m%d_%s'`"
else
  VERSION_TAG="v`date '+%Y%m%d_%s'`"
fi
logger "mode: ${Green}$mode${Reset}"
logger "VERSION_TAG: ${Green}$VERSION_TAG${Reset}"
#endregion

#region check support mode
supportModeSet=( 'sandbox' 'dev' 'prod' )
if ! is_in "$mode" "${supportModeSet[@]}"; then #mode option primary priority
  logger "${Red}invalid mode: '$mode' not in [${supportModeSet[@]}] ${Reset}"
  exit 1;
fi
#endregion

#region check git status
logger.divider "check git status for tagging"
logger "ignore_gitcheck: ${Green}$ignore_gitcheck${Reset}"

if [ $mode = "prod" ] && $ignore_gitcheck ; then
  logger "${Red}ignore option disabled in $mode mode.${Reset}"
  ignore_gitcheck=false
elif [ "$mode" = "sandbox" ]  || [ "$mode" = "local" ] ; then 
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

#region generate deploy yaml
logger.divider "generate deployment yaml"

# define folder const
TMPL_FOLDER=$DIR_CURSC/../k8s
TARGET_FOLDER=$TMPL_FOLDER/deployment
mkdir -p $TARGET_FOLDER
YML_DEFAULT_FILE="deploy.${mode}.yaml"
TMPL_FILE="tmpl.$YML_DEFAULT_FILE"
TARGET_FILE=$YML_DEFAULT_FILE

#define k8s const
NAMESPACE=$(grep "deploy.namespace" $DIR_CURSC/../app.config.json | awk -F \" '{print $4}')
APP_NAME=$(grep "app" $DIR_CURSC/../app.config.json | awk -F \" '{print $4}')
OWNER_NAME=$(grep "owner" $DIR_CURSC/../app.config.json | awk -F \" '{print $4}')
DEPLOY_NAME="$mode.$APP_NAME"
if [ "$mode" = "sandbox" ]; then
  DEPLOY_NAME="dev.$APP_NAME"
fi
DEPLOY_NAME=${DEPLOY_NAME//[._]/-}


if ! $ignore_gitcheck ; then
  # git const
  SHA1S=(`git show-ref refs/remotes/$CURRENT_BRANCH`)
  COMMIT_SHA1=${SHA1S[0]}
  local_commit_sha="$COMMIT_SHA1"
else
  local_commit_sha="ignored"
fi

local_host="$HOSTNAME"
local_namespace="$NAMESPACE"
local_deployment_name="$DEPLOY_NAME"
local_stage="$mode"
local_version="$VERSION_TAG"
local_image_endpoint="$ECRPATH"
local_image_name="$IMAGENAME"
local_image_tag="$IMAGETAG"
local_owner_name="$OWNER_NAME"
local_port="$PORT"

#mode에 따라서 강제 설정되는 값들 조정
if [ "$mode" = "sandbox" ]; then 
  local_namespace="sandbox"; 
  if [ "$tag" ]; then
    local_deployment_name="$local_deployment_name-$tag"
  fi
fi
if [ "$mode" = "prod" ]; then local_image_tag=$local_image_tag-$local_commit_sha; fi #prod의 이미지 태그는 commit_sha로 가져온다.


#show variable here 
logger.divider "Generate deploy $mode yaml"
logger "BRANCH: ${Yellow}$CURRENT_BRANCH${Reset}"
logger "COMMIT_SHA1: ${Yellow}$COMMIT_SHA1${Reset}"
logger "TMPL_FOLDER: ${Yellow}$TMPL_FOLDER${Reset}"
logger "TMPL_FILE: ${Yellow}$TMPL_FILE${Reset}"
logger "TARGET_FOLDER: ${Yellow}$TARGET_FOLDER${Reset}"
logger "TARGET_FILE: ${Yellow}$TARGET_FILE${Reset}"
logger "local_namespace: ${Yellow}$local_namespace${Reset}"
logger "local_deployment_name: ${Yellow}$local_deployment_name${Reset}"
logger "local_stage: ${Yellow}$local_stage${Reset}"
logger "local_commit_sha: ${Yellow}$local_commit_sha${Reset}"
logger "local_version: ${Yellow}$local_version${Reset}"
logger "local_image_endpoint: ${Yellow}$local_image_endpoint${Reset}"
logger "local_image_name: ${Yellow}$local_image_name${Reset}"
logger "local_image_tag: ${Yellow}$local_image_tag${Reset}"
logger "local_port: ${Yellow}$local_port${Reset}"

#append more variable here 
local_host="$HOSTNAME" \
local_namespace="$local_namespace" \
local_deployment_name="$local_deployment_name" \
local_stage="$local_stage" \
local_commit_sha="$local_commit_sha" \
local_version="$local_version" \
local_image_endpoint="$local_image_endpoint" \
local_image_name="$local_image_name" \
local_image_tag="$local_image_tag" \
local_port="$local_port" \
local_owner_name="$local_owner_name" \
envsubst < "$TMPL_FOLDER/$TMPL_FILE" > "$TARGET_FOLDER/$TARGET_FILE"
#endregion


#region apply k8s
logger.divider "deploy yaml to k8s"
kubectl apply -f "$TARGET_FOLDER/$TARGET_FILE"
#endregion


#region gateway update
# if [ ! "$mode" = "prod" ]; then
logger "waiting until deployment complete"
kubectl rollout status deployment ${local_deployment_name} -n=${local_namespace}
if [ $? -eq 0 ]; then
  logger "Deployment succeeded. Create Backup Yaml"
  # prod yaml - backup
  if [ "$mode" = "prod" ]; then
    cp "$TARGET_FOLDER/deploy.prod.yaml" "$TARGET_FOLDER/deploy.prod_backup.yaml" 
  fi
else
  logger "Deployment failed or not yet completed."
fi
#source $DIR_CURSC/gateway.sh $mode
# fi
#endregion
