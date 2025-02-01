import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'
import  {Logoutbtn}  from '../index';
import { toast } from 'react-toastify';
import axios from 'axios';
import conf from "../conf/conf";
import '../signup.css';

import { LuUser } from "react-icons/lu";
import { MdOutlineShoppingCart } from "react-icons/md";

import { RxHamburgerMenu } from "react-icons/rx";

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { RxCross1 } from "react-icons/rx";
import { RiSearchLine } from "react-icons/ri";
import { IoArrowBack } from "react-icons/io5";

import LoginPopup from './loginPopup';

import LogoAnimation from './logoAnimation';

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
            setOpen(false)
            navigate(`/result?searchQuery=${value}`)
            window.location.reload()
        } else {
            setOpen(false)
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
    // 
    
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

    const [open2, setOpen2] = React.useState(false);
    const fullScreen2 = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClickOpen2 = () => {
        setOpen2(true);
    };

    const handleClose2 = () => {
        setOpen2(false);
    };
    
  return (
    <nav >
        <div className=' bg-white flex items-center justify-between px-4 md:py-6 py-3 max-w-[1536px] mx-auto'>
            <div className=" flex items-center space-x-2 md:space-x-4 xl:w-[50%] lg:w-[60%] md:w-[72%] justify-between">
                <button onClick={e => navigate('/')} className="text-2xl font-bold me-6 md:w-48 w-32"><LogoAnimation /></button>
                <ul className="md:flex hidden space-x-10 justify-center ">
                    <div className="relative inline-block ">
                        <div className="group ">
                            <a to={"/result"} className="justify-center text-sm font-semibold text-black">
                                Collections
                            </a>
                            <div className="absolute z-20 border hidden w-40 mt-0 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg group-hover:block">
                                <div className="py-1">
                                    <a href={"/result?cat=diwali"} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Diwali Light
                                    </a>
                                    <a href={"/result?cat=chandelier"} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Chandeliers
                                    </a>
                                    <a href={"/result?cat=ceiling"} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Ceiling Fixtures
                                    </a>
                                    <a href={"/result?cat=lamp"} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Lamps & Lighting
                                    </a>
                                    <a href={"/result?cat=outdoor"} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Outdoor Lighting
                                    </a>
                                    <a href={"/result?cat=wall"} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Wall Lamps
                                    </a>
                                    <a href={"/result?cat=garden"} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Garden Lighting
                                    </a>
                                    <a href={"/result?cat=floor"} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Floor Lamp
                                    </a>
                                    <a href={"/result?cat=mood"} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Mood Lighting
                                    </a>
                                    <a href={"/result?cat=patio"} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Patio Lights
                                    </a>
                                    <a href={"/result?cat=other"} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Other all
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
                    <button onClick={(e) => setOpen(true)} className="text-sm font-semibold cursor-pointer mb-[6px]"><RiSearchLine className='md:w-[26px] sm:w-6 w-5 md:h-[26px] sm:h-6 h-5' /></button>
                    <Link to={"/cart"} className="text-sm font-semibold cursor-pointer md:px-1 px-0"><MdOutlineShoppingCart className='md:w-[26px] sm:w-6 w-5 md:h-[26px] sm:h-6 h-5' /></Link>
                    {active && <Link to="/userpannel" className='lg:hidden block '><LuUser className=" md:w-[26px] sm:w-6 w-5 md:h-[26px] sm:h-6 h-5 " /></Link>}

                    {!active && 
                    <button
                    onClick={handleClickOpen2}
                    className=" m-0 p-0 flex items-start"
                    >
                        <LuUser className="m-0 p-0  md:w-[26px] sm:w-6 w-5 md:h-[26px] sm:h-6 h-5" />
                    </button>
                    }

                    {active && <li className=" text-sm font-semibold cursor-pointer px-0 z-30 lg:block hidden">
                        <div className="relative inline-block">
                            <div className="group">
                                <a to={"/result"} className="justify-center text-sm font-semibold text-black ">
                                    <LuUser className=" md:w-[26px] sm:w-6 w-5 md:h-[26px] sm:h-6 h-5" />
                                </a>
                                {/* Dropdown menu */}
                                <div className="absolute z-20 hidden w-40 mt-0 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg group-hover:block right-0">
                                    <div className="pt-2">
                                        <div className='border py-2 rounded-md'>
                                            <Link
                                                to={"/userpannel"}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                MY PROFILE
                                            </Link>
                                            <Link
                                                to={"/orderpage"}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                MY ORDERS
                                            </Link>
                                            <Link
                                                to={"/address"}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                MY ADDRESS
                                            </Link>
                                            <Link
                                                to={"/wishlist"}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                MY WISHLIST
                                            </Link>
                                            <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                <Logoutbtn />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </li>}
                    <Link className=" md:hidden block z-30">
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
                                <span onClick={addtodo} className="text-gray-500 cursor-pointer">
                                    <RiSearchLine className='md:w-6 w-5 md:h-6 h-5 my-auto mx-auto mb-1' />
                                </span>
                                <input 
                                    type="text"
                                    placeholder="What are looking for ?" 
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
                            <div onClick={e=> setValue("Marble Handle Spoon")} className='cursor-pointer text-gray-500 mt-4'>Marble Handle Spoon</div>
                            <div onClick={e=> setValue("Curtley Hanging Stand")} className='cursor-pointer text-gray-500 mt-1'>Curtley Hanging Stand</div>
                            <div onClick={e=> setValue("Golden Spoon")} className='cursor-pointer text-gray-500 mt-1'>Golden Spoon</div>
                            <div onClick={e=> setValue("Watermelon Spoon")} className='cursor-pointer text-gray-500 mt-1'>Watermelon Spoon</div>
                            <div onClick={e=> setValue("Bowl set")} className='cursor-pointer text-gray-500 mt-1'>Bowl set</div>
                            <div onClick={e=> setValue("Plate set")} className='cursor-pointer text-gray-500 mt-1'>Plate set</div>
                            
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

        {/* <Button variant="outlined" onClick={handleClickOpen2}>
            Open responsive dialog
        </Button> */}
        <Dialog
            fullScreen={fullScreen2}
            // maxWidth={maxWidth}
            open={open2}
            onClose={handleClose2}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogContent>
                <DialogContentText>
                    <LoginPopup onClose={handleClose2}  />
                </DialogContentText>
            </DialogContent>
        </Dialog>
    </nav>
    )
}

