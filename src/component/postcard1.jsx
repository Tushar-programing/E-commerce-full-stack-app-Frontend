import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux'
import './signup.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import LoginPopup from './header/loginPopup'
import conf from "./conf/conf";

import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { RxCross1 } from "react-icons/rx";


function postcard1({image, title, description, price, _id }) {

    const userData = useSelector(state  => state.auth.userData);
     const  navigate = useNavigate();
    const [images, setImages] = useState(0)
    const [size, setSize] = useState(false)
    const [like, setLike] = useState(false)

    const [open, setOpen] = useState(false);

    const [isLoaded, setIsLoaded] = useState(false);

    const active = useSelector(state => state.auth.status)

    const [maxWidth, setMaxWidth] = React.useState('sm');

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

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

    const createLike = async() => {
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
    }

  const wish = () => {
    if (active) {
      createLike()
    } else {
      setOpen(true)
    }
    
  }

  const handleClose = () => {
    setOpen(false);
};


  return (
    <div>
      <Link to={`/post/${_id}`} target="_blank">
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
          <div className='text-sm md:text-base text-black mt-1'>{title}</div>
          <div className='text-sm md:text-lg font-semibold text-black mt-0'>₹ {price}</div>
      </Link>

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
                              <div className="relative flex items-center w-full md:w-[500px] ">
                              </div>
                              <button onClick={e=> setOpen(false)} className='md:block hidden'><RxCross1 className='md:text-2xl text-base' /></button>
                          </div>
                          <div className='min-h-60'>
                              <LoginPopup onClose={e => {createLike(), setOpen(false)}} />
                          </div>
                      </DialogContentText>
                  </DialogContent>
          </Dialog>
    </div>
  )
}

export default postcard1
