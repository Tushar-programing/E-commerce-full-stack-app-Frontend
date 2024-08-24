import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store  from './store/store'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Signup from './page/signup.jsx'
import { Login } from './component/index.js'
import List from './page/list.jsx'
import Allpost from './page/allpost.jsx'
import Cart from './page/cart.jsx'
import Post from './page/post.jsx'
import Editpost from './page/editpost.jsx'
import Orders from './page/orders.jsx'
import CartOrder from './page/cartOrders.jsx'
import Adress from './page/adress.jsx'
import Wishlist from './page/wishlist.jsx';
import UserOrder from './page/userOrder.jsx';

import ClientOrder from './page/clientOrder.jsx'
import Result from './page/result.jsx';
import ClientOrderPro from './page/clientOrderPro.jsx';
import UserOrderPro from './page/userOrderPro.jsx'
import { Authlayout } from './component/index.js'
import Authlayout2 from './component/authlayout2.jsx';
import OrderReturn from './page/orderReturn.jsx';

import YourPro from './page/yourPro.jsx';

import Dashboard from './page/dashboard.jsx';
import Outlet from './App2.jsx';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element:
          <Allpost />
      },
      {
        path: '/login',
        element:
        <Authlayout authentication={false}>
          <Login />
        </Authlayout>
      },
      {
        path: '/signup',
        element: 
        <Authlayout authentication={false}>
          <Signup />
        </Authlayout>
      },
      // {
      //   path: '/list',
      //   element: <List />
      // },
      {
        path: '/post/:slug',
        element: <Post />
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/wishlist',
        element: <Wishlist />
      },
      // {
      //   path: "/edit/:slug",
      //   element: <Editpost />
      // },
      {
        path: "/address",
        element: <Adress />
      },
      {
        path: "/order/:slug",
        element: <Orders />
      },
      {
        path: "/order",
        element: <CartOrder />
      },
      {
        path: "/orderpage",
        element: <UserOrder />
      },
      // {
      //   path: "/clientorder",
      //   element: <ClientOrder />,
      // },
      {
        path: "/clientpro/:slug",
        element: <ClientOrderPro />,
      },
      {
        path: "/userpro/:slug",
        element: <UserOrderPro />,
      },
      {
        path: "/result",
        element: <Result />,
      },
      {
        path: "/admin",
        element:
          <Outlet />,
        children: [
          {
            path: "/admin",
            element:
            <Authlayout2 >
              <Dashboard />
            </Authlayout2>,
          },
          {
            path: '/admin/list',
            element:
            <Authlayout2 >
              <List />
            </Authlayout2>,
          },
          {
            path: "/admin/list/edit/:slug",
            element:
            <Authlayout2 >
              <Editpost />
            </Authlayout2>,
          },
          {
            path: "/admin/yourpro",
            element:
            <Authlayout2 >
              <YourPro />
            </Authlayout2>,
          },
          {
            path: "/admin/clientorder",
            element:
            <Authlayout2 >
              <ClientOrder />
            </Authlayout2>,
          },
          {
            path: "/admin/orderReturn",
            element:
            <Authlayout2 >
              <OrderReturn />
            </Authlayout2>,
          }
        ]
      },
    ],
  },
])


const theme = createTheme({
  typography: {
    fontFamily: 'Bahnschrift ', // Customize the font family here
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
      <ToastContainer theme="dark" autoClose={3000} />
      <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
)
