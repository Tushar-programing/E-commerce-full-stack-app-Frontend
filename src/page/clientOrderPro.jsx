import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import conf from "../component/conf/conf"
import Order from "../component/images/order.png";
import { Link } from 'react-router-dom'


function clientOrderPro() {

    const {slug} = useParams()
    const [order, setOrder] = useState()
    console.log(order);

    console.log(slug);

    useEffect(() => {
        axios.post(`${conf.apiUrl}/order/getOrderById/${slug}`, {}, {
            withCredentials: true,
        }).then((order) => {
            if (order) {
                setOrder(order.data.data[0]);
            }
        })
    }, [])

  return (
    <div className='bg-gray-100 pb-4'>
      <div className=' h-auto mx-44 bg-white'>
        <div className='flex mt-5'><img src={Order} className='w-16 ml-96'/><span className=' text-2xl my-auto ml-10'>Thank you for your Order</span></div>

        <div className='border h-10 mt-10 flex'>
            <div className='w-52 h-7 m-2 text-lg ml-10'>Product details</div>
            <div className='w-[470px] my-auto font-medium'></div>
            <div className='w-28 ml-16 my-auto text-center'>Price</div>
            <div className='w-32 ml-2 my-auto  text-center'>Quantity</div>
            <div className='w-40 ml-2 my-auto  text-center'>payment Status</div>
            <div className='w-44 ml-2 my-auto  text-center'>How to deliver</div>
        </div>

        <div className='border h-24 mt-1 flex'>
            <Link to={`/post/${order?.product_details?._id}`}><div className=' w-32 h-20 m-2 overflow-hidden'><img src={order?.product_details?.image[0]} className='h-20'/></div></Link>
            <div className=' w-[580px] my-auto font-medium hover:text-red-600 transform sm:hover:translate-x-[-8px] duration-300 cursor-pointer'><Link to={`/post/${order?.product_details?._id}`}>{order?.product_details?.title}</Link></div>
            <div className='w-28 ml-12 my-auto text-center text-red-500 text-lg'>₹ {order?.product_details?.price}</div>
            <div className='w-32 ml-2 my-auto  text-center'>{order?.quantity}</div>
            <div className='w-40 ml-2 my-auto  text-center'>{order?.paymentStatus === "delivery" || order?.paymentStatus === "post office" ? "prepaid" : "COD"}</div>
            <div className='w-44 ml-2 my-auto  text-center'><span className='text-violet-900'>By : </span>{order?.paymentStatus === "delivery" || order?.paymentStatus === "COD" ? "Delivery" : "Post Office"}</div>
        </div>

        <div className=' h-80 flex '>
            <div className=' h-80 w-full'>
                <div className='text-lg font-semibold mt-12 mx-8'>SHIPPING ADRESS</div>
                <div className='mx-8 mt-2'>
                    <div className='mt-1'>{order?.name},</div>
                    <div className='mt-1'>{order?.phone},</div>
                    <div className='mt-1'>{order?.company}</div>
                    <div className='mt-1'>{order?.adress1}, {order?.adress2}</div>
                    {/* <div className='mt-1'></div> */}
                    <div className='mt-1'>{order?.zip}, {order?.city}</div>
                    <div className='mt-1'>{order?.state}, {order?.country}</div>
                </div>
            </div>
            <div className=' h-80 w-[700px] mr-4'>
                {/* <div>Price : <span>{order?.product_details?.price}</span></div>
                <div>Price : <span>{order?.quantity}</span></div> */}
                <div className='flex justify-between mx-2 mt-5 text-base'>
                    <div>Sub Total (Quantity * Price) : </div>
                    <div>₹ {order?.product_details?.price * order?.quantity}</div>
                </div>
                <hr className=' mt-4 '/>
                <div className='flex justify-between mx-2 mt-5 text-base'>
                    <div className=' w-80'>Shipping ({order?.paymentStatus === "delivery" || order?.paymentStatus === "COD" ? "Delivery" : "Post Office"}/Courier Charges({order?.paymentStatus === "delivery" || order?.paymentStatus === "post office" ? "Online payment/Prepaid" : "COD"})) : </div>
                    <div className=' mt-auto'>₹ {order?.paymentStatus === "delivery"? 50 : order?.paymentStatus === "Post Office"? 80 : 100}</div>
                </div>
                <hr className=' mt-4 '/>
                <div className='flex justify-between mx-2 mt-5 text-base'>
                    <div>Tax included (IGST 0.0 %) : </div>
                    <div>₹ 0</div>
                </div>
                <hr className=' mt-4 '/>
                <div className='flex justify-between mx-2 mt-5 text-lg font-medium'>
                    <div>Total : </div>
                    <div className=''>₹ {order?.product_details?.price * order?.quantity + (order?.paymentStatus === "delivery"? 50 : order?.paymentStatus === "Post Office"? 80 : 100)}</div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default clientOrderPro
