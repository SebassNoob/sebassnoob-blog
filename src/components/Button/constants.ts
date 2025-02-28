import type { ButtonColor } from './types';

export const twButtonStyles: Record<ButtonColor, string> = {
  info: `
    text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 
    focus:ring-4 focus:outline-hidden focus:ring-blue-300 focus:ring-offset-2 focus:ring-1
    font-medium 
    rounded-lg 
    text-sm px-5 py-2.5 text-center me-2 mb-2 
    dark:border-blue-500 dark:text-blue-500 
    dark:hover:text-white dark:hover:bg-blue-500 
    dark:focus:ring-blue-800
  `,
  danger: `
    text-red-700 hover:text-white border border-red-700 hover:bg-red-800 
    focus:ring-4 focus:outline-hidden focus:ring-red-300 focus:ring-offset-2 focus:ring-1
    font-medium 
    rounded-lg 
    text-sm px-5 py-2.5 text-center me-2 mb-2 
    dark:border-red-500 dark:text-red-500 
    dark:hover:text-white dark:hover:bg-red-500 
    dark:focus:ring-red-800
  `,
  warning: `
    text-yellow-700 hover:text-white border border-yellow-700 hover:bg-yellow-800 
    focus:ring-4 focus:outline-hidden focus:ring-yellow-300 focus:ring-offset-2 focus:ring-1
    font-medium 
    rounded-lg 
    text-sm px-5 py-2.5 text-center me-2 mb-2 
    dark:border-yellow-500 dark:text-yellow-500 
    dark:hover:text-white dark:hover:bg-yellow-500 
    dark:focus:ring-yellow-800
  `,
  success: `
    text-green-700 hover:text-white border border-green-700 hover:bg-green-800 
    focus:ring-4 focus:outline-hidden focus:ring-green-300 focus:ring-offset-2 focus:ring-1
    font-medium 
    rounded-lg 
    text-sm px-5 py-2.5 text-center me-2 mb-2 
    dark:border-green-500 dark:text-green-500 
    dark:hover:text-white dark:hover:bg-green-500 
    dark:focus:ring-green-800
  `,
} as const;

export const twDisabledButtonStyles = `
  opacity-50 cursor-not-allowed
  hover:bg-opacity-0 
  active:bg-opacity-0
` as const;

export const buttonRawColors: Record<ButtonColor, string> = {
  info: 'blue',
  danger: 'red',
  warning: 'yellow',
  success: 'green',
} as const;
