import React, {useEffect, useState, useCallback} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import axios from "axios"
import { Input, Button } from './index';
import conf from "./conf/conf";
import './signup.css'

function signup() {
  const {register, handleSubmit} = useForm()
  const navigate = useNavigate();
  const [error, setError] = useState("")
  const  dispatch = useDispatch()

  const create = async(data) => {
    setError("")
    try {
      console.log("signup is working");
      const userData = await axios.post(`${conf.apiUrl}/users/register`, data, {
        withCredentials: true,
      })
      if(userData) {
        console.log(userData);
        // if (userData) dispatch(login(userData))
        navigate("/login")
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  }
  
  return (
    <div className='sm:mx-24 mx-2'>
      <div className=''>
        <h1 className='text-2xl text-gray-800 font-semibold mt-5 ml-24 '>Register Account</h1>
        <div className='w-48 ml-24 bg-gray-600 mt-2 h-0.5'></div>
      </div>
      
      <div className='flex justify-center sm:mx-80 mx-6'>
        <form onSubmit={handleSubmit(create)} id='form' className='mx-32'>
         
          <div className='mb-8 font-semibold text-xl justify-center sm:flex hidden'>
            Your Personal Detail
          </div>
          <div>{error && <p className='text-red-600 mt-8 text-center'>{error}</p>}</div>
          <Input 
            label="Full Name: "
            className1=" sm:mb-5 mb-3 sm:mt-0 mt-8"
            className2=" sm:mb-8 mb-5 focus:outline-none focus:ring-2 focus:ring-violet-900 focus:border-violet-900"
            placeholder='Enter your Full Name'
            {...register("fullName", {     //here name is keyword
                required: true,
            })}
          />
          <Input 
            label="Enter your E-mail :"
            type="email"
            className1=" sm:mb-5 mb-3"
            className2=" sm:mb-8 mb-8 focus:outline-none focus:ring-2 focus:ring-violet-900 focus:border-violet-900"
            placeholder='Enter your E-mail'
            {...register("email", {     //here name is keyword
            required: true,
            validate: {
              matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
              "Email address must be a valid address",
            }
            })}
          />
          <div className='mb-5 sm:flex font-semibold text-xl justify-center hidden'>
            Your Password
          </div>
          <Input 
            label="Enter Password: "
            type="password"
            className1=" sm:mb-5 mb-3"
            className2=" mb-8 focus:outline-none focus:ring-2 focus:ring-violet-900 focus:border-violet-900"
            placeholder='Enter your password'
            {...register("password", {     //here name is keyword
                required: true,
            })}
          />
          {/* <Input 
            label="Confirm Password: "
            type="password"
            className1=" mb-5"
            className2=" mb-8 focus:outline-none focus:ring-2 focus:ring-violet-900 focus:border-violet-900"
            placeholder='Confirm password'
          /> */}
          <div className='flex justify-center mt-2 mb-7'><p className='text-xl font-normal'>Already have an Account? <Link className='font-semibold' to="/login">Sign in</Link></p></div>
          <div className='flex justify-center'><Button className='w-56 mt-4 mb-16 text-xl hover:bg-violet-800' type="submit">Create Account</Button></div>
          
        </form>
      </div>
      
    </div>
  )
}

export default signup;
