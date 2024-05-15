import type { Blogpost } from './types';
import { Card, Pill, Button } from '@components';

export function BlogCard({
  slug,
  title,
  description,
  date,
  keywords,
  content,
}: Blogpost) {
  return (
    <Card
      title={title}
      description={description}
      date={new Date(date).toDateString()}
      imgSrc={'/assets/' + content.image}
    >
      <div className="flex flex-row gap-1">
        {keywords.keyword.map((keyword) => (
          <Pill key={keyword}>{keyword}</Pill>
        ))}
      </div>
      <Button href={`/blog/${slug}`}>Read More</Button>
    </Card>
  );
}
