FROM oven/bun:1.1.12
WORKDIR /app

COPY ./plugins plugins
COPY ./src src
COPY ./public public

RUN bun i 
RUN bun run build

EXPOSE 3000
ENV NODE_ENV=test

CMD ["bun", "run", "preview", "--port", "3000", "--host"]