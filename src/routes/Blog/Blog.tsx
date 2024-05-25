import { useParams, useNavigate } from 'react-router-dom';
import { usePublic, useKeybinds } from '@hooks';
import { Markdown, Title, Text, Loader, Image } from '@components';
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

  useKeybinds({
    Escape: () => navigate('/'),
    'Alt+s': () =>
      window.navigator.share({
        title: parsedBlogpost?.title,
        url: window.location.href,
      }),
  });

  useEffect(() => {
    // if the slug is undefined, we redirect to the 404 page
    if (slug === undefined) {
      navigate('/404');
      return;
    }
    // get the post with the given slug and redirect to the 404 page if it doesn't exist
    const post = getPost(slug);
    if (!post) {
      navigate('/404');
      return;
    }
    // destructure the post object and set the parsed blogpost state
    setParsedBlogpost({
      title: post.title,
      image: post.content.image,
      markdown: post.content.markdown,
      date: post.date,
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
        <Image
          src={`/assets/${parsedBlogpost.image}`}
          alt={parsedBlogpost.title}
          className="sm:w-1/2 md:w-1/3 xl:w-1/4 rounded-md"
          skeletonClassName="sm:w-1/2 md:w-1/3 xl:w-1/4 rounded-md min-h-48"
        />
      )}
      <div className="flex flex-col gap-2 items-center w-full sm:w-3/4 lg:w-1/2">
        <Text order="sm" className="text-slate-500 dark:text-slate-50">
          {new Date(parsedBlogpost.date).toDateString()}
        </Text>
        <Title>{parsedBlogpost.title}</Title>
      </div>

      <div
        className="flex flex-col gap-2 w-full sm:w-3/4 lg:w-1/2"
        data-testid="blog-content"
      >
        <Markdown>{content}</Markdown>
      </div>
    </div>
  );
}
