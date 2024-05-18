import { Header, Footer } from '@components';
import { type ReactNode, useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const fadeClass = `animate-fade-in`;

export function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const contentRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (contentRef.current) {
      setTimeout(() => {
        contentRef.current!.classList.remove(fadeClass);
      }, 200); // 200ms is the duration of the fade-in animation in tailwind.config.js
      contentRef.current.classList.add(fadeClass);
    }
  }, [location]);
  return (
    <main className="dark:bg-zinc-900 min-h-screen w-full transition-all">
      <Header />
      <div className="p-6" ref={contentRef}>
        {children}
      </div>
      <Footer />
    </main>
  );
}
