import { Title, Text } from '@components';
import { BlogCard } from './components/BlogCard';
import index from '@/content/index.xml';

export function App() {
  return (
    <div className="flex flex-col items-center gap-6">
      <Title>My blog</Title>
      <Text>
        A place where I put some stuff I've written. Enjoy the shitposts.
      </Text>
      <div className="flex flex-col w-full sm:w-3/4 lg:w-1/2 items-center gap-4">
        {index.map((blogpost) => (
          <BlogCard key={blogpost.slug} {...blogpost} />
        ))}
      </div>
    </div>
  );
}
