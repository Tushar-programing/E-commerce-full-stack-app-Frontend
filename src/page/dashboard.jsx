import React from 'react'
import { Chart } from '../component'
import { Logoutbtn } from '../component';

// import Checkbox from '@mui/material/Checkbox';
import { Checkbox } from 'antd';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


function dashboard() {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const userData = useSelector(state => state.auth.userData) 

  
  return (
    <div className="h-[679px] flex mt-[8px]">
        <div className="w-80 bg-black text-white py-4 px-6 rounded-l-none rounded-lg shadow-xl">
          <Link to={"/dashboard"}><div className="flex ml-2 mb-8 ">
            <img src="https://res.cloudinary.com/dpzh4qlkg/image/upload/v1719208625/rscsqelo3ygtzjpdipzb.jpg" alt="Avatar" className="w-12 h-12 rounded-full" />
            <p className="text-lg font-semibold ml-2  my-auto">{userData?.fullName.toUpperCase() || "Your Name"}</p>
          </div></Link>
          <a href="/dashboard" className="flex py-2 px-2 text-white hover:bg-gray-700 mt-4  "><img src="https://res.cloudinary.com/dpzh4qlkg/image/upload/v1719208300/manzdpcjdpnxhx0kulnc.png" alt="dashboard png" className='w-8 h-8  rounded-full bg-white p-1' /><span className=' my-auto ml-2'>Dashboard</span></a>
          <a href="/clientOrder" className="flex py-2 px-2 text-white hover:bg-gray-700 mt-4  "><img src='https://res.cloudinary.com/dpzh4qlkg/image/upload/v1719208185/xpsjian3zycx0lvl8hbt.webp' className='w-8 h-8 rounded-full bg-white p-1' /><span className=' my-auto ml-2 p-1'>Client Orders</span></a>
          <a href="/list" className="flex py-2 px-2 text-white hover:bg-gray-700 mt-4  "><img src='https://res.cloudinary.com/dpzh4qlkg/image/upload/v1719208504/zqkb1bpfw4jlttkg2q9e.png'   className='w-8 h-8 rounded-full bg-white p-1' /><span className=' my-auto ml-2'>List Products</span></a>
          <a href="#" className="flex py-2 px-2 text-white hover:bg-gray-700 mt-4  "><img src='https://res.cloudinary.com/dpzh4qlkg/image/upload/v1719208545/lbdt6twlyzcbvrd8h6ko.png' className='w-8 h-8 rounded-full bg-white p-1' /><span className=' my-auto ml-2'>Your Products</span></a>
          <a href="#" className="flex py-2 px-2 text-white hover:bg-gray-700 mt-24 "><img src='https://res.cloudinary.com/dpzh4qlkg/image/upload/v1719208581/qv876qc9yq8pyernd01d.png' className='w-8 h-8 rounded-full bg-white p-1 ' /><span className=' py-[6px] ml-2  w-full'><Logoutbtn /></span></a>
        </div>
        <div className="flex-1 bg-gray-100">
          <div className="grid grid-cols-1 gap-4">
            <div className="px-8 text-xl text-black mt-1">
             Dashboard
            </div>
            <div className=" flex flex-1 mx-6 ">
                  <div className="bg-white w-80 px-4 py-5  text-center  rounded-xl text-black shadow-xl">
                      <h1 className="text-xl mb-4 text-center">Product Categories</h1>
                              
                              <div className='flex mt-3'><Checkbox checked={true} /><a href="#" className="ml-4 hover:text-gray-900 transition duration-300 ease-in-out">All</a></div> 
                              <div className='flex mt-3'><Checkbox checked={true} /><a href="#" className="ml-4 hover:text-gray-900 transition duration-300 ease-in-out">Accessories</a></div>
                              <div className='flex mt-3'><Checkbox checked={true} /><a href="#" className="ml-4 hover:text-gray-900 transition duration-300 ease-in-out">Kids Clothing</a></div>
                              <div className='flex mt-3'><Checkbox checked={true} /><a href="#" className="ml-4 hover:text-gray-900 transition duration-300 ease-in-out">Mens Clothing</a></div>
                              <div className='flex mt-3'><Checkbox checked={true} /><a href="#" className="ml-4 hover:text-gray-900 transition duration-300 ease-in-out">Shoes</a></div>
                              <div className='flex mt-3'><Checkbox checked={true} /><a href="#" className="ml-4 hover:text-gray-900 transition duration-300 ease-in-out">Women Clothing</a></div>
                              <div className='flex mt-3'><Checkbox checked={true} /><a href="#" className="ml-4 hover:text-gray-900 transition duration-300 ease-in-out">All</a></div>
                              <div className='flex mt-3'><Checkbox checked={true} /><a href="#" className="ml-4 hover:text-gray-900 transition duration-300 ease-in-out">Accessories</a></div>
                              <div className='flex mt-3'><Checkbox checked={true} /><a href="#" className="ml-4 hover:text-gray-900 transition duration-300 ease-in-out">Kids Clothing</a></div>
                              <div className='flex mt-3'><Checkbox checked={true} /><a href="#" className="ml-4 hover:text-gray-900 transition duration-300 ease-in-out">Mens Clothing</a></div>
                              <div className='flex mt-3'><Checkbox checked={true} /><a href="#" className="ml-4 hover:text-gray-900 transition duration-300 ease-in-out">Shoes</a></div>
                              <div className='flex mt-3'><Checkbox checked={true} /><a href="#" className="ml-4 hover:text-gray-900 transition duration-300 ease-in-out">Women Clothing</a></div>
                              <div className='flex mt-3'><Checkbox checked={true} /><a href="#" className="ml-4 hover:text-gray-900 transition duration-300 ease-in-out">Women Clothing</a></div>
                              <div className='flex mt-3'><Checkbox checked={true} /><a href="#" className="ml-4 hover:text-gray-900 transition duration-300 ease-in-out">Women Clothing</a></div>
                              <div className='flex mt-3'><Checkbox checked={true} /><a href="#" className="ml-4 hover:text-gray-900 transition duration-300 ease-in-out">Women Clothing</a></div>
                  </div>
                  <div className=' w-full '>
                    <div className=' rounded-2xl h-[255px] ml-6 px-4 bg-white shadow-xl'>
                      <div className=' text-center text-xl my-2 pr-40 pt-3 '>Top selling Product</div>
                      <div className=' flex h-48 mt-5 ml-5'>
                          <div className=' flex-1'>
                            <div className='mb-3 text-base'>45 % &nbsp;&nbsp;&nbsp;&nbsp;arduino</div>
                            <div className='mb-3 text-base'>45 % &nbsp;&nbsp;&nbsp;&nbsp;arduino</div>
                            <div className='mb-3 text-base'>45 % &nbsp;&nbsp;&nbsp;&nbsp;arduino</div>
                            <div className='mb-3 text-base'>45 % &nbsp;&nbsp;&nbsp;&nbsp;arduino</div>
                            <div className='mb-3 text-base'>45 % &nbsp;&nbsp;&nbsp;&nbsp;arduino</div>
                          </div>
                          <div className=' flex-1'>
                            <div className='mb-3 text-base'>45 % &nbsp;&nbsp;&nbsp;&nbsp;arduino</div>
                            <div className='mb-3 text-base'>45 % &nbsp;&nbsp;&nbsp;&nbsp;arduino</div>
                            <div className='mb-3 text-base'>45 % &nbsp;&nbsp;&nbsp;&nbsp;arduino</div>
                            <div className='mb-3 text-base'>45 % &nbsp;&nbsp;&nbsp;&nbsp;arduino</div>
                            <div className='mb-3 text-base'>45 % &nbsp;&nbsp;&nbsp;&nbsp;arduino</div>
                          </div>
                          <div className=' flex-1'>
                            <div className='mb-3 text-base'>45 % &nbsp;&nbsp;&nbsp;&nbsp;arduino</div>
                            <div className='mb-3 text-base'>45 % &nbsp;&nbsp;&nbsp;&nbsp;arduino</div>
                            <div className='mb-3 text-base'>45 % &nbsp;&nbsp;&nbsp;&nbsp;arduino</div>
                            <div className='mb-3 text-base'>45 % &nbsp;&nbsp;&nbsp;&nbsp;arduino</div>
                            <div className='mb-3 text-base'>45 % &nbsp;&nbsp;&nbsp;&nbsp;arduino</div>
                          </div>
                      </div>
                    </div>
                    <div className='flex '>
                      <div className='bg-white border rounded-xl ml-6 h-[300px] mt-6 w-[590px] shadow-xl'>
                        <div className=' mt-3'>
                          <Chart  />
                        </div>
                      </div>
                      <div className=' bg-white h-[200px] mt-16 w-[316px] ml-7 rounded-xl shadow-xl'>
                          <p className=' text-center mt-7 text-base'>Total Orders</p>
                          <p className=' text-center      text-xl font-semibold'>1240 unit</p>
                          <div className=' h-28 mt-7 flex justify-around'>
                            <div className=' w-32 h-24'>
                              <div className='text-center'>Accepted Order</div>
                              <div className='text-center'>45 unit</div>
                            </div>
                            <div className=' w-32 h-24'>
                              <div className='text-center'>Canceled Order</div>
                              <div className='text-center'>45 unit</div>
                            </div>
                          </div>
                      </div>
                    </div>
                  </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default dashboard
