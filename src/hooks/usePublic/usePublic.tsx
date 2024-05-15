import { useState, useEffect } from 'react';

export function usePublic(path: string) {
  const [content, setContent] = useState('');
  useEffect(() => {
    fetch(path)
      .then((response) => response.text())
      .then((md) => {
        setContent(md);
      })
      .catch((error) => console.error('Error loading markdown file:', error));
  }, [path]);
  return content;
}
