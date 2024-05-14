import type { CardProps } from './types';
import { twMerge } from 'tailwind-merge';
import { Title, Text } from '@components';

const defaultStyles =
  'max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700';

export function Card({
  children,
  imgSrc,
  title,
  description,
  className,
}: CardProps) {
  const mergedStyles = twMerge(defaultStyles, className);

  return (
    <div className={mergedStyles}>
      {imgSrc && (
        <img
          src={imgSrc}
          alt={title ?? imgSrc}
          className="w-full h-48 object-cover object-center rounded-t-lg"
        />
      )}
      <div className="p-6">
        {title && <Title order={2}>{title}</Title>}
        {description && <Text order="sm">{description}</Text>}
        {children}
      </div>
    </div>
  );
}
