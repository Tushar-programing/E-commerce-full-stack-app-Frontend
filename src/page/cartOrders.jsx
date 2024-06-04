import React, {useEffect, useState} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import conf from "../component/conf/conf"
// import '../component/signup.css';

function Orders() {
  const [payment, setPayment] = useState(true);
    const [post, setPost] = useState();
    console.log("post", post);
    const [check, setcheck] = useState(false);
    const [adress, setAdress] = useState([]);
    console.log("adress", adress);
    const [option, setOption] = useState(50);
    const { slug } = useParams();
    const  navigate = useNavigate();
    const userData = useSelector(state => state.auth.userData);

    const [selectedOption, setSelectedOption] = useState();
    
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const quantity = queryParams.get('quantity');

    const checkhandle = () => {
      setcheck(!check);
    }

    useEffect(() => {
      axios.post(`${conf.apiUrl}/cart/getAllCart`, {}, {
        withCredentials: true
      }).then((data) => {
        if (data) {
          setPost(data.data.data);
        }
      })
    }, [])
        

    useEffect(() => {
      axios.post(`${conf.apiUrl}/adress/getAllAdress`, {}, {
        withCredentials: true
      }).then((data) => {
        if (data) {
          setAdress(data.data.data);
        }
      })
    }, [])

    const create = async() => {
      if (adress.length > 0) {
        await axios.post(`${conf.apiUrl}/order/createCartOrder`, { adress: selectedOption? selectedOption : adress[0]._id, status: "confirm", paymentStatus: option === 50 ? "delivery" : option === 80? "post office" : "COD"}, {
        withCredentials: true
        }).then((order) => {
        console.log(order);
        toast.success(order.data.message)
        navigate("/orderpage")
        })
      } else {
        toast.error("First add adress then order")
      }
    }


    const handleChange = (e) => {
      const selectedAddressId = e.target.value;
      setSelectedOption(selectedAddressId);
    };

    const totalprice = post?.reduce((acc, post) => acc + post?.quantity * (post.product_details? post.product_details?.price :  0), 0);

  return (
    <>
        <div className='flex justify-evenly mx-auto max-w-7xl mt-10'>
          <div className=' w-1/2 mx p-5'>
            <p className='text-lg text-violet-900 font-semibold mb-2'>Account</p>
            { userData && <p className='text-lg font-semibold'>{userData.email}</p>}
            <div className='border mb-10 mt-2'></div>
            <p className='text-lg text-violet-900 font-semibold'>Ship to</p>
            
            {(userData && adress.length > 0)? 
              (<select className='px-3 mb-10 mt-4 py-2 rounded-lg bg-white text-black outline-none
              focus:bg-gray-50 duration-200 border border-gray-200 w-full' value={selectedOption}
              onChange={handleChange}>
              {adress?.filter((ad) => userData.$id === ad.userid)
              .map((ad) => (
                  <option key={ad._id} value={ad._id} className='p-2 my-5'>
                    {ad.name},{ad.company},{ad.adress1},{ad.adress2},{ad.city},{ad.zip},{ad.state},{ad.country},{ad.phone}
                  </option>
              ))}
              </select>): <div>
                      <div className='text-center'>First add any address</div>
                      <div className='text-center'><Link to="/address"><button className='bg-green-600 text-white py-1 px-2 mt-2'>Add Adress</button></Link></div>
                  </div>}
            
            <div className='border my-5'></div>
            <p className='text-lg text-violet-900 font-semibold mb-3'>Shiping Methood</p>
            { userData && <div>
              <div className='my-5'>
              <label className='w-96'>
                Delivery/Courier Charges  (Online Payment&Prepaid)· ₹50.00
                <input
                  type="radio"
                  value="50"
                  checked={option === 50}
                  onChange={() => setOption(50)}
                  className='ml-36 border-blue-500'
                />
              </label >
              </div>
              <div className='my-5'>
              <label className='w-96'> 
                India Post (Highly Recommended for Village & Remote Area) . ₹80.00&nbsp;
                <input
                  type="radio"
                  value="80"
                  checked={option === 80}
                  onChange={() => setOption(80)}
                  className='ml-20 border '
                />
              </label>
              </div >
              <div className='my-5'>
              <label className='mr'>
              Cash on Delivery Charges (upto 500gms)&nbsp;&nbsp;&nbsp; ₹100.00&nbsp;
                <input
                  type="radio"
                  value="100"
                  checked={option === 100}
                  onChange={() => setOption(100)}
                  className='ml-52 '
                />
              </label>
              </div>
            </div>
            }
            
            <div className='border my-10'></div>
            
            <div className='my-5'>
              <label className=''>   
                <input type="checkbox" checked={check} onChange={checkhandle} id="myCheckbox" name="myCheckbox" className='mr-4 text-violet-900'/>
                <span className='text-violet-900'>Get order updates via WhatsApp and/or SMS&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              </label>
            </div>

            <div className='border my-10'></div>

            <p className='text-2xl font-semibold mb-2 text-violet-900'>Payment</p>
            <p className='text-base text-gray-500 font-semibold mb-5'>All transactions are secure and encrypted</p>
            {(option === 50 || option === 80) && (<div className='border h-24'>
              <div className='my-8 mx-2'>
                <label className='mr'>
                  <input
                    type="radio"
                    value="100"
                    checked={payment === true}
                    onChange={() => setPayment(true)}
                    className='mr-3'
                  />
                  Razorpay Secure (UPI, Cards, Wallets, NetBanking)
                </label>
              </div>
            </div>)}
            {option === 100 && (
              <div>
                <div className='border h-14 mb-1 rounded-xl font-semibold align-middle text-gray-700 text-xl pt-3 pl-3'>Cash on Delivery (C.O.D)</div>
                <p className='border h-36 p-5 rounded-xl bg-gray-1
                00'>You will receive IVR Call and Whatsapp for COD Verification, please do< br/> respond immediately.< br/>
                Usually, COD dispatch in 2-3 days and delivers in 5-10 days.< br/>
                The order may not be canceled once dispatched.</p>
              </div>
            )}
            <button onClick={create} className='w-full bg-violet-900 rounded-xl p-2 text-white font-semibold text-2xl mt-10'>Complete Orders</button>
          </div>
          <div className=' w-2/5 mt-5  '>
             {post?.map((pos) =>  (
              <div key={pos._id}>
                <div className="flex items-center border p-2">
                  <div className="w-40 h-16  rounded-md mr-4 overflow-hidden"><img src={pos?.product_details?.image[0]} className='h-16 mx-auto' /></div>
                  <div className="text-gray-700  w-full mr-8">{pos.product_details?.title}</div>
                  <div className="ml-auto  w-24 text-end">₹ {pos.product_details.price}</div>

                </div>
                <div className="mb-4  flex">
                  <div className='w-96 '></div>
                  <div className='border w-52 p-2'>
                    <div className="flex justify-between">
                      <div className="text-gray-700">Quantity:</div>
                      <div className="text-gray-700">{pos?.quantity}</div>
                    </div>
                    <div className="flex justify-between">
                      <div className="text-gray-700">Subtotal:</div>
                      <div className="text-gray-700">₹ {pos?.quantity * pos.product_details.price}</div>
                    </div>
                  </div>
                </div>
              </div>
             ))}
              <div className='border bg-gray-100'>
                <div className='flex justify-between mx-5 my-3'>
                      <div className=''>Total price of product : </div>
                      <div className=''> ₹ {totalprice}</div>
                </div>
                <div className='flex justify-between mx-5 my-2'>
                      <div className=''>Shiping : </div>
                      <div className=''> ₹ {option}</div>
                </div>
                <div className='flex justify-between mx-5 text-xl font-semibold text-gray-800 my-3'>
                      <div className=''>Total : (Includes of all taxes)</div>
                      <div className='text-red-600'><span className='text-lg font-semibold '>INR</span> ₹ {Number(option) + (Number(totalprice) * Number(quantity? quantity : 1))}</div>
                </div>
              </div>
          </div>
        </div>
        <div></div>
    </>
  )
}

export default Orders
