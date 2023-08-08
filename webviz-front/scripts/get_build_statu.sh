#!/bin/bash
SptDir="$(cd $(dirname ${BASH_SOURCE[0]}) && pwd -P)"
current_version="$(echo $(bash $SptDir/get_git_tag.sh))"

if [ "$current_version" = "" ];then
  echo "normal"
else
  echo "release"
fi
