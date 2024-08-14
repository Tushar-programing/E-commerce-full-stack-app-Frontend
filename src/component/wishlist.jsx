import React, {useState, useEffect} from 'react'
import del from "../component/images/delete.png"
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import conf from "./conf/conf";

import { MdOutlineShoppingCart } from "react-icons/md";


function wishlist({userId, product_details, createdAt, _id}) {
    // console.log("products", userId, product_details, createdAt, _id);

    const [selectedNumber, setSelectedNumber] = useState(1);
    // console.log(selectedNumber);
    const  navigate = useNavigate();


    const handleSelectChange = (event) => {
        const value = event.target.value;
        setSelectedNumber(value);
    };

    const onclick = async() => {
        try {
            // console.log("product details", product_details._id, selectedNumber);
          const cart =await axios.post(`${conf.apiUrl}/cart/create/${product_details?._id}`, {quantity: parseInt(selectedNumber)}, {
            withCredentials: true
          })
          if (cart) {
            navigate('/cart');
          }
        } catch (error) {
          console.log(error.message)
        }
    }

    const delt = async() => {
        try {
            const update = await axios.post(`${conf.apiUrl}/wishlist/deleteList/${_id}`, {}, {
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
      <div className='md:block hidden h-28 my-10 bg-white shadow-sm'>
        <div className=' h-full grid grid-cols-12 font-light'>
            <Link to={`/post/${product_details?._id}`} className=' overflow-hidden md:col-span-2 xl:col-span-1 grid place-items-center '><img src={product_details?.image[0]} className='max-h-28 '/></Link>
            <Link to={`/post/${product_details?._id}`} className=' my-auto md:col-span-5 xl:col-span-6 '><div className='ml-2 lg:ml-5 my-auto  hover:text-red-600 transform sm:hover:translate-x-[-6px] duration-300 cursor-pointer font-normal text-gray-900'><span className='lg:block hidden'>{product_details?.title}</span> <span className='hidden md:block lg:hidden'>{product_details?.title.slice(0, 45)}</span></div></Link>
            <Link to={`/post/${product_details?._id}`} className=' my-auto col-span-2 '><div className=' text-center my-auto text-gray-900 text-lg'>₹ {product_details?.price}</div></Link>
            <div className=' sm:block hidden my-auto text-center col-span-2'>
                <button className=' px-4 py-2 flex justify-center items-center mx-auto bg-gray-900 text-white rounded-md text-sm'><MdOutlineShoppingCart className='w-4 h-4 me-1' />Add to cart</button>
            </div>
            <div className=' my-auto text-center text-3xl'><button onClick={delt} className=' px-2'>×</button></div>
        </div>
      </div>
      <div className=' md:hidden grid grid-cols-12 py-3'>
        <div onClick={() => navigate(`/post/${product_details?._id}`)} className='col-span-3 h-24  grid place-items-center'>
          <img className=' max-h-24' src={product_details?.image[0]} />
        </div>
        <div onClick={() => navigate(`/post/${product_details?._id}`)} className='col-span-8 my-auto '>
          <div className='text-gray-900 mx-4 font-semibold text-sm'><span className='sm:block hidden '>{product_details?.title.slice(0, 58)}...</span><span className='sm:hidden block'>{product_details?.title.slice(0, 42)}...</span></div>
          <div className='text-gray-600 mx-4 mt-2 text-base flex justify-between items-center'>
            <span>₹ {product_details?.price}</span>
            <button className=' px-4 py-1 rounded-md text-gray-900'><MdOutlineShoppingCart className='w-6 h-6' /></button>
          </div>
        </div>
        <div className='col-span-1 h-24 grid place-items-center '>
          <button onClick={delt} className=' px-2 text-3xl'>×</button>
        </div>
      </div>
      {/* <div className=' md:hidden grid grid-cols-12 shadow-sm py-1'>
        <div onClick={() => navigate(`/post/${product_details?._id}`)} className='col-span-3 h-24  grid place-items-center'>
          <img className=' max-h-24' src={product_details?.image[0]} />
        </div>
        <div onClick={() => navigate(`/post/${product_details?._id}`)} className='col-span-7  my-auto'>
          <div className='text-gray-900 mx-4 font-semibold text-sm'>{product_details?.title.slice(0, 42)}...</div>
          <div className='text-gray-600 mx-4 mt-2 text-base'>₹ {product_details?.price * quant}</div>
        </div>
        <div className='col-span-2 h-24 grid place-items-center '>
          <div>
            <IoIosAddCircleOutline onClick={inc} className='w-5 h-5 text-gray-900 mb-1 cursor-pointer' />
            <div className=' text-gray-900 text-center text-lg'>{quant}</div>
            <AiOutlineMinusCircle onClick={dec}  className='w-5 h-5 text-gray-900 mt-1 cursor-pointer' />
          </div>
        </div>
      </div> */}
    </>
    )
}

export default wishlist
