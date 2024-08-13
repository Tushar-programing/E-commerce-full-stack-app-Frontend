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

function Cart() {
    // console.log("yes working when cahnge in cart");
    
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(true);
    const [total, setTotal] = useState();

    const [post, setPost] = useState([]);
    // console.log("posy", post);
    // const [loading, setLoading] = useState(true);
    // console.log("this is cart post", post);
    
    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        axios.post(`${conf.apiUrl}/cart/getAllCart`, {}, {
            withCredentials: true
        }).then((post) => {
            if (post) {
                // console.log(post.data.data);
                setPost(post.data.data); 
                setOpen(false);
            }
        })
        updateCart()
    },  []);

    const updateCart = async() => {
        await axios.post(`${conf.apiUrl}/cart/getAllCart`, {}, {
            withCredentials: true
        }).then((post) => {
            if (post) {
                setPost(post.data.data);
                // console.log("changing", post);
                setTotal( post.data.data?.reduce((acc, post) => acc + post.quantity * (post.product_details? post.product_details?.price :  0), 0))
            }
        })
    }

    // <div className={min-h-[776px] mt-2 md:mt-10 2xl:mx-36 xl:mx-28 lg:mx-20 md:mx-12 sm:mx-4 mx-0 sm:h-auto ${open? 'h-screen' : null}}>
    //         <div className='h-12 mx-2 mb-4 md:block hidden'>
    //             <div className='border h-full flex shadow-md'>
    //                 <div className=' w-72  my-auto mx-2 text-center'>Product Description</div>
    //                 <div className=' text-center w-[330px] my-auto'></div>
    //                 <div className=' text-center my-auto w-40 text--900 ml-14'>Unit Price</div>
    //                 <div className=' sm:block hidden my-auto text-center w-48 '>Units</div>
    //                 <div className='  w-36 my-auto text-center'>SubTotal</div>
    //                 <div className='  w-20 my-auto text-center '>remove</div>
    //             </div>
    //         </div>
    //         <div className='text-center block md:hidden mt-3 mb-1'>My Cart</div>
    //         <div className=''>
    //             {open ? (
    //                 <Backdrop
    //                 className='w-full'
    //                 sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    //                 open={open}
    //                 ><div className='mr-5'>Fetching Cart Details</div>
    //                 <CircularProgress color="inherit" />
    //               </Backdrop>
    //             ) : ((post?.length > 0) ? (
    //                     post?.filter((postItem) => postItem.product_details !== undefined && postItem.product_details !== null)
    //                     .map((post) => (
    //                         <div key={post._id} className='p-3 '>
    //                             <Cartpost {...post} updateCart={updateCart}  />
    //                         </div>
    //                     ))
    //                 ) : (
    //                     <>
    //                     <EmptyComp size="w-0" line1="Your Cart is Empty" line2="You have no items in your Cart. Start Adding" />
    //                     </>
    //                 )
    //             )}
    //         </div>
    //         {(post.length > 0)? <div className='mx-auto md:block hidden'><Cartcalc total={total} /></div> : null}
    //         {(post.length > 0)? <div className='mx-auto md:hidden block sticky bottom-0 border bg-white'><Cartcalc total={total} /></div> : null}
    //     </div>                    inthis this line code                                                                                {(post.length > 0)? <div className='mx-auto md:hidden block sticky bottom-0 border bg-white'><Cartcalc total={total} /></div> : null} 
    

    return (
        <div className={`min-h-[776px] mt-2 md:mt-10 2xl:mx-36 xl:mx-28 lg:mx-20 md:mx-12 sm:mx-4 mx-0 sm:h-auto ${open ? 'h-screen' : ''}`}>
            <div className="flex flex-col min-h-screen">
                <div className="flex-1">

                <div className='h-12 mx-2 mb-4 md:block hidden'>
                    <div className='border h-full flex shadow-md'>
                        <div className=' w-72  my-auto mx-2 text-center'>Product Description</div>
                        <div className=' text-center w-[330px] my-auto'></div>
                        <div className=' text-center my-auto w-40 text--900 ml-14'>Unit Price</div>
                        <div className=' sm:block hidden my-auto text-center w-48 '>Units</div>
                        <div className='  w-36 my-auto text-center'>SubTotal</div>
                        <div className='  w-20 my-auto text-center '>remove</div>
                    </div>
                </div>

                <div className='text-center block md:hidden mt-3 '>My Cart</div>
                    {open ? (
                        <Backdrop
                            className='w-full'
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={open}
                        >
                            <div className='mr-5'>Fetching Cart Details</div>
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    ) : (
                        post?.length > 0 ? (
                            post?.filter((postItem) => postItem.product_details !== undefined && postItem.product_details !== null)
                            .map((post) => (
                                <div key={post._id} className='p-3'>
                                    <Cartpost {...post} updateCart={updateCart} />
                                </div>
                            ))
                        ) : (
                            <EmptyComp size="w-0" line1="Your Cart is Empty" line2="You have no items in your Cart. Start Adding" />
                        )
                    )}
                </div>
                {(post.length > 0)? <div className='mx-auto md:block hidden'><Cartcalc total={total} /></div> : null}
                {(post.length > 0)? <div className='mx-auto md:hidden block sticky bottom-0 bg-white w-full '><Cartcalc total={total} /></div> : null}
            </div>
        </div>

       
    ); 
    
}

export default Cart
