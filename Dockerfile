# build stage
FROM node:lts-alpine as build-stage
ARG VUE_APP_API_ROOT
ENV VUE_APP_API_ROOT ${VUE_APP_API_ROOT}
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]