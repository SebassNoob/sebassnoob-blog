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

### tests

requires docker. the test directory is `/cypress`.

Run `./tests.sh` to generate a report.

Edit `e2e` and add files to `*.cy.ts` to update tests

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
