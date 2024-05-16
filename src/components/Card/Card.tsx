import type { CardProps } from './types';
import { twMerge } from 'tailwind-merge';
import { Title, Text } from '@components';

const defaultStyles =
  'max-w-lg bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700';

export function Card({
  children,
  imgSrc,
  title,
  description,
  date,
  className,
}: CardProps) {
  const mergedStyles = twMerge(defaultStyles, className);

  return (
    <div className={mergedStyles}>
      {imgSrc && (
        <img
          src={imgSrc}
          alt={title ?? imgSrc}
          className="min-w-full max-h-48 object-contain object-center rounded-t-lg"
        />
      )}
      <div className="px-6 py-4 flex flex-col gap-4 items-center text-center">
        {date && <Text order="sm" >{date}</Text>}
        {title && <Title order={2}>{title}</Title>}
        {description && <Text order="base">{description}</Text>}
        {children}
      </div>
    </div>
  );
}
