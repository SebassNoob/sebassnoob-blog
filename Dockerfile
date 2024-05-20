FROM oven/bun:1.1.8
WORKDIR /app

COPY . .

RUN bun i 
RUN bun run build

EXPOSE 3000

CMD ["bun", "run", "preview", "--port", "3000", "--host"]