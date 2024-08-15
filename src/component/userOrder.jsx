import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import {Link } from 'react-router-dom'
import conf from "./conf/conf";


function order({adress1, adress2, city, company, country, createdAt, name, owner, paymentStatus, phone, zip, product_details, quantity, state, status, _id}) {
  const [can, setCan] = useState(status)

  const cancel = async() => {
    setCan("cancel")
    await axios.post(`${conf.apiUrl}/order/updateOrder/${_id}`, {status: "cancel"}, {
      withCredentials: true
    }).then((cancel) => {
      if (cancel) {
        console.log("thos snerkd : ", cancel);
        toast.success("Successfully canceled your order")
        setCan(cancel.data.data.status)
        // window.location.reload()
      }
    })
  }


  return (
    <div>
      <div className='md:grid hidden pt-8 pb-2 md:shadow-sm grid-cols-12 px-2'>
        <div className='col-span-1 h-24 grid place-items-center'><img src={product_details?.image[0]} className=' max-h-24'/></div>
        <div className='col-span-6 my-auto '><p className='ms-5'>{product_details?.title}</p></div>
        <div className='col-span-1 my-auto text-center '>₹ {product_details?.price * quantity}</div>
        <div className='col-span-2 text-center my-auto '>{createdAt.slice(8, 10)}{createdAt.slice(4, 8)}{createdAt.slice(0, 4)}</div>
        <div className='col-span-2 my-auto text-center'>

              {(can === "cancel") ? <div className=' text-black px-5'>Cancelled</div> :(can === "delivered")? <div className=' text-black'>Delivered</div> : <button onClick={cancel} className='py-1 px-6 bg-gray-900 text-gray-100'>Cancel</button>}

        </div>
      </div>
      <div className=' md:hidden grid grid-cols-12 py-3'>
          <div className='col-span-3 h-24  grid place-items-center'>
            <img className=' max-h-24' src={product_details?.image[0]} />
          </div>
          <div className='col-span-9 my-auto '>
            <div className='text-gray-900 mx-4 font-semibold text-sm'><span className='sm:block hidden '>{product_details?.title.slice(0, 58)}...</span><span className='sm:hidden block'>{product_details?.title.slice(0, 42)}...</span></div>
            <div className='text-gray-600 mx-4 mt-2 text-base flex justify-between items-center'>
              <span>₹ {product_details?.price * quantity}</span>
              <div className=' text-gray-900'>{(can === "cancel") ? <div className='py-[2px] px-3 text-black '>Cancelled</div> :(can === "delivered")? <div className='py-[2px] px-4 text-black'>Delivered</div> : <button onClick={cancel} className='py-[2px] px-6 bg-gray-900 text-gray-100'>Cancel</button>}</div>
            </div>
          </div>
          {/* <div className='col-span-1 h-24 grid place-items-center border'>
            <button className=' px-2 text-3xl'>
              <div className="text-lg" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
                Vertical
              </div>
            </button>
          </div> */}
        </div>
          {/* <Link to={`/userpro/${_id}`}><div className=' w-24 overflow-hidden m-2'><img src={product_details?.image[0]} className='mx-auto my-auto h-16'/></div></Link>
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
          </div></Link>
          <Link to={`/userpro/${_id}`}><div className=' w-28 '>
            <p className='mt-6 text-green-500 text-center '>{quantity} pcs</p>
          </div></Link>
          <div className='w-44  text-center'>
            
            {(can === "cancel") ? <div className='mt-6 text-red-500'>Order Cancelled</div> :(can === "delivered")? <div className='mt-6 text-green-500'>Order delivered</div> : <button onClick={cancel} className='border mt-6 w-28 py-1 text-red-600 bg-gray-100'>Cancel</button>}
            
          </div> */}
    </div>
  )
}

export default order
