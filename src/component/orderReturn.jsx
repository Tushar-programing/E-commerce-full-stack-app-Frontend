import React, { useState } from 'react'
import Link from 'antd/es/typography/Link'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import conf from './conf/conf'

function orderReturn({_id, product_details, createdAt,paymentStatus, quantity, returnStatus}) {
    const [returnSta, setReturnSta] = useState(returnStatus)
    const navigate = useNavigate()

    const handleResolve = async() => {
        setReturnSta("resolved")
        await axios.post(`${conf.apiUrl}/order/returnStatus/${_id}`, {status: "resolved"}, {
          withCredentials: true,
        }).then((order) => {
            console.log("thsi is order return: ", order.data.data);
            setReturnSta(order?.data.data)
        })
    }
  return (
    <div className='grid grid-cols-12 py-4 shadow-sm'>

        <Link to={`/clientpro/${_id}`}><div className='col-span-1 overflow-hidden m-2 '><img src={product_details?.image[0]} className='mx-auto my-auto h-12'/></div></Link>

        <p onClick={(e) => navigate(`/clientpro/${_id}`)} className='col-span-4 text-base my-auto px-5 cursor-pointer'>{product_details?.title.length > 43? <span>{product_details?.title.slice(0, 43)}...</span> : <span>{product_details?.title}</span>}</p>

        <p onClick={(e) => navigate(`/clientpro/${_id}`)} className='col-span-2 text-center my-auto cursor-pointer'>{createdAt.slice(8, 10)}{createdAt.slice(4, 8)}{createdAt.slice(0, 4)}</p>
        
        <p onClick={(e) => navigate(`/clientpro/${_id}`)} className='col-span-1 text-center  my-auto cursor-pointer'>{paymentStatus}</p>

        <div onClick={(e) => navigate(`/clientpro/${_id}`)} className='col-span-2 grid grid-rows-2 my-auto cursor-pointer'>
            <p className='row-span-1 text-center  my-auto '>₹ {product_details?.price}</p>
            <p className='row-span-1 text-center  my-auto text-sm text-gray-600'>Quan: {quantity}</p>
        </div>
        <div className='my-auto'>
            {returnSta}
        </div>
        <div className='my-auto'>
            <button onClick={handleResolve} className={`bg-gray-900 text-white py-1 px-4 ${returnSta === "resolved" && "hidden"}`}>Resolved</button>
        </div>

        {/* {sta === "confirm"? <div className='col-span-2  my-auto grid grid-cols-2 gap-4'>
            <button disabled={sta === "cancel"} onClick={cancel} className={`col-span-1 ml-5 border py-[2px] bg-gray-50 text-red-500`}>Reject</button>
            <button disabled={sta === "cancel"} onClick={update} className={`col-span-1 mr-5 border py-[2px] bg-gray-50 text-green-500`}>Accept</button>
            </div> :
            <div className='col-span-2 text-center my-auto'>{sta === "cancel"? <p className=' text-red-600'>Order Cancelled</p> : 
            
              <select
                    id="shippingStatus"
                    className={`col-span-2 py-1 rounded-sm bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-40`}
                    value={shippingStatus}
                    onChange={handleChange}
                >
                  <option value="accept" className='text-sm' disabled={true}>- Status -</option>
                  <option value="shipped">Shipped</option>
                  <option value="out For Delivery">Out for Delivery</option>
                  <option value="delivered">Delivered</option>
              </select>

            }</div>} */}
    </div>
  )
}

export default orderReturn
