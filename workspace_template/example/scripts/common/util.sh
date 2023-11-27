#!/bin/bash
__common_util=1

#region global functions definition
if [ -z "$utilname" ]; then
utilname="defined"
nowInMs() {
  if [[ ! -z $EPOCHREALTIME ]]; then 
    echo $(( ${EPOCHREALTIME//.} / 1000 ))
  else
    echo "$(($(date +'%s * 1000 + %-N / 1000000')))"
  fi
}
START=$(nowInMs);

elapsedTime() {
  END=$(nowInMs);
  ELAPSED=$((END-START))
  echo -e "[${Yellow}$ELAPSED ms${Reset}] $1"
}
logger() {
  END=$(nowInMs);
  ELAPSED=$((END-START))
  echo -e "$( date -u +"%Y-%m-%dT%H:%M:%SZ" ) [${0##*/}:$mode] ${Yellow}$ELAPSED ms${Reset} $1"
}
logger.divider() {
  logger "${BIBlue}======================= [${Reset}$1${BIBlue}] =======================${Reset}"
}

#endregion

#region array
is_in() {
  value=$1
  shift
  
  for i in "$@"; do
    [[ $i == $value ]] && return 0
  done
  
  return 1
}
#example
# if ! is_in "$var" "${Arr[@]}"; then
#   echo "Not a permitted value." >&2
#   func_help
#   exit $E_OPTERROR
# fi

#endreion

#region spinner
sp="/-\|"
sc=0
spin() {
  printf "\b${sp:sc++:1}"
  ((sc==${#sp})) && sc=0
}
endspin() {
  printf "\r%s\n" "$@"
}
#example
# until work_done; do
#    spin
#    some_work ...
# done
# endspin

#$1: exit condition
spinner() {
  until eval "[[ $1 ]]"; do
    spin
    sleep 0.5
  done
  endspin
}
#example
# CMD='for i in {1..10}; do sleep 1; echo $i > $i.test; done'
# eval $CMD &
# COND="-f 5.test"
# spinner "$COND"
#endregion

#region progressBar
function ProgressBar {
  # Process data
  let _progress=(${1}*100/${2}*100)/100
  let _done=(${_progress}*4)/10
  let _left=40-$_done
  # Build progressbar string lengths
  _fill=$(printf "%${_done}s")
  _empty=$(printf "%${_left}s")
  
  # 1.2 Build progressbar strings and print the ProgressBar line
  # 1.2.1 Output example:
  # 1.2.1.1 Progress : [########################################] 100%
  printf "\rProgress : [${_fill// /#}${_empty// /-}] ${_progress}%%"
  
}
#example
# _start=1

# # This accounts as the "totalState" variable for the ProgressBar function
# _end=100

# # Proof of concept
# for number in $(seq ${_start} ${_end})
# do
#     sleep 0.1
#     ProgressBar ${number} ${_end}
# done
#endregion

#region color variables setting
#example
#elapsedTime "${Green}======================= ${Red}[run] ${Green}=======================${Reset}"

# Reset
Reset='\033[0m'       # Text Reset

# Regular Colors
Black='\033[0;30m'        # Black
Red='\033[0;31m'          # Red
Green='\033[0;32m'        # Green
Yellow='\033[0;33m'       # Yellow
Blue='\033[0;34m'         # Blue
Purple='\033[0;35m'       # Purple
Cyan='\033[0;36m'         # Cyan
White='\033[0;37m'        # White

# Bold
BBlack='\033[1;30m'       # Black
BRed='\033[1;31m'         # Red
BGreen='\033[1;32m'       # Green
BYellow='\033[1;33m'      # Yellow
BBlue='\033[1;34m'        # Blue
BPurple='\033[1;35m'      # Purple
BCyan='\033[1;36m'        # Cyan
BWhite='\033[1;37m'       # White

# Underline
UBlack='\033[4;30m'       # Black
URed='\033[4;31m'         # Red
UGreen='\033[4;32m'       # Green
UYellow='\033[4;33m'      # Yellow
UBlue='\033[4;34m'        # Blue
UPurple='\033[4;35m'      # Purple
UCyan='\033[4;36m'        # Cyan
UWhite='\033[4;37m'       # White

# Background
On_Black='\033[40m'       # Black
On_Red='\033[41m'         # Red
On_Green='\033[42m'       # Green
On_Yellow='\033[43m'      # Yellow
On_Blue='\033[44m'        # Blue
On_Purple='\033[45m'      # Purple
On_Cyan='\033[46m'        # Cyan
On_White='\033[47m'       # White

# High Intensity
IBlack='\033[0;90m'       # Black
IRed='\033[0;91m'         # Red
IGreen='\033[0;92m'       # Green
IYellow='\033[0;93m'      # Yellow
IBlue='\033[0;94m'        # Blue
IPurple='\033[0;95m'      # Purple
ICyan='\033[0;96m'        # Cyan
IWhite='\033[0;97m'       # White

# Bold High Intensity
BIBlack='\033[1;90m'      # Black
BIRed='\033[1;91m'        # Red
BIGreen='\033[1;92m'      # Green
BIYellow='\033[1;93m'     # Yellow
BIBlue='\033[1;94m'       # Blue
BIPurple='\033[1;95m'     # Purple
BICyan='\033[1;96m'       # Cyan
BIWhite='\033[1;97m'      # White

# High Intensity backgrounds
On_IBlack='\033[0;100m'   # Black
On_IRed='\033[0;101m'     # Red
On_IGreen='\033[0;102m'   # Green
On_IYellow='\033[0;103m'  # Yellow
On_IBlue='\033[0;104m'    # Blue
On_IPurple='\033[0;105m'  # Purple
On_ICyan='\033[0;106m'    # Cyan
On_IWhite='\033[0;107m'   # White
fi
#endregion