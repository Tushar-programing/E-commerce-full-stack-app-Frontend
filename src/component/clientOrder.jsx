import axios from 'axios'
import React, {useState} from 'react'
import { toast } from 'react-toastify';
import conf from "./conf/conf";

function order({adress1, adress2, city, company, country, createdAt, name, owner, paymentStatus, phone, zip, product_details, quantity, state, status, _id}) {

  const [shippingStatus, setShippingStatus] = useState(status);
  console.log(shippingStatus);

    const handleChange = async(e) => {
        const selectedStatus = e.target.value;
        setShippingStatus(selectedStatus);
        await axios.post(`${conf.apiUrl}/order/updateOrder/${_id}`, {status: e.target.value}, {
          withCredentials: true
        }).then((cancel) => {
          if (cancel) {
            toast.success("Successfully updated your order")
            // window.location.reload()
          }
        })
    };

    const cancel = async() => {
      await axios.post(`${conf.apiUrl}/order/updateOrder/${_id}`, {status: "cancel"}, {
        withCredentials: true
      }).then((cancel) => {
        if (cancel) {
          toast.success("Successfully updated your order")
          window.location.reload()
        }
      })
    }

    const update = async() => {
      await axios.post(`${conf.apiUrl}/order/updateOrder/${_id}`, {status: "accept"}, {  //Accept
        withCredentials: true
      }).then((cancel) => {
        if (cancel) {
          toast.success("Successfully updated your order")
          window.location.reload()
        }
      })
    }



  return (
    <div>
        <div className=' h-20 flex justify-between'>
          <div className=' w-24 overflow-hidden m-2'><img src={product_details?.image[0]} className='mx-auto my-auto h-16'/></div>
          <div className=' w-[346px] my-auto '>
            <p className='text-violet-900 text-base text-center'>{product_details?.title.length > 43? <span>{product_details?.title.slice(0, 43)}...</span> : <span>{product_details?.title}</span>}</p>
          </div>
          <div className=' w-40'>
              <p className='mt-6 ml-2 text-gray-800 text-center'>{paymentStatus}</p>
          </div>
          <div className=' w-40 '>
            <p className='text-center mt-6'>{createdAt.slice(8, 10)}{createdAt.slice(4, 8)}{createdAt.slice(0, 4)}</p>
          </div>
          <div className=' w-32'>
              <p className='mt-6 text-center text-gray-800'>₹ {product_details?.price}</p>
            {/* <p className='mt-1 ml-2 '>Status : <span className={` text-xl ${status === "cancel"? 'text-red-600': 'text-green-600'}`}>{status}</span></p> */}
          </div>
          <div className=' w-28 '>
            <p className='mt-6 text-green-500 text-center '>{quantity} pcs</p>
            {/* <p className='mt-2 ml-4 '>price : <span className='text-gray-800'>₹ {product_details?.price}</span></p>
            <p className='mt-2 ml-4'>Total : <span className='text-red-600  text-lg'>₹ {product_details.price * quantity}</span></p> */}
          </div>
          <div className='w-44 '>
            <select
                  id="shippingStatus"
                  className={`mb-2 mt-7 py-1 ml-8 rounded-sm bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-24 ${status === "cancel"? 'hidden': null}`}
                  value={shippingStatus}
                  onChange={handleChange}
              >
                <option value="shipped">Shipped</option>
                <option value="out For Delivery">Out for Delivery</option>
                <option value="delivered">Delivered</option>
            </select>
            {status === "cancel" && <div className='text-base text-red-500 font-semibold mt-7 ml-6 mx-auto'>Order Cancelled</div>}
          </div>
          <div className=' w-56 '>
            <button disabled={status === "cancel"} onClick={cancel} className={`w-20 mt-7 ml-2 border py-[2px] bg-gray-50 text-red-500`}>Reject</button>
            <button disabled={status === "cancel"} onClick={update} className={`w-20 mt-7 ml-6 border py-[2px] bg-gray-50 text-green-500`}>Accept</button>
          </div>
        </div>
        <div className=' h-3 bg-gray-100'></div>
    </div>
  )
}

export default order