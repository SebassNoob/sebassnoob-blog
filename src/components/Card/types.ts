import type { ReactNode } from 'react';

export interface CardProps {
  children?: ReactNode;
  date?: string;
  imgSrc?: string;
  title?: string;
  description?: string;
  className?: string;
}
