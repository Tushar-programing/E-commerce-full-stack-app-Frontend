import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux"
import axios from "axios"
import conf from "./conf/conf";
import { toast } from 'react-toastify';

function cartpost({_id, product_details, quantity, updatedAt}) {

  const [quant, setQuant] = useState(quantity);

  const increase = async(e) => {
    setQuant(e.target.value);
    try {
      const update = await axios.post(`${conf.apiUrl}/cart/updateCart/${_id}`, {quantity: e.target.value}, {
        withCredentials: true
      })
      if (update) {
        toast.success("successfully updated the cart quantity")
      } 
    } catch (error) {
      console.log(error.message)
    }
  }

    const incease = async() => {
      if (quantity  < 20) {
        
        try {
          const update = await axios.post(`${conf.apiUrl}/cart/updateCart/${_id}`, {quantity: quantity+1}, {
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
        const update = await axios.post(`${conf.apiUrl}/cart/removeCart/${_id}`, {}, {
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
    <div className='h-24 '>
      <div className='border h-full flex font-light'>
          <Link to={`/post/${product_details?._id}`}><div className=' w-32 h-20 my-auto mx-2 overflow-hidden '><img src={product_details?.image[0]} className='mx-auto my-auto h-20'/></div></Link>
          <Link to={`/post/${product_details?._id}`} className=' my-auto'><div className=' ml-4 w-[490px] my-auto  hover:text-red-600 transform sm:hover:translate-x-[-6px] duration-300 cursor-pointer'>{product_details?.title}</div></Link>
          <Link to={`/post/${product_details?._id}`} className=' my-auto'><div className=' text-center my-auto w-44 text--900 ml-8'>₹ {product_details?.price}</div></Link>
          <div className='sm:block hidden my-auto text-center w-48 '>
              <select value={quant} onChange={increase} className='border w-24 outline-none px-4 py-1'>
                  <option value={1} >1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={7}>7</option>
                  <option value={8}>8</option>
                  <option value={9}>9</option>
                  <option value={10}>10</option>
              </select>
          </div>
          <div className=' w-36 my-auto text-center'>₹ {product_details?.price * quantity}</div>
          <div className=' w-20 my-auto text-center text-3xl'><button onClick={remove} className=' px-2'>×</button></div>
      </div>
    </div> 
  )
}

export default cartpost
