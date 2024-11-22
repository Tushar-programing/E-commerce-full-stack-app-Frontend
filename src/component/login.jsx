import React, { useState } from 'react'
import { Input, Button } from '.'
import {Link, useNavigate} from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { login as authlogin } from '../store/authslice';
import axios from 'axios'
// const apiUrl = import.meta.env.VITE_API_URL;
import conf from "./conf/conf"
import './signup.css'

import { toast } from 'react-toastify';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


function login() {
    const[error, setError] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {register, handleSubmit} =  useForm()
    const [size, setSize] = useState(false)

    const [working, setWorking] = useState(false);
    // console.log(conf.apiUrl);


    const updateCart = async() => {
      console.log("statr working properly");
      
      const localCart = JSON.parse(localStorage.getItem('cart')) || [];

      if (localCart.length === 0) return; // No items in local storage cart
    
      try {

        localCart.map(async(item) => {
          const cart = await axios.post(`${conf.apiUrl}/cart/create/${item._id}`, { quantity: item.quantity }, {
            withCredentials: true
          });
        
          if (cart) {
            toast.success(`Item with ID ${item._id} added to server cart.`);
          }
        })

        // for (const item of localCart) {
        //   const cart = await axios.post(`${conf.apiUrl}/cart/create/${item._id}`, { quantity: item.quantity }, {
        //     withCredentials: true
        //   });
        
        //   if (cart) {
        //     toast.success(`Item with ID ${item._id} added to server cart.`);
        //   }
        // }
      
        // Clear the local storage cart once items are successfully synced
        localStorage.removeItem('cart');
        toast.success("Local cart synced to server successfully.");
      
        // Optionally, navigate to the cart page
        // navigate('/cart');
      } catch (error) {
        console.log(error.message);
        toast.error("Failed to sync local cart to server.");
      }
    }


    const already = async(data) => {
      setWorking(true)
      setSize(true)
      setTimeout(() => {
        setSize(false);
    }, 200); 
        setError("")
        try {
          console.log("login trying to log user");
            const session = await axios.post(`${conf.apiUrl}/users/login`, data, {
              withCredentials: true
            })
            if (session) {
              console.log("this is working");
              console.log("this is apiurl", `${conf.apiUrl}/users/getCurrentUser`)
              const userData = await axios.post(`${conf.apiUrl}/users/getCurrentUser`, {}, {
                withCredentials: true
              })
              if (userData) dispatch(authlogin(userData.data.data))
              console.log(userData)
              setWorking(false)
              navigate("/")
              updateCart()
            }
        } catch (error) {
            toast.error("email id or password must be valid")
            toast.error(error.response.data.message)

            console.log(error.response.data.message)
            setWorking(false)
        }
    }

    if (working) {
      return <div className='w-full h-[800px]'><Backdrop
                className='w-full h-[800px]'
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                ><div className='mr-5'>Please wait while we processing your data</div>
                <CircularProgress color="inherit" />
              </Backdrop></div>
    }

  return (
    <>
    <div className='text-2xl text-gray-800 font-semibold mt-5 ml-24 '>Login account</div>
    <div className='w-48 ml-24 bg-gray-600 mt-2 h-0.5'></div>
    <div  className='flex justify-center mt-16'>

      <form onSubmit={handleSubmit(already)} id='form'>
      <div>{error && <p className='text-red-600 mb-5 text-center'>{error}</p>}</div>
        <div className=''></div>
        <Input 
        className1=" mb-5"
        className2=" mb-8 focus:outline-none focus:ring-2 focus:ring-violet-900 focus:border-violet-900"
        type="email"
        label="Enter e-mail: "
        placeholder="Email address"
        {...register("email", {
        required: true,
        validate: {
            matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
            "Email address must be a valid address",
        }
        })}
        />
        <Input 
        type="password"
        label="Password:"
        placeholder="*************"
        className1=" mb-5"
        className2=" mb-8 focus:outline-none focus:ring-2 focus:ring-violet-900 focus:border-violet-900"
        {...register("password", {
            required: true,
        })}
        />
        <div className='flex justify-center mt-2 mb-7'><p className='text-xl font-normal'>Don't have an Account? <Link className='font-semibold text-blue-500' to="/signup">Sign up</Link></p></div>
        <div className='flex justify-center'>
        <Button
        type='submit'
        className={`w-72 mb-16 mt-8 hover:bg-violet-800 ${size? 'transform scale-90' : ''} duration-200`}
        >Sign in</Button>
        </div>
      </form>
    </div>
    </>
  )
}

export default login
