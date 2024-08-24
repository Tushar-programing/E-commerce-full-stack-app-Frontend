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


function postcard({ _id, title, image, price, description, wis, className}) {
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
    <div className={`bg-white rounded-2xl ${className}`}>
      <Link to={`/post/${_id}`}><div className='h-52 md:h-72 grid place-items-center bg-white rounded-t-xl'><img onMouseOver={() => handleMouseover()} onMouseOut={() => handleMouseout()} alt={title} src={image[images]} className='my-auto md:max-h-72 max-h-52' /></div></Link>
      <Link to={`/post/${_id}`}><div className='text-center mt-5'>{title.split('||').slice(0, 1).join(' ')}</div></Link>
      <div className='flex justify-evenly my-4 items-center'><button onClick={() => wish()} className=' px-3 py-1'>{!like?<RiHeartAddLine className='w-6 h-6' />:<RiHeartFill className='w-6 h-6' />}</button><span>₹ {price}</span><button onClick={() => onclick()} className='mx-3 my-1'><IoCartOutline className='w-6 h-6' /></button></div>
      <div className='mx-5'></div>
    </div>
  )
}

export default postcard
