#!/bin/bash
# git lfs
sudo curl http://172.16.12.65/git-lfs_2.3.4-1_amd64.deb -o /usr/local/lib/git-lfs_2.3.4-1_amd64.deb
sudo dpkg -i /usr/local/lib/git-lfs_2.3.4-1_amd64.deb
git lfs install

# nodejs
sudo rm /usr/bin/node /usr/bin/npm /usr/bin/yarn
sudo curl http://172.16.12.65/node-v14_tar_gz -o /usr/local/lib/node-v14.tar.gz
sudo tar -xf /usr/local/lib/node-v14.tar.gz -C /usr/local/lib/
sudo ln -s /usr/local/lib/node-v14/bin/node /usr/bin/node
sudo ln -s /usr/local/lib/node-v14/bin/npm /usr/bin/npm
sudo ln -s /usr/local/lib/node-v14/bin/yarn /usr/bin/yarn
sudo rm /usr/local/lib/node-v14.tar.gz

# node_modules
sudo curl http://172.16.12.65/webviz_node_modules_tar_gz -o ./webviz_node_modules_tar_gz
tar -xf webviz_node_modules_tar_gz
sudo curl http://172.16.12.65/studio_node_modules_tar_gz -o ./studio_node_modules_tar_gz
tar -xf ./studio_node_modules_tar_gz -o ./packages/studio-base/
NODE_VERSION=`node --version`
echo "node version ${NODE_VERSION}"
