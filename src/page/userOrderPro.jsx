import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import conf from "../component/conf/conf"
import Order from "../component/images/order.png";
import { Link } from 'react-router-dom'


import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

import { HiCash } from "react-icons/hi";
import { TbTruckDelivery } from "react-icons/tb";
import Skeleton from '@mui/material/Skeleton';

import { toast } from 'react-toastify';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const steps = [
  'Select master blaster campaign settings',
  'Create an ad group',
  'Create an ad',
];

function clientOrderPro() {

    const {slug} = useParams()
    const [order, setOrder] = useState()
    // console.log(order);

    // console.log(slug);

    useEffect(() => {
        axios.post(`${conf.apiUrl}/order/getOrderById/${slug}`, {}, {
            withCredentials: true,
        }).then((order) => {
            if (order) {
                setOrder(order.data.data[0]);
            }
        })
    }, [])

    const returnStatus = async(status) => {
      await axios.post(`${conf.apiUrl}/order/returnStatus/${slug}`, {status}, {
          withCredentials: true,
        }).then((order) => {
            if (order) {
              console.log("this is updated ver: ", order);
              axios.post(`${conf.apiUrl}/order/getOrderById/${slug}`, {}, {
                withCredentials: true,
              }).then((order) => {
                  if (order) {
                      setOrder(order.data.data[0]);
                  }
              })
            }
        })
    }

    const cancel = async() => {
      await axios.post(`${conf.apiUrl}/order/updateOrder/${order?._id}`, {status: "cancel"}, {
        withCredentials: true
      }).then((cancel) => {
        if (cancel) {
          console.log("thos snerkd : ", cancel);
          toast.success("Successfully canceled your order")
          axios.post(`${conf.apiUrl}/order/getOrderById/${slug}`, {}, {
            withCredentials: true,
          }).then((order) => {
              if (order) {
                  setOrder(order.data.data[0]);
              }
          })
          // window.location.reload()
        }
      })
    }

    const statuses = [ "Confirm", !(order?.status === "cancel") && "Accepted", !(order?.status === "cancel") && "Shipped", !(order?.status === "cancel") && "Out for Delivery", !(order?.status === "cancel") && "Delivered", (order?.status === "cancel") && "Cancel"].filter(Boolean);
    // console.log("length", statuses.length);


    const currentStatusIndex = order?.status === "confirm"? 0 : order?.status === "accept"? 1 : order?.status === "shipped"? 2  : order?.status === "out For Delivery"? 3 : order?.status === "cancel"? 5 : 4;

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

  return (
    <div className='bg-gray-100 py-8'>
      {order? <div className='sm:mx-16 md:mx-32 lg:mx-52 xl:mx-80 2xl:mx-[420px]  mx-0 h-auto'>
        <div className='bg-white py-7'>
          <Link to={`/post/${order?.product_details?._id}`}><div className='mt-20 mb-10 h-32 md:h-52 grid place-items-center bg-white rounded-t-xl'><img alt={order?.title} src={order?.product_details?.image[0]} className='my-auto md:max-h-52 max-h-32' /></div></Link>
          <Link to={`/post/${order?.product_details?._id}`}><div className='text-center mt-5 mb-3 text-lg'>{order?.product_details?.brand}</div></Link>
          <Link to={`/post/${order?.product_details?._id}`}><div className='text-center mb-5'>{order?.product_details?.title.slice(0, 80)}</div></Link>
          <Link to={`/post/${order?.product_details?._id}`}><div className='flex justify-evenly items-center mb-5'><span>{order?.quantity} pcs</span><span>₹{order?.product_details?.price}</span></div></Link>
          <Stepper className='mt-10' text="dark" activeStep={currentStatusIndex} alternativeLabel>
            {statuses.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div className='text-end mx-16 mt-5'>
            {!(order?.status === "delivered") ? (!(order?.status === "cancel") &&<button onClick={cancel} className='ms-auto py-1 px-4 border border-red-700 text-red-700'>Cancel order</button>):
            !(order?.returnStatus === "replace" || order?.returnStatus === "refund" || order?.returnStatus === "resolved") ?<div>
              <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                Return req
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={handleClose}>
                  <button onClick={() => {returnStatus("replace")}} className='ms-auto py-1 px-4  '>Replace</button>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <button onClick={() => {returnStatus("refund")}} className='ms-auto py-1 px-4  '>Refund</button>
                </MenuItem>
              </Menu>
            </div> : <div>{(order?.returnStatus === "refund" || order?.returnStatus === "replace") ? <p>{order?.returnStatus} request is raised we will contact you within 24 hours.</p> : <p>Your problem has {order?.returnStatus}</p> }</div>}
          </div>
        </div>
        <div className=' px-6 py-3 bg-white mt-5'>
          <p className='mt-2 text-lg'>Delivery Address</p>
          <p className='mt-2 font-medium'>{order?.name} | {order?.phone}</p>
          <p className='mt-'>{order?.company}{order?.adress1}, {order?.adress2}, {order?.city}-{order?.zip}, {order?.state},</p>
        </div>
        <div className=' px-6 py-3 bg-white mt-5'>
        <p className='mt-2 flex justify-between items-center'>
            <div className=''>Item price</div>
            <div className=' '>₹ {order?.product_details?.price * order?.quantity}</div>
          </p>
          <p className='mt-2 flex justify-between items-center'>
            <div className=' w-80'>Shipping ({order?.paymentStatus === "delivery" || order?.paymentStatus === "COD" ? "Delivery" : "Post Office"}/Courier Charges({order?.paymentStatus === "delivery" || order?.paymentStatus === "post office" ? "Online payment/Prepaid" : "COD"})) </div>
            <div className=' '>₹ {order?.paymentStatus === "delivery"? 50 : order?.paymentStatus === "Post Office"? 80 : 100}</div>
          </p>
          <p className='mt-2 flex justify-between items-center font-medium text-lg'>
            <div>Total Order Price</div>
            <div className=''>₹ {order?.product_details?.price * order?.quantity + (order?.paymentStatus === "delivery"? 50 : order?.paymentStatus === "Post Office"? 80 : 100)}</div>
          </p>
          <div className='py-2 bg-gray-100 rounded-md mt-3 px-2 font-light'>
            {order?.paymentStatus === "delivery" || order?.paymentStatus === "post office" ? <span className='flex justify-center items-center '><HiCash className='me-2' />Prepaid</span> : <span className='flex justify-center items-center '><HiCash className='me-2'/>Pay on delivery</span>}
          </div>
        </div>
      </div>: 
      <div>
        <Skeleton className='sm:mx-16 md:mx-32 lg:mx-52 xl:mx-80 2xl:mx-[420px] mx-0' variant="rounded" height={500} />
        <Skeleton className='sm:mx-16 md:mx-32 lg:mx-52 xl:mx-80 2xl:mx-[420px] mx-0 mt-5' variant="rounded" height={100} />
        <Skeleton className='sm:mx-16 md:mx-32 lg:mx-52 xl:mx-80 2xl:mx-[420px] mx-0 mt-5' variant="rounded" height={100} />
      </div>}
      {/* <div className='mx-44 bg-white'>
        <div className='border py-5 flex justify-center items-center'><img src={Order} className='w-16 me-3'/><span className=' text-2xl '>Thank you for your Order</span></div>

        <div className='border h-10 flex'>
            <div className='w-52 h-7 m-2 text-lg ml-10'>Product details</div>
            <div className='w-[470px] my-auto font-medium'></div>
            <div className='w-28 ml-16 my-auto text-center'>Price</div>
            <div className='w-32 ml-2 my-auto  text-center'>Quantity</div>
            <div className='w-40 ml-2 my-auto  text-center'>payment Status</div>
            <div className='w-44 ml-2 my-auto  text-center'>How to deliver</div>
        </div>

        <div className='border h-24 mt-1 grid grid-cols-12'>
            <Link to={`/post/${order?.product_details?._id}`}><div className=' w-32 h-20 m-2 overflow-hidden'><img src={order?.product_details?.image[0]} className='h-20'/></div></Link>
            <div className='col-span-5 ms-5 my-auto hover:text-red-600 transform sm:hover:translate-x-[-8px] duration-300 cursor-pointer'><Link to={`/post/${order?.product_details?._id}`}>{order?.product_details?.title}</Link></div>
            <div className=' my-auto text-center text-red-500 text-lg'>₹ {order?.product_details?.price}</div>
            <div className=' my-auto  text-center'>{order?.quantity}</div>
            <div className=' my-auto  text-center'>{order?.paymentStatus === "delivery" || order?.paymentStatus === "post office" ? "prepaid" : "COD"}</div>
            <div className=' my-auto  text-center'><span className='text-violet-900'>By : </span>{order?.paymentStatus === "delivery" || order?.paymentStatus === "COD" ? "Delivery" : "Post Office"}</div>
        </div>

        <div className=' h-80 flex '>
            <div className=' h-80 w-full'>
                <div className='text-lg font-semibold mt-12 mx-8'>SHIPPING ADRESS</div>
                <div className='mx-8 mt-2'>
                    <div className='mt-1'>{order?.name},</div>
                    <div className='mt-1'>{order?.phone},</div>
                    <div className='mt-1'>{order?.company}</div>
                    <div className='mt-1'>{order?.adress1}, {order?.adress2}</div>
                    <div className='mt-1'>{order?.zip}, {order?.city}</div>
                    <div className='mt-1'>{order?.state}, {order?.country}</div>
                </div>
            </div>
            <div className=' h-80 w-[700px] mr-4'>
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

      <div className='mx-44 mt-5 '>
        <div className="flex flex-col items-center">
            <div className="flex items-center justify-between w-full max-w-2xl">
              {order && statuses.map((status, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center ${index <= currentStatusIndex ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
                    {index + 1}
                  </div>
                  <p className={`mt-2 ${index <= currentStatusIndex ? 'text-green-600' : 'text-gray-600'}`}>{status}</p>
                </div>
              ))}
            </div>
            <div className="flex w-full max-w-2xl mt-4">
              {order && statuses.map((status, index) => (
                index < statuses.length - 1 && (
                  <div key={index} className="flex-1">
                    <div className={`h-1 ${index < currentStatusIndex ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  </div>
                )
              ))}
            </div>
        </div>
      </div> */}
    </div>
  )
}

export default clientOrderPro
