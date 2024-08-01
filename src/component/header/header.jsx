import React, { useState, useEffect } from 'react'
import image from '../images/tds.png';
import { Link, useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'
import  {Logoutbtn}  from '../index';
import SearchIcon from '@mui/icons-material/Search';
import cart from "../images/cart1.png"
import wish from "../images/whishlist1.png"
import { toast } from 'react-toastify';
import axios from 'axios';
import img from "../images/tds1.png"
import conf from "../conf/conf";
import '../signup.css';

import Badge from '@mui/material/Badge';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import { FaRegHeart } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { IoIosSearch } from "react-icons/io";
import { IoMdLogIn } from "react-icons/io";


function header() {
    const navigate = useNavigate()
    const [value, setValue] = useState('')
    const [main, setMain] = useState([])

    const [age, setAge] = useState('');

    const [post, setPost] = useState([]);

    const [open , setOpen] = useState(false);

    useEffect(() => {
        axios.post(`${conf.apiUrl}/cart/getAllCart`, {}, {
            withCredentials: true
        }).then((post) => {
            if (post) {
                setPost(post.data.data); 
            }
        })
    });

    const handleChange = (event) => {
      setAge(event.target.value);
      navigate(`/result?cat=${event.target.value}`)
        window.location.reload()
    };


    const addtodo = async() => {
        if ((value === '') && (age === '')) {
            toast.error("please enter some keywords or select the category")
        } else if (value) {
            navigate(`/result?searchQuery=${value}`)
            window.location.reload()
        } else {
            navigate(`/result?cat=${age}`)
            window.location.reload()
        }
        
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            // Trigger the search action when Enter key is pressed
            addtodo();
        }
    };

    const active = useSelector(state => state.auth.status)
    const userData = useSelector(state => state.auth.userData);
    // console.log("userData", userData);
    

    
  return (
    <>
        
        <div className='w-full py-2 sm:pt-4 pt-1 pl-3 bg-gray-100  grid grid-cols-12'>
            
            <Link className=' lg:col-span-2 col-span-3 ' to="/"><img src={img}  alt="logo" className=' mx-auto mt-3 sm:w-32 lg:w-36 w-28'/></Link>
            
            <input type='text' placeholder='Search here something' onKeyPress={handleKeyPress} value={value} onChange={(e) => setValue(e.target.value)} className='lg:col-span-3 col-span-2 sm:block hidden sm:p-1 p-0 mt-2 mb-3 sm:h-10 h-9 border outline-none sm:pl-3 pl-1 focus:outline-none focus:ring-2 focus:ring-black focus:border-black'/>
            {/* <div className='sm:block hidden border h-10 mt-3 border-black'></div> */}
            <select
                id="age-select"
                value={age}
                onChange={handleChange}
                className="col-span-2 sm:block hidden h-10 mt-2 border-l-2 border-black bg-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
            >
                <option className='text-black' value="">Browse by Category</option>
                <option className='text-black' value="boards">Arduino Boards</option>
                <option className='text-black' value="sensors">Sensors</option>
                <option className='text-black' value="motors">Dc motors</option>
                <option className='text-black' value="speakers">Buzzers & Speakers</option>
                <option className='text-black' value="batteries">Batteries</option>
                <option className='text-black' value="chargers">Chargers</option>
                <option className='text-black' value="bluthooth">Bluetooth module</option>
                <option className='text-black' value="capacitors">Capacitors & Transistors</option>
                <option className='text-black' value="led">LED's</option>
                <option className='text-black' value="drones">Drones</option>
                <option className='text-black' value="cars">Rc cars</option>
                <option className='text-black' value="other">other's</option>
            </select>
        
            <button onClick={addtodo} className='border mt-2 bg-black sm:inline-block hidden duration-200 w-9 h-10 rounded-tr-md rounded-br-md'><IoIosSearch className='text-white w-6 h-6 ms-1'/></button>
            
            {!active &&<div className='md:col-span-2 sm:col-span-1 col-span-4'></div>}
            {active &&<div className='lg:col-span-1 sm:col-span-5 col-span-3 lg:block sm:hidden ]'></div>}


            {!active && (
                    <button
                        className='md:col-span-2 sm:col-span-3 col-span-5 my-1 lg:mx-9 mx-0 border sm:text-lg text-base duration-200 rounded-md border-gray-900 border-y-2 border-x-2 flex justify-center text-gray-900'
                    >
                        <IoMdLogIn className='my-auto me-2' /><span onClick={() => navigate("/login")} className='my-auto'>Login</span><span onClick={() => navigate("/signup")} className='my-auto'>/Signup</span>
                    </button>
            )}

                    
            {active && 
                <div className=' lg:col-span-1 col-span-2 text-center '>
                    <button  onClick={() => navigate("/cart")} className='flex mx-auto' ><Badge className='my-2 ' color="primary" badgeContent={post?.length}>
                    <img src={cart} className='sm:w-9 w-9  '/>
                    </Badge><span className='mt-5 ms-3 sm:block hidden'>Cart</span>
                    </button>
                </div>}
            {/* {active && 
                <div  className='sm:flex hidden col-span-1 border'>
                    <FaRegHeart />
                </div>
            } */}
            {active &&
                <div className=' text-base lg:col-span-2 sm:col-span-2 col-span-4 '> 
                    {/* {userData && (<p className='sm:flex hidden text-green-500 font-medium sm:text-lg text-sm'>Hey {userData?.fullName}</p>)} */}
                    <div className="dropdown  my-3 lg:mx-10 md:mx-3 mx-0 ">
                        <button onClick={(e) => setOpen(!open)} className=" text-black font-semibold flex justify-center mx-auto "><VscAccount className='w-6 h-6 lg:me-2 me-0' /><span className='lg:block sm:hidden block'>{userData?.fullName ||"Your Account" }</span><ArrowDropDownIcon />&nbsp;&nbsp;&nbsp;&nbsp;</button>
                        <div className="dropdown-content sm:w-auto lg:ms-8 ms-0  pt-2">
                            <Link onClick={(e) => setOpen(false)} to="/orderpage" className='sm:text-base text-sm'>My orders</Link>
                            <Link onClick={(e) => setOpen(false)} to="/wishlist" className='sm:text-base text-sm'>Wishlist</Link>
                            <Link onClick={(e) => setOpen(false)} to="/address" className='sm:text-base text-sm'>My address</Link>
                            <a onClick={(e) => setOpen(false)} className='sm:text-base text-sm' ><Logoutbtn /></a>
                            <Link onClick={(e) => setOpen(false)} to="/dashboard" className='sm:text-base text-sm'>Seller Dashboard</Link>
                        </div>
                    </div>
                </div>}

        </div>
        <div className='h-auto sm:hidden  flex'>
            <div className='flex mx-auto py-2'>
            <input type='text' placeholder='Search here something' onKeyPress={handleKeyPress} value={value} onChange={(e) => setValue(e.target.value)} className='p-0 w-36 h-9 border outline-none pl-1 focus:outline-none focus:ring-2 focus:ring-black focus:border-black'/>
            <div className='border h-9 border-black'></div>
            <select
                id="age-select"
                value={age}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                className="block w-28 h-9 border border-gray-300 bg-white py-2 px-1 focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
            >
            <option className='text-black' value="">Browse by Category</option>
            <option className='text-black' value="boards">Arduino Boards</option>
            <option className='text-black' value="sensors">Sensors</option>
            <option className='text-black' value="motors">Dc motors</option>
            <option className='text-black' value="speakers">Buzzers & Speakers</option>
            <option className='text-black' value="batteries">Batteries</option>
            <option className='text-black' value="chargers">Chargers</option>
            <option className='text-black' value="bluthooth">Bluetooth module</option>
            <option className='text-black' value="capacitors">Capacitors & Transistors</option>
            <option className='text-black' value="led">LED's</option>
            <option className='text-black' value="drones">Drones</option>
            <option className='text-black' value="cars">Rc cars</option>
            <option className='text-black' value="other">other's</option>
            </select>
        
            <button onClick={addtodo} className='bg-black inline-block duration-200 w-9 h-9 rounded-tr-md rounded-br-md '><SearchIcon fontSize="medium" color="primary" style={{ padding: '1px', color: 'white' }}/></button>
            </div>
        </div>
    </>
    
  )
}

export default header
