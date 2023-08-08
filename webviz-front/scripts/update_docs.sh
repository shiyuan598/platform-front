#!/bin/bash
SptDir="$(cd $(dirname ${BASH_SOURCE[0]}) && pwd -P)"
current_version="$(echo $(bash $SptDir/get_git_tag.sh))"

sed -i "s/WEBVIZ_VERSION/$current_version/g" $SptDir/../docs/quick-start.md
sed -i "s/WEBVIZ_VERSION/$current_version/g" $SptDir/../docs/change-log.md
