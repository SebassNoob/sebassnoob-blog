import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import type { ImageProps } from './types';

const defaultSkeletonStyle =
  'w-full h-full animate-pulse bg-gray-300 dark:bg-gray-700';

export function Image({
  src,
  alt,
  className,
  skeletonClassName,
  ...props
}: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  const mergedSkeletonStyles = twMerge(defaultSkeletonStyle, skeletonClassName);
  const mergedStyles = twMerge(loaded ? '' : 'hidden', className);

  return (
    <>
      {!loaded && <div className={mergedSkeletonStyles} />}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={mergedStyles}
        {...props}
      />
    </>
  );
}

export default Image;
