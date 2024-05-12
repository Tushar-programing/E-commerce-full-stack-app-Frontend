import React, {useState, useEffect} from 'react'
import img from "./images/whishlist1.png"
import img1 from "./images/whishlist2.png"
import axios from 'axios'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import {useSelector} from 'react-redux'
import conf from "./conf/conf";


function resultCard({status, brand, category, createdAt, description, height, image, keyword, material, model, price, title, updatedAt, use, weight, width, _id}) {

  const [images, setImages] = useState(0)

  const [like, setLike] = useState(false)

  const active = useSelector(state => state.auth.status)
  // console.log(like);

  const onclick = async() => {
    if (active) {
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
      toast.error("First login to add something in your cart")
    }
    
  }

  const wish = async() => {
    if (active) {
      try {
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
      toast.error("first login to Acess wishlist")
    }
  }

  useEffect(() => {
    axios.post(`${conf.apiUrl}/wishlist/getWishlistById/${_id}`, {}, {
      withCredentials: true
    }).then((lk) => {
      console.log("lk", lk);
      if (lk) {
        // console.log(lk);
        setLike(lk.data.data)
      }
    }, [])
  })

    const handleMouseover = () => {
        if (image.length > 1) {
          setTimeout(() => {
            setImages((prevIndex) => (prevIndex + 1))
          }, 200)
        }
    }
    
    const handleMouseout = () => {
      setTimeout(() => {
        setImages(0)
      }, 200)
    }

  return (
      <div className=' h-60 flex justify-between bg-white mb-3'>
            <Link to={`/post/${_id}`}><div className=' w-60 overflow-hidden'>
                <img src={image[images]} onMouseOver={() => handleMouseover()} onMouseOut={() => handleMouseout()} className=' w-52 rounded-lg h-48 mx-auto mt-5'/>
            </div></Link>
            <Link to={`/post/${_id}`}><div className=' w-[528px] ml-4'>
                <div className='mt-5 text-red-600 mx-3 text-lg mr-20'>{title.length > 46? (<span>{title.slice(0, 46)}...</span>) : (<span>{title}</span>)}</div>
                <div className='mt-2  mx-3 text-black text-lg'><span className=''>Brand : </span>{brand}</div>
                <div className='mt-2  mx-3 text-black'><span className='text-violet-900'>Use of : </span>{use}</div>
                <div className='mt-2 mx-3 text-black  mr-20'><span className='text-black'>Description : </span>{description.length > 90? (<span>{description.slice(0, 90)}...</span>): (<span>{description}</span>)}</div>
                <div className='mt-2 text-violet-900 ml-3 '>Category : <span className='text-black'>{category}</span></div>
            
            </div></Link>
            <div className=' w-64'>
                <div className=' h-10 flex justify-end '><button onClick={wish} ><img src={like? img1 : img} className='w-6 h-6 mt-2 mr-2'/></button></div>
                <div className=' text-center mt-8 text-red-600 text-xl mr-4'><span className='text-black text-lg'>Price : </span>₹ {price}</div>
                <div className=' text-center  text- mr-4 mt-1'><span className='line-through text-green-600'>₹ {(price/8) + price} </span> 20% off</div>
                <div className=' text-center'><button onClick={onclick} className='border text-center mt-5 w-36 py-1 px-1 bg-green-600 text-white'>Add to Cart</button></div>
            </div>
        </div>
  )
}

export default resultCard
