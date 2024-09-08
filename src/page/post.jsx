import React, { useRef, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import conf from '../component/conf/conf';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { BiSolidOffer } from "react-icons/bi";
import { TbLocation } from "react-icons/tb";
import { IoBagCheckOutline } from "react-icons/io5";
import { BiPurchaseTag } from "react-icons/bi";
import { Button } from 'antd';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Fade from '@mui/material/Fade';

import { TbFileDescription } from "react-icons/tb";
import { TbRulerMeasure } from "react-icons/tb";
import { BsInfoLg } from "react-icons/bs";
import { IoPricetagsOutline } from "react-icons/io5";

import '@splidejs/splide/dist/css/splide.min.css';
import { Splide, SplideSlide } from '@splidejs/react-splide';


function Post() {
  const divRef = useRef(null);
  const [divWidth, setDivWidth] = useState(0);
  const [brd, setBrd] = useState(0);
  const [loading, setLoading] = useState(false);


  const scrollToIndex = (index) => {
    setBrd(index);
    if (divRef.current) {
      const scrollPosition = index * divWidth;
      divRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    }
  };

  // Update width on mount and window resize
  useEffect(() => {
    const updateWidth = () => {
      if (divRef.current) {
        setDivWidth(divRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);

    // Handle scroll event to update active border
    const handleScroll = () => {
      if (divRef.current) {
        const scrollLeft = divRef.current.scrollLeft;
        const currentIndex = Math.round(scrollLeft / divWidth);
        setBrd(currentIndex);
      }
    };

    if (divRef.current) {
      divRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('resize', updateWidth);
      if (divRef.current) {
        divRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  });

  const userData = useSelector((state) => state.auth.userData);
  const { slug } = useParams();
  const active = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  // const [value, setValue] = useState(1);
  const [like, setLike] = useState(false);
  const [pin, setPin] = useState("")
  const [code, setCode] = useState()


  useEffect(() => {
    axios
      .post(`${conf.apiUrl}/wishlist/getWishlistById/${post?._id}`, {}, { withCredentials: true })
      .then((lk) => {
        if (lk) {
          setLike(lk.data.data);
        }
      });
  }, [post]);

  useEffect(() => {
    if (slug) {
      axios
        .post(`${conf.apiUrl}/product/getProduct/${slug}`, {}, { withCredentials: true })
        .then((post) => {
          if (post) setPost(post.data.data);
          else navigate('/');
        });
    } else navigate('/');
  }, [slug, navigate]);

  const handlePin = async() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
    if (pin?.length === 6) {
      await axios.get(`https://api.postalpincode.in/pincode/${pin}`).then((res) => {
        setCode(res?.data[0]?.PostOffice[0]?.District)
      })
    } else {
      toast.error("please enter valid Pincode")
    }
    
  }
  const onClick = async () => {
    if (active) {
      try {
        const cart = await axios.post(
          `${conf.apiUrl}/cart/create/${post._id}`,
          { quantity: 1 },
          { withCredentials: true }
        );
        if (cart) {
          // navigate('/cart');
          // console.log(cart?.data?.message);
          toast.success(cart?.data?.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    } else {
      toast.error('First login to add something in Cart');
    }
  };

  const wish = async () => {
    if (active) {
      setLike(!like)
      try {
        await axios
          .post(`${conf.apiUrl}/wishlist/addWishlist/${post._id}`, {}, { withCredentials: true })
          .then((wish) => {
            if (wish) {
              setLike(wish.data.data);
              toast.success(wish.data.message);
            }
          });
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    } else {
      toast.error('First login to add something in wishlist');
    }
  };


  const checkActive = () => {
    if (active) {
      navigate(`/order/${post._id}?quantity=${1}`);
    } else {
      toast.error('First Login to order something');
    }
  };
  
  const [expanded, setExpanded] = React.useState(false);

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  if (!post) {
    return (
      <div className="w-full h-[800px]">
        <Backdrop
          className="w-full h-[800px]"
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <div className="mr-5">Please wait while we fetching Product</div>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  }

  const isAuthor = userData?._id && post?.owner ? userData._id === post.owner : false;
  
  const colors = [
    { name: 'Red', code: '#ff0000' },
    { name: 'Green', code: '#00ff00' },
    { name: 'Blue', code: '#0000ff' },
    { name: 'Black', code: '#000000' },
    { name: 'White', code: '#ffffff' },
    { name: 'Yellow', code: '#ffff00' },
    { name: 'Silver', code: '#c0c0c0' },
    { name: 'Gold', code: '#ffd700' }
  ];

  const mainColor = () => {
    const color = colors.find(cl => cl.code === post?.color);
    return color ? color.name : 'Unknown'; // Return the color name or 'Unknown' if not found
  };

  console.log("this is maincolor: ", mainColor());
  

  return (
    <div>
      <div className='sm:hidden grid mt-8  grid-cols-12 fixed bottom-0 w-full p-0 m-0 z-10'>
          <button onClick={onClick} className='col-span-6 sm:col-span-12 lg:col-span-6 bg-gray-900 text-white py-3 flex justify-center'><IoBagCheckOutline className=' my- me-3 w-5 h-5' />ADD TO BAG</button>
          <button onClick={checkActive} className='col-span-6 sm:col-span-12 lg:col-span-4 border-gray-900 py-3 border-2 font-semibold flex justify-center bg-white'><BiPurchaseTag className=' my-auto me-3 w-5 h-5' />BUY NOW</button>
      </div>
      <div className='sm:ml-20 md:ml-10 xl:ml-36 2xl:ml-72 sm:mr-20 md:mr-10 xl:mr-28 2xl:mr-56'>
        <div className="bg-white grid grid-cols-12 mt-1 sm:mt-8 mb-5 ">
          <div className='col-span-12'>
              <button
                onClick={wish}
                className='sm:hidden block p-2 absolute right-5 mt-4 z-20 rounded-full '
              ><FavoriteIcon className={` ${like ? "text-black" : "text-gray-300 "} `}  /></button>
            <Splide
              options={{
                type: 'loop',
                perPage: 1,
                autoplay: false,
                interval: 2000,
                arrows: false,
                pagination: true,
              }}
              className=" mt-0 sm:hidden block "
            >
              {post?.image?.map((img, index) => (
                    <SplideSlide key={index} className="relative ">
                      <div
                      key={index}
                      className=" px-12 h-[450px] w-full flex items-center justify-center overflow-hidden"
                      // style={{ width: `${divWidth}px` }}
                    >
                      <img src={img} alt="product" className="w-full h-auto object-cover my-auto" />
                    </div>
                  </SplideSlide>
              ))}
            </Splide>
          </div>
        <div
          className="border sm:block hidden h-[620px] sm:h-[730px] md:h-[780px] col-span-12 md:col-span-6 bg-white md:sticky top-10 shadow-none sm:shadow-none md:shadow-[1px_1px_10px_rgba(0,0,0,0.1)]"
        >
            <div className=" text-end">
              <BottomNavigationAction
                onClick={wish}
                label="Favorites"
                icon={<FavoriteIcon className={` ${like ? "text-black" : "text-gray-300 "} `}  />}
              />
            </div>
            <div
              ref={divRef}
              className=" mx-14 sm:mx-20 md:mx-6 lg:mx-20 mb-8 sm:overflow-x-hidden overflow-x-auto flex snap-x snap-mandatory"
              style={{ scrollSnapType: 'x mandatory',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none', }}
            >
              <div className="flex ">
                {post?.image?.map((img, index) => (
                  <div
                    key={index}
                    className=" h-[380px] sm:h-[550px] lg:h-[550px] flex-shrink-0 flex items-center justify-center overflow-hidden snap-start"
                    style={{ width: `${divWidth}px` }}
                  >
                    <img src={img} alt="product" className="w-full h-auto object-cover" />
                  </div>
                ))}
              </div>
            </div>
            <div className="mx-10 grid grid-cols-5 sm:grid-cols-6 md:grid-cols-4 lg:grid-cols-6">
              {post?.image?.map((img, index) => (
                <button
                  key={index}
                  style={{ boxShadow: '1px 3px 10px rgba(0, 0, 0, 0.2)' }}
                  onMouseOver={() => scrollToIndex(index)}
                  className={`${
                    brd === index && 'border-2'
                  } rounded-md transition-all duration-100 ease-linear border-violet-900 pb-4 pt-2 h-[60px] lg:h-[80px] mx-1 lg:mx-2 flex items-center justify-center overflow-hidden mb-4 bg-white`}
                >
                  <img src={img} alt="product" className="w-full h-auto object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="col-span-12 md:col-span-6 px-3 sm:px-5 md:px-10">
            <div className="text-base sm:text-lg md:text-xl font-normal text-gray-400 mt-5">
              {post?.brand?.toUpperCase()}
            </div>
            <div className="text-base sm:text-lg md:text-xl font-normal text-gray-900 mt-1 sm:mt-6 ">{post?.title}</div>
            <div className="text-sm sm:tex-base md:text-lg font-normal text-green-500 mt-1 sm:mt-2">Special offer</div>
            <div className="text-lg md:text-3xl font-normal text-gray-900 mt-1 sm:mt-5 ">
              ₹ {post?.price} &nbsp;
              <span className="text-sm md:text-lg font-normal text-gray-500 mt-1 line-through">
                ₹ {post?.price + 230}
              </span>
              &nbsp;
              <span className="text-sm md:text-lg font-normal text-green-500">34% off</span>
            </div>
            <div className='mt-3 md:mt-5 font-semibold text-base md:text-lg text-gray-700'>Available offers</div>
            <div className='mt-2 md:mt-4 flex'><BiSolidOffer className='text-green-500 w-6 h-6' /><span className='ml-2 text-base md:text-lg '>Free shipping<span className='my-auto text-sm md:text-base'>&nbsp; on orders over ₹999! Shop now and save on delivery.</span></span></div>
            <div className='m-1 md:mt-3 flex'><BiSolidOffer className='text-green-500 w-6 h-6' /><span className='ml-2 text-base md:text-lg '>Free Gift<span className='my-auto text-sm md:text-base'>&nbsp;on Every Order Over ₹1200—Limited Time Only!</span></span></div>
            <div className='m-1 md:mt-3 flex'><BiSolidOffer className='text-green-500 w-6 h-6' /><span className='ml-2 text-base md:text-lg '>Special Deal<span className='my-auto text-sm md:text-base'>&nbsp;Price Drop Alert: 20% —Limited Time, 5 Days Left!</span></span></div>
            <div className='sm:grid hidden mt-8  grid-cols-12 gap-3'>
              <button onClick={onClick} className='flex col-span-12 lg:col-span-6 border bg-gray-900 text-white py-3  justify-center'><IoBagCheckOutline className=' my- me-3 w-5 h-5' />ADD TO BAG</button>
              <button onClick={checkActive} className='flex col-span-12 lg:col-span-4 border-gray-900 py-3 border-2 font-semibold  justify-center'><BiPurchaseTag className=' my-auto me-3 w-5 h-5' />BUY NOW</button>
            </div>
            <div className=' mt-8 flex '><TbLocation className='w-6 h-6 ' /><span className='my-auto ms-3'>Deliver to</span></div>
            {!code && <div className=' mt-3 flex'>
              <input type='text' placeholder='Enter Pincode' value={pin} onChange={(e) => setPin(e.target.value)} className='border-b ml-2 pr-2 py-2 outline-none w-' />
              <Button type="text" loading={loading} onClick={handlePin}
              style={{
                backgroundColor: 'white',
                color: 'black',
                border: 'none',
                boxShadow: 'none',
                padding: '8px 16px',
              }}
              >
                Fetch Data
              </Button>
            </div>}
            {code &&<div className='border py-2 w-80 mt-4 px-2'>{code} - {pin}</div>}
            {code && <div className='mt-2 '>Dispatched Securely in<span className='text-green-500'> 2-3 Business Days!</span></div>}
            <div className=' mt-7 md:mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-2'>
              <div className='mb-2 md:mb-5 grid grid-cols-9'>
                <img src='https://t4.ftcdn.net/jpg/02/27/73/93/360_F_227739395_BhszneMcufcAe9DJEBTHFFxVJM1PR8RT.jpg' className='w-12 h-10 col-span-2  mx-auto md:my-0' />
                <span className='mx-3 col-span-6 text-sm md:text-base text-gray-800'>Free delivery on orders over ₹999!</span>
              </div>
              <div className='mb-2 md:mb-5 grid grid-cols-9'>
                <img src='https://freemiumicons.com/wp-content/uploads/2023/06/cash-on-delivery-icon-1.png' className='w-10 h-10 col-span-2  mx-auto md:my-0' />
                <span className='mx-3 col-span-6 text-sm md:text-base text-gray-800'>Cash on Delivery Available!</span>
              </div>
              <div className='mb-1 md:mb-3 grid grid-cols-9'>
                <img src='https://static.thenounproject.com/png/4543714-200.png' className='w-10 h-10 col-span-2  mx-auto md:my-0' />
                <span className='mx-3 col-span-6 text-sm md:text-base text-gray-800'>Product Available Across India!</span>
              </div>
              <div className='mb-1 md:mb-3 grid grid-cols-9'>
                <img src='https://www.svgrepo.com/show/40440/secure-payment.svg' className='w-9 h-9 mt-1 col-span-2  mx-auto md:my-0' />
                <span className='mx-3 col-span-6 text-sm md:text-base text-gray-800'>Secure Payments, Every Time Guaranteed!</span>
              </div>
            </div>
            <div className='mt-6 md:mt-10'>
              <Accordion
                expanded={expanded}
                onChange={handleExpansion}
                slots={{ transition: Fade }}
                slotProps={{ transition: { timeout: 400 } }}
                sx={{
                  '& .MuiAccordion-region': { height: expanded ? 'auto' : 0 },
                  '& .MuiAccordionDetails-root': { display: expanded ? 'block' : 'none' },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography className='flex'><TbFileDescription className='my-auto me-3' />Product Description</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    {post?.description}
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2-content"
                  id="panel2-header"
                >
                  <Typography className='flex'><TbRulerMeasure className='my-auto me-3' />Measurement</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <div className=' grid grid-cols-5 mb-3'>
                      <div className='col-span-2 lg:col-span-2 '>Width/Length</div>
                      <div className='col-span-2 lg:col-span-1 '>{post?.width} cm</div>
                    </div>
                    <div className=' grid grid-cols-5 mb-3'>
                      <div className='col-span-2 lg:col-span-2 '>Height/Radius</div>
                      <div className='col-span-2 lg:col-span-1 '>{post?.height} cm</div>
                    </div>
                    <div className=' grid grid-cols-5 mb-3'>
                      <div className='col-span-2 lg:col-span-2 '>Weight</div>
                      <div className='col-span-2 lg:col-span-1 '>{post?.weight} gm</div>
                    </div>
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2-content"
                  id="panel2-header"
                >
                  <Typography className='flex'><BsInfoLg className='my-auto me-3' />More Info</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                  <div className=' grid grid-cols-5 mb-3'>
                      <div className='col-span-2 md:col-span-2 '>Model</div>
                      <div className='col-span-3 md:col-span-3 lg:col-span-2 '>{post?.model}</div>
                    </div>
                    <div className=' grid grid-cols-5 mb-3'>
                      <div className='col-span-2 md:col-span-2 '>Use</div>
                      <div className='col-span-3 md:col-span-3 lg:col-span-2 '>{post?.use}</div>
                    </div>
                    <div className=' grid grid-cols-5 mb-3'>
                      <div className='col-span-2 md:col-span-2 '>Material</div>
                      <div className='col-span-3 md:col-span-3 lg:col-span-2 '>{post?.material}</div>
                    </div>
                    <div className=' grid grid-cols-5 mb-3'>
                      <div className='col-span-2 md:col-span-2 '>Category</div>
                      <div className='col-span-3 md:col-span-3 lg:col-span-2 '>{post?.category}</div>
                    </div>
                    {post?.color && <div className=' grid grid-cols-5 mb-3'>
                      <div className='col-span-2 md:col-span-2 '>Color</div>
                      <div className='col-span-3 md:col-span-3 lg:col-span-2 '>{mainColor()}</div>
                    </div>}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
        </div>
        <div className='my-12 md:my-28 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
          <div className=' grid grid-cols-5'>
            <img src='https://cdn.iconscout.com/icon/free/png-256/free-cash-on-delivery-1851649-1569374.png?f=webp&w=256' className='w-10 md:w-14 mx-auto' />
            <div className='text-sm md:text-base col-span-3'>Hassle-Free Easy Returns on Every Order, Guaranteed!</div>
          </div>
          <div className=' grid grid-cols-5 mt-5 sm:mt-0'>
            <IoPricetagsOutline className='w-8 md:w-10 mt-1 h-10 mx-auto' />
            <div className='text-sm md:text-base col-span-3'>Unbeatable Prices on Top-Rated Products!</div>
          </div>
          <div className=' grid grid-cols-5 mt-5 md:mt-0'>
            <img src='https://logowik.com/content/uploads/images/easy-returns7112.jpg' className='w-16 md:w-20 mx-auto' />
            <div className='text-sm md:text-base col-span-3'>Hassle-Free Easy Returns on Every Order, Guaranteed!</div>
          </div>
        </div>

      </div>
      <style jsx>{`
        .splide__pagination__page.is-active {
          @apply bg-red-500;
        }
      `}</style>
    </div>
    //free shipping/cash on delivery/every 1000 + free delivery/available allover india/payment safety
    
  );
}

export default Post;
