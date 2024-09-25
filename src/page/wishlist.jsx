import React, {useEffect, useState} from 'react'
import { Wishlist } from '../component';
import axios from 'axios';
import conf from "../component/conf/conf"

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router-dom';

import { EmptyComp } from '../component';
import { IoHeartOutline } from "react-icons/io5";

function wishlist() {

  const [wishs, setWishs] = useState();
  const [open, setOpen] = useState(true)
  console.log(wishs);

  useEffect(() => {
      axios.post(`${conf.apiUrl}/wishlist/getWishlists`, {}, {
        withCredentials: true
      }).then((post) => {
        if (post) {
          // console.log(post.data.data);
          setWishs(post.data.data)
          setOpen(false)
        }
      })
  }, [])


  if ( open ) {
    return <div className='w-full h-[800px]'><Backdrop
              className='w-full h-[800px]'
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={open}
              ><div className='mr-5'>Fetching Wishlist Details</div>
              <CircularProgress color="inherit" />
            </Backdrop></div>
  }

  // console.log(wishs?.length);
  if ( wishs?.length <= 0 ) {
    return  <div >
              <EmptyComp size="w-0" line1="Your Wishlist is Empty" line2="You have no items in your Wishlist. Start Adding " />
            </div>
  }

  return (
    <div className='bg-white h-auto py-10 mt-1'>
      <div className='flex justify-center text-2xl md:text-3xl mb-3 md:mb-8 items-center'><IoHeartOutline className=' w-10 h-10 me-5' />Wishlist</div>
        <div className="max-w-[1536px] mx-auto h-auto mb-2 bg-white rounded-2xl py-5 p-2 shadow-none md:shadow-xl">
            <div className=' md:grid hidden h-full  grid-cols-12 font-light py-1'>
                <div className=' my-auto md:col-span-7 xl:col-span-7  text-center'>product_details</div>
                <div className=' my-auto col-span-2  text-center'>price</div>
                <div className=' sm:block hidden my-auto text-center col-span-2 '>
                  Add
                </div>
                <div className=' my-auto text-center'>Remove</div>
            </div>
            {wishs?.length < 1 && (<div className='my-10 text-xl font-semibold text-center text-red-600'>You did not add anything in your wishlist yet</div>)}
            {wishs?.filter((postItem) => postItem.product_details !== undefined && postItem.product_details !== null)
            .map((wish) => (
              // console.log(wish._id);
                <div key={wish._id} className=''>
                  <Wishlist {...wish} />
                </div>
            ))}
        </div>
    </div>
  )
}

export default wishlist;
