import { useState, useEffect } from 'react';

export function usePublic(path: string) {
  const [content, setContent] = useState('');

  useEffect(() => {
    const abortController = new AbortController();

    fetch(path, { signal: abortController.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then((md) => {
        setContent(md);
      })
      .catch((error) => {
        if (error.name === 'AbortError') {
          // pass
        } else {
          console.error('Error loading markdown file:', error);
        }
      });

    return () => {
      abortController.abort();
    };
  }, [path]);

  return content;
}
