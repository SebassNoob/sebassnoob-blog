import { useParams, useNavigate } from 'react-router-dom';
import { usePublic } from '@hooks';
import { Markdown, Title, Text, Loader } from '@components';
import blogposts from '@/content/index.xml';
import { useEffect, useState } from 'react';
import type { ParsedBlogpost } from './types';
import type { Blogpost } from '@routes/App/components/BlogCard/types';

const getPost = (slug: string): Blogpost | undefined =>
  blogposts.filter((post) => post.slug === slug)[0];

export function Blog() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [parsedBlogpost, setParsedBlogpost] = useState<ParsedBlogpost | null>(
    null
  );
  const content = usePublic(`/raw/${parsedBlogpost?.markdown}`);

  useEffect(() => {
    if (slug === undefined) {
      navigate('/404');
      return;
    }
    const post = getPost(slug);
    if (!post) {
      navigate('/404');
      return;
    }
    const { title, content, date } = post;
    const { image, markdown } = content;
    setParsedBlogpost({
      title,
      image,
      markdown,
      date,
    });
  }, []);

  if (!parsedBlogpost) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader color="aliceblue" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {parsedBlogpost.image && (
        <img
          src={`/assets/${parsedBlogpost.image}`}
          alt={parsedBlogpost.title}
          className="w-1/5"
        />
      )}
      <div className="flex flex-col gap-2 items-center">
        <Text order="sm" className="text-slate-500 dark:text-slate-50">
          {new Date(parsedBlogpost.date).toDateString()}
        </Text>
        <Title>{parsedBlogpost.title}</Title>
      </div>

      <div className="flex flex-col gap-2 w-full sm:w-3/4 lg:w-1/2">
        <Markdown>{content}</Markdown>
      </div>
    </div>
  );
}
