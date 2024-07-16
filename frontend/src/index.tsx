import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignIn from './pages/SignIn';

import './reset.css';
import './index.css';

import SignUp from './pages/SignUp';
import Main from './pages/Main';
import { AuthProvider } from './context/AuthProvider';
import { initAXIOSInterceptors } from './axios.interceptors';
import 'react-toastify/dist/ReactToastify.css';

initAXIOSInterceptors()

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthProvider>
        <Main />
      </AuthProvider>
    ),
  },
  {
    path: '/sign-in',
    element: <SignIn />,
  },
  {
    path: '/sign-up',
    element: <SignUp />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
  </React.StrictMode>,
);
