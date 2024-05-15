import { readFileSync } from 'fs';
import { XMLParser } from 'fast-xml-parser';

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

function validateParsedJson(json: any) {
  if (!json.blogposts || !json.blogposts.blogpost) {
    console.error(json);
    throw new Error(`Missing 'blogposts' property`);
  }

  const blogposts = json.blogposts.blogpost;

  if (!Array.isArray(blogposts) || blogposts.length === 0) {
    console.error(json);
    throw new Error(`Missing or empty 'blogposts' array`);
  }

  const takenSlugs = new Set<string>();

  blogposts.forEach((post: any, index) => {
    if (!post.slug) {
      console.error(post);
      throw new Error(
        `Missing 'slug' property in a blogpost in index ${index}`
      );
    }
    if (takenSlugs.has(post.slug)) {
      console.error(post);
      throw new Error(
        `Duplicate 'slug' property in a blogpost in index ${index}`
      );
    }

    takenSlugs.add(post.slug);

    if (!post.title) {
      console.error(post);
      throw new Error(
        `Missing 'title' property in a blogpost in index ${index}`
      );
    }
    if (!post.description) {
      console.error(post);
      throw new Error(
        `Missing 'description' property in a blogpost in index ${index}`
      );
    }
    if (!post.content) {
      console.error(post);
      throw new Error(
        `Missing 'content' property in a blogpost in index ${index}`
      );
    }
    if (!post.keywords) {
      console.error(post);
      throw new Error(
        `Missing 'keywords' property in a blogpost in index ${index}`
      );
    }

    if (!Array.isArray(post.keywords.keyword)) {
      console.error(post);
      throw new Error(
        `'keywords' property is not an array in a blogpost in index ${index}`
      );
    }

    if (!post.date) {
      console.error(post);
      throw new Error(
        `Missing 'date' property in a blogpost in index ${index}`
      );
    }

    if (!post.content.markdown) {
      console.error(post);
      throw new Error(
        `Missing 'content.markdown' property in a blogpost in index ${index}`
      );
    }

    // post.content.image is optional
  });
  return blogposts as Blogpost[];
}

/** @type {import('vite').Plugin} */
export default function xmlParser() {
  const parser = new XMLParser();
  return {
    name: 'xml-parser',
    transform(code: string, id: string) {
      if (!id.endsWith('.xml')) return null;
      const xml = readFileSync(id, 'utf8');
      const unvalidatedjObj = parser.parse(xml);
      try {
        const jObj = validateParsedJson(unvalidatedjObj);
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