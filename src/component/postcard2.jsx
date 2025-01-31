import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux'
import './signup.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { LoginPopup } from '.'
import conf from "./conf/conf";


function postcard1({image, title, description, price, _id }) {

    const userData = useSelector(state  => state.auth.userData);
     const  navigate = useNavigate();
    const [images, setImages] = useState(0)
    const [size, setSize] = useState(false)
    const [like, setLike] = useState(false)

    const active = useSelector(state => state.auth.status)

    const onclick = async() => {
      setSize(true)
      setTimeout(() => {
        setSize(false);
    }, 200);  
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
        toast.error("Login to add something in Cart")
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

  const wish = async() => {
    if (active) {
      try {
        setLike(!like)
        await axios.post(`${conf.apiUrl}/wishlist/addWishlist/${_id}`, {}, {
          withCredentials: true
        }).then((wish) => {
          if (wish) {
            console.log("wish", wish);
            setLike(wish.data.data)
            toast.success(wish.data.message)
          }
        })
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
    } else {
      toast.error("First login add acess wishlist")
    }
    
  }

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


  return (
    <Link to={`/post/${_id}`} target="_blank" className=' bg-white '>
      <img src={image[0]} alt='image' />
      {/* <div className='sm:h-60 h-48 grid place-items-center px-5'><img src={image[images]} className='sm:max-h-56 max-h-44' onMouseOver={() => handleMouseover()} onMouseOut={() => handleMouseout()}/></div>
      <div className=''>
        <div className='sm:hidden block mt-5 text-base sm:text-lg'>{title?.slice(0, 30)} ...</div>
        <div className='sm:block hidden mt-8 text-lg'>{title?.slice(0, 55)}</div>
        <div className='text-lg sm:text-xl text-black font-light sm:mt-4 mt-3'>₹ {price}</div>
        <div className=' flex justify-between items-center mt-4 sm:mt-6 mb-2 sm:mb-0 '>
          <img src={whatsappmob} onClick={() => window.open(`https://wa.me/917451811626?text=${_id}`, "_blank")} className=" h-9 sm:h-10 cursor-pointer" />
          <button onClick={() => navigate(`/post/${_id}`)} className={`ms-auto flex rounded-r-none rounded-xl w-36  md:w-36 lg:w-44 xl:w-48 2xl:w-52 bg-gray-900 hover:bg-black h-9 sm:h-11 text-white font-semibold transition-transform ${size? 'transform scale-90' : ''} duration-200 border text-sm sm:text-base`}><span className='mx-auto my-auto'>Learn More</span></button>
        </div>
      </div> */}
    </Link>
  )
}

export default postcard1
