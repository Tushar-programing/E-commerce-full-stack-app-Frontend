import axios from 'axios'
import React, {useState} from 'react'
import { toast } from 'react-toastify';
import conf from "./conf/conf";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function order({adress1, adress2, city, company, country, createdAt, name, owner, paymentStatus, phone, zip, product_details, quantity, state, status, _id, returnStatus}) {

  const [shippingStatus, setShippingStatus] = useState(status);
  const [sta, setSta] = useState(status)

  const navigate = useNavigate()
  // console.log(shippingStatus);

    const handleChange = async(e) => {
        const selectedStatus = e.target.value;
        setShippingStatus(selectedStatus);
        await axios.post(`${conf.apiUrl}/order/updateOrder/${_id}`, {status: e.target.value}, {
          withCredentials: true
        }).then((cancel) => {
          if (cancel) {
            // console.log(cancel.data.data.status);
            setShippingStatus(cancel.data.data.status)
            toast.success("Successfully updated your order")
            // window.location.reload()
          }
        })
    };

    const cancel = async() => {
      setSta("cancel")
      await axios.post(`${conf.apiUrl}/order/updateOrder/${_id}`, {status: "cancel"}, {
        withCredentials: true
      }).then((cancel) => {
        if (cancel) {
          console.log("this is cancel data", cancel.data.data.status);
          setSta(cancel.data.data.status)
          toast.success("Successfully updated your order")
          // window.location.reload()
        }
      })
    }

    const update = async() => {
      setSta("accept")
      await axios.post(`${conf.apiUrl}/order/updateOrder/${_id}`, {status: "accept"}, {  //Accept
        withCredentials: true
      }).then((cancel) => {
        if (cancel) {
          setSta(cancel.data.data.status)
          toast.success("Successfully updated your order")
          // window.location.reload()
        }
      })
    }
{/* <Link to={`/clientpro/${_id}`}></Link> */}


  return (
      <div className='grid grid-cols-12 '>

        <Link to={`/clientpro/${_id}`}><div className='col-span-1 overflow-hidden m-2 '><img src={product_details?.image[0]} className='mx-auto my-auto h-12'/></div></Link>

        <p onClick={(e) => navigate(`/clientpro/${_id}`)} className='col-span-3 text-base my-auto px-5 cursor-pointer'>{product_details?.title.length > 43? <span>{product_details?.title.slice(0, 43)}...</span> : <span>{product_details?.title}</span>}</p>

        <p onClick={(e) => navigate(`/clientpro/${_id}`)} className='col-span-2 text-center my-auto cursor-pointer'>{createdAt.slice(8, 10)}{createdAt.slice(4, 8)}{createdAt.slice(0, 4)}</p>
        
        <p onClick={(e) => navigate(`/clientpro/${_id}`)} className='col-span-1 text-center  my-auto cursor-pointer'>{paymentStatus}</p>

        <div onClick={(e) => navigate(`/clientpro/${_id}`)} className='col-span-2 grid grid-rows-2 my-auto cursor-pointer'>
            <p className='row-span-1 text-center  my-auto '>₹ {product_details?.price}</p>
            <p className='row-span-1 text-center  my-auto text-sm text-gray-600'>Quan: {quantity}</p>
        </div>

        <div className='text-center my-auto'>{returnStatus}</div>

        {/* {sta === "confirm"? <div className='col-span-2  my-auto grid grid-cols-2 gap-4'>
            <button disabled={sta === "cancel"} onClick={cancel} className={`col-span-1 ml-5 border py-[2px] bg-gray-50 text-red-500`}>Reject</button>
            <button disabled={sta === "cancel"} onClick={update} className={`col-span-1 mr-5 border py-[2px] bg-gray-50 text-green-500`}>Accept</button>
            </div> :
            <div className='col-span-2 text-center my-auto'>{sta === "cancel"? <p className=' text-red-600'>Order Cancelled</p> : 
             */}
              <select
                    id="shippingStatus"
                    className={`col-span-2 py-1 rounded-sm bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-40`}
                    value={shippingStatus}
                    onChange={handleChange}
                >
                  <option value="accept">Accept</option>
                  <option value="shipped">Shipped</option>
                  <option value="out For Delivery">Out for Delivery</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancel">Cancel</option>
              </select>
              
        {/* }</div>} */}
        {/* {sta === "confirm"? <div className='col-span-1 border grid grid-rows-2 gap-2'>
            <button disabled={sta === "cancel"} onClick={cancel} className={`row-span-1 w-20 border py-[2px] bg-gray-50 text-red-500`}>Reject</button>
            <button disabled={sta === "cancel"} onClick={update} className={`row-span-1 w-20 border py-[2px] bg-gray-50 text-green-500`}>Accept</button>
            </div> : 
            <div>{sta === "cancel"? <p className='mt-7 ml-7 text-red-600'>Order Cancelled</p> : <p className='mt-7 ml-7 text-green-500'>Order Accepted</p>}</div>} */}

        {/* <div className='col-span-1 overflow-hidden m-2 border'><img src={product_details?.image[0]} className='mx-auto my-auto h-12'/></div> */}
        {/* <div className='col-span-1 overflow-hidden m-2 border'><img src={product_details?.image[0]} className='mx-auto my-auto h-12'/></div> */}
        {/* <div className='col-span-1 overflow-hidden m-2 border'><img src={product_details?.image[0]} className='mx-auto my-auto h-12'/></div> */}
        {/* <div className='col-span-1 overflow-hidden m-2 border'><img src={product_details?.image[0]} className='mx-auto my-auto h-12'/></div> */}
        {/* <div className='col-span-1 overflow-hidden m-2 border'><img src={product_details?.image[0]} className='mx-auto my-auto h-12'/></div> */}
        {/* <div className='col-span-1 overflow-hidden m-2 border'><img src={product_details?.image[0]} className='mx-auto my-auto h-12'/></div> */}
        {/* <div className='col-span-1 overflow-hidden m-2 border'><img src={product_details?.image[0]} className='mx-auto my-auto h-12'/></div> */}
        {/* <div className='col-span-1 overflow-hidden m-2 border'><img src={product_details?.image[0]} className='mx-auto my-auto h-12'/></div>
        <div className='col-span-1 overflow-hidden m-2 border'><img src={product_details?.image[0]} className='mx-auto my-auto h-12'/></div>
        <div className='col-span-1 overflow-hidden m-2 border'><img src={product_details?.image[0]} className='mx-auto my-auto h-12'/></div> */}
        

          {/* <div className=' w-24 overflow-hidden m-2'><img src={product_details?.image[0]} className='mx-auto my-auto h-16'/></div>
          <div className=' w-[346px] my-auto '>
            <p className='text-violet-900 text-base text-center'>{product_details?.title.length > 43? <span>{product_details?.title.slice(0, 43)}...</span> : <span>{product_details?.title}</span>}</p>
          </div> */}
          {/* <div className=' w-40'>
              <p className='mt-6 ml-2 text-gray-800 text-center'>{paymentStatus}</p>
          </div>
          <div className=' w-40 '>
            <p className='text-center mt-6'>{createdAt.slice(8, 10)}{createdAt.slice(4, 8)}{createdAt.slice(0, 4)}</p>
          </div> */}
          {/* <div className=' w-32'>
              <p className='mt-6 text-center text-gray-800'>₹ {product_details?.price}</p>
          </div>
          <div className=' w-28 '>
            <p className='mt-6 text-green-500 text-center '>{quantity} pcs</p>
          </div> */}
          {/* <div className='w-44 '>
            <select
                  id="shippingStatus"
                  className={`mb-2 mt-7 py-1 ml-8 rounded-sm bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-24`}
                  value={shippingStatus}
                  onChange={handleChange}
                  disabled={(status === "confirm" || status === "cancel")}
              >
                <option value="accept" className='text-sm' disabled={true}>- Status -</option>
                <option value="shipped">Shipped</option>
                <option value="out For Delivery">Out for Delivery</option>
                <option value="delivered">Delivered</option>
            </select>
          </div>
          <div className=' w-56'>
          {sta === "confirm"? <><button disabled={sta === "cancel"} onClick={cancel} className={`w-20 mt-7 ml-2 border py-[2px] bg-gray-50 text-red-500`}>Reject</button>
            <button disabled={sta === "cancel"} onClick={update} className={`w-20 mt-7 ml-6 border py-[2px] bg-gray-50 text-green-500`}>Accept</button>
            </> : <div>{sta === "cancel"? <p className='mt-7 ml-7 text-red-600'>Order Cancelled</p> : <p className='mt-7 ml-7 text-green-500'>Order Accepted</p>}</div>}
          </div> */}
    </div>
  )
}

export default order