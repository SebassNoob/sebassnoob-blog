import { TitleProps } from './types';
import { defaultStyles, twTitleTextSizing } from './constants';
import { twMerge } from 'tailwind-merge';

export function Title({
  children,
  order = 1,
  className = defaultStyles,
}: TitleProps) {
  const Tag = `h${order}` as const;
  const mergedStyles = twMerge(
    'font-semibold',
    twTitleTextSizing[order],
    className
  );
  return <Tag className={mergedStyles}>{children}</Tag>;
}
