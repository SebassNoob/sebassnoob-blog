interface Blogpost {
  slug: string;
  title: string;
  description: string;
  date: string;
  keywords: string[];
  content: {
    image?: string;
    markdown: string;
  };
}

declare module '*.xml' {
  const content: Blogpost[];
  export = content;
}
