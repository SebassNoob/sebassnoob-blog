import { LinkProps } from './types';
import { twMerge } from 'tailwind-merge';
import { Link as ReactRouterLink } from 'react-router-dom';

const defaultStyles = `
text-teal-500 dark:text-teal-400 
visited:text-violet-700 dark:visited:text-violet-500 
hover:text-teal-600 dark:hover:text-teal-300 
hover:visited:text-violet-800 dark:hover:visited:text-violet-600
focus:text-teal-600 dark:focus:text-teal-300 
focus:visited:text-violet-800 dark:focus:visited:text-violet-600
active:text-teal-600 dark:active:text-teal-300
active:visited:text-violet-800 dark:active:visited:text-violet-600
`;
export function Link({
  children,
  order = 'base',
  className = defaultStyles,
  href,
}: LinkProps) {
  const textSize = `text-${order}` as const;
  const mergedStyles = twMerge(textSize, className);

  return (
    <ReactRouterLink to={href} className={mergedStyles}>
      {children}
    </ReactRouterLink>
  );
}
