import React, { useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom"
import { Link } from 'react-router-dom';

import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

function trendyPro({posts}) {
    const [post, setPost]= useState([])

    useEffect(() => {
        setPost(posts?.filter(pr => pr?.subCategory === "new"))
    }, [posts])

    console.log("this is new post",post, post?.length);
    const navigate = useNavigate()
    const [isLoaded, setIsLoaded] = useState(false);
    
return (
    <>
        {post?.length > 0 ?
            <div className={`md:my-10 my-3 grid ${post?.length >= 2 ? "sm:grid-cols-2": "grid-cols-1"}  grid-cols-1 md:gap-10 sm:gap-5 gap-3`}>

                <Link to={`/post/${post[0]?._id}`} className="relative overflow-hidden border group">
                    <img
                        src={post[0]?.image[0]}
                        className="w-full h-auto object-cover"
                        alt="Product"
                        onLoad={() => setIsLoaded(true)}
                        style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}
                    />
                    <div className='text-2xl absolute top-24 text-white text-center w-full'>{post[0]?.title}</div>
                    <div className='absolute bottom-0 left-0 text-white font-bold transform sm:translate-y-full sm:group-hover:translate-y-0 sm:pb-8 pb-4 duration-300 ease-in-out w-full text-center lg:block hidden'>
                        <button onClick={e=> navigate(`/post/${post[0]?._id}`)} className=" px-6 py-2 bg-black rounded-full text-base md:text-lg lg:text-xl">
                            Learn more
                        </button>
                    </div>
                </Link>

                {post?.length >=2 && <div className={` grid ${post?.length >= 3 ? "grid-cols-2" : "grid-cols-1"} md:gap-7 sm:gap-5 gap-3`}>
                    <Link to={`/post/${post[1]?._id}`} className="relative overflow-hidden border group">
                        <img
                            src={post[1]?.image[0]}
                            className="w-full h-auto object-cover"
                            alt="Product"
                            onLoad={() => setIsLoaded(true)}
                            style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}
                        />
                        <div className='lg:text-2xl md:text-xl text-base absolute top-0 text-white bg-black text-center w-full py-2' style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                            {post[1]?.title}
                        </div>
                        <div className='absolute bottom-0 left-0 text-white font-bold transform sm:translate-y-full sm:group-hover:translate-y-0 sm:pb-8 pb-4 duration-300 ease-in-out w-full text-center lg:block hidden'>
                            <button className="sm:px-5 px-3 sm:py-2 py-1 bg-black rounded-full sm:text-base text-base">
                                Learn more
                            </button>
                        </div>
                    </Link>

                    {post?.length >=3 && 
                        <Link to={`/post/${post[2]?._id}`} className="relative overflow-hidden border group">
                            <img
                                src={post[2]?.image[0]}
                                className="w-full h-auto object-cover"
                                alt="Product"
                                onLoad={() => setIsLoaded(true)}
                                style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}
                            />
                            <div className='lg:text-2xl md:text-xl text-base absolute top-0 text-white bg-black text-center w-full py-2' style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>{post[2]?.title}</div>
                            <div className='absolute bottom-0 left-0 text-white font-bold transform sm:translate-y-full sm:group-hover:translate-y-0 sm:pb-8 pb-4 duration-300 ease-in-out w-full text-center lg:block hidden'>
                                <button className="sm:px-5 px-3 sm:py-2 py-1 bg-black rounded-full sm:text-base text-base">
                                    Learn more
                                </button>
                            </div>
                        </Link>}

                    {post?.length >=4 && 
                        <Link to={`/post/${post[3]?._id}`} className="relative overflow-hidden border group">
                            <img
                                src={post[3]?.image[0]}
                                className="w-full h-auto object-cover"
                                alt="Product"
                                onLoad={() => setIsLoaded(true)}
                                style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}
                            />
                            <div className='lg:text-2xl md:text-xl text-base absolute top-0 text-white bg-black text-center w-full py-2' style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>{post[3]?.title}</div>
                            <div className='absolute bottom-0 left-0 text-white font-bold transform sm:translate-y-full sm:group-hover:translate-y-0 sm:pb-8 pb-4 duration-300 ease-in-out w-full text-center lg:block hidden'>
                                <button className="sm:px-5 px-3 sm:py-2 py-1 bg-black rounded-full sm:text-base text-base">
                                    Learn more
                                </button>
                            </div>
                        </Link>}
                    {post?.length >=5 && 
                        <Link to={`/post/${post[4]?._id}`} className="relative overflow-hidden border group">
                            <img
                                src={post[4]?.image[0]}
                                className="w-full h-auto object-cover"
                                alt="Product"
                                onLoad={() => setIsLoaded(true)}
                                style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}
                            />
                            <div className='lg:tex-2xl md:text-xl text-base absolute top-0 text-white bg-black text-center w-full py-2' style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>{post[4]?.title}</div>
                            <div className='absolute bottom-0 left-0 text-white font-bold transform sm:translate-y-full sm:group-hover:translate-y-0 sm:pb-8 pb-4 duration-300 ease-in-out w-full text-center lg:block hidden'>
                                <button className="sm:px-5 px-3 sm:py-2 py-1 bg-black rounded-full sm:text-base text-base">
                                    Learn more
                                </button>
                            </div>
                        </Link>}
                </div>}
            </div> : 
            <div className='grid sm:grid-cols-2 grid-cols-1  gap-8 mt-5'>
                <Skeleton variant="rounded" height={480} />
                <div className='grid grid-cols-2 gap-6'>
                    <Skeleton variant="rounded" height={204} />
                    <Skeleton variant="rounded" height={204} />
                    <Skeleton variant="rounded" height={204} />
                    <Skeleton variant="rounded" height={204} />
                </div>
            </div>
        }
    </>
  )
}

export default trendyPro
