import React, { useEffect, useState, } from 'react'
import { Link } from 'react-router-dom'
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux'
import './signup.css'
import { toast } from 'react-toastify';
import img from "./images/whishlist1.png"
import img1 from "./images/whishlist2.png"
import axios from 'axios';
import conf from "./conf/conf";
import imgcart from "./images/cart.png"

import cart from "./images/cart1.png"

import whatsappmob from "../component/images/whatsappMob.png"
import { IoCartOutline } from "react-icons/io5";
import { RiHeartAddLine } from "react-icons/ri";
import { RiHeartFill } from "react-icons/ri";
import { FaHeart } from "react-icons/fa6";


function postcard({ _id, title, image, price, description, wis}) {
  console.log(wis);
  // console.log(image);
  const userData = useSelector(state  => state.auth.userData);
  const  navigate = useNavigate();
  const [images, setImages] = useState(0)
  const [like, setLike] = useState(false)
  const active = useSelector(state => state.auth.status)
  // console.log(like);

  const onclick = async() => {
    if (active === true) {
      try {
        const cart = await axios.post(`${conf.apiUrl}/cart/create/${_id}`, {quantity: 1}, {
          withCredentials: true
        })
        if (cart) {
          // navigate('/cart');
          toast.success(cart.data.message)
        }
      } catch (error) {
        console.log(error.message)
        toast.error(error.message)
      }
    } else {
      toast.error("First login to add something in cart")
    } 
  }

  const wish = async() => {
    
    if (active) {
      try {
        setLike(!like)
        await axios.post(`${conf.apiUrl}/wishlist/addWishlist/${_id}`, {}, {
          withCredentials: true
        }).then((wish) => {
          if (wish) {
            // console.log("wish", wish);
            setLike(wish.data.data)
            toast.success(wish.data.message)
          }
        })
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
    } else {
      toast.error("First login to Access wishlist")
    }
  }


  useEffect(() => {
        axios.post(`${conf.apiUrl}/wishlist/getWishlistById/${_id}`, {}, {
          withCredentials: true
        }).then((lk) => {
          // console.log("lk", lk);
          if (lk) {
            // console.log(lk);
            setLike(lk.data.data)
          }
        })
  }, [_id])

  const handleMouseover = () => {
    if (image.length > 1) {
      setTimeout(() => {
        setImages(1)
      }, 200)
    }
  }
  const handleMouseout = () => {
    setTimeout(() => {
      setImages(0)
    }, 200)
  }

  const checkActive = () => {
    if (active) {
      navigate(`/order/${_id}`)
    } else {
      toast.error("First Login to Order something")
    }
  }

  return (
    <div className=' bg-white rounded-2xl'>
      <Link to={`/post/${_id}`}><div className='h-56 md:h-72 grid place-items-center bg-white rounded-t-xl'><img onMouseOver={() => handleMouseover()} onMouseOut={() => handleMouseout()} alt={title} src={image[images]} className='my-auto md:max-h-72 max-h-56' /></div></Link>
      <Link to={`/post/${_id}`}><div className='text-center mt-5'>{title.split('||').slice(0, 1).join(' ')}</div></Link>
      <div className='flex justify-evenly my-4 items-center'><button onClick={() => wish()} className=' px-3 py-1'>{like?<RiHeartAddLine className='w-6 h-6' />:<RiHeartFill className='w-6 h-6' />}</button><span>₹ {price}</span><button onClick={() => onclick()} className='mx-3 my-1'><IoCartOutline className='w-6 h-6' /></button></div>
      <div className='mx-5'></div>
      {/* <div className='w-full bg-white sm:rounded-md rounded-none sm:p-4 p-0 border sm:mt-0 mt-4'>
        <div className='text-end'><button className='me-2 sm:mb-4 mb-3 sm:mt-0 mt-2' onClick={() => wish()}><img src={like? img1 : img} className='w-5'/></button></div>
        <Link to={`/post/${_id}`}>
        <div id='postcard' className='w-full justify-center mb-7 overflow-hidden sm:max-h-56 max-h-36 '>
          <img src={image[images]} onMouseOver={() => handleMouseover()} onMouseOut={() => handleMouseout()} alt={title} className='rounded-lg sm:h-48 h-36  mx-auto '></img>
        </div>
        </Link>
        <h2 className='sm:text-base text-base sm:px-0 px-2 text-gray-800 mb-2 font-light'>{title.length > 30? (<span>{title.slice(0, 32)}...</span>) : (<span>{title}</span>)}</h2>
        <div className='text-lg sm:px-0 font-normal px-2 flex justify-between'><div>₹ {price} &nbsp;<span className='text-gray-500 font-light text-sm line-through'>₹{price + 230}</span></div><abbr title="Get Product details on whatsapp"><img src={whatsappmob} onClick={() => window.open(`https://wa.me/917451811626?text=${_id}`, "_blank")} className='w-8 sm:w-8 md:w-10 h-auto me-5 sm:me-8 md:me-10 cursor-pointer' /></abbr></div>
        <hr className='mt-2 border border-gray-200' />
        <div  className=' mt-4 flex sm:mb-0 mb-2 '>
            <button onClick={() => onclick()} className=' bg-white transform hover:scale-110 duration-300 text-white w-1/4 '><img src={cart} className=' w-8 h-9  mx-auto' /></button>
            <button onClick={checkActive} className='rounded-r-none rounded-lg bg-gray-900  transform hover:scale-105 duration-300 text-white sm:px-8 px-4 py-[0px] sm:ml-9 ml-4 sm:w-36 w-24'>Buy now</button>
        </div>
      </div> */}
    </div>
  )
}

export default postcard
