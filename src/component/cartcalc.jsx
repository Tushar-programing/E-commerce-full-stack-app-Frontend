import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import axios from 'axios';
import conf from "./conf/conf";

import { MdShoppingCartCheckout } from "react-icons/md";

function cartcalc({total}) {
  console.log("also changing in cart update", total);
  
  const userData = useSelector((state) => state.auth.userData);

  if (!total) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className='hidden md:block w-80 md:w-80 lg:w-96 ml-auto border mr-2 mb-5 shadow-xl'>
          <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-5">Cart totals</h2>
            <div className="border-b border-gray-300 mb-5">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Subtotal</span>
                <span className="text-gray-700"> ₹ {total}</span>
              </div>
            </div>
            <div className="border-b border-gray-300 mb-5">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Total</span>
                <span className="text-gray-700"> ₹ {total}</span>
              </div>
            </div>
            <Link to="/order"><button className="bg-gray-800 w-full text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline">
              PROCEED TO CHECKOUT
            </button></Link>
          </div>
      </div>
      <div className='mb-2 md:hidden w-full bg-white border py-3 rounded-3xl shadow-[0_-4px_6px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.1)]'>
        <div className='mx-5 flex justify-between'>
          <div className=' text-xl font-semibold my-auto'><span className=' text-base'>₹ </span>{total}</div>
          <button className=' text-lg font-semibold bg-gray-900 text-white px-6 py-2 rounded-3xl flex justify-center'><MdShoppingCartCheckout className='me-2 my-auto' /> Check Out</button>
        </div>
      </div>
    </>
  )
}

export default cartcalc
