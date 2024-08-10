import React from 'react'
import { Link } from 'react-router-dom'


function footer() {
  return (
    <div className=' bg-white w-auto '>
      <div className=' md:w-1/4 sm:w-1/2 w-full  float-left text-center '>
        <a><h1 className='mt-6 sm:mt-16 text-lg font-semibold text-violet-900'>About us</h1></a>
        <div className='mt-2 sm:mt-8'><h1>falcon eye.in best online store to buy STEM Kits, Electronics, Robotics, Aeromodelling Drone Parts, IoT, Prototyping and Arts & Crafts Materials at low price.</h1></div>
      </div>
      <div className=' md:w-1/4 sm:w-1/2 w-full float-left text-start ps-6 sm:ms-0 sm:text-center'>
        <a><h1 className='mt-4 sm:mt-6 text-lg font-semibold text-violet-900'>Became Seller</h1></a>
        <a><h1 className='mt-1 sm:mt-4 text-lg font-semibold text-gray-600 hover:underline cursor-pointer'><Link to="/list">List Product</Link></h1></a>
        <a><h1 className='mt-1 sm:mt-4 text-lg font-semibold text-gray-600 hover:underline cursor-pointer'><Link to="/clientorder">Client Orders</Link></h1></a>
        <a><h1 className='mt-1 sm:mt-4 text-lg font-semibold text-gray-600 hover:underline cursor-pointer'>Sales Dashboard</h1></a>

      </div>
      <div className=' md:w-1/4 sm:w-1/2 w-full float-left text-start ps-6 sm:ms-0 sm:text-center'>
        <a><h1 className='mt-4 sm:mt-6 text-lg font-semibold text-violet-900'>My Account</h1></a>
        <a><h1 className='mt-1 sm:mt-4 text-lg font-semibold text-gray-600'>My Account</h1></a>
        <a><h1 className='mt-1 sm:mt-4 text-lg font-semibold text-gray-600'>Order History</h1></a>
        <a><h1 className='mt-1 sm:mt-4 text-lg font-semibold text-gray-600'>Wish List</h1></a>
        <a><h1 className='mt-1 sm:mt-4 text-lg font-semibold text-gray-600'>Newsletter</h1></a>
        <a><h1 className='mt-1 sm:mt-4 text-lg font-semibold text-gray-600'>Privacy Policy</h1></a>
        <Link to="/list"><h1 className='mt-1 sm:mt-4 text-lg font-semibold text-gray-700'>List-item</h1></Link>

      </div>
      <div className=' md:w-1/4 sm:w-1/2 w-full float-left text-start ps-6 sm:ms-0 sm:text-center'>
        <a><h1 className='mt-4 sm:mt-6 text-lg font-semibold text-violet-900'>Connect With Us</h1></a>
        <a href='https://www.linkedin.com/in/tushar-saini-60bb242a3/'><h1 className='mt-1 sm:mt-4 text-lg font-semibold text-gray-600'>Linked in</h1></a>
        <a href='https://www.instagram.com/tusharsaini4678/'><h1 className='mt-1 sm:mt-4 text-lg font-semibold text-gray-600'>Instagram</h1></a>
        <a href='https://whatsapp.com/dl/code=1WjxHdWwtW'><h1 className='mt-1 sm:mt-4 text-lg font-semibold text-gray-600'>Whatsapp</h1></a>
      </div>

    </div>
  )
}

export default footer
