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
    <div className='w-96 ml-auto border mr-2 mb-5 shadow-xl'>
        <div className="container mx-auto p-4">
          <h2 className="text-2xl font-bold mb-5">Cart totals</h2>
          <div className="border-b border-gray-300 mb-5">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Subtotal</span>
              <span className="text-gray-700"> ₹ {totalprice}</span>
            </div>
          </div>
          <div className="border-b border-gray-300 mb-5">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Total</span>
              <span className="text-gray-700"> ₹ {totalprice}</span>
            </div>
          </div>
          <Link to="/order"><button className="bg-gray-800 w-full text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline">
            PROCEED TO CHECKOUT
          </button></Link>
        </div>
    </div>
  )
}

export default cartcalc
