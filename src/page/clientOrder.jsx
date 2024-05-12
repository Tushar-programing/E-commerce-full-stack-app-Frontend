import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { ClientOrder } from '../component';
import conf from "../component/conf/conf"

function orderPage() {
  const [order, setOrder] = useState();
  console.log(order);

  useEffect(() => {
    axios.post(`${conf.apiUrl}/order/ownerOrder`, {}, {
      withCredentials: true
    }).then((order) => {
      if (order) {
        setOrder(order.data.data)
        // toast.success(order.data.message)
      }
    })
  }, [])

  return (
    <div className='bg-gray-100'>
      <div className=''></div>
      <div className='ml-40 mr-32 h-auto bg-white'>
        <div className='text-2xl font-semibold mt-8 bg-gray-100  h-14'>Client Order History</div>

        {order?.length > 0? <div className=' h-8 flex justify-between'>
              <div className='border w-44 text-center'>Image</div>
              <div className='border w-64 text-center'>Product_details</div>
              <div className='border w-72 text-center'>Address</div>
              <div className='border w-32 text-center'>Order Date</div>
              <div className='border w-48 text-center'>Status</div>
              <div className='border w-44 text-center'>Price</div>
              <div className=' w-20 bg-gray-100'></div>
        </div> : <div className='text-center text-xl text-red-600 bg-gray-100'>No client order available yet</div>}
        <div className='h-4 bg-gray-100'></div>
        {order?.filter((postItem) => postItem.product_details !== undefined && postItem.product_details !== null)
        .map((order) => (
          <div key={order._id}>
            <ClientOrder {...order}/>
          </div>
        ))}
        {/* <div className='border h-32 flex justify-between'>
          <div className='border w-44'></div>
          <div className='border w-72'></div>
          <div className='border w-72'></div>
          <div className='border w-40'></div>
          <div className='border w-44'></div>
          <div className='border w-40'></div>
        </div> */}

      </div>
    </div>
  )
}

export default orderPage
