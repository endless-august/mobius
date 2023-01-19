FROM nginx:alpine
WORKDIR /app
COPY ./dist .
WORKDIR /usr/share/nginx/html
RUN rm -rf ./* 
COPY ./build .