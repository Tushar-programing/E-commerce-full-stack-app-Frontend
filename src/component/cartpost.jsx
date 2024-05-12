import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux"
import axios from "axios"
import conf from "./conf/conf";

function cartpost({_id, product_details, quantity, }) {
  
    const decrease = async() => {
      if (quantity  > 1) {

        try {
          const update = await axios.post(`${conf.apiUrl}/cart/updateCart/${_id}`, {quantity: quantity-1}, {
            withCredentials: true
          })
          if (update) {
            window.location.reload();
          } 
        } catch (error) {
          console.log(error.message)
        }
      }  else {
        try {
          const update = await axios.post(`http://localhost:8000/api/v1/cart/removeCart/${_id}`, {}, {
            withCredentials: true
          })
          if (update) {
            window.location.reload();
          }
        } catch (error) {
          console.log(error.message)
        }
      }
    }

    const increase = async() => {
      if (quantity  < 20) {
        
        try {
          const update = await axios.post(`http://localhost:8000/api/v1/cart/updateCart/${_id}`, {quantity: quantity+1}, {
            withCredentials: true
          })
          if (update) {
            window.location.reload();
          } 
        } catch (error) {
          console.log(error.message)
        }
      }  else {
        alert("you can not add more quantity")
      }
    }

    const remove = async() => {
      try {
        const update = await axios.post(`http://localhost:8000/api/v1/cart/removeCart/${_id}`, {}, {
            withCredentials: true
        })
        if (update) {
          window.location.reload();
        }
      } catch (error) {
        console.log(error.message)
      }
    }
      
  return (
    <div className='h-36 border'>
        {product_details? <div><Link to={`/post/${product_details?._id}`}>
            <div className='float-left w-48 h-auto'>
              {product_details?.image[0]? <img className='mt-5 ml-14' style={{ height: '100px', }} src={product_details?.image[0]}></img> : null}
            </div>
            <div className='float-left w-80 mt-3 ml-24'>
              <div className=' text-xl text-red-600 font-semibold mb-1 '>{product_details?.title.length > 30? <span>{product_details?.title.slice(0, 30)}...</span> : <span>{product_details?.title}</span>}</div>
              <div className=' text-lg text-gray-700 font-semibold mb-1'>Brand : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{product_details?.brand}</div>
              <div className=' text-lg text-gray-500 font-semibold'>{product_details?.description.length > 60? <span>{product_details?.description.slice(0, 60)}...</span> : <span>{product_details?.description}</span>}</div>
            </div>
        </Link>
        <div className='w-96 float-left'>
            <p className='text-xl font-medium ml-60 mt-6'>Quantity</p>
            <div className='text-lg mt-2 ml-56'>
                <button onClick={() => decrease()} className='float-left px-3 mr-2 rounded-lg text-white bg-red-600'>-</button><input type="number" className='float-left w-20 outline-none border pl-3' value={quantity} readOnly/><button onClick={() => increase()} className='float-left px-2 ml-2 text-white rounded-lg bg-green-600'>+</button>
            </div>
            <button onClick={() => remove()} className='text-lg font-medium text-white px-3 rounded-lg mt-2 ml-60 bg-gray-600'>remove item</button>
        </div>
        <p className='text-xl float-left font-medium ml-24 mt-10'>₹ {product_details?.price} *  {quantity}</p>
        <p className='text-xl float-left  ml-20 mt-5 '>Total ₹ <span className='text-red-600 font-semibold'>{product_details?.price * quantity}</span></p></div> : null}
    </div> 
  )
}

export default cartpost
