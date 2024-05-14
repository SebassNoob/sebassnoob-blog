import type { ReactNode } from 'react';

export interface TitleProps {
  children: ReactNode;
  order?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}
