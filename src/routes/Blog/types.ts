export interface Blogpost {
  title: string;
  description: string;
  keywords: string[];
  content: {
    image: string;
    markdown: string;
  };
}
