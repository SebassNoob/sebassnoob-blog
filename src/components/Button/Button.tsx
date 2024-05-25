import type { ButtonProps } from './types';
import { twMerge } from 'tailwind-merge';
import {
  twButtonStyles,
  twDisabledButtonStyles,
  buttonRawColors,
} from './constants';
import { Loader } from '@components';
import { Link as ReactRouterLink } from 'react-router-dom';

export function Button({
  children,
  onClick,
  className,
  color = 'info',
  type = 'button',
  disabled = false,
  loading = false,
  href,
  ...rest
}: ButtonProps) {
  const isNotClickable = disabled || loading;
  const mergedStyles = twMerge(
    twButtonStyles[color],
    isNotClickable ? twDisabledButtonStyles : '',
    className
  );

  const styledLoader = (
    <div className="flex w-10 h-4 items-center justify-center">
      <Loader color={buttonRawColors[color]} className="w-5" />
    </div>
  );

  const wrapWithLink = (element: JSX.Element) => {
    return href ? (
      <ReactRouterLink to={href} tabIndex={-1}>
        {element}
      </ReactRouterLink>
    ) : (
      element
    );
  };
  return wrapWithLink(
    <button
      type={type}
      onClick={onClick}
      className={mergedStyles}
      disabled={isNotClickable}
      {...rest}
    >
      {loading ? styledLoader : children}
    </button>
  );
}
