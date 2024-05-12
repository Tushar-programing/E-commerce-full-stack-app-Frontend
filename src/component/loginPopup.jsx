import React, {useEffect, useState} from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useForm } from 'react-hook-form'
import {useSelector} from 'react-redux'
import axios from 'axios';
import { login as authlogin } from '../store/authslice';
import { toast } from 'react-toastify';
import conf from "./conf/conf";
import { Input } from '.'


import {Link, useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'

function loginPopup({open}) {
    // console.log("open", open);

    const active = useSelector(state => state.auth.status)
    // console.log(active);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const  { register, handleSubmit } = useForm();
    const [overide, setOveride] = useState(true)

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        ((!active === true) && (overide === true))? setIsDialogOpen(true) : setIsDialogOpen(false)
    }, [active, overide])

    useEffect(() => {
      const timer = setInterval(() => {
          setOveride(true);
      }, 50000); // 10 seconds

      // return () => clearInterval(timer);
  }, []);

    const openDialog = () => {
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setOveride(false)
        setIsDialogOpen(false);
    };
      
    const already = async(data) => {
        // setError("")
        try {
            const session = await axios.post(`${conf.apiUrl}/users/login`, data, {
              withCredentials: true
            })
            if (session) {
                const userData = await axios.post(`${conf.apiUrl}/users/getCurrentUser`, {}, {
                  withCredentials: true
                })
                if (userData) dispatch(authlogin(userData.data.data))
                // console.log(userData)
                navigate("/")
            }
        } catch (error) {
            toast.error(error.message)
            // toast.error(error.response.data.message)
            console.log(error.response.data.message)

        }
      }


  return (
    <div className=''>
        <Dialog open={isDialogOpen} onClose={closeDialog} className='w-[800px] mx-auto'>
          <DialogTitle>Login to your Account</DialogTitle>
          <DialogContent>
            <DialogContentText>
            <form onSubmit={handleSubmit(already)} id='form'>
            {/* <div>{error && <p className='text-red-600 mb-5 text-center'>{error}</p>}</div> */}
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
              <div className='flex justify-center mt-2 mb-7 text-base text-black '><p className='text-xl font-normal'>Don't have an Account? <Link className='font-semibold text-blue-500 hover:underline' to="/signup">Sign up</Link></p></div>
              <div className='flex justify-center'>
              {/* <Button
              type='submit'
              className={`w-72 mb-16 mt-8 bg-violet-900 text-white hover:bg-violet-800  duration-200`}
              >Sign in</Button> */}
              </div>
            </form>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <button className='border w-20 py-1 bg-blue-400 text-white rounded-md' onClick={closeDialog}>cancel</button>
            <button className='border w-24 py-1 bg-blue-400 text-white rounded-md' onClick={handleSubmit(already)}>Log in</button>
          </DialogActions>
        </Dialog>
    </div>
  )
}

export default loginPopup
