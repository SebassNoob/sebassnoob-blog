import type { ReactNode } from 'react';

export type ButtonColor = 'info' | 'danger' | 'warning' | 'success';

export interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  color?: ButtonColor;
  disabled?: boolean;
  loading?: boolean;
}
