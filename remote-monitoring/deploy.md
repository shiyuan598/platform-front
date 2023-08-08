##### 1.拉取nginx镜像
‵docker pull nginx:latest‵
##### 2.查看镜像
docker images
##### 3.使用镜像创建容器并映射端口
1.创建容器
`docker run --name web-remote-monitoring -p    9007:80 -p 9000:9000 -d nginx`
2.localhost:9007测试nginx
3.拷贝前端项目文件
`docker cp ./build cfd74e585196:/home/app`
##### 进入容器
`docker exec -it cfd74e585196 /bin/bash`
1.安装工具
`apt-get update &
apt-get install -y vim net-tools`
2.修改nginx配置cd  /etc/nginx
vim nginx.conf
3.添加配置
`
server{
listen 80;
server_name localhost;

location / {
    root /home/remote-monitoring;
    index index.htmtl;
    try_files $uri $uri/ /index.html;
    }
}

location /api/ { # 配置api代理
    add_header Access-Control-Allow-Origin *;
    proxy_pass http://172.16.20.46:30823/;
}

`
##### 重启nginx      
`nginx -s reload`