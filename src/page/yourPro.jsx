import {React, useEffect, useState, useCallback} from 'react'
import axios from "axios"

import conf from "../component/conf/conf"
import {useNavigate} from "react-router-dom"
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom'

import { EmptyComp } from '../component';


function yourPro() {
  const navigate = useNavigate()
    const [product, setProduct] = useState()

    const remove = useCallback(async(id) => {
      const rem = await axios.post(`${conf.apiUrl}/product/deleteProduct/${id}`, {}, {
        withCredentials: true
      })
      if (rem) {
        toast.success(rem.data.message)
        axios.post(`${conf.apiUrl}/product/getYourProduct`, {}, {
          withCredentials: true,
        }).then((data) => {
            console.log(data.data.data);
            setProduct(data.data.data)
        }) 
      }
    })

    useEffect(() => {
      const create = () => {
        axios.post(`${conf.apiUrl}/product/getYourProduct`, {}, {
            withCredentials: true,
        }).then((data) => {
            console.log(data.data.data);
            setProduct(data.data.data)
        }) 
      }
      create()
    }, [])

    if ( product?.length <= 0 ) {
      return  <div >
                <EmptyComp classes="ml-96" size="" line1="You did not list any product" line2="You have not List any products yet. Start Adding " />
              </div>
    }

  return (
    <div className='w-full '>
      <div className='mt-5 text-center  text-lg mb-5'>Your Products</div>
      <div className='border grid grid-cols-12 mx-10 py-1'>
          <div className='cursor-pointer col-span-1 my-auto text-center overflow-hidden '></div>
          <div className='cursor-pointer col-span-4 my-auto text-center'>title</div>
          <div className='cursor-pointer col-span-2 my-auto text-center'>brand</div>
          <div className=' col-span-1 my-auto text-center'>price</div>
          <div className=' col-span-2 my-auto text-center'>createdAt</div>
          <div className=' col-span-2 my-auto text-center'>Edit/Remove</div>
      </div>
      <div className=' mx-10 mt-7'>
        {product?.map((pro) => (
            <div key={pro?._id} className='border h-16 grid grid-cols-12 mb-5'>
                <div onClick={(e) => navigate(`../../post/${pro?._id}`)} className='cursor-pointer col-span-1 my-auto text-center overflow-hidden '><img src={pro?.image[0]} className='h-12 my-auto mx-auto'/></div>
                <div onClick={(e) => navigate(`../../post/${pro?._id}`)} className='cursor-pointer col-span-4 my-auto text-center'>{pro?.title.slice(0, 36)}</div>
                <div onClick={(e) => navigate(`../../post/${pro?._id}`)} className='cursor-pointer col-span-2 my-auto text-center'>{pro?.brand}</div>
                <div className=' col-span-1 my-auto text-center'>{pro?.price}</div>
                <div className=' col-span-2 my-auto text-center'>{pro?.createdAt.slice(0, 10)}</div>
                <div className=' col-span-2 my-auto text-center flex '>
                    <div><button onClick={() => navigate(`/dashboard/list/edit/${pro?._id}`)} className='w-20 text-white bg-green-500 py-[1px] mt-[7px] ml-12'>Edit</button></div>
                    <button onClick={() => remove(pro?._id)} className='w-10 text-3xl ml-5 text-black'>×</button>
                </div>

            </div>
        ))}
      </div>
    </div>
  )
}

export default yourPro
