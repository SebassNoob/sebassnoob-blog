import { useNavigate } from 'react-router-dom';
import pfp from '/common/pfp.jpg';
import sun from '/common/sun.svg';
import moon from '/common/moon.svg';
import { Code } from '@components';
import { useContext } from 'react';
import { ClientContext } from '@/providers';

export function Header() {
  const navigate = useNavigate();
  const { theme, setTheme } = useContext(ClientContext);

  return (
    <header className="flex items-center justify-between p-6">
      <div
        className="flex items-center cursor-pointer"
        tabIndex={0}
        onClick={() => navigate('/')}
        onKeyDown={(e) => e.key === 'Enter' && navigate('/')}
      >
        <img
          src={pfp}
          alt="Profile"
          className="rounded-full h-12 w-12 object-cover mr-4"
        />
        <pre className="dark:bg-black bg-slate-100 p-2 rounded-sm">
          <Code>SebassNoob's Blog</Code>
        </pre>
      </div>
      <button
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className="p-2 rounded-sm bg-slate-100 dark:bg-black"
        data-testid="theme-toggle"
        tabIndex={-1}
      >
        {theme === 'light' ? (
          <img src={moon} alt="dark mode" className="h-6 w-6" />
        ) : (
          <img src={sun} alt="light mode" className="h-6 w-6" />
        )}
      </button>
    </header>
  );
}
