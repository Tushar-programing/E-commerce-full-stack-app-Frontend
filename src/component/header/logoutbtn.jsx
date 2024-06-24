import React from 'react'
import { Button } from '..'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authslice';
import { useNavigate } from 'react-router-dom'
import conf from "../conf/conf";

function logoutbtn() {
    const  dispatch = useDispatch();
    const navigate = useNavigate()
    const logoutHandler = () => {
        axios.post(`${conf.apiUrl}/users/logout`, {}, {
          withCredentials: true
        })
        dispatch(logout())
        navigate("/")
    }

  return (
    <>
        <button 
        onClick={logoutHandler} className='w-full text-start'>
            Logout
        </button>
    </>
    
  )
}

export default logoutbtn
