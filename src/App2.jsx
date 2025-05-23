
import {Outlet} from 'react-router-dom'
import React from 'react'

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Logoutbtn } from './component';


function outlet() {

  const userData = useSelector(state => state.auth.userData) 

  
  return (
    <div className=" flex mt-[8px]">
        <div className="w-80 h-[778px] bg-black text-white py-4 px-6 rounded-l-none rounded-lg shadow-xl sticky top-0">
          <Link to={"/admin"}><div className="flex ml-2 mb-8 ">
            <img src="https://res.cloudinary.com/dpzh4qlkg/image/upload/v1719208625/rscsqelo3ygtzjpdipzb.jpg" alt="Avatar" className="w-12 h-12 rounded-full" />
            <p className="text-lg font-semibold ml-2  my-auto">{userData?.fullName.toUpperCase() || "Your Name"}</p>
          </div></Link>
          <Link to={"/admin"} className="flex py-2 px-2 text-white hover:bg-gray-700 mt-4  "><img src="https://res.cloudinary.com/dpzh4qlkg/image/upload/v1719208300/manzdpcjdpnxhx0kulnc.png" alt="dashboard png" className='w-8 h-8  rounded-full bg-white p-1' /><span className=' my-auto ml-2'>Dashboard</span></Link>
          <Link to={"/admin/clientorder"} className="flex py-2 px-2 text-white hover:bg-gray-700 mt-2  "><img src='https://res.cloudinary.com/dpzh4qlkg/image/upload/v1719208185/xpsjian3zycx0lvl8hbt.webp' className='w-8 h-8 rounded-full bg-white p-1' /><span className=' my-auto ml-2 p-1'>Client Orders</span></Link>

          <Link to={"/admin/clientCart"} className="flex py-2 px-2 text-white hover:bg-gray-700 mt-6  "><img src='https://res.cloudinary.com/dpzh4qlkg/image/upload/v1719208185/xpsjian3zycx0lvl8hbt.webp' className='w-8 h-8 rounded-full bg-white p-1' /><span className=' my-auto ml-2 p-1'>CLIENT CART</span></Link>
          <Link to={"/admin/clientUser"} className="flex py-2 px-2 text-white hover:bg-gray-700 mt-2  "><img src='https://res.cloudinary.com/dpzh4qlkg/image/upload/v1719208185/xpsjian3zycx0lvl8hbt.webp' className='w-8 h-8 rounded-full bg-white p-1' /><span className=' my-auto ml-2 p-1'>CLIENT USER</span></Link>
          <Link to={"/admin/clientBuyNow"} className="flex py-2 px-2 text-white hover:bg-gray-700 mt-2  "><img src='https://res.cloudinary.com/dpzh4qlkg/image/upload/v1719208185/xpsjian3zycx0lvl8hbt.webp' className='w-8 h-8 rounded-full bg-white p-1' /><span className=' my-auto ml-2 p-1'>CLIENT BUY NOW</span></Link>

          <Link to={"/admin/orderReturn"} className="flex py-2 px-2 text-white hover:bg-gray-700 mt-6  "><img src='https://static.thenounproject.com/png/952397-200.png' className='w-8 h-8 rounded-full bg-white p-1' /><span className=' my-auto ml-2 p-1'>Order return</span></Link>
          <Link to={"/admin/customerCancel"} className="flex py-2 px-2 text-white hover:bg-gray-700 mt-2  "><img src='https://static.thenounproject.com/png/952397-200.png' className='w-8 h-8 rounded-full bg-white p-1' /><span className=' my-auto ml-2 p-1'>Order Cancel</span></Link>
          
          <Link to={"/admin/list"} className="flex py-2 px-2 text-white hover:bg-gray-700 mt-6  "><img src='https://res.cloudinary.com/dpzh4qlkg/image/upload/v1719208504/zqkb1bpfw4jlttkg2q9e.png'   className='w-8 h-8 rounded-full bg-white p-1' /><span className=' my-auto ml-2'>List Products</span></Link>
          <Link to={"/admin/yourpro"} className="flex py-2 px-2 text-white hover:bg-gray-700 mt-2  "><img src='https://res.cloudinary.com/dpzh4qlkg/image/upload/v1719208545/lbdt6twlyzcbvrd8h6ko.png' className='w-8 h-8 rounded-full bg-white p-1' /><span className=' my-auto ml-2'>Your Products</span></Link>
          <a href="#" className="flex py-2 px-2 text-white hover:bg-gray-700 mt-24 "><img src='https://res.cloudinary.com/dpzh4qlkg/image/upload/v1719208581/qv876qc9yq8pyernd01d.png' className='w-8 h-8 rounded-full bg-white p-1 ' /><span className=' py-[6px] ml-2  w-full'><Logoutbtn /></span></a>
        </div>
        <Outlet />
    </div>
  )
}

export default outlet