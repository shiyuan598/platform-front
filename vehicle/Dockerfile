FROM nginx

RUN apt-get update -y && \  
     apt-get install -y vim net-tools 

COPY build/ /app/vehicle-frontend

COPY nginx.conf /etc/nginx/nginx.conf