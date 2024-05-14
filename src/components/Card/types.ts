import type { ReactNode } from 'react';

export interface CardProps {
  children?: ReactNode;
  imgSrc?: string;
  title?: string;
  description?: string;
  className?: string;
}
