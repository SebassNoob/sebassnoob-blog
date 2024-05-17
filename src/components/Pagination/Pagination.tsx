import { Button } from '@components';
import leftArrow from '/common/left-arrow.svg';
import type { PaginationProps } from './types';

const defaultStyles = `
flex items-center justify-center 
text-gray-500 bg-white border border-gray-300 
hover:bg-gray-100 hover:text-gray-700 
dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white
`;

export function Pagination({
  showNext,
  showPrevious,
  hrefs,
  labels,
}: PaginationProps) {
  return (
    <div className="flex items-center gap-2">
      {showPrevious && (
        <Button href={hrefs[0]} className={defaultStyles}>
          <img src={leftArrow} alt="left arrow" className="w-4 h-4 me-2" />
          {labels[0]}
        </Button>
      )}
      {showNext && (
        <Button href={hrefs[1]} className={defaultStyles}>
          {labels[1]}
          <img
            src={leftArrow}
            alt="right arrow"
            className="w-4 h-4 ms-2 rotate-180"
          />
        </Button>
      )}
    </div>
  );
}
