export interface Blogpost {
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
