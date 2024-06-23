import axios from 'axios'
import React from 'react'
import { toast } from 'react-toastify';
import {Link } from 'react-router-dom'
import conf from "./conf/conf";

function order({adress1, adress2, city, company, country, createdAt, name, owner, paymentStatus, phone, zip, product_details, quantity, state, status, _id}) {

  const cancel = async() => {
    await axios.post(`${conf.apiUrl}/order/updateOrder/${_id}`, {status: "cancel"}, {
      withCredentials: true
    }).then((cancel) => {
      if (cancel) {
        toast.success("Successfully canceled your order")
        window.location.reload()
      }
    })
  }
  return (
    <div className='border'>
        <div className=' h-20 flex justify-between'>
          <Link to={`/userpro/${_id}`}><div className=' w-24 overflow-hidden m-2'><img src={product_details?.image[0]} className='mx-auto my-auto h-16'/></div></Link>
          <Link to={`/userpro/${_id}`} className='my-auto'><div className=' w-[410px] my-auto '>
            <p className='text-violet-900 text-base text-center'>{product_details?.title.length > 50? <span>{product_details?.title.slice(0, 52)}...</span> : <span>{product_details?.title}</span>}</p>
          </div></Link>
          <Link to={`/userpro/${_id}`}><div className=' w-40'>
              <p className='mt-6 ml-2 text-gray-800 text-center'>{paymentStatus}</p>
          </div></Link>
          <Link to={`/userpro/${_id}`}><div className=' w-40 '>
            <p className='text-center mt-6'>{createdAt.slice(8, 10)}{createdAt.slice(4, 8)}{createdAt.slice(0, 4)}</p>
          </div></Link>
          <Link to={`/userpro/${_id}`}><div className=' w-32'>
              <p className='mt-6 text-center text-gray-800'>₹ {product_details?.price}</p>
            {/* <p className='mt-1 ml-2 '>Status : <span className={` text-xl ${status === "cancel"? 'text-red-600': 'text-green-600'}`}>{status}</span></p> */}
          </div></Link>
          <Link to={`/userpro/${_id}`}><div className=' w-28 '>
            <p className='mt-6 text-green-500 text-center '>{quantity} pcs</p>
            {/* <p className='mt-2 ml-4 '>price : <span className='text-gray-800'>₹ {product_details?.price}</span></p>
            <p className='mt-2 ml-4'>Total : <span className='text-red-600  text-lg'>₹ {product_details.price * quantity}</span></p> */}
          </div></Link>
          <div className='w-44  text-center'>
            
            {(status === "cancel") ? <div className='mt-6 text-red-500'>Order Cancelled</div> :(status === "delivered")? <div className='mt-6 text-green-500'>Order delivered</div> : <button onClick={cancel} className='border mt-6 w-28 py-1 text-red-600 bg-gray-100'>Cancel</button>}
            
          </div>
        </div>
        <div className=' h-3 bg-gray-100'></div>
    </div>
  )
}

export default order
