FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./index.html /etc/nginx/html/index.html
RUN npm run build

# production stage
FROM nginx:1.20 as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]