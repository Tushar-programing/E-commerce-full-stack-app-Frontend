import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { ClientOrder } from '../component';
import conf from "../component/conf/conf"

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { EmptyComp } from '../component';

function orderPage() {
  const [order, setOrder] = useState();
  const [open, setOpen] = useState(true)
  console.log(order);

  useEffect(() => {
    axios.post(`${conf.apiUrl}/order/ownerOrder`, {}, {
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
                ><div className='mr-5'>Fetching client order Details</div>
                <CircularProgress color="inherit" />
              </Backdrop></div>
    }
  
    // console.log(wishs?.length);
    if ( order?.length <= 0 ) {
      return  <div >
                <EmptyComp classes="ml-96" size="w-0" line1="Your client order is Empty" line2="You have no client orders yet. Start Adding " />
              </div>
    }

  return (
    <div className='w-full' >
      <div className=' h-auto bg-white w-full'>
        <div className='text-2xl font-semibold mt-2 text-center mb-10'>Client Order History</div>

        {order?.length > 0? 
        <div className=' h-8 grid grid-cols-12 border mx-10 mb-5'>
              <div className='col-span-5 text-center'>Product_details</div>
              <div className='col-span-2 text-center'>Date</div>
              <div className='col-span-1 text-center'>Payment</div>
              <div className='col-span-2 text-center'>Price/Quantity</div>
              <div className='col-span-2 text-center'>Action</div>
        </div> : <div className='text-center text-xl text-red-600 bg-gray-100'>No client order available yet</div>}
        {/* <div className='h-4 bg-gray-100'></div> */}
        {order?.filter((postItem) => postItem.product_details !== undefined && postItem.product_details !== null)
        .map((order) => (
          <div key={order._id} className='border mb-4 mx-10 '>
            <ClientOrder {...order}/>
          </div>
        ))}

      </div>
    </div>
  )
}

export default orderPage
