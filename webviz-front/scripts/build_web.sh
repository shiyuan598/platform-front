#!/bin/bash
# unpack backup

SptDir="$(cd $(dirname ${BASH_SOURCE[0]}) && pwd -P)"
export PATH=$PATH:$SptDir/../node_modules/.bin
current_version="$(echo $(bash $SptDir/get_git_tag.sh))"
release_path="zhito2ros-$current_version-linux-x86"
echo $current_version
yarn web:build:prod
