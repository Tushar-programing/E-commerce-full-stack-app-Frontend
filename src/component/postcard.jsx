import React, { useEffect, useState } from 'react'
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


function postcard({ _id, title, image, price, description}) {
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
    }, [])
  })

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
      <div className='w-full bg-white sm:rounded-md rounded-none sm:p-4 p-0 border'>
        <button className='sm:ml-60 ml-[140px] mt-1' onClick={() => wish()}><img src={like? img1 : img} className='w-5'/></button>
        <Link to={`/post/${_id}`}>
        <div id='postcard' className='w-full justify-center mb-7 overflow-hidden sm:max-h-56 max-h-36'>
          <img src={image[images]} onMouseOver={() => handleMouseover()} onMouseOut={() => handleMouseout()} alt={title} className='rounded-lg w-full sm:h-56 h-36'></img>
        </div>
        <h2 className='sm:text-xl text-base sm:px-0 px-2 text-red-600 mb-2 font-semibold'>{title.length > 25? (<span>{title.slice(0, 25)}...</span>) : (<span>{title}</span>)}</h2>
        <h2 className='mb-2 sm:flex hidden'>{description.length > 25? (<span>{description.slice(0, 28)}...</span>) : (<span>{description}</span>)}</h2>
        <h2 className='text-xl font-bold sm:px-0 px-2'>₹ {price}</h2>
        </Link>
        <div  className=' mt-4 flex sm:mb-0 mb-2'>
          <button onClick={() => onclick()} className=' sm:bg-green-600 bg-white transform hover:scale-110 duration-300 text-white sm:px-6 px-2 py-1 mr-1 sm:mx-0 mx-2'><p className='sm:flex hidden'>add to cart</p><img src={imgcart} className='sm:hidden flex w-6 h-6' /></button>
          <button onClick={checkActive} className='sm:bg-violet-900 bg-green-500 transform hover:scale-110 duration-300 text-white ml-2 sm:px-8 px-4 py-1 '>Buy now</button>
        </div>
      </div>
  )
}

export default postcard
