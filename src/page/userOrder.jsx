import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { Order } from '../component';
import { Link} from 'react-router-dom';
import conf from "../component/conf/conf"


function orderPage() {
  const [order, setOrder] = useState();
  console.log(order);

  useEffect(() => {
    axios.post(`${conf.apiUrl}/order/userOrder`, {}, {
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
      <div className='mx-24 h-auto bg-white'>
        <div className='text-2xl font-semibold mt-8 bg-gray-100  h-14'>Order History</div>

        {order?.length > 0? 
        <div className=' h-8 flex justify-between'>
              <div className=' w-[550px] text-center'>Product_details</div>
              <div className=' w-40 text-center'>Payment</div>
              <div className=' w-40 text-center'>Date</div>
              <div className=' w-32 text-center'>Price</div>
              <div className=' w-28 text-center'>Quantity</div>
              <div className=' w-44 text-center'>Action</div>
        </div> : <div className='bg-gray-100'>
                      <div className='text-center text-xl text-red-600'>You have no order yet</div>
                      <div className='text-center'><Link to="/"><button className='text-white bg-green-500 px-3 py-2 my-8 '>Order now Something</button></Link></div>
                  </div>}
        <div className='h-4 bg-gray-100'></div>
        {order?.filter((postItem) => postItem.product_details !== undefined && postItem.product_details !== null)
        .map((order) => (
          <div key={order._id}>
            <Order {...order}/>
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
