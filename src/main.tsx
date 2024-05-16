import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { ClientProvider } from '@providers';
import { App, Blog, Error404 } from '@routes';
import './index.css';
import { Footer, Header } from '@components';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClientProvider>
      <BrowserRouter>
        <main className="dark:bg-zinc-900 min-h-screen w-full transition-all">
          <Header />
          <div className="p-6">
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/blog/:slug" element={<Blog />} />
              <Route path="*" element={<Error404 />} />
            </Routes>
          </div>
          <Footer />
        </main>
      </BrowserRouter>
    </ClientProvider>
  </React.StrictMode>
);
