import React, {useEffect, useState} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import conf from "../component/conf/conf"
// import '../component/signup.css';

import { GoUnverified } from "react-icons/go";
import { FaCheck } from "react-icons/fa6";
import { TbTruckDelivery } from "react-icons/tb";
import { BsBoxSeam } from "react-icons/bs";
import { FaUserCheck } from "react-icons/fa";

import LoginPopup from '../component/header/loginPopup';
import Adressfill from '../component/adressfill';
import ClipLoader from "react-spinners/ClipLoader";

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';

function Orders() {
    const active = useSelector(state => state.auth.status)

    const [post, setPost] = useState();
    // console.log(post);
    const [load, setLoad] = useState(false);
    const [adress, setAdress] = useState([]);
    // console.log("adress", adress);

    const { slug } = useParams();
    const  navigate = useNavigate();
    const [userData, setUserData] = useState()

    // console.log(adress[0]?._id);
    // console.log(selectedOption);
    
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const quantity = queryParams.get('quantity');

    const [selectedAddress, setSelectedAddress] = useState(adress[0]?._id); 
    const [selectedPayment, setSelectedPayment] = useState("cod"); 

    // const checkhandle = () => {
    //   setcheck(!check);
    // }

    const getCarts = () => {
      axios.post(`${conf.apiUrl}/cart/getAllCart`, {}, {
        withCredentials: true
      }).then((data) => {
        if (data) {
          setPost(data.data.data);
        }
      })
    }

      useEffect(() => {
        if (slug === "cart") {
          if (active) {
            getCarts()
            setTimeout(() => {
              getCarts()
            }, 1000)
          } else {
            const localCart = JSON.parse(localStorage.getItem('cart')) || [];
            setPost(localCart);
          }
          
        } else {
          axios.post(`${conf.apiUrl}/product/getProduct/${slug}`, {}, {
            withCredentials: true
          }).then((data) => {
            if (data) {
              setPost(data?.data?.data);
              // producePayble()
            }
          })
        }
      }, [active])
        
      const getAdress = (e) => {
        axios.post(`${conf.apiUrl}/adress/getAllAdress`, {}, {
          withCredentials: true
        }).then((data) => {
          if (data) {
            console.log("this is all adress: ", data.data.data);
            setAdress(data.data.data);
            setSelectedAddress(e? e : data?.data?.data[0]?._id)
          }
        })
      }

      useEffect(() => {
        getAdress()
      }, [active])

      

      const create = async() => {
        setLoad(true)
        if (adress?.length > 0 && active) {
          if (slug === "cart") {
              await axios.post(`${conf.apiUrl}/order/createCartOrder`, { adress: selectedAddress? selectedAddress : adress[0]?._id, status: "confirm", paymentStatus: "COD"}, {
              withCredentials: true
              }).then((order) => {
              console.log(order);
              setLoad(false)
              toast.success(order.data.message)
              navigate("/orderpage")
              })
          } else {
            await axios.post(`${conf.apiUrl}/order/createOrder/${slug}`, {quantity: quantity? quantity : 1, adress: selectedAddress? selectedAddress : adress[0]?._id, status: "confirm", paymentStatus: "COD"}, {
            withCredentials: true
            }).then((order) => {
              setLoad(false)
              console.log(order);
              toast.success(order.data.message)
            })
          }
        } else {
          toast.error("First add ADRESS/LOGIN then order")
          setLoad(false)
        }
      }

      // const handleChange = (e) => {
      //   const selectedAddressId = e.target.value;
      //   setSelectedOption(selectedAddressId);
      // };
      
      const fetchUserData = () => {
        axios.post(`${conf.apiUrl}/users/getCurrentUser`, {}, {
          withCredentials: true,
        }).then((userDat) => {
            const userData = userDat.data.data;
            // console.log("this is userData", userData);
            if (userData) {
              setUserData(userData)
              setIsLoginOpen(false)
            } else {
              setIsLoginOpen(true)
            }
        })
      }
      useEffect(() => {
        fetchUserData()
      }, [])


  const [isLoginOpen, setIsLoginOpen] = useState(true);
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(true);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const [payableAmount, setPayableAmount] = useState()
  console.log(selectedAddress, adress[0]?._id);
  
  const selectedAddressInfo = adress?.find((address) => address?._id === selectedAddress)

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => {
    if (active) {
      setIsDialogOpen(true);
    } else {
      toast.error("Login to access Adress");
    }
  };

  const closeDialog = (e) => {
    setIsDialogOpen(false);
    getAdress(e)
    // setSelectedAddress(e)
    // console.log("this is e : ", e);
  };

  const [isOpen, setIsOpen] = useState(false);

  // Example product data

  const toggleDetails = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (slug === "cart") {
      const totalPrice = post?.reduce((total, item) => {
        return total + item?.quantity * item?.product_details?.price;
      }, 0);
      // console.log("this is post payable", totalPrice, post);
      
      setPayableAmount(totalPrice);
    } else {
      const totalPrice = post?.price * quantity
      // console.log("this is post payable", totalPrice, post?.price, quantity);
      setPayableAmount(totalPrice)
    }
  }, [post])
    


  return (
    <div className=' border-t max-w-[1536px] mx-auto '>
      <div className='max-w-[1400px] mx-auto md:mt-8 mt-4 md:mb-4 mb-0 md:text-start text-center  lg:text-2xl md:text-xl text-lg px-6'>CHECKOUT</div>
      <div className='grid grid-cols-12 py-2 max-w-[1400px] mx-auto'>
        {/* price section */}
        <div className=' col-span-12 md:col-span-5 md:p-6 p-3'>
          <div className="bg-gray-100 p-4 rounded-lg">
            {/* Header with toggle button */}
            <div
              className="flex justify-between items-center cursor-pointer md:py-1 py-1 lg:py-2 md:pb-3 pb-2 border-b-2 lg:mb-5 md:mb-4 mb-3 "
              onClick={toggleDetails}
            >
              <p className="font-bold text-base md:text-lg ">ITEMS DETAILS</p>
              <button className="text-gray-600 ">
                {isOpen ? "▲" : "▼"}
              </button>
            </div>

            {/* Expandable Product List */}
            {isOpen && (
              <div className="pb-1 mb-3">
                {post?.length > 0 ? post?.map((product) => (
                  <div
                    key={product?._id}
                    className="flex items-center justify-between mb-3 pb-3 border-b"
                  >
                    <img
                      src={product?.product_details?.image[0]}
                      alt={product?.product_details?.title}
                      className="w-12 h-12 rounded"
                    />
                    <div className="flex-1 ml-4">
                      <p className="text-gray-800 font-medium">{product?.product_details?.title}</p>
                      <p className="text-gray-600 text-sm">Qty: {product?.quantity}</p>
                    </div>
                    <p className="text-gray-800 font-bold">₹{product?.product_details?.price}</p>
                  </div>
                )) : 
                <div
                    // key={product.id}
                    className="flex items-center justify-between mb-3 pb-3 border-b-2"
                  >
                    <img
                      src={post?.image[0]}
                      alt={post?.title}
                      className="w-16 h-16 rounded"
                    />
                    <div className="flex-1 ml-4">
                      <p className="text-gray-800 font-medium">{post?.title}</p>
                      <p className="text-gray-600 text-sm">Qty: {quantity}</p>
                    </div>
                    <p className="text-gray-800 font-bold">₹{post?.price}</p>
                  </div>
                }
              </div>
            )}

            {/* Static content */}
            <div>
              <div className="flex justify-between text-gray-600 lg:mb-3 md:mb-2 mb-1">
                <p>Price ({post?.length || 1} items):</p>
                <p>₹{payableAmount}</p>
              </div>
              <div className="flex justify-between text-gray-600 lg:mb-4 md:mb-3 mb-2">
                <p>Delivery Charges:</p>
                <p className="text-green-600">FREE</p>
              </div>
              <div className="flex justify-between font-bold text-black text-base md:text-lg">
                <p>Total Payable:</p>
                <p>₹{payableAmount}</p>
              </div>
              <p className="text-gray-500 text-sm lg:mt-4 md:mt-3 mt-2">
                Safe and Secure Payments. Easy returns. 100% Authentic products.
              </p>
            </div>
            
          </div>
        </div>
        {/* price section */}


        {/* info section */}
        <div className=' col-span-12 md:col-span-7'>
              <div className="bg-white text-black min-h-screen md:p-6 p-3">

                  {/* LOGIN SECTION */}
                  <div className="mb-8">
                    <div
                      className="bg-gray-800 text-white p-4 rounded-t-lg flex justify-between items-center cursor-pointer"
                      onClick={() => {active ? setIsLoginOpen(!isLoginOpen) : ""}}
                      
                    >
                        <div>
                          <div className='lg:text-xl md:text-lg text-base flex items-center'><span className="mr-2 text-white">1. LOGIN </span></div>
                          {/* <div>{userData?.fullName?.charAt(0).toUpperCase() + userData?.fullName?.slice(1)}</div> */}
                        </div>
                        <button className={` ${!active && "hidden" } text-gray-200 border border-gray-300 md:px-4 px-3 md:py-2 rounded hover:bg-gray-700`}>
                          {isLoginOpen ? "Close" : "Change"}
                        </button>
                    </div>

                    {(!isLoginOpen ) && <div className="bg-gray-100 p-4 rounded-b-lg space-y-4">
                            <div className="flex justify-between items-center">
                              <div className='text-start text-lg flex items-center '>
                                <FaUserCheck className='me-4 md:w-8 w-6 md:h-8 h-6 text-gray-600' />
                                <div>
                                  <div className='font-bold md:text-lg text-base'>{userData?.fullName?.charAt(0).toUpperCase() + userData?.fullName?.slice(1)}</div>
                                  <div className=' md:text-base text-sm'>{userData?.email}</div>
                                </div>
                              </div>
                            </div>
                    </div>}


                    {isLoginOpen && (
                      <div className="bg-gray-100 p-4 rounded-b-lg">
                        <LoginPopup onClose={e => {setIsLoginOpen(false), fetchUserData()}}  />
                      </div>
                    )}
                  </div>
                  {/* LOGIN SECTION */}

                  {/* DELIVERY ADDRESS SECTION */}
                  <div className="mb-6">
                    <div
                      className="bg-gray-800 text-white p-4 rounded-t-lg flex justify-between items-center cursor-pointer"
                      onClick={() => setIsDeliveryOpen(!isDeliveryOpen)}
                    >
                      <p className='lg:text-xl md:text-lg text-base '>2. DELIVERY ADDRESS</p>
                      <button className={` ${!active && "hidden" }  text-gray-200 border border-gray-300 md:px-4 px-3 md:py-2 rounded hover:bg-gray-700`}>
                        {adress?.length > 0 ? (isDeliveryOpen? "Deliver Here" : "Change") : "Select"}
                      </button>
                      {/* <span className="text-gray-200">{adress?.length > 0 ? (isDeliveryOpen? "Deliver Here" : "Change") : "Select"}</span> */}
                    </div>
                    
                    {(!isDeliveryOpen && selectedAddressInfo) && <div className="bg-gray-100 p-4 rounded-b-lg space-y-4">
                            <div className="flex items-center">
                            <TbTruckDelivery className='me-5 md:w-10 w-8 md:h-10 h-8 text-gray-600' />
                              <div className='text-start'>
                                <p className="font-bold md:text-lg text-base">{selectedAddressInfo?.name}</p>
                                <p className='md:text-base text-sm'>{selectedAddressInfo?.phone}</p>
                                <p className="text-gray-600 md:text-base text-sm">{selectedAddressInfo?.adress1} {selectedAddressInfo?.adress2} {selectedAddressInfo?.city}-{selectedAddressInfo?.zip}</p>
                              </div>
                            </div>
                    </div>}

                    {!selectedAddressInfo && <div className="bg-gray-100 md:p-4 p-2 md:px-0 px-4 md:pb-1 rounded-b-lg space-y-4 text-red-500">
                          {active ? "Please Select or add new Address!" : "LOGIN to add Address!" }
                    </div>}

                    {isDeliveryOpen && (
                      <div className="bg-gray-100 md:p-4 p-2 px-4 rounded-b-lg space-y-4">
                        {adress.map((address) => (
                          <button
                            onClick={() => setSelectedAddress(address?._id)}
                            key={address?._id}
                            className={`md:p-4 p-2 px-4 border rounded-lg w-full ${
                              selectedAddress == address?._id
                                ? "border-gray-800 bg-white shadow-lg"
                                : "border-gray-300"
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <div className='text-start'>
                                <p className="font-bold">{address?.name}</p>
                                {address?.type && (
                                  <span className="text-gray-600 text-sm">
                                    {address?.type}
                                  </span>
                                )}
                                <p>{address?.phone}</p>
                                <p className="text-gray-600 text-sm">{address?.adress1} {address?.adress2} {address?.city}-{address?.zip}</p>
                              </div>
                              {/* Mohalla=subhashpuri Garhi Pukhta (Shamli), Village=Garhi Pukhta near=Amrita Bharat Gas Agency and Ramilia Chowk, Shamli, Uttar Pradesh - 247776", */}
                                {/* <button className="bg-black text-white px-4 py-2 rounded">
                                  Deliver Here
                                </button> */}
                                <button
                                  onClick={() => setIsDeliveryOpen(false)}
                                  className="text-gray-600 hidden md:block"
                                >
                                  Select
                                </button>
                            </div>
                          </button>
                        ))}
                        <div className='flex justify-between'>
                          <button onClick={openDialog} className="border border-gray-400 text-gray-600 md:px-4 px-2 md:py-2 py-2 rounded hover:bg-gray-200">
                            + Add a new address
                          </button>
                          {adress?.length > 0 && <button onClick={e => {setIsDeliveryOpen(false), setIsPaymentOpen(true)}} className="border border-gray-400 text-gray-600 md:px-4 px-2 py-2 rounded hover:bg-gray-200 text-end">
                            Deliver Here
                          </button>}

                            <Dialog open={isDialogOpen} onClose={closeDialog}>
                              <DialogContent>
                                <DialogContentText>

                                    <Adressfill isOpen={closeDialog} />

                                </DialogContentText>
                              </DialogContent>
                              <DialogActions>
                              </DialogActions>
                            </Dialog>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* DELIVERY ADDRESS SECTION */}
                  
                  {/* payment SECTION */}
                  <div className="mb-8">
                    <div
                      className="bg-gray-800 text-white p-4 rounded-t-lg flex justify-between items-center cursor-pointer"
                      onClick={() => {setIsPaymentOpen(!isPaymentOpen)}}
                    >
                        <div>
                          <div className='lg:text-xl md:text-lg text-base flex items-center text-green-400'><span className="mr-2 text-white">3. PAYMENT OPTION</span></div>
                        </div>
                        <button className={` ${!active && "hidden" } text-gray-200 border border-gray-300 md:px-4 px-3 md:py-2 text-base rounded hover:bg-gray-700`}>
                          {isPaymentOpen ? "Close" : "Change"}
                        </button>
                    </div>

                    {(!isPaymentOpen ) && <div className="bg-gray-100 p-4 rounded-b-lg space-y-4">
                            <div className="flex justify-between items-center">
                              <div className='text-start text-base md:text-lg flex items-center my-2'>
                                <BsBoxSeam className='me-4 md:w-8 w-6 md:h-8 h-6 text-gray-600' />Cash on Delivery (COD)
                              </div>
                            </div>
                    </div>}

                    {isPaymentOpen && (
                      <div className="bg-gray-100 p-4 rounded-b-lg space-y-4">

                        <button
                          onClick={() => setSelectedPayment("cod")}
                          className={`p-4 border rounded-lg w-full ${
                            selectedPayment === "cod"
                              ? "border-gray-800 bg-white shadow-lg"
                              : "border-gray-300"
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <div className='text-start'>
                              <p className="font-bold">Cash on Delivery (COD)</p>
                              {/* <p>{address?.phone}</p> */}
                            </div>
                              <button
                                onClick={() => setIsPaymentOpen(false)}
                                className="text-gray-600"
                              >
                                Select
                              </button>
                          </div>
                        </button>
                        <div className='text-end'>
                          <button onClick={e => setIsPaymentOpen(false)} className="border border-gray-400 text-gray-600 px-4 py-2 rounded hover:bg-gray-200 text-end">
                              Confirm
                          </button>
                        </div>
                    </div>
                    )}
                  </div>
                  {/* PAYMENT SECTION */}

                  {/* payment SECTION */}
                  <div className="mb-24">
                    <button onClick={create} className='border bg-gray-800 text-white md:py-4 py-3 md:px-32 rounded-lg md:w-auto w-full ms-auto flex gap-3 justify-center'>{load && <ClipLoader size={20} color={"#fff"} />}COMPLETE ORDER (COD)</button>
                  </div>
                  {/* PAYMENT SECTION */}
              </div>
        </div>
        {/* info section */}

      </div>
    </div>
  )
}

export default Orders


{/* <div className='flex justify-evenly mx-auto max-w-7xl mt-10'>
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
          <div className=' w-2/5 mt-5 '>
              <Link to={`/post/${slug}`}>{post && (<div className='border p-2 bg-gray-100 flex justify-center'>
                  <div className='mt-1 w-28 mr-6 ml-5' ><img className='h-20 outlin mx-auto' src={post?.image[0]} alt="" /></div>
                  <div className='mr-6 w-60 mt-3 text-gray-700 font-semibold text-lg '>
                    <div className=''>{post.title.length > 20? (<span>{post.title.slice(0, 20)}...</span>): (<span>{post.title}</span>)}</div>
                    <div className='text-violet-900 font-semibold text-lg'>Brand : {post.brand}</div>
                  </div>
                  <div className='mt-7 w-1/4 text-gray-800 font-semibold text-xl ml-4'> ₹ {post.price}</div>
                </div>
              )}</Link>
              {post && (<div className=''>
                <div className='flex justify-between mx-5 my-3 text-lg text-violet-900'>
                  <div className=''>Quantity : </div>
                  <div className=''>{quantity? quantity : 1} pcs</div>
                </div>
                <div className='flex justify-between mx-5 my-5'>
                  <div className=''>Subtotal : </div>
                  <div className=''> ₹ {post.price} * {quantity? quantity: 1} = <span className='text-lg text-red-600'>{post.price * (quantity? quantity : 1)}</span></div>
                </div>
                <div className='flex justify-between mx-5 my-5'>
                  <div className=''>Shiping : </div>
                  <div className=''> ₹ {option}</div>
                </div>
                <div className='flex justify-between mx-5 text-2xl font-semibold text-gray-800 my-5'>
                  <div className=''>Total : (Includes of all taxes)</div>
                  <div className='text-red-600'><span className='text-lg font-semibold '>INR</span> ₹ {Number(option) + (Number(post.price) * Number(quantity? quantity : 1))}</div>
                </div>
              </div>
              )}
          </div>
        </div>
        <div></div> */}