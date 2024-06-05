import React, {useEffect, useState} from 'react'
import { Wishlist } from '../component';
import axios from 'axios';
import conf from "../component/conf/conf"

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { EmptyComp } from '../component';


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
    <div className='bg-gray-100 h-auto border'>
      <div className="sm:mx-24 mx-4 h-auto mt-10 mb-2">
          {/* wishs?.length > 0 &&  */(<div className="sm:flex hidden  bg-white border">
              <div className="text-black w-[700px] py-2 text-center"><p>
                Product</p>
              </div>
              <div className=" text-black w-36 py-2 text-center"><p>
                Added on</p>
              </div>
              <div className=" text-black w-32 py-2 text-center"><p>
                Unit Price</p>
              </div>
              <div className=" text-black w-40 py-2 text-center"><p>
                Quantity</p>
              </div>
              <div className=" text-black w-40 py-2 text-center"><p>
                Added on</p>
              </div>
              <div className=" text-black w-24 py-2 text-center"><p>
                Remove</p>
              </div>
          </div>)
          }
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
