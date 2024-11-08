I’ve always felt that building a blog site was one of the key side quests that a developer would do for practice. But I’m not exactly sure what drove me to build one at this time, given all the exams that I’ve got coming up. Regardless, I took it as a ‘back-to-basics’ sort of thing with the most minimal tech stack I’ve used in quite a while.

## Brief overview of tech stack

A small warning – the remainder of this writing is going to be a technical discussion. Click off if you’d like.

Everything you see here was built largely by hand – no traditional component libraries, no backend, (mostly) no containerisation here! The following are what I did end up using:

- `Vite + React + TS`
- `tailwindcss`
- `react-router`
- `react-markdown`
  … and that’s it (excluding tests, but more on that later)!

I just felt that I needed to practice my fundamentals a bit more. Styling my own components with `tailwind` was a breath of fresh air – something I’d not experienced in some time. Instead of installing heavy, opinionated UI libraries like `mantine` or `MUI`, I finally had the opportunity to implement some of the functionality that I had taken for granted by myself. That being said, I’m not saying that using these UI libraries is a bad thing, in fact it is great in most use cases. It’s just that I wanted a more grounded, more manual experience when coding up this small app.

## Some code snippets

```tsx
import { useState, useLayoutEffect } from 'react';

type Theme = 'dark' | 'light';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const localStorageTheme = localStorage.getItem('theme');
    if (localStorageTheme === 'light' || localStorageTheme === 'dark') {
      return localStorageTheme;
    }
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light';
    return systemTheme;
  });

  useLayoutEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return {
    theme,
    setTheme,
  };
}
```

Nothing much to say here. Really enjoyed writing a hook that I used to take for granted.

If you're wondering:

1. Read the `theme` key from localstorage. If it doesn't exist, set it based on the device preferences. Then set the initial state to the selected theme.
2. Whenever `theme` changes (via calls to `setTheme`), persist it in localstorage. Set the parent element to add/remove the class `dark` for tailwind to read and apply the correct styles.

```tsx
import type { ReactNode, HTMLAttributes } from 'react';

interface LinkProps extends HTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  order?:
    | 'xs'
    | 'sm'
    | 'base'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl'
    | '8xl'
    | '9xl';
  className?: string;
  href: string;
}

import { twMerge } from 'tailwind-merge';
import { Link as ReactRouterLink } from 'react-router-dom';

const defaultStyles = `
text-teal-500 dark:text-teal-400 
visited:text-violet-700 dark:visited:text-violet-500 
underline sm:no-underline underline-offset-2
hover:sm:underline
hover:text-teal-600 dark:hover:text-teal-300 
hover:visited:text-violet-800 dark:hover:visited:text-violet-600
focus:text-teal-600 dark:focus:text-teal-300 
focus:visited:text-violet-800 dark:focus:visited:text-violet-600
active:text-teal-600 dark:active:text-teal-300
active:visited:text-violet-800 dark:active:visited:text-violet-600
`;
export function Link({
  children,
  order = 'base',
  className = defaultStyles,
  href,
  ...rest
}: LinkProps) {
  const textSize = `text-${order}` as const;
  const mergedStyles = twMerge(textSize, className);

  return (
    <ReactRouterLink to={href} className={mergedStyles} {...rest}>
      {children}
    </ReactRouterLink>
  );
}
```

What the `<Link>` component looks like. I found the tailwind styles kind of verbose and disorganised. Even so, I'd still use it again -- it's still better than raw css/css modules (🤮).

Obligatory explanation:

1. Define prop types. Include the attributes of `HTMLAnchorElement` for maximum compatibility with props of `<a>`.
2. Define default styles with tailwind classes. Very verbose!
3. The actual component is very simple. It just merges the order with the className prop and passes it to the `ReactRouterLink`.

```ts
import { readFileSync } from 'fs';
import { XMLParser } from 'fast-xml-parser';

const transformParsedJson = (json: any): Blogpost[] => {...}

export default function xmlParser() {
  const parser = new XMLParser();
  return {
    name: 'xml-parser',
    transform(code: string, id: string) {
      if (!id.endsWith('.xml')) return null;
      const xml = readFileSync(id, 'utf8');
      const unvalidatedjObj = parser.parse(xml);
      try {
        const jObj = transformParsedJson(unvalidatedjObj);
        return `export default ${JSON.stringify(jObj)};`;
      } catch (e) {
        console.error(e);
        console.error(`Error parsing ${id}`);
        if (process.env.NODE_ENV === 'production') {
          process.exit(1);
        }
        return null;
      }
    },
  };
}
```

Okay, heres the last one. I wrote a rollup plugin to parse XML files with [`fast-xml-parser`](https://github.com/NaturalIntelligence/fast-xml-parser). This was because I wasn't able to import xml files in react components, hence I wrote a simple parser and validator.

This probably would have been cleaner if i had something like [`zod`](https://github.com/colinhacks/zod) instead for validation, but as I was reluctant to add such a large dependency for such a small usecase, I decided against it.

Breakdown:

1. Create a new parser object. On transform, parse and validate that imported xml file.
2. If successful, export it. Else reject and throw an error!

## Writing end-to-end tests

This is my first foray into writing end-to-end tests with a ui testing framework. I ran with `Cypress` this time because it was recommended on the [`Vitest` site](https://vitest.dev/guide/comparisons#cypress) (which is the native `Vite` test runner).

Honestly, it was not fun. Writing a bash script with docker that containerises this framework took away many hours of my time, unfortunately. And when it did work, eventually, the tests took up most of my RAM space, rendering my laptop basically useless for any other activity for the time the test was running. Despite all this, it was a rather interesting experience interacting with the actual UI in react with an automated browser. Also, the Github action that I wrote kept on failing, which was kind of annoying.

Overall experience was 6/10. I wish that running these tests were faster than they are now and hogged up less RAM :(

## What's next?

I'm not sure if I'm going to post often. Part of my goal was to give myself motivation to practice for my General Paper (GP) exams by writing essays and uploading them here, so maybe now I will decide to do that more frequently.

I learnt a lot from this project despite it being one of the 'simpler' ones. I really enjoyed working on it as well.

Thanks for reading!

Note: This post was written as of commit [350a661](https://github.com/SebassNoob/sebassnoob-blog/tree/350a6613da993a30f2740cff55dcdde625834426)
