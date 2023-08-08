#!/bin/bash
backend_version="GSL3-v2.4.2.4-230224"
backend_file=webviz_backend-$backend_version-linux-x86_tar_gz
SptDir="$(cd $(dirname ${BASH_SOURCE[0]}) && pwd -P)"
current_version="$(echo $(bash $SptDir/get_git_tag.sh))"

release_path="zhito2ros-$current_version-linux-x86"

#==========解压依赖=================
jf rt download zhito-dev-local/webviz/backend/$backend_file  --flat
# backend_file="webviz_backend-*-linux-x86_tar_gz"

mkdir -p $release_path/assets



#==========打包=================
tar -xf $backend_file -C $release_path
rm $release_path/assets/www -rf
cp -rf web/.webpack $release_path/assets/www
tar -czf "${release_path}_tar_gz" $release_path
rm -rf $release_path
chmod 600 $SptDir/web_key
scp -i $SptDir/web_key -o 'StrictHostKeyChecking no'  "${release_path}_tar_gz" web@172.16.12.65:~/zhito2ros/release/
scp   "${release_path}_tar_gz" ubuntu@49.234.121.120:/home/www/

# ==========发布文档=================
sed -i "s/WEBVIZ_VERSION/$current_version/g" $SptDir/../web/.webpack/docs/quick-start.md
sed -i "s/WEBVIZ_VERSION/$current_version/g" $SptDir/../web/.webpack/docs/change-log.md
scp -i $SptDir/web_key -o 'StrictHostKeyChecking no'  -r $SptDir/../web/.webpack/docs/* web@172.16.12.65:~/webvis-doc/
rm $backend_file
