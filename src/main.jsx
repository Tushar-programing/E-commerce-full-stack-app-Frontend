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
import { Authlayout } from './component/index.js'

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
      {
        path: '/list',
        element: <List />
      },
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
      {
        path: "/edit/:slug",
        element: <Editpost />
      },
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
      {
        path: "/clientorder",
        element: <ClientOrder />,
      },
      {
        path: "/clientpro/:slug",
        element: <ClientOrderPro />,
      },
      {
        path: "/result",
        element: <Result />,
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
