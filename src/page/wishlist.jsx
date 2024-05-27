import React, {useEffect, useState} from 'react'
import { Wishlist } from '../component';
import axios from 'axios';
import conf from "../component/conf/conf"

function wishlist() {

  const [wishs, setWishs] = useState();
  // console.log(wishs);

  useEffect(() => {
      axios.post(`${conf.apiUrl}/wishlist/getWishlists`, {}, {
        withCredentials: true
      }).then((post) => {
        if (post) {
          // console.log(post.data.data);
          setWishs(post.data.data)
        }
      })
  }, [])

  return (
    <div className='bg-gray-100 h-auto border'>
      <div className="sm:mx-40 mx-4 h-auto mt-10 mb-2">
          {/* wishs?.length > 0 &&  */(<div className="sm:flex hidden justify-around bg-white border">
              <div className="text-black text-[20px] px-36 "><p>
                Product</p>
              </div>
              <div className=" text-black text-[20px] "><p>
                Added on</p>
              </div>
              <div className=" text-black text-[20px] "><p>
                Unit Price</p>
              </div>
              <div className=" text-black text-[20px] "><p>
                Quantity</p>
              </div>
              <div className=" text-black text-[20px] "><p>
                Added on</p>
              </div>
              <div className=" text-black text-[20px] "><p>
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
