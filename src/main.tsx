import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { ClientProvider } from '@providers';
import { App, Blog, Error404 } from '@routes';
import { Layout } from './layout';

const routes = [
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/page/:page',
    element: <App />,
  },
  {
    path: '/blog/:slug',
    element: <Blog />,
  },
  {
    path: '*',
    element: <Error404 />,
  },
];

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClientProvider>
      <BrowserRouter>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<Layout>{route.element}</Layout>}
            />
          ))}
        </Routes>
      </BrowserRouter>
    </ClientProvider>
  </React.StrictMode>
);
