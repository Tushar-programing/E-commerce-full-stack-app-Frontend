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
      <div className='w-full bg-white sm:rounded-md rounded-none sm:p-4 p-0 border sm:mt-0 mt-4'>
        <button className='sm:ml-60 ml-[140px] my-1' onClick={() => wish()}><img src={like? img1 : img} className='w-5'/></button>
        <Link to={`/post/${_id}`}>
        <div id='postcard' className='w-full justify-center mb-7 overflow-hidden sm:max-h-56 max-h-36 '>
          <img src={image[images]} onMouseOver={() => handleMouseover()} onMouseOut={() => handleMouseout()} alt={title} className='rounded-lg sm:h-48 h-36  mx-auto mt-4'></img>
        </div>
        <h2 className='sm:text-lg text-base sm:px-0 px-2 text-gray-800 mb-2 font-semibold'>{title.length > 25? (<span>{title.slice(0, 25)}...</span>) : (<span>{title}</span>)}</h2>
        {/* <h2 className='mb-2 sm:flex hidden'>{description.length > 25? (<span>{description.slice(0, 28)}...</span>) : (<span>{description}</span>)}</h2> */}
        <h2 className='text-lg sm:px-0 px-2 font-light'>₹ {price}</h2>
        </Link>
        <hr className='mt-2 border border-gray-200' />
        <div  className=' mt-4 flex sm:mb-0 mb-2 '>
            <button onClick={() => onclick()} className=' bg-white transform hover:scale-110 duration-300 text-white w-1/4 '><img src={cart} className=' w-8 h-9  mx-auto' /></button>
            <button onClick={checkActive} className='rounded-r-none rounded-lg bg-black  transform hover:scale-105 duration-300 text-white sm:px-8 px-4 py-[0px] sm:ml-9 ml-4 sm:w-36 w-24'>Buy now</button>
        </div>
      </div>
  )
}

export default postcard
