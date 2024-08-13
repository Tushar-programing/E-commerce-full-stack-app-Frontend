import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux"
import axios from "axios"
import conf from "./conf/conf";
import { toast } from 'react-toastify';

import { IoIosAddCircleOutline } from "react-icons/io";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

function cartpost({_id, product_details, quantity, updatedAt, updateCart}) {
  const navigate = useNavigate();

  const [quant, setQuant] = useState(quantity);

  const increase = async(e) => {
    setQuant(e.target.value);
    try {
      const update = await axios.post(`${conf.apiUrl}/cart/updateCart/${_id}`, {quantity: e.target.value}, {
        withCredentials: true
      })
      if (update) {
        toast.success("successfully updated the cart quantity")
        updateCart(e.target.value, _id)
      }

    } catch (error) {
      console.log(error.message)
    }
  }

  const inc = async() => {
    setQuant(quant + 1);
    try {
      const update = await axios.post(`${conf.apiUrl}/cart/updateCart/${_id}`, {quantity: quant + 1}, {
        withCredentials: true
      })
      if (update) {
        toast.success("successfully updated the cart quantity")
        updateCart()
      }

    } catch (error) {
      console.log(error.message)
    }
  }

  const dec = async() => {
    setQuant(quant - 1);
    try {
      if (quant === 1) {
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
      } else {
        const update = await axios.post(`${conf.apiUrl}/cart/updateCart/${_id}`, {quantity: quant - 1}, {
          withCredentials: true
        })
        if (update) {
          toast.success("successfully updated the cart quantity")
          updateCart()
        }
      }
    } catch (error) {
      console.log(error.message)
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
    <>
      <div className='md:block hidden h-24 shadow-md'>
        <div className='border h-full grid grid-cols-12 font-light'>
            <Link to={`/post/${product_details?._id}`} className=' overflow-hidden md:col-span-2 xl:col-span-1'><img src={product_details?.image[0]} className='mx-auto my-auto h-24 '/></Link>
            <Link to={`/post/${product_details?._id}`} className=' my-auto md:col-span-5 xl:col-span-6 '><div className='ml-2 lg:ml-5 my-auto  hover:text-red-600 transform sm:hover:translate-x-[-6px] duration-300 cursor-pointer'><span className='lg:block hidden'>{product_details?.title}</span> <span className='hidden md:block lg:hidden'>{product_details?.title.slice(0, 45)}</span></div></Link>
            <Link to={`/post/${product_details?._id}`} className=' my-auto col-span-2 lg:col-span-1'><div className=' text-center my-auto text--900'>₹ {product_details?.price}</div></Link>
            <div className=' sm:block hidden my-auto text-center col-span-1 lg:col-span-2'>
                <select value={quant} onChange={increase} className='border w-12 lg:w-24 outline-none px-2 lg:px-4 py-1'>
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
            <div className=' my-auto text-center col-span-1'>₹ {product_details?.price * quant}</div>
            <div className=' my-auto text-center text-3xl'><button onClick={remove} className=' px-2'>×</button></div>
        </div>
      </div>
      <div className=' md:hidden grid grid-cols-12 shadow-sm py-1'>
        <div onClick={() => navigate(`/post/${product_details?._id}`)} className='col-span-3 h-24  grid place-items-center'>
          <img className=' max-h-24' src={product_details?.image[0]} />
        </div>
        <div onClick={() => navigate(`/post/${product_details?._id}`)} className='col-span-7  my-auto'>
          <div className='text-gray-900 mx-4 font-semibold text-sm'>{product_details?.title.slice(0, 42)}...</div>
          <div className='text-gray-600 mx-4 mt-2 text-base'>₹ {product_details?.price * quant}</div>
        </div>
        <div className='col-span-2 h-24 grid place-items-center '>
          <div>
            <IoIosAddCircleOutline onClick={inc} className='w-6 h-6 text-blue-600 mb- cursor-pointer' />
            <div className='text-blue-600 text-center text-lg'>{quant}</div>
            <AiOutlineMinusCircle onClick={dec}  className='w-6 h-6 text-blue-600 mt- cursor-pointer' />
          </div>
        </div>
      </div>
    </>
  )
}

export default cartpost
