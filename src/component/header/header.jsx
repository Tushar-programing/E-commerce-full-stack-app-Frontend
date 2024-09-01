import React, { useState, useEffect, useRef } from 'react'
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



import logo from "../images/logo3.png"
import { CiUser } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { IoSearchOutline } from "react-icons/io5";
import { GrSearch } from "react-icons/gr";

import { LuUser } from "react-icons/lu";
import { MdOutlineShoppingCart } from "react-icons/md";

import { RxHamburgerMenu } from "react-icons/rx";

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { RxCross2 } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";
import { RiSearchLine } from "react-icons/ri";
import { IoArrowBack } from "react-icons/io5";

function header() {
    const navigate = useNavigate()
    const [value, setValue] = useState('')
    const [main, setMain] = useState([])

    const [age, setAge] = useState('');

    const [post, setPost] = useState([]);

    const [open, setOpen] = useState(false);

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
            setOpen(false)
            addtodo();
        }
    };

    const active = useSelector(state => state.auth.status)
    const userData = useSelector(state => state.auth.userData);
    // console.log("userData", userData);
    
    const [maxWidth, setMaxWidth] = React.useState('md');

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const inputRef = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            if (open && inputRef.current) {
                inputRef.current.focus();
            }
        },100)
    }, [open]);
    
  return (
    <nav >
        <div className=' bg-white flex items-center justify-between px-4 md:py-6 py-3 max-w-[1536px] mx-auto '>
            <div className="flex items-center space-x-2 md:space-x-4 xl:w-[50%] lg:w-[60%] md:w-[72%] justify-between">
                <button onClick={e => navigate('/')} className="text-2xl font-bold me-6 ">LUXLOOM</button>
                <ul className="md:flex hidden space-x-10 justify-center ">
                <div className="relative inline-block ">
                        <div className="group ">
                            <button className=" justify-center text-sm font-semibold text-black">
                                Collections
                            </button>
                            <div className="absolute z-20 border hidden w-40 mt-0 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg group-hover:block">
                                <div className="py-1">
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Account settings
                                    </a>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Support
                                    </a>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        License
                                    </a>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Sign out
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <Link to={"/result"} className="text-sm font-semibold cursor-pointer mt-[2px]">Collections</Link> */}
                    <Link to={"/"} className="text-sm font-semibold cursor-pointer mt-[2px]">Our Story</Link>
                    <Link to={"/"} className="text-sm font-semibold cursor-pointer mt-[2px]">Journal</Link>
                    <Link to={"/"} className="text-sm font-semibold cursor-pointer mt-[2px]">Contact us</Link>
                </ul>
            </div>
            <div className="flex items-center space-x-4 ">
                <ul className="flex sm:space-x-4 space-x-2">
                    <button onClick={(e) => setOpen(true)} className="text-sm font-semibold cursor-pointer md:px-1 px-0 "><GrSearch className='md:w-[26px] sm:w-6 w-5 md:h-[26px] sm:h-6 h-5' /></button>
                    <Link to={"/cart"} className="text-sm font-semibold cursor-pointer md:px-1 px-0 "><MdOutlineShoppingCart className='md:w-[26px] sm:w-6 w-5 md:h-[26px] sm:h-6 h-5' /></Link>
                    <li className="text-sm font-semibold cursor-pointer md:px-1 px-0 ">
                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger>
                                <LuUser className='md:w-[26px] sm:w-6 w-5 md:h-[26px] sm:h-6 h-5' />
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Content className="bg-white border border-gray-200 rounded-md shadow-lg z-10 mt-3 me-12">
                                <DropdownMenu.Item className="p-0">
                                    <Link 
                                        to={!active ? "/login" : "/orderpage"} 
                                        className="block w-full px-4 py-2 text-sm text-gray-700"
                                    >
                                        {!active ? "Login" : "My Orders"}
                                    </Link>
                                </DropdownMenu.Item>

                                <DropdownMenu.Item className="p-0">
                                    <Link 
                                        to={!active ? "/signup" : "/address"} 
                                        className="block w-full px-4 py-2 text-sm text-gray-700"
                                    >
                                        {!active ? "Sign-up" : "Address"}
                                    </Link>
                                </DropdownMenu.Item>

                                {active && (
                                    <DropdownMenu.Item className="p-0">
                                        <Link 
                                            to="/wishlist" 
                                            className="block w-full px-4 py-2 text-sm text-gray-700"
                                        >
                                            Wishlist
                                        </Link>
                                    </DropdownMenu.Item>
                                )}

                                {active && (
                                    <DropdownMenu.Item className="p-0">
                                        <div className="block w-full px-4 py-2 text-sm text-gray-700">
                                            <Logoutbtn />
                                        </div>
                                    </DropdownMenu.Item>
                                )}

                            </DropdownMenu.Content>
                        </DropdownMenu.Root>
                    </li>
                    <Link className=" md:hidden block">
                        <DropdownMenu.Root>

                            <DropdownMenu.Trigger>
                                <RxHamburgerMenu className='md:w-[26px] sm:w-6 w-5 md:h-[26px] sm:h-6 h-5' />
                            </DropdownMenu.Trigger>

                            <DropdownMenu.Content className="bg-white border border-gray-200 rounded-md shadow-lg z-10 mt-3 me-5">
                                <DropdownMenu.Item className="px-4 py-2 text-sm text-gray-700">
                                    <Link to={"/result"}>Collections</Link>
                                </DropdownMenu.Item>
                                <DropdownMenu.Item className="px-4 py-2 text-sm text-gray-700">
                                    <Link>Our Story</Link>
                                </DropdownMenu.Item>
                                <DropdownMenu.Item className="px-4 py-2 text-sm text-gray-700">
                                    <Link>Journal</Link>
                                </DropdownMenu.Item>
                                <DropdownMenu.Item className="px-4 py-2 text-sm text-gray-700">
                                    <Link>Contact us</Link>
                                </DropdownMenu.Item>
                            </DropdownMenu.Content>
                        </DropdownMenu.Root>
                    </Link>
                </ul>
            </div>
        </div>
        
        {/* this is dialog box */}
        <Dialog
            fullScreen={fullScreen}
            maxWidth={maxWidth}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
            className='md:mb-32'
        >
                <DialogContent>
                    <DialogContentText>
                        <div className='flex '>
                            <button onClick={e=> setOpen(false)} className='md:hidden block me-5 mb-1'><IoArrowBack className='text-2xl ' /></button>
                            <div className="relative flex items-center w-full md:w-[650px] ">
                                <span className="text-gray-500 ">
                                    <RiSearchLine className='md:w-6 w-5 md:h-6 h-5 my-auto mx-auto mb-1' />
                                </span>
                                <input 
                                    type="text"
                                    placeholder="Selling light" 
                                    className="w-full text-lg border-none py-1 ml-4 outline-none transition duration-300 ease-in-out"
                                    ref={inputRef} 
                                    onKeyPress={handleKeyPress}
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                />
                            </div>
                            <button onClick={e=> setOpen(false)} className='md:block hidden'><RxCross1 className='md:text-2xl text-base' /></button>
                        </div>
                        <div className='min-h-60'>
                            <div className='text-gray-800 mt-4 text-lg'>Popular keywords</div>
                            <div className='text-gray-500 mt-4'>Galaxy S24 Ultra</div>
                            <div className='text-gray-500 mt-1'>Galaxy S23</div>
                            <div className='text-gray-500 mt-1'>Charger</div>
                            <div className='text-gray-500 mt-1'>How to check the firmware</div>
                            <div className='text-gray-500 mt-1'>Customer care</div>
                            <div className='text-gray-500 mt-1'>Galaxy S23 plus</div>
                            
                        </div>
                    </DialogContentText>
                </DialogContent>
                {/* <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Disagree
                    </Button>
                    <Button onClick={handleClose} autoFocus>
                        Agree
                    </Button>
                </DialogActions> */}
        </Dialog>
    </nav>

  )
}

export default header
