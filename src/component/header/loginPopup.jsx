import React, {useEffect, useState} from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { set, useForm } from 'react-hook-form'
import {useSelector} from 'react-redux'
import axios from 'axios';
import { login as authlogin } from '../../store/authslice';
import { toast } from 'react-toastify';
import conf from "../conf/conf";
import { Input } from '../index'

import {Link, useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import ClipLoader from "react-spinners/ClipLoader";

import { FaArrowLeft } from "react-icons/fa6";


function loginPopup({ onClose }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const [error, setError] = useState()
    const {register,  handleSubmit, formState: { errors }} = useForm()

    const [loading, setLoading] = useState(false);

    const [login, setLogin] = useState(true)

    const logReg = async(data) => {
        setLoading(true)
        if (login) {
            already(data)
        } else {
            try {
                console.log("signup is working");
                const userData = await axios.post(`${conf.apiUrl}/users/register`, data, {
                    withCredentials: true,
                })
                if(userData) {
                    already(data)
                    setLoading(false)
                    setTimeout(() => {
                        setLoading(true);
                    }, 150)
                    toast.success("You are registered! We are to processing for Login.")
                    // if (userData) dispatch(login(userData))
                    // navigate("/login")
                    // setWorking(false);
                }
            } catch (error) {
                setLoading(false)
                console.log(error);
                setError(error.response.data.message);
                toast.error("this user is already exist with this email")
            }
        }
    }

    const already = async(data) => {
        // setError("")
        console.log("working clearing");
        
        try {
            const session = await axios.post(`${conf.apiUrl}/users/login`, data, {
                withCredentials: true
            })
            if (session) {
                console.log("this is wolihgnvf");
                
                const userData = await axios.post(`${conf.apiUrl}/users/getCurrentUser`, {}, {
                    withCredentials: true
                })
                
                if (userData) {
                dispatch(authlogin(userData.data.data))
                setLoading(false)
                toast.success("You are login sucessfully.")
                navigate("/")
                onClose()
                }
            }
        } catch (error) {
            toast.error(error.message)
            setLoading(false)
            // toast.error(error.response.data.message)
            console.log(error.response.data.message)
        }
    }


  return (
    <div className=''>
        <div className='text-center text-xl mt-2 flex justify-between sm:justify-center'><button onClick={onClose}><FaArrowLeft className=' sm:hidden'/></button>LUXLOOM<div className='sm:hidden'></div></div>
        <div className='mt-6 text-lg'>{login ? "Welcome Back!" : "Create new Account"}</div>
        <form  onSubmit={handleSubmit(logReg)}>
            {!login &&<input type='text' className={`${login? "hidden" : 'block'} mt-5 w-full border py-2 px-2 rounded-md`} placeholder='Enter Name..'
            {...register("fullName", {
                required: "Full Name is required",
                validate: {
                    matchPattern: (value) => /^[a-zA-Z\s'-]+$/.test(value) ||
                    "fullName must contain only letters, spaces, apostrophes, or hyphens",
                }
            })}
            />}
            {errors.fullName && !login && <p className="text-red-500 text-xs italic mt-1 w-full block">{errors.fullName.message}</p>}
            <input type='email' className='mt-5 w-full border py-2 px-2 rounded-md' placeholder='Email Address' autoComplete="false"
            {...register("email", {
                required: 'Email is required',
                validate: {
                    matchPattern: (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ||
                        "Email address must be a valid format"
                }
            })}
            />
            {errors.email && <p className="text-red-500 text-xs italic mt-1 w-full inline-block">{errors.email.message}</p>}
            <input type='password' className='w-full mt-5 border py-2 px-2 rounded-md' placeholder='Password' autoComplete="false" 
            {...register("password", {
                required: 'Password is required',
                validate: {
                    matchPattern: (value) => /^.{3,}$/.test(value) || 
                    "Password must be at least 3 characters long"
                }
            })}
            />
            {errors.password && <p className="text-red-500 text-xs italic mt-1 w-full">{errors.password.message}</p>}
            <div className='text-center mt-14'>{login ? "Don't have account ?" : "Already have an account?"} &nbsp;<button onClick={e => {e.preventDefault(), setLogin(!login)}} className='text-lg text-blue-500'>{login ? "Sign up" : "Sign in"}</button></div>
            {/* <div className='mt-5 text-center mb-4'><button className='bg-black py-1 text-lg rounded-md px-12 text-white'>{login ? "Sign in" : "Sign up"}</button></div> */}
            <div className='mt-5 text-center mb-4'>
                <button
                    className='bg-black py-1 text-lg rounded-md px-12 text-white loading-btn'
                    disabled={loading}
                    style={{
                        cursor: loading ? "not-allowed" : "pointer",
                        position: "relative",
                    }}
                >
                    {loading ? <ClipLoader size={20} color={"#fff"} /> : login ? "Sign in" : "Sign up"}
                </button>
            </div>
        </form>
    </div>
  )
}

export default loginPopup
