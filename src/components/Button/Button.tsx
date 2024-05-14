import type { ButtonProps } from './types';
import { twMerge } from 'tailwind-merge';
import {
  twButtonStyles,
  twDisabledButtonStyles,
  buttonRawColors,
} from './constants';
import { Loader } from '@components';

export function Button({
  children,
  onClick,
  className,
  color = 'info',
  type = 'button',
  disabled = false,
  loading = false,
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
  return (
    <button
      type={type}
      onClick={onClick}
      className={mergedStyles}
      disabled={isNotClickable}
    >
      {loading ? styledLoader : children}
    </button>
  );
}
