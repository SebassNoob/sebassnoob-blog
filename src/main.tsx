import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { ClientProvider } from '@providers';
import { App, Blog } from '@routes';
import './index.css';

const router = createBrowserRouter(
  createRoutesFromElements([
    <>
      <Route path="/" element={<App />} />
      <Route path="/blog/:id" element={<Blog />} />
    </>,
  ])
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClientProvider>
      <RouterProvider router={router} />
    </ClientProvider>
  </React.StrictMode>
);
