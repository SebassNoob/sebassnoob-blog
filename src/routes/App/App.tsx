import { Title, Text, Pagination, PaginationProps } from '@components';
import { useParams, useNavigate } from 'react-router-dom';
import { BlogCard } from './components/BlogCard';
import { useEffect } from 'react';
import { useKeybinds } from '@hooks';
import index from '@/content/index.xml';

const postsPerPage = Number(import.meta.env.VITE_POSTS_PER_PAGE) || 5;

const sortedIndex = index.sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

const getPage = (pageNumber: number) => {
  const start = (pageNumber - 1) * postsPerPage;
  const end = start + postsPerPage;
  return sortedIndex.slice(start, end);
};

const getPaginationProps = (pageNumber: number) => {
  const totalPages = Math.ceil(sortedIndex.length / postsPerPage);

  const showNext = pageNumber < totalPages;
  const showPrevious = pageNumber > 1;

  const hrefs: PaginationProps['hrefs'] = showPrevious
    ? [`/page/${pageNumber - 1}`, `/page/${pageNumber + 1}`]
    : ['/page/1', `/page/${pageNumber + 1}`]; // if there is no previous page, we are on the first page

  const labels: PaginationProps['labels'] = ['Previous', 'Next'];

  return { showNext, showPrevious, hrefs, labels };
};

export function App() {
  const { page } = useParams();
  const navigate = useNavigate();
  const pageNumber = parseInt(page ?? '1');

  useKeybinds({
    ArrowLeft: () => {
      if (pageNumber > 1) {
        navigate(`/page/${pageNumber - 1}`);
      }
    },
    ArrowRight: () => {
      if (pageNumber < Math.ceil(sortedIndex.length / postsPerPage)) {
        navigate(`/page/${pageNumber + 1}`);
      }
    },
    'Alt+s': () =>
      window.navigator.share({
        title: "SebassNoob's blog",
        url: window.location.href,
      }),
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    if (
      pageNumber < 1 ||
      pageNumber > Math.ceil(sortedIndex.length / postsPerPage)
    ) {
      navigate('/');
    }
  }, [pageNumber]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col items-center gap-6 w-5/6 md:w-3/4 xl:w-1/2">
        <Title>My blog</Title>
        <Text>
          A place where I put some stuff I've written. Do note that these posts
          are just my take on certain issues and may not be the most accurate or
          up-to-date. If you have any questions or suggestions, feel free to
          reach out to me. I hope you enjoy reading!
        </Text>
      </div>

      <div className="flex flex-col w-full sm:w-3/4 lg:w-1/2 items-center gap-4">
        {getPage(pageNumber).map((blogpost) => (
          <BlogCard key={blogpost.slug} {...blogpost} />
        ))}
      </div>
      <Pagination {...getPaginationProps(pageNumber)} />
    </div>
  );
}
