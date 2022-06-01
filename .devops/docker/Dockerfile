FROM nginx:stable-alpine

RUN mkdir -p /usr/share/nginx/html/

ADD dist/almox-web /usr/share/nginx/html/
COPY .devops/resources/nginx.conf /etc/nginx/nginx.conf
COPY .devops/resources/default.conf /etc/nginx/conf.d/default.conf
