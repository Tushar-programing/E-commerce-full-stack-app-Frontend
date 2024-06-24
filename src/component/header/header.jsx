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

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

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
    

    const navitem= [
        {
            name:"Wishlist",
            url: "/wishlist",
            status: false
        },
        // {
        //     name:" cart",
        //     url: "/cart",
        //     status: true
        // },
        {
            name:" wishlist",
            url: "/wishlist",
            status: false
        },
        {
            name:" login",
            url: "/login",
            status: !active
        },
        {
            name:" signup",
            url: "/signup",
            status: !active
        }, 
    ]
  return (
    <>
        
        <div className='w-full py-2 sm:pt-4 pt-1 pl-3 bg-gray-100 flex'>
            
        <Link to="/"><img src={img}  alt="logo" className='sm:mr-36 mr-24 sm:ml-6 ml-2 sm:mt-4 mt-4 sm:mb-3 mb-2 sm:w-36 w-28'/></Link>
            
            <input type='text' placeholder='Search here something' onKeyPress={handleKeyPress} value={value} onChange={(e) => setValue(e.target.value)} className='sm:block hidden sm:p-1 p-0 mt-3 sm:w-80 w-24 sm:h-10 h-9 border outline-none sm:pl-3 pl-1 focus:outline-none focus:ring-2 focus:ring-black focus:border-black'/>
            <div className='sm:block hidden border h-10 mt-3 border-black'></div>
            <select
                id="age-select"
                value={age}
                onChange={handleChange}
                className="sm:block hidden sm:w-auto w-20 h-10 mt-3 border border-gray-300 bg-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
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
        
            <button onClick={addtodo} className='mt-3 bg-black sm:inline-block hidden duration-200 w-11 h-10 rounded-tr-md rounded-br-md '><SearchIcon fontSize="large" color="primary" style={{ padding: '1px', color: 'white' }}/></button>
            

            <ul className='flex ml-auto'>
                    {active && <li  className='sm:flex hidden'>
                        <button onClick={() => navigate("/wishlist")}
                        className='fancy-underline inline-block sm:mx-8 mx-1 mt-1 sm:px-6 px-3 sm:py-2 py-1 text-black font-medium sm:text-lg text-base duration-200 rounded-full'
                        >
                            Wishlist
                        </button>
                    </li>}
            {navitem.map((item) =>
                item.status ? (
                    <li key={item.name} className=''>
                        <button id={item.name} onClick={() => navigate(item.url)}
                        className='fancy-underline inline-block sm:mx-10 mx-1 mt-2 sm:px-6 px-3 sm:py-2 py-1 text-violet-900 font-medium sm:text-lg text-base duration-200 rounded-full'
                        >
                            {item.name}
                        </button>
                    </li>
                ) : null
            )}
                    
            {active && (
                <>
                    <li className='sm:mr-0 mr-3 '>
                        <div className=' absolute z-20 text-green-600 sm:ml-[93px] ml-[25px] sm:mt-1 mt-0 sm:text-xl text-lg'>{post?.length}</div>
                        <div className='absolute z-10 text-red-600 rounded-full sm:w-7 w-5 sm:h-7 h-5 border bg-white sm:ml-[85px] ml-[21px] sm:mt-1 mt-1'></div>
                        <button  onClick={() => navigate("/cart")}
                        className=' fancy-underline inline-block sm:mx-10 mx-1 sm:mr-20 mr-2 sm:mt-2 mt-1 sm:px-6  py-2 text-blue-600  duration-200 rounded-2xl sm:w-auto w-10'
                        >
                            <img src={cart} className='sm:w-10 '/>
                        </button>
                    </li>
                    <div className='sm:mr-14 mr-0 text-base sm:ml-4 ml-2'> 
                      {userData && (<p className='sm:flex hidden text-green-500 font-medium sm:text-lg text-sm'>Hey {userData?.fullName}</p>)}
                      <div className="dropdown">
                        <button className="sm:flex hidden dropbtn text-black font-semibold">My account &nbsp;<ArrowDropDownIcon />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>
                        <button onClick={(e) => setOpen(!open)} className="sm:hidden sm:mr-auto mr-5 flex text-violet-900 font-semibold">My account<ArrowDropDownIcon /></button>
                        <div className={`${open? "block" : " "} dropdown-content sm:w-auto `}>
                          <Link to="/orderpage" className='sm:text-base text-sm'>My orders</Link>
                          <Link to="/wishlist" className='sm:text-base text-sm'>Wishlist</Link>
                          <Link to="/address" className='sm:text-base text-sm'>My address</Link>
                          <a className='sm:text-base text-sm' ><Logoutbtn /></a>
                          <Link to="/list" className='sm:text-base text-sm'>List Product</Link>
                          <Link to="/clientorder" className='sm:text-base text-sm'>Client Order</Link>
                        </div>
                      </div>
                    </div>
                </>
            )}
            </ul>

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
