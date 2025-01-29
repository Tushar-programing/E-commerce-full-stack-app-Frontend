import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { ClientOrder } from '../component';
import conf from "../component/conf/conf"

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { EmptyComp } from '../component';

function orderPage() {
  const [order, setOrder] = useState([]);
  const [filteredOrder, setFilteredOrder] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [open, setOpen] = useState(true);

  useEffect(() => {
    axios
      .post(`${conf.apiUrl}/order/ownerOrder`, {}, { withCredentials: true })
      .then((response) => {
        if (response) {
          setOrder(response.data.data);
          setFilteredOrder(response.data.data); // Set both orders and filtered orders initially
          setOpen(false);
        }
      });
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter orders by order._id
    const filtered = order.filter((item) =>
      item._id.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredOrder(filtered);
  };

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
              <div className='col-span-4 text-center'>Product_details</div>
              <div className='col-span-2 text-center'>Date</div>
              <div className='col-span-1 text-center'>Payment</div>
              <div className='col-span-2 text-center'>Price/Quantity</div>
              <div className='col-span-1 text-center'>Replacement</div>
              <div className='col-span-2 text-center'>Action</div>
        </div> : <div className='text-center text-xl text-red-600 bg-gray-100'>No client order available yet</div>}
        {/* <div className='h-4 bg-gray-100'></div> */}
        
        <input
          type="text"
          placeholder="Search by order ID"
          value={searchQuery}
          onChange={handleSearchChange}
          className="border p-2 mb-5 mx-10 w-1/3"
        />

        {filteredOrder
          .filter(
            (postItem) =>
              postItem.product_details !== undefined &&
              postItem.product_details !== null
          )
          .map((order) => (
            <div key={order._id} className="border mb-4 mx-10">
              <ClientOrder {...order} />
            </div>
          ))}

      </div>
    </div>
  )
}

export default orderPage
