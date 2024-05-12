import React, { useState, useEffect } from 'react'
import image from '../images/tds.png';
import { Link, useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'
import  {Logoutbtn}  from '../index';
import SearchIcon from '@mui/icons-material/Search';
import cart from "../images/cart.png"
import wish from "../images/whishlist1.png"
import { toast } from 'react-toastify';
import axios from 'axios';
import img from "../images/tds1.png"
import conf from "../conf/conf";
import '../signup.css';

function header() {
    const navigate = useNavigate()
    const [value, setValue] = useState('')
    const [main, setMain] = useState([])

    const [age, setAge] = useState('');

    const [post, setPost] = useState([]);

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
            status: active
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
        
        <div className='w-full py-2 pt-4 pl-3 bg-gray-100 flex'>
            
        <Link to="/"><img src={img} width="180" height="8" alt="logo" className='mr-36 ml-6 mt-4 mb-3'/></Link>
            
            <input type='text' placeholder='Search here something' onKeyPress={handleKeyPress} value={value} onChange={(e) => setValue(e.target.value)} className='p-1 mt-3 w-80 h-10 border outline-none pl-3 focus:outline-none focus:ring-2 focus:ring-violet-900 focus:border-violet-900'/>
            <div className='border h-10 mt-3 border-violet-900'></div>
            <select
                id="age-select"
                value={age}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                className="block w-auto h-10 mt-3 border border-gray-300 bg-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-violet-900 focus:border-violet-900"
            >
            <option className='text-violet-900' value="">Browse by Category</option>
            <option className='text-violet-900' value="boards">Arduino Boards</option>
            <option className='text-violet-900' value="sensors">Sensors</option>
            <option className='text-violet-900' value="motors">Dc motors</option>
            <option className='text-violet-900' value="speakers">Buzzers & Speakers</option>
            <option className='text-violet-900' value="batteries">Batteries</option>
            <option className='text-violet-900' value="chargers">Chargers</option>
            <option className='text-violet-900' value="bluthooth">Bluetooth module</option>
            <option className='text-violet-900' value="capacitors">Capacitors & Transistors</option>
            <option className='text-violet-900' value="led">LED's</option>
            <option className='text-violet-900' value="drones">Drones</option>
            <option className='text-violet-900' value="cars">Rc cars</option>
            <option className='text-violet-900' value="other">other's</option>
            </select>
        
            <button onClick={addtodo} className='mt-3 bg-violet-900 inline-block duration-200 w-11 h-10 rounded-tr-md rounded-br-md '><SearchIcon fontSize="large" color="primary" style={{ padding: '1px', color: 'white' }}/></button>
            

            <ul className='flex ml-auto'>
            {navitem.map((item) =>
                item.status ? (
                    <li key={item.name}>
                        <button id={item.name} onClick={() => navigate(item.url)}
                        className='fancy-underline inline-block mx-10 mt-2 px-6 py-2 text-violet-900 font-medium text-lg duration-200 rounded-full'
                        >
                            {item.name}
                        </button>
                    </li>
                ) : null
            )}
            {active && (
                <>
                    {/* <li>
                        <button  onClick={() => navigate("/cart")}
                        className='fancy-underline inline-block mx-10 mr-10 mt-2 px-6 py-2 text-blue-600 font-medium text-lg duration-200 rounded-full'
                        >
                            <img src={wish} className='w-8'/>
                        </button>
                    </li> */}
                    <li>
                        <div className='absolute z-20 text-red-600 ml-[93px] mt-1 text-xl'>{post.length}</div>
                        <div className='absolute z-10 text-red-600 rounded-full w-7 h-7 border bg-white ml-[85px] mt-1'></div>
                        <button  onClick={() => navigate("/cart")}
                        className='fancy-underline inline-block mx-10 mr-20 mt-2 px-6 py-2 text-blue-600 font-medium text-lg duration-200 rounded-full'
                        >
                            <img src={cart} className='w-8'/>
                        </button>
                    </li>
                    <div className=' mr-14 text-base ml-3'> 
                      {userData && (<p className='text-red-500 font-medium text-lg'>Hey {userData.fullName}</p>)}
                      <div className="dropdown">
                        <button className="dropbtn text-violet-900 font-semibold">My account&nbsp;&#717;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>
                        <div className="dropdown-content">
                          <Link to="/orderpage">My orders</Link>
                          <Link to="/address">My address</Link>
                          <a ><Logoutbtn /></a>
                          <Link to="/list">List Product</Link>
                          <Link to="/clientorder">Client Order</Link>
                        </div>
                      </div>
                    </div>
                </>
            )}
            </ul>

        </div>
    </>
    
  )
}

export default header
