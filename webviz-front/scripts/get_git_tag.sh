#!/bin/bash
last_tag="$(git describe --abbrev=0 --tags)"
release_commit_id="$(echo $(git rev-list -n 1 $last_tag))"
current_commit_id="$(echo $(git rev-parse HEAD))"
if [ "$release_commit_id" = "$current_commit_id" ];then
echo $last_tag
fi
