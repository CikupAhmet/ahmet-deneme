FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# production stage
FROM nginx:alpine

COPY ./dist/. /usr/share/nginx/html

COPY ./openshift/nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./openshift/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

RUN chgrp -R root /var/cache/nginx /var/run /var/log/nginx && \
    chmod -R 770 /var/cache/nginx /var/run /var/log/nginx

#COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]