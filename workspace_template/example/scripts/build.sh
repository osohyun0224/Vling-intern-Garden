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
folderName="workspace_template/example"

#server-side env 
# cp $DIR_CURSC/../.env$suffix $DIR_CURSC/../${buildDir}/.env
# cp $DIR_CURSC/../.env$suffix $DIR_CURSC/../${buildDir}/.env.production

#cp dependency files on standalone (-r is recursive)
rm -rf $DIR_CURSC/../.next/cache
cp -r $DIR_CURSC/../../../packages/public $DIR_CURSC/../${buildDir}/packages/public
cp $DIR_CURSC/../../../packages/public/robots.dev.txt $DIR_CURSC/../${buildDir}/packages/public/robots.txt
cp -r $DIR_CURSC/../.next/static $DIR_CURSC/../${buildDir}/${folderName}/.next/static
cp -r $DIR_CURSC/../scripts $DIR_CURSC/../${buildDir}/${folderName}/scripts
cp $DIR_CURSC/../app.config.json $DIR_CURSC/../${buildDir}/${folderName}/app.config.json
cp $DIR_CURSC/../next.config.js $DIR_CURSC/../${buildDir}/${folderName}/next.config.js
cp $DIR_CURSC/../next-i18next.config.js $DIR_CURSC/../${buildDir}/${folderName}/next-i18next.config.js
#endregion

#region module test
# logger.divider "module test"
# npm run test.dist
#endregion
