import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux'
import './signup.css'
import img from "./images/whishlist1.png"
import img1 from "./images/whishlist2.png"
import axios from 'axios';
import { toast } from 'react-toastify';
import { LoginPopup } from '../component'
import conf from "./conf/conf";

import img2 from "./images/cart2.png"
import whatsappmob from "../component/images/whatsappMob.png"

import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';


function postcard1({image, title, description, price, _id }) {

    const userData = useSelector(state  => state.auth.userData);
     const  navigate = useNavigate();
    const [images, setImages] = useState(0)
    const [size, setSize] = useState(false)
    const [like, setLike] = useState(false)

    const [isLoaded, setIsLoaded] = useState(false);

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
      }  else {
        // Save cart data to local storage if user is not active
        const localCart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Check if the item already exists in the local cart
        const itemIndex = localCart.findIndex(item => item._id === _id);
        
        if (itemIndex !== -1) {
          // If item already exists, update its quantity
          if (localCart[itemIndex].quantity < 10 ) {
            localCart[itemIndex].quantity += 1;
          }
        } else {
          // If item doesn't exist, add it to the cart
          localCart.push({ _id, product_details: {image, title, description, price}, quantity: 1 });
        }
        
        // Save the updated cart back to local storage
        localStorage.setItem('cart', JSON.stringify(localCart));
        toast.success(" Item saved to local storage.");
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
    <Link to={`/post/${_id}`}>
        <div className="relative group overflow-hidden">
          <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transform transition-all duration-500 ease-in-out flex justify-center">
              <BottomNavigationAction
                className='border'
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  wish()
                }}
                label="Favorites"
                icon={<FavoriteIcon className={` ${like ? "text-[#D4AF37]" : "text-[#B1946C] "} `}  />}
              />
          </div>
          <img
            // onMouseOver={handleMouseover}
            // onMouseOut={handleMouseout}
            src={image[images]}
            className="w-full h-full object-cover"
            alt="Product"
            onLoad={() => setIsLoaded(true)}
            style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.4s ease-in-out' }}
          />
          <div className="absolute bottom-0 left-0 w-full opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-2 transition-all duration-500 ease-in-out flex justify-center">
            <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onclick();
            }}
            className="py-1 bg-[#F7E7CE] text-[#2C3E50] font-bold w-full mb-1 mx-1">
              Add to Cart
            </button>
          </div>
        </div>
        <div className='text-sm md:text-base text-black bg-white mt-1'>{title}</div>
        <div className='text-sm md:text-lg font-semibold text-black bg-white mt-0'>₹ {price}</div>
    </Link>
    // <div className='md:w-64 w-52 h-auto border border-r-1 bg-gray-100'>
    //     <div className=' h-54 overflow-hidden'>
    //       <div className='text-end'><button className=' px-3' onClick={() => wish()}><img src={like? img1 : img} className='w-5 mt-2'/></button></div>
    //       <Link to={`/post/${_id}`}><img className='mx-auto w-44 md:w-52 h-44 md:h-52 ' src={image[images]} onMouseOver={() => handleMouseover()} onMouseOut={() => handleMouseout()}/></Link>
    //     </div>
    //     <Link to={`/post/${_id}`}><div className='mx-5 mt-2'>{title.split('||').slice(0, 1).join(' ')}</div>
    //     </Link>
    //     <div className='mx-5 text-black mt-2 mb-5 flex justify-between'><div>₹ {price}</div><img src={whatsappmob} onClick={() => window.open(`https://wa.me/917451811626?text=${_id}`, "_blank")} className='w-8 sm:w-8 md:w-10 h-auto me-4 cursor-pointer '/></div>
    //     <button onClick={() => onclick()} className={`flex rounded-t-none rounded-2xl mx-5 w-44 bg-gray-900 hover:bg-black mb-2 h-11 text-white text-center font-semibold transition-transform ${size? 'transform scale-90' : ''} duration-200`}><img src={img2} className='w-8 h-8  my-auto ml-8 mr-2' /><span className=' my-auto'>Add to Cart</span></button>
    // </div>
  )
}

export default postcard1
