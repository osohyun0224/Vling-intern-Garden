#!/bin/bash
#region handling option args
__common_args=1

show_help() {
cat << EOF
Usage: ${0##*/} [-h] [-m mode] [mode]...
    mode        build stage mode 'local' | 'dev' | 'test' | 'prod', default 'dev'
    -h          display this help and exit
    -m mode     build stage mode 'local' | 'dev' | 'test' | 'prod', default 'dev'
    -t tag      build container image with tag, default mode value
    --ignore-gitcheck ignore checking the diff between remote and origin
    --dev-env   build container image info development environment (npm start ...)
EOF
}

ignore_gitcheck=false
dev_env=false
POSITIONAL_ARGS=()
__SAVED=("$@")
while [[ $# -gt 0 ]]; do
  case $1 in
    -h|-\?|--help)
      show_help    # Display a usage synopsis.
      exit
      ;;
    --dev-env)
      dev_env=true    # Display a usage synopsis.
      shift
      ;;
    --ignore-gitcheck)
      ignore_gitcheck=true    # Display a usage synopsis.
      shift
      ;;
    -v|--verbose)
      verbose=$((verbose + 1))  # Each -v adds 1 to verbosity.
      shift
      ;;
    -m|--mode)       # Takes an option argument; ensure it has been specified.
      if [ "$2"=~ -* ]; then 
        echo $2
        echo -e "${Red}"'ERROR: "--mode" requires a non-empty option argument1.'"${Reset}"
        exit
      elif [ "$2" ]; then
        mode=$2
        modeByOption=true
        shift
        shift
      else
        echo -e "${Red}"'ERROR: "--mode" requires a non-empty option argument.'"${Reset}"
        exit
      fi
      ;;
    -m=|--mode=|-m=-*|--mode=-*)         # Handle the case of an empty --file=
      echo -e "${Red}"'ERROR: "--mode" requires a non-empty option argument.'"${Reset}"
      exit
      ;;
    -m=*|--mode=*)
      mode=${1#*=}
      modeByOption=true
      shift
      ;;
    -t|--tag)       # Takes an option argument; ensure it has been specified.
      if [ "$2"=~ -* ]; then 
        echo $2
        echo -e "${Red}"'ERROR: "--tag" requires a non-empty option argument1.'"${Reset}"
        exit
      elif [ "$2" ]; then
        tag=$2
        tagByOption=true
        shift
        shift
      else
        echo -e "${Red}"'ERROR: "--tag" requires a non-empty option argument.'"${Reset}"
        exit
      fi
      ;;
    -t=|--tag=|-t=-*|--tag=-*)         # Handle the case of an empty --file=
      echo -e "${Red}"'ERROR: "--tag" requires a non-empty option argument.'"${Reset}"
      exit
      ;;
    -t=*|--tag=*)
      tag=${1#*=}
      tagByOption=true
      shift
      ;;
    --)              # End of all options.
      echo 'endof options'
      shift
      break
      ;;
    -?*)
      printf 'WARN: Unknown option (ignored): %s\n' "$1" >&2
      exit
     ;;
    *)               # Default case: No more options, so break out of the loop.
      POSITIONAL_ARGS+=("$1")
      shift
      ;;
  esac
done
set -- ${__SAVED[@]}

# echo "POSITIONAL_ARGS:${POSITIONAL_ARGS[@]}"
# echo "POSITIONAL_ARG1:${POSITIONAL_ARGS[0]}"
# echo "mode:$mode"
# echo "tag:$tag"
# echo "verbose:$verbose"
# echo "ignore_gitcheck:$ignore_gitcheck"
# echo "dev_env:$dev_env"
# set -- "${POSITIONAL_ARGS[@]}"
# exit 1;

# use positional args for mode, tag
if [ ! "$mode" ] && [ "${POSITIONAL_ARGS[0]}" ]; then 
  mode=${POSITIONAL_ARGS[0]}
fi
if [ ! "$tag" ]; then 
  if [ "$mode" ] && [ ! $modeByOption ]; then
  tag=${POSITIONAL_ARGS[1]}
  else
    tag=${POSITIONAL_ARGS[0]}
  fi
fi

#logger "[options] mode: $mode, tag: $tag, ignore_gitcheck: $ignore_gitcheck, verbose: $verbose"

modeSet=( 'local' 'sandbox' 'dev' 'test' 'prod' )
mode_default=${modeSet[0]}
if ! is_in "$mode" "${modeSet[@]}"; then #mode option primary priority
  #logger "invalid mode $mode => $mode_default "
  mode=$mode_default  
fi
#endregion