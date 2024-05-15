import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { ClientProvider } from '@providers';
import { App, Blog, Error404 } from '@routes';
import './index.css';

const router = createBrowserRouter(
  createRoutesFromElements([
    <>
      <Route path="/" element={<App />} />
      <Route path="/blog/:slug" element={<Blog />} />
      <Route path="*" element={<Error404 />} />
    </>,
  ])
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClientProvider>
      <main className="dark:bg-zinc-900 p-6 min-h-screen w-full">
        <RouterProvider router={router} />
      </main>
    </ClientProvider>
  </React.StrictMode>
);
