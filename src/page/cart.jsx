import React, { useEffect, useState } from 'react'
import { Cartpost } from '../component'
import { Cartcalc } from '../component';
import axios from 'axios';
import {useNavigate, Link} from 'react-router-dom';
import {useSelector} from 'react-redux'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import conf from "../component/conf/conf"

import { EmptyComp } from '../component';
import { LuShoppingCart } from "react-icons/lu";

import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';


function Cart() {
    // console.log("yes working when cahnge in cart");

    const active = useSelector(state => state.auth.status)
    
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(true);
    const [total, setTotal] = useState();

    const [post, setPost] = useState([]);
    // console.log("this is local cart post :: ", post);
    // console.log("posy", post);
    // const [loading, setLoading] = useState(true);
    // console.log("this is cart post", post);
    
    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        if (active) {
            axios.post(`${conf.apiUrl}/cart/getAllCart`, {}, {
                withCredentials: true
            }).then((post) => {
                if (post) {
                    // console.log(post.data.data);
                    setPost(post.data.data); 
                    setOpen(false);
                    console.log("this is cart posts ha : ", post.data.data);
                }
            })
        } else {
            const localCart = JSON.parse(localStorage.getItem('cart')) || [];
            console.log(localCart);
            
            setPost(localCart);
            // console.log("this is local cart : ", localCart);
            setOpen(false);

        }
        updateCart()
    },  []);

    const updateCart = async() => {
        if (active) {
            await axios.post(`${conf.apiUrl}/cart/getAllCart`, {}, {
                withCredentials: true
            }).then((post) => {
                if (post) {
                    setPost(post.data.data);
                    setTotal( post.data.data?.reduce((acc, post) => acc + post.quantity * (post.product_details? post.product_details?.price :  0), 0))
                }
            })
        } else {
            const localCart = JSON.parse(localStorage.getItem('cart')) || [];
            console.log("this is local cart", localCart);
            setTotal( localCart?.reduce((acc, post) => acc + post.quantity * (post.product_details? post.product_details?.price :  0), 0))
        }
    }

    return (
        <div className={`max-w-[1536px] mt-2 md:mt-10 sm:h-auto ${open ? 'h-screen' : ''} mx-auto`}>
            <div className="flex flex-col min-h-screen">
                <div className="flex-1">

                <div className='h-auto mx-2 md:mb-4 mb-0 '>
                    <div className='my-4 md:my-8 lg:my-12 flex justify-center items-center text-lg md:text-3xl'><LuShoppingCart className='md:w-10 w-7 md:h-10 h-7 md:me-5 me-3' />Cart</div>
                </div>

                {/* <div className='text-center block md:hidden mt-3'>My Cart</div> */}
                    {open ? (
                        <Stack spacing={2}>
                            <Skeleton variant="rounded" style={{ maxWidth: '1536px', height: 80 }} />
                            <Skeleton variant="rounded" style={{ maxWidth: '1536px', height: 80 }} />
                            <Skeleton variant="rounded" style={{ maxWidth: '1536px', height: 80 }} />
                            <Skeleton variant="rounded" style={{ maxWidth: '1536px', height: 80 }} />
                            <Skeleton variant="rounded" style={{ maxWidth: '1536px', height: 80 }} />
                            <Skeleton variant="rounded" style={{ maxWidth: '1536px', height: 80 }} />
                        </Stack>
                        // <Backdrop
                        //     className='w-full'
                        //     sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        //     open={open}
                        // >
                        //     <div className='mr-5'>Fetching Cart Details</div>
                        //     <CircularProgress color="inherit" />
                        // </Backdrop>
                    ) : (
                        post?.length > 0 ? (
                            <div className='md:shadow-xl rounded-lg border-gray-200'>
                                <div className='md:grid hidden h-full  grid-cols-12 font-light shadow-sm py-3 my-8'>
                                    <div className=' my-auto text-start md:col-span-7 xl:col-span-7 '><span className='ms-20'>Product details</span></div>
                                    <div className=' my-auto text-center col-span-2 lg:col-span-1'>price</div>
                                    <div className=' my-auto text-center col-span-1 lg:col-span-2 sm:block hidden'>quant</div>
                                    <div className=' my-auto text-center col-span-1'>total</div>
                                    <div className=' my-auto text-center '>remove</div>
                                </div>
                            {post?.filter((postItem) => postItem.product_details !== undefined && postItem.product_details !== null)
                            .map((post) => (
                                <div key={post._id} >
                                    <Cartpost {...post} updateCart={updateCart} />
                                </div>
                            ))}
                            </div>
                        ) : (
                            <EmptyComp size="w-0" line1="Your Cart is Empty" line2="You have no items in your Cart. Start Adding" />
                        )
                    )}
                </div>
                {(post.length > 0)? <div className='ms-auto md:block hidden'><Cartcalc total={total} /></div> : null}
                {(post.length > 0)? <div className='mx-auto md:hidden block sticky bottom-0 bg-white w-full '><Cartcalc total={total} /></div> : null}
            </div>
        </div>
    ); 
    
}

export default Cart
