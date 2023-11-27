#!/bin/bash
__config=1

if [ -e $DIR_CURSC ]; then
  DIR_CURSC="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
fi
if [ -e $__common_util ]; then
  #echo 'not exist __common_util'
  source $DIR_CURSC/common/util.sh
fi 
if [ -e $__common_args ]; then
  #echo 'not exist __common_args'
  source $DIR_CURSC/common/args.sh
fi

#registry container image
IMAGENAME=$(grep "registry.name" $DIR_CURSC/../app.config.json | awk -F \" '{print $4}')
IMAGETAG=${tag:-"$(grep "registry.tag" $DIR_CURSC/../app.config.json | awk -F \" '{print $4}')"}
IMAGETAG=`eval "echo" $IMAGETAG`
ECRPATH=$(grep "registry.path" $DIR_CURSC/../app.config.json | awk -F \" '{print $4}')
PROD_BRANCH=$(grep "git.branch.prod" $DIR_CURSC/../app.config.json | awk -F \" '{print $4}')
PORT=$(grep "port" $DIR_CURSC/../app.config.json | awk -F \" '{print $4}')

ECRENDPOINT="$ECRPATH/$IMAGENAME"

show_config() {
  logger.divider "configuration"
  logger "registry.name: ${Green}$IMAGENAME${Reset}"
  logger "registry.tag: ${Yellow}$IMAGETAG${Reset}"
  logger "registry.path: ${Green}$ECRPATH${Reset}"
  logger "registry.endpoint: ${Green}$ECRENDPOINT:${IMAGETAG}${Reset}"
  logger "git.branch.prod: ${Green}$PROD_BRANCH${Reset}"
}
