import type { ReactNode } from 'react';

export type TitleOrder = 1 | 2 | 3 | 4 | 5 | 6;

export interface TitleProps {
  children: ReactNode;
  order?: TitleOrder;
  className?: string;
}