export default header


// {!active && <button onClick={handleClickOpen2}><LuUser className='md:w-[26px] sm:w-6 w-5 md:h-[26px] sm:h-6 h-5' /></button>}
//                         {active && <DropdownMenu.Root>
//                             <DropdownMenu.Trigger>
//                                 <LuUser className='md:w-[26px] sm:w-6 w-5 md:h-[26px] sm:h-6 h-5' />
//                             </DropdownMenu.Trigger>
//                             <DropdownMenu.Content className="bg-white border border-gray-200 rounded-md shadow-lg z-10 mt-3 me-12">
//                                 <DropdownMenu.Item className="p-0">
//                                     <Link 
//                                         to={!active ? "/login" : "/orderpage"} 
//                                         className="block w-full px-4 py-2 text-sm text-gray-700"
//                                     >
//                                         {!active ? "Login" : "My Orders"}
//                                     </Link>
//                                 </DropdownMenu.Item>

//                                 <DropdownMenu.Item className="p-0">
//                                     <Link 
//                                         to={!active ? "/signup" : "/address"} 
//                                         className="block w-full px-4 py-2 text-sm text-gray-700"
//                                     >
//                                         {!active ? "Sign-up" : "Address"}
//                                     </Link>
//                                 </DropdownMenu.Item>

//                                 {active && (
//                                     <DropdownMenu.Item className="p-0">
//                                         <Link 
//                                             to="/wishlist" 
//                                             className="block w-full px-4 py-2 text-sm text-gray-700"
//                                         >
//                                             Wishlist
//                                         </Link>
//                                     </DropdownMenu.Item>
//                                 )}

//                                 {active && (
//                                     <DropdownMenu.Item className="p-0">
//                                         <div className="block w-full px-4 py-2 text-sm text-gray-700">
//                                             <Logoutbtn />
//                                         </div>
//                                     </DropdownMenu.Item>
//                                 )}

//                             </DropdownMenu.Content>
//                         </DropdownMenu.Root>}