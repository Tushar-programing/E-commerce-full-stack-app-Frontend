import { useState, useCallback, useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import Header from './component/header/header'
import Footer from './component/footer/footer'
import { login } from './store/authslice'
import { logout } from './store/authslice'
import {Outlet} from 'react-router-dom'
import conf from "./component/conf/conf"


function App() {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    axios.post(`${conf.apiUrl}/users/getCurrentUser`, {}, {
      withCredentials: true,
    }).then((userDat) => {
        const userData = userDat.data.data;
        // console.log("this is userData", userData);
        if (userData) {
          dispatch(login({userData}))
        } else {
          dispatch(logout())
        }
    })
}, [])


  return (
    <>
    <Header />
    <main>
    <Outlet />
    </main>
    <Footer />
    </>
  )
}

export default App
