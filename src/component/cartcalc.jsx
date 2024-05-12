import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import axios from 'axios';
import conf from "./conf/conf";

function cartcalc() {
  const userData = useSelector((state) => state.auth.userData);

  const [loading, setLoading] = useState(true);

  const [post, setPost] = useState([]);
  console.log("cart calc", post);

    useEffect(() => {
        axios.post(`${conf.apiUrl}/cart/getAllCart`, {}, {
            withCredentials: true
        }).then((post) => {
            if (post) {
                setPost(post.data.data); 
                setLoading(false)
            }
        })
    },  []);

  const totalprice = post
  .reduce((acc, post) => acc + post.quantity * (post.product_details? post.product_details?.price :  0), 0);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <div className='flex justify-center text-gray-700'>
      <div className='text-2xl font-semibold mt-16'>Total Value of your Cart Item: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span className='text-gray-900'> ₹ {totalprice}</span></div>
    </div>
    <div className='flex justify-center  mt-4 mb-10'>
      <Link to="/order"><button className='text-2xl bg-violet-900 text-white px-40 rounded-md py-1  font-semibold mt-5'>Place Order</button></Link>
      <Link to="/"><button className='text-xl bg-yellow-500 ml-10 text-white px-5 rounded-md py-1  font-semibold mt-5'>Continue Shopping</button></Link>
    </div>
    </>
  )
}

export default cartcalc
