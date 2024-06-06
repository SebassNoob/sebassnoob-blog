FROM oven/bun:1.1.12
WORKDIR /app

COPY . .

RUN bun i 
RUN bun run build

EXPOSE 3000
ENV NODE_ENV=test

CMD ["bun", "run", "preview", "--port", "3000", "--host"]