import { TitleProps } from './types';

const defaultStyles = 'text-slate-900 dark:text-white';

export function Title({
  children,
  order = 1,
  className = defaultStyles,
}: TitleProps) {
  const Tag = `h${order}` as const;
  return <Tag className={className}>{children}</Tag>;
}
