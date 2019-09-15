FROM nginx:alpine

WORKDIR /client/frontend-web-bot

COPY ./dist /client/frontend-web-bot

COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000
