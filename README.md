# blog

blogs are good for gp practice

built with lots of caffeine

feel free to steal the styled components

## run

### install

requires bun.

```
bun i
```

### commands

dev server: `bun run dev`

prettier: `bun run prettier`

build: `bun run build`

start: `docker build -t sebassnoob-blog .` and then `docker run -p 3001:80 -d sebassnoob-blog`. Open localhost:3001 to see the server.

### tests

requires docker. the test directory is `/cypress`.

In the root directory, run `bun run test` to generate a report formatted in html.

Edit `e2e` and add files with pattern `*.cy.ts` to update tests

### usage

- upload md content to `/public/raw`
- upload image(s) to `/public/assets`
- update `/src/content/index.xml` with the configuration found in `_example.xml`

## features

minimal react stack: tailwindcss and react-markdown

- lightmode and darkmode support
- responsive AF
- custom styles
- blogs are written in md, and organised with xml
