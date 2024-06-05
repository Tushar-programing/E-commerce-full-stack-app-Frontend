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
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(true);

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
    },  []);

    return (
        <div className={`mt-10 mx-36  ${open? 'h-screen' : null}`}>
            <div className='h-12 mx-2 mb-4'>
                <div className='border h-full flex shadow-md'>
                    <div className=' w-72  my-auto mx-2 text-center'>Product Description</div>
                    <div className=' text-center w-[330px] my-auto'></div>
                    <div className=' text-center my-auto w-40 text--900 ml-14'>Unit Price</div>
                    <div className=' sm:block hidden my-auto text-center w-48 '>Units</div>
                    <div className='  w-36 my-auto text-center'>SubTotal</div>
                    <div className='  w-20 my-auto text-center '>remove</div>
                </div>
            </div>
            <div className=''>
                {open ? (
                    <Backdrop
                    className='w-full'
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                    ><div className='mr-5'>Fetching Cart Details</div>
                    <CircularProgress color="inherit" />
                  </Backdrop>
                ) : ((userData && post?.length > 0) ? (
                        post?.filter((postItem) => postItem.product_details !== undefined && postItem.product_details !== null)
                        .map((post) => (
                            <div key={post._id} className='p-2'>
                                <Cartpost {...post} />
                            </div>
                        ))
                    ) : (
                        <>
                        <EmptyComp line1="Your wishlist is Empty" line2="You have no items in your Cart. Start Adding" />
                        </>
                    )    
                )}
            </div>
            {(userData && post.length > 0)? <div className='mx-auto '><Cartcalc /></div> : null}
        </div>
       
    ); 
    
}

export default Cart
