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
    <div className="flex-1 bg-gray-100 border">
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
  )
}

export default dashboard
