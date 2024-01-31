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
logger "tag: ${Green}$tag${Reset}"
#endregion


####### custimize here!! #####
#region run server command
logger.divider "Run Server"

logger "$DIR_CURSC"

#production mode for local
if [ "$tag" == "standalone" ]; then
  PORT=$PORT node $DIR_CURSC/../.next/standalone/vling/$HOSTNAME/server.js
#production mode for ecr
elif [ "$tag" == "dist" ]; then
  if [ "$mode" == "prod" ]; then
    PORT=$PORT NODE_OPTIONS=--max-http-header-size=64555 node $DIR_CURSC/../server.js
  else
    PORT=$PORT node $DIR_CURSC/../server.js
  fi
else
  next dev -p $LOCAL_PORT
fi
#endregion

