interface Blogpost {
  slug: string;
  title: string;
  description: string;
  date: string;
  keywords: {
    keyword: string[];
  };
  content: {
    image?: string;
    markdown: string;
  };
}

declare module '*.xml' {
  const content: Blogpost[];
  export = content;
}
