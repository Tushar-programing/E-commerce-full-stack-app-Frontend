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
      <div className='w-full bg-white rounded-md p-4'>
        <button className='ml-60' onClick={() => wish()}><img src={like? img1 : img} className='w-5'/></button>
        <Link to={`/post/${_id}`}>
        <div id='postcard' className='w-full justify-center mb-4 overflow-hidden'>
          <img style={{ width: '260px' }} src={image[images]} onMouseOver={() => handleMouseover()} onMouseOut={() => handleMouseout()} alt={title} className='rounded-lg w-52 h-56'></img>
        </div>
        <h2 className='text-xl text-red-600 mb-2 font-semibold'>{title.length > 25? (<span>{title.slice(0, 25)}...</span>) : (<span>{title}</span>)}</h2>
        <h2 className='mb-2 '>{description.length > 25? (<span>{description.slice(0, 28)}...</span>) : (<span>{description}</span>)}</h2>
        <h2 className='text-xl font-bold'>₹ {price}</h2>
        </Link>
        <button onClick={() => onclick()} className='bg-green-600 transform hover:scale-110 duration-300 text-white px-6 py-1 mr-1 mt-4'>add to cart</button>
        <button onClick={checkActive} className='bg-violet-900 transform hover:scale-110 duration-300 text-white ml-1 px-8 py-1 mt-4'>Buy now</button>
      </div>
  )
}

export default postcard
