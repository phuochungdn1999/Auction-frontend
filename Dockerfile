FROM node:14 as build
WORKDIR /code
COPY ./ /code/
RUN npm install
RUN npm run build

FROM nginx:1.21 as server
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /code/build /usr/share/nginx/html
EXPOSE 8000 