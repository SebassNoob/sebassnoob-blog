export interface Blogpost {
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
