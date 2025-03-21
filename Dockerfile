FROM registry-vpc.cn-beijing.aliyuncs.com/bluedot-base/nginx:1.23.4

WORKDIR /usr/share/nginx/html
COPY dist /usr/share/nginx/html
COPY deploy/nginx.conf /etc/nginx/

EXPOSE 80 443
