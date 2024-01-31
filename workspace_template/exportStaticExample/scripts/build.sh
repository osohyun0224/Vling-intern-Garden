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
logger "mode: ${Green}$mode${Reset}"
#endregion


####### custimize here!! #####
#region build command
logger.divider "Build NextJS"

#to set env file at build time
if [ "$mode" == "local" ]; then 
  suffix=""
else
  suffix=".$mode"
  mv $DIR_CURSC/../.env $DIR_CURSC/../.env.backup
  cp $DIR_CURSC/../.env$suffix $DIR_CURSC/../.env
fi
set +e
next build
if [ "$mode" != "local" ]; then 
  mv $DIR_CURSC/../.env.backup $DIR_CURSC/../.env 
fi
set -e

buildDir=".next/standalone"
folderName="vling/$HOSTNAME"

logger.divider "Check to success build"
for i in {1..3}
do
  if [ -d "$DIR_CURSC/../$buildDir" ]
  then
    logger "${Green} Build success. Do next"
    break
  fi

  logger "${Red} Checking... [Check for up to 3sec]"
  sleep 1
done

if [ ! -d "$DIR_CURSC/../$buildDir" ]
then
  logger "${Red} Failed to build. Check logs above."
  exit 0
fi

logger.divider "Copy essential files..."
#cp dependency files on standalone (-r is recursive)
rm -rf $DIR_CURSC/../${buildDir}/${folderName}/.next/cache
logger "${Green} Deleted caches"

cp -r -f $DIR_CURSC/../../../packages/public $DIR_CURSC/../${buildDir}/packages/
logger "${Green} Public of Packages is copied"

cp -n -r $DIR_CURSC/../public $DIR_CURSC/../${buildDir}/${folderName}/
logger "${Green} Server public is copied"

cp -r $DIR_CURSC/../.next/static $DIR_CURSC/../${buildDir}/${folderName}/.next/static
logger "${Green} Static Files are copied"

cp -r $DIR_CURSC/../scripts $DIR_CURSC/../${buildDir}/${folderName}/scripts
logger "${Green} Scripts are copied"

cp $DIR_CURSC/../../../packages/public/favicon.ico $DIR_CURSC/../${buildDir}/${folderName}/public/favicon.ico
logger "${Green} favicon.ico is copied"

cp $DIR_CURSC/../../../packages/public/naver* $DIR_CURSC/../${buildDir}/${folderName}/public/
logger "${Green} naver verification file is copied"

cp $DIR_CURSC/../../../packages/public/robots.dev.txt $DIR_CURSC/../${buildDir}/${folderName}/public/robots.txt
logger "${Green} robots.txt is copied"

cp $DIR_CURSC/../app.config.json $DIR_CURSC/../${buildDir}/${folderName}/app.config.json
logger "${Green} app.config.json is copied"

cp $DIR_CURSC/../next.config.js $DIR_CURSC/../${buildDir}/${folderName}/next.config.js
logger "${Green} next.config.js is copied"

cp $DIR_CURSC/../next-i18next.config.js $DIR_CURSC/../${buildDir}/${folderName}/next-i18next.config.js
logger "${Green} i18n.config.js is copied"
#endregion