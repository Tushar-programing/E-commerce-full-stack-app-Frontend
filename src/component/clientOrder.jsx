import axios from 'axios'
import React, {useState} from 'react'
import { toast } from 'react-toastify';
import conf from "./conf/conf";

function order({adress1, adress2, city, company, country, createdAt, name, owner, paymentStatus, phone, zip, product_details, quantity, state, status, _id}) {

  const [shippingStatus, setShippingStatus] = useState(status);
  console.log(shippingStatus);

    const handleChange = (e) => {
        const selectedStatus = e.target.value;
        setShippingStatus(selectedStatus);
    };

  const cancel = async() => {
    await axios.post(`${conf.apiUrl}/order/updateOrder/${_id}`, {status: shippingStatus}, {
      withCredentials: true
    }).then((cancel) => {
      if (cancel) {
        toast.success("Successfully canceled your order")
        window.location.reload()
      }
    })
  }
  return (
    <div>
        <div className=' h-32 flex justify-between'>
          <div className='border w-44 overflow-hidden'><img src={product_details?.image[0]} className='mx-auto my-auto h-32'/></div>
          <div className='border w-64'>
            <p className='text-red-600 text-lg mt-3 ml-5'>{product_details?.title.length > 25? <span>{product_details?.title.slice(0, 25)}...</span> : <span>{product_details?.title}</span>}</p>
            <p className='text-violet-900 mt-2 ml-5'>Brand : {product_details?.brand.length > 30? <span className='text-gray-800'>{product_details?.brand.slice(0, 30)}...</span> : <span className='text-gray-800'>{product_details?.brand}</span>}</p>
            <p className='text-violet-900 mt-2 ml-5'>Desc : {product_details?.description.length > 23? <span className='text-gray-800'>{product_details?.description.slice(0, 23)}...</span> : <span className='text-gray-800'>{product_details?.description}</span>}</p>
          </div>
          <div className='border w-72'>
            <p className='ml-5 mt-1 font-semibold text-gray-600'>{name}, <span className='text-red-600'>{phone}</span></p>
            <p className='ml-5 mt-1 font-semibold text-gray-600'>{adress1},{adress2}</p>
            <p className='ml-5 mt-1 font-semibold text-gray-600'><span className='text-violet-900'>{zip} </span>,{city}</p>
            <p className='ml-5 mt-1 font-semibold text-gray-600'>{state},{country}</p>
          </div>
          <div className='border w-32 '>
            <p className='text-center my-12'>{createdAt.slice(8, 10)}{createdAt.slice(4, 8)}{createdAt.slice(0, 4)}</p>
          </div>
          <div className='border w-48'>
            <p className='mt-5 ml-2 text-violet-900'>Payment-Status : <span className='text-gray-800'>{paymentStatus}</span></p>
            <p className='mt-1 ml-2 '>Status : <span className={` text-xl ${status === "cancel"? 'text-red-600': 'text-green-600'}`}>{status}</span></p>
          </div>
          <div className='border w-44'>
            <p className='mt-3 ml-4 '>Quantity : <span className='text-violet-900'>{quantity} pcs</span></p>
            <p className='mt-2 ml-4 '>price : <span className='text-gray-800'>₹ {product_details?.price}</span></p>
            <p className='mt-2 ml-4'>Total : <span className='text-red-600  text-lg'>₹ {product_details.price * quantity}</span></p>
          </div>
          <div className='w-20 bg-gray-100'>
            <select
                  id="shippingStatus"
                  className={`mb-2 mt-7 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${status === "cancel"? 'hidden': null}`}
                  value={shippingStatus}
                  onChange={handleChange}
              >
                <option value="shipped">Shipped</option>
                <option value="out For Delivery">Out for Delivery</option>
                <option value="delivered">Delivered</option>
            </select>
            <button onClick={cancel} className={`bg-green-500 w-full text-white mt-1 rounded-md mx-1 ${status === "cancel"? 'hidden': null}`}>Update</button>
          </div>
        </div>
        <div className='flex justify-between'>
        {status === "cancel" && <div className='text-xl  text-red-500 font-semibold my-1 mx-auto'>Client canceled this order</div>}
        <div className='bg-gray-100 w-20'></div>
        </div>
        <div className=' h-3 bg-gray-100'></div>
    </div>
  )
}

export default order
