import React from 'react';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';

import Username from './components/Username';
import PageNotFound from './components/PageNotFound';
import Reset from './components/Reset';
import Recovery from './components/Recovery';
import Register from './components/Register';
import UserVerify from './components/UserVerify';
import Profile from './components/Profile';
import 'bootstrap/dist/css/bootstrap.min.css';

/**  Authorized--middleware user--protected routes */
import { AuthorizedUser } from './middleware/auth';

const router = createBrowserRouter([
    {
        path: '/',
        element : <Username></Username>
    },
    {
        path: '/register',
        element : <Register></Register>
    },
    {
        path: '/userverify',
        element : <UserVerify></UserVerify>
    },
    {
        path: '/reset',
        element : <Reset></Reset>
    },
    {
        path: '/recovery',
        element : <Recovery></Recovery>
    },
    {
        path: '/profile',
        element : <AuthorizedUser><Profile/></AuthorizedUser>
    },
    {
        path: '/*',
        element : <PageNotFound></PageNotFound>
    },
])

export default function App() {
  return (
   <main>
    <RouterProvider router={router}></RouterProvider>
   </main>
  )
}
