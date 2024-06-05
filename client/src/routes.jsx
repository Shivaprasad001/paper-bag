import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import Login from './pages/Login';
import RootLayout from './pages/Root';
import HomePage from './pages/Home';
import ErrorPage from './pages/404';

export const router = createBrowserRouter([
    {
      path: '/', 
      element: <RootLayout/>,
      errorElement: <ErrorPage/>,
      children: [
        {path:'/', element: <HomePage/>}
      ]
    },
    {path: '/login', element: <Login/>},
  ]);