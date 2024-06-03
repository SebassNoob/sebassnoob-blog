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

    const propsToCheck = [
      'title',
      'description',
      'content',
      'keywords',
      'date',
    ];
    propsToCheck.forEach((prop) => {
      if (!post[prop]) {
        console.error(post);
        throw new Error(
          `Missing '${prop}' property in a blogpost in index ${index}`
        );
      }
    });

    if (!Array.isArray(post.keywords.keyword)) {
      // coarce to array
      post.keywords.keyword = [post.keywords.keyword];
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
