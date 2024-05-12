import React, { useEffect, useState } from 'react'
import { Cartpost } from '../component'
import { Cartcalc } from '../component';
import axios from 'axios';
import {useNavigate, Link} from 'react-router-dom';
import {useSelector} from 'react-redux'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import conf from "../component/conf/conf"

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
        <div className={`w-full max-w-7xl mx-auto px-4 ${open? 'h-screen' : null}`}>
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
                        <div className='my-10 text-xl text-center text-red-600'>You did not add anyhing in your cart</div>
                        <div className=' text-center'><Link to="/"><button className='bg-green-500 text-white px-2 py-2 rounded-sm mb-8'>Go to home page</button></Link></div>
                        </>
                    )    
                )}
            </div>
            {(userData && post.length > 0)? <Cartcalc /> : null}
        </div>
       
    ); 
    
}

export default Cart
