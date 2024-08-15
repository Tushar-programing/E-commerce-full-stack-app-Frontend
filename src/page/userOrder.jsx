import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { Order } from '../component';
import { Link} from 'react-router-dom';
import conf from "../component/conf/conf"

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { EmptyComp } from '../component';
import { LuBox } from "react-icons/lu";


function orderPage() {
  const [order, setOrder] = useState();

  const [open, setOpen] = useState(true)
  console.log(order);

  useEffect(() => {
    axios.post(`${conf.apiUrl}/order/userOrder`, {}, {
      withCredentials: true
    }).then((order) => {
      if (order) {
        setOrder(order.data.data)
        setOpen(false)
        // toast.success(order.data.message)
      }
    })
  }, [])

  if ( open ) {
    return <div className='w-full h-[800px]'><Backdrop
              className='w-full h-[800px]'
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={open}
              ><div className='mr-5'>Fetching your Order Details</div>
              <CircularProgress color="inherit" />
            </Backdrop></div>
  }

  // console.log(wishs?.length);
  if ( order?.length <= 0 ) {
    return  <div >
              <EmptyComp size="w-36" title="Your Orders" line1="Your Order is Empty" line2="You have no orders in your orderPage. Start Adding " />
            </div>
  }

  return (
    <div className='md:py-8 py-2 2xl:mx-52 xl:mx-40 lg:mx-24 md:mx-10 mx-0'>
      <div className='text-xl md:text-3xl md:mt-7 mt-4 flex justify-center items-center md:mb-10 mb-5'><LuBox className='md:me-3 me-2 md:w-10 w-6 md:h-10 h-6' />Order History</div>

      <div className='mb-10 md:shadow-2xl '>
        {order?.length > 0? 
          <div className='md:grid hidden 2xl:pt-6 lg:pt-4 lg:pb-2 pb-0 shadow-sm grid-cols-12 px-2'>
            <div className='col-span-1 h-24 text-center'></div>
            <div className='col-span-6 my-auto '>product_details</div>
            <div className='col-span-1 my-auto text-center '>Price</div>
            <div className='col-span-2 text-center my-auto '>Date</div>
            <div className='col-span-2 my-auto text-center'>Status</div>
          </div> : <div className='bg-gray-100'>
                      <div className='text-center text-xl text-red-600'>You have no order yet</div>
                      <div className='text-center'><Link to="/"><button className='text-white bg-green-500 px-3 py-2 my-8 '>Order now Something</button></Link></div>
                  </div>}
        {order?.filter((postItem) => postItem.product_details !== undefined && postItem.product_details !== null)
        .map((order) => (
          <div key={order._id}>
            <Order {...order}/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default orderPage
