FROM nginx:alpine

WORKDIR /client/frontend-web

COPY ./build /client/frontend-web

COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 7000
