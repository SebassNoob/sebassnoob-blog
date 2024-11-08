FROM oven/bun:1.1.34 AS build

WORKDIR /app
COPY . /app

RUN bun install
RUN bun run build

FROM ubuntu

RUN apt-get update
RUN apt-get install nginx -y

COPY --from=build /app/dist /var/www/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]