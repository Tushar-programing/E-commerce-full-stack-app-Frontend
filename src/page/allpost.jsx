import React, {useState, useEffect} from 'react'
import { Postcard } from '../component'
import { Postcard1 } from '../component'
import { Link } from 'react-router-dom'
import axios from "axios"
import img1 from "../component/images/kitchen--slider-5.1 (1).jpg";
import img2 from "../component/images/kitchen--slider-5.2 (1).jpg";
import img3 from "../component/images/kitchen--slider-5.3 (1).jpg";

import "../component/signup.css"

import conf from "../component/conf/conf"
import { LoginPopup } from '../component'
import {useSelector} from 'react-redux'

import shipping from '../component/images/shipping.webp'
import carts from '../component/images/carts.png'
import support from '../component/images/support.png'
import secure from '../component/images/secure.png'

import '@splidejs/splide/dist/css/splide.min.css';
import { Splide, SplideSlide } from '@splidejs/react-splide';

import mob1 from "../component/images/splideM1.jpg"
import mob2 from "../component/images/splideM2.jpg"
import mob3 from "../component/images/splideM3.jpg"

import Postcard2 from '../component/postcard2'
import TrendyPro from '../component/trendyPro'

import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

import { FaFacebook } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { MdWhatsapp } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";

import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import LogoAnimation from '../component/header/logoAnimation'


function allpost() {
    const [posts, setPosts] = useState([]);
    console.log("im checking about post : ", posts);
    

    const active = useSelector(state => state.auth.status)

    useEffect(() => {
      try {
        axios.post(`${conf.apiUrl}/product/products`, {}, {
          withCredentials: true,
      }).then((post) => {
        setPosts(post.data.data)
        console.log("this is post ; this", post.data.data);
      })
      } catch (error) {
        console.log(error);
      }
  }, [])
    
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [isLoaded1, setIsLoaded1] = useState(false);
  const [isLoaded2, setIsLoaded2] = useState(false);
  const [isLoaded3, setIsLoaded3] = useState(false);

  const [isLoadedMob1, setIsLoadedMob1] = useState(false);
  const [isLoadedMob2, setIsLoadedMob2] = useState(false);
  const [isLoadedMob3, setIsLoadedMob3] = useState(false);


  return (
    <div className='bg-white pb-20 max-w-[1536px] mx-auto'>
      {/* <LoginPopup open={active}/> */}

      <LoginPopup />

      <Splide
        options={{
          type: 'loop',
          perPage: 1,
          autoplay: true,
          interval: 4000,
        }}
        className=" mt-0 sm:block hidden mx-auto"
      >
        <SplideSlide className="relative ">
              <div className="relative w-full h-full">
                {!isLoaded1 && (
                  <div className="w-full h-full bg-gray-300 animate-pulse absolute top-0 left-0 flex items-center justify-center">
                    <LogoAnimation/>
                  </div>
                )}
                <img
                  src={img1}
                  className={`w-full h-full transition-opacity duration-500 ${isLoaded1 ? "opacity-100" : "opacity-0"}`}
                  onLoad={() => setIsLoaded1(true)}
                  alt="Banner"
                />
                {isLoaded1 && (
                  <div className="absolute top-[35%] left-[16%] text-white sm:text-xl md:text-2xl lg:text-4xl text-left">
                    <div>Tag line here</div>
                    <button className="md:text-base text-sm lg:px-5 md:px-4 sm:px-3 lg:py-3 md:py-2 sm:py-1 bg-black text-white rounded-full sm:mt-3 md:mt-6 lg:mt-8">
                      Buy now
                    </button>
                  </div>
                )}
              </div>
        </SplideSlide>

        <SplideSlide className="relative ">
              <div className="relative w-full h-full">
                {!isLoaded2 && (
                  <div className="w-full h-full bg-gray-300 animate-pulse absolute top-0 left-0 flex items-center justify-center">
                    <LogoAnimation/>
                  </div>
                )}
                <img
                  src={img2}
                  className={`w-full h-full transition-opacity duration-500 ${isLoaded2 ? "opacity-100" : "opacity-0"}`}
                  onLoad={() => setIsLoaded2(true)}
                  alt="Banner"
                />
                {isLoaded2 && (
                  <div className="absolute top-[35%] left-[16%] text-white sm:text-xl md:text-2xl lg:text-4xl text-left">
                    <div>Tag line here</div>
                    <button className="md:text-base text-sm lg:px-5 md:px-4 sm:px-3 lg:py-3 md:py-2 sm:py-1 bg-black text-white rounded-full sm:mt-3 md:mt-6 lg:mt-8">
                      Buy now
                    </button>
                  </div>
                )}
              </div>
        </SplideSlide>

        <SplideSlide className="relative ">
              <div className="relative w-full h-full">
                {!isLoaded3 && (
                  <div className="w-full h-full bg-gray-300 animate-pulse absolute top-0 left-0 flex items-center justify-center">
                    <LogoAnimation/>
                  </div>
                )}
                <img
                  src={img3}
                  className={`w-full h-full transition-opacity duration-500 ${isLoaded3 ? "opacity-100" : "opacity-0"}`}
                  onLoad={() => setIsLoaded3(true)}
                  alt="Banner"
                />
                {isLoaded3 && (
                  <div className="absolute top-[35%] left-[16%] text-white sm:text-xl md:text-2xl lg:text-4xl text-left">
                    <div>Tag line here</div>
                    <button className="md:text-base text-sm lg:px-5 md:px-4 sm:px-3 lg:py-3 md:py-2 sm:py-1 bg-black text-white rounded-full sm:mt-3 md:mt-6 lg:mt-8">
                      Buy now
                    </button>
                  </div>
                )}
              </div>
        </SplideSlide>
      </Splide>


      <Splide
        options={{
          type: 'loop',
          perPage: 1,
          autoplay: true,
          interval: 2000,
          arrows: false,
        }}
        className="sm:mt-8 mt-0 sm:hidden block"
      >
        <SplideSlide className="relative ">
          <div className="relative w-full h-full">
            {!isLoadedMob1 && (
                  <div className="w-full h-full bg-gray-300 animate-pulse absolute top-0 left-0 flex items-center justify-center">
                    <LogoAnimation/>
                  </div>
            )}
            <img 
              src={mob1} 
              className={`w-full h-full transition-opacity duration-500 ${isLoadedMob1 ? "opacity-100" : "opacity-0"}`}
              onLoad={() => setIsLoadedMob1(true)}
            />
            {isLoadedMob1 && <div className='absolute top-[35%] left-[34%] text-white text-2xl text-center'>
              <div>Tag line here</div>
              <button className=" text-base px-4 py-1 bg-black text-white rounded-full mt-3">
                Buy now
              </button>
            </div>}
          </div>
        </SplideSlide>
        <SplideSlide className="relative ">
          <div className="relative w-full h-full">
            {!isLoadedMob2 && (
                  <div className="w-full h-full bg-gray-300 animate-pulse absolute top-0 left-0 flex items-center justify-center">
                    <LogoAnimation/>
                  </div>
            )}
            <img 
              src={mob2} 
              className={`w-full h-full transition-opacity duration-500 ${isLoadedMob2 ? "opacity-100" : "opacity-0"}`}
              onLoad={() => setIsLoadedMob2(true)}
            />
            {isLoadedMob2 && <div className='absolute top-[35%] left-[34%] text-white text-2xl text-center'>
              <div>Tag line here</div>
              <button className=" text-base px-4 py-1 bg-black text-white rounded-full mt-3">
                Buy now
              </button>
            </div>}
          </div>
        </SplideSlide>
        <SplideSlide className="relative ">
          <div className="relative w-full h-full">
            {!isLoadedMob3 && (
                  <div className="w-full h-full bg-gray-300 animate-pulse absolute top-0 left-0 flex items-center justify-center">
                    <LogoAnimation/>
                  </div>
            )}
            <img 
              src={mob3} 
              className={`w-full h-full transition-opacity duration-500 ${isLoadedMob3 ? "opacity-100" : "opacity-0"}`}
              onLoad={() => setIsLoadedMob3(true)}
            />
            {isLoadedMob3 && <div className='absolute top-[35%] left-[34%] text-white text-2xl text-center'>
              <div>Tag line here</div>
              <button className=" text-base px-4 py-1 bg-black text-white rounded-full mt-3">
                Buy now
              </button>
            </div>}
          </div>
        </SplideSlide>
      </Splide>

      {/* <img 
        className='lg:w-64 md:w-52 sm:w-44 sm:block hidden ms-auto sticky top-96 cursor-pointer z-30' 
        onClick={() => window.open("https://api.whatsapp.com/send?phone=917451811626", "_blank")} 
        src={whatsapp} 
        alt="WhatsApp"
      />

      <img 
        className='w-14 sm:hidden block ms-auto sticky top-40 cursor-pointer z-30' 
        onClick={() => window.open("https://api.whatsapp.com/send?phone=917451811626", "_blank")} 
        src={whatsappmob}
        alt="WhatsApp"
      /> */}

      {/* <a href="https://wa.me/12345678900" target="_blank">Chat with us on WhatsApp</a> */}
      

      <div className='text-center mt-6 md:mt-16 text-lg md:text-2xl'>Our Collections</div>

      <Splide
      className="md:mt-7 mt-2 md:hidden"
      options={{
        // gap        : 30,
        // perPage    : 3,
        // focus      : 'center',
        // pagination : true,
        // breakpoints: {
        //   600: {
        //     perPage: 3,
        //   },
        // },
        // breakpoints: {
        //   600: {
        //     fixedWidth : 250,
        //     fixedHeight: 250,
        //   },
        // },

        fixedWidth : 120,
        fixedHeight: 150,
        gap        : 10,
        arrows: false,
        pagination : false,
      }}
      aria-label="Beautiful Images"
      >
        <SplideSlide>
          <Link to={"/result?cat=ceiling"}>
            <img src="https://images-cdn.ubuy.co.in/634d0f039b41f53d1522b115-crystal-flush-mount-led-ceiling-light.jpg?_gl=1*gdmnco*_gcl_au*MTMyNDk4NDY3Ny4xNzI1MjE5OTMw" className='w-full h-full' />
            <div className='text-sm md:text-base w-full text-center text-black bg-white pt-1 z-10'>Ceiling Fixtures</div>
          </Link>
        </SplideSlide>
        <SplideSlide>
          <Link to={"/result?cat=chandelier"}>
            <img src="https://m.media-amazon.com/images/I/71GmM4--DdL._AC_UF894,1000_QL80_.jpg" className='w-full h-full' />
            <div className='text-sm md:text-base w-full text-center text-black bg-white pt-1 z-10'>Chandeliers</div>
          </Link>
        </SplideSlide>
        <SplideSlide>
          <Link to={"/result?cat=lamp"}>
            <img src="https://m.media-amazon.com/images/I/81FMq3e3BZL._AC_SX679_.jpg" className='w-full h-full' />
            <div className='text-sm md:text-base w-full text-center text-black bg-white pt-1 z-10'>Lamps & Lighting</div>
          </Link>
        </SplideSlide>
        <SplideSlide>
          <Link to={"/result?cat=outdoor"}>
            <img src="https://ak1.ostkcdn.com/images/products/is/images/direct/7d37deed710d0d4a73af6f298112ab56b4e41605/Gama-Sonic-Solar-LED-Motion-Sensor-Security-Dual-Color-Light-2-PK.jpg" className='w-full h-full' />
            <div className='text-sm md:text-base w-full text-center text-black bg-white pt-1 z-10'>Outdoor Lighting</div>
          </Link>
        </SplideSlide>
        <SplideSlide>
          <Link to={"/result?cat=diwali"}>
            <img src="https://m.media-amazon.com/images/I/51jI2BY1UeL._SL500_.jpg" className='w-full h-full' />
            <div className='text-sm md:text-base w-full text-center text-black bg-white pt-1 z-10'>Occational(Diwali) Light</div>
          </Link>
        </SplideSlide>
      </Splide>

      <div className='md:grid hidden grid-cols-5 gap-3 lg:gap-6 my-10 '>
          <Link to={"/result?cat=ceiling"}>
            <img src="https://images-cdn.ubuy.co.in/634d0f039b41f53d1522b115-crystal-flush-mount-led-ceiling-light.jpg?_gl=1*gdmnco*_gcl_au*MTMyNDk4NDY3Ny4xNzI1MjE5OTMw" className='w-full' alt="Product" />
            <div className='mt-2 text-center'>Ceiling Fixtures</div>
          </Link>
          <Link to={"/result?cat=chandelier"}>
            <img src="https://m.media-amazon.com/images/I/71GmM4--DdL._AC_UF894,1000_QL80_.jpg" className='w-full' alt="Product" />
            <div className='mt-2 text-center'>Chandeliers</div>
          </Link>
          <Link to={"/result?cat=lamp"}>
            <img src="https://m.media-amazon.com/images/I/81FMq3e3BZL._AC_SX679_.jpg" className='w-full' alt="Product" />
            <div className='mt-2 text-center'>Lamps & Lighting</div>
          </Link>
          <Link to={"/result?cat=outdoor"}>
            <img src="https://ak1.ostkcdn.com/images/products/is/images/direct/7d37deed710d0d4a73af6f298112ab56b4e41605/Gama-Sonic-Solar-LED-Motion-Sensor-Security-Dual-Color-Light-2-PK.jpg" className='w-full' alt="Product" />
            <div className='mt-2 text-center'>Outdoor Lighting</div>
          </Link>
          <Link to={"/result?cat=diwali"}>
            <img src="https://m.media-amazon.com/images/I/51jI2BY1UeL._SL500_.jpg" className='w-full' alt="Product" />
            <div className='mt-2 text-center'>Occational(Diwali) Light</div>
          </Link>
      </div>

      <div className='text-center mt-6 md:mt-20 text-lg md:text-2xl lg:text-3xl'>Ultimate New Treasure Collections</div>
      
      <TrendyPro posts={posts} />

      <div className='text-center mt-6 md:mt-20 text-lg md:text-2xl lg:text-3xl'>Explore our Chandeliers Collections</div>

      <div className='mx-1'>
      {posts.length > 0 ? <Splide
      className="md:mt-7 mt-4 md:mb-10 mb-7 "
      options={{
        // focus      : 'center',
        // pagination : true,
        // fixedWidth : 120,
        // fixedHeight: 150,
        gap    : 20,
        perPage: 4,
        pagination : false,
        breakpoints: {
          1100: {
            perPage: 3,
          },
          700: {
            perPage: 2,
          },
        },

        // focus  : 0,
        // omitEnd: true,

        // type    : 'loop',
        // autoplay: 'pause',
      }}
      aria-label="Beautiful Images"
      >
        {posts?.filter(pr => pr?.category === "chandelier")
        .map((fr, index) =>
          <SplideSlide key={fr._id}>
            <Postcard1 {...fr} />
          </SplideSlide>
        )}
        </Splide> : 
        <Splide
        className="md:mt-7 mt-4 md:mb-10 mb-7 "
        options={{
        // focus      : 'center',
        // pagination : true,
        // fixedWidth : 120,
        // fixedHeight: 150,

        gap    : 20,
        perPage: 4,
        pagination : false,
        breakpoints: {
          1100: {
            perPage: 3,
          },
          700: {
            perPage: 2,
          },
        },

        // focus  : 0,
        // omitEnd: true,

        // type    : 'loop',
        // autoplay: 'pause',
      }}
      aria-label="Beautiful Images"
      >
        <SplideSlide>
          <div className="flex flex-col items-center justify-center h-[350px] w-full bg-gray-200 rounded">
            <div className='w-40'><LogoAnimation/></div>
          </div>
          <div className="h-[30px] w-[170px] bg-gray-300 rounded mt-2"></div>
        </SplideSlide>
        <SplideSlide>
          <div className="flex flex-col items-center justify-center h-[350px] w-full bg-gray-200 rounded">
            <div className='w-40'><LogoAnimation/></div>
          </div>
          <div className="h-[30px] w-[170px] bg-gray-300 rounded mt-2"></div>
        </SplideSlide>
        <SplideSlide>
          <div className="flex flex-col items-center justify-center h-[350px] w-full bg-gray-200 rounded">
            <div className='w-40'><LogoAnimation/></div>
          </div>
          <div className="h-[30px] w-[170px] bg-gray-300 rounded mt-2"></div>
        </SplideSlide>
        <SplideSlide>
          <div className="flex flex-col items-center justify-center h-[350px] w-full bg-gray-200 rounded">
            <div className='w-40'><LogoAnimation/></div>
          </div>
          <div className="h-[30px] w-[170px] bg-gray-300 rounded mt-2"></div>
        </SplideSlide>
        </Splide>
        }
      </div>

      <div className='text-center mt-5 md:mt-20 text-lg md:text-2xl lg:text-3xl'>Trendy Lux Arrivals</div>

      {posts?.length > 0 ? posts?.filter(pr => pr?.subCategory === "trend").slice(0,1)
      .map((post) =>
        <Link to={`/post/${post?._id}`} key={post?._id} className='grid grid-cols-3 gap-10 md:mt-7 mt-2 bg-black sm:py-0 py-5'>
          <div className='col-span-2'>
            <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-1 sm:mb-6 text-white mt-[8%] sm:mt-[8%] md:mt-[16%]  ml-[10%]">
              Discover Trends Luxury Lighting
            </h1>
            <h2 className="text-base sm:text-lg md:text-xl lg:text-3xl mb-1 sm:mb-6 text-white ml-[10%]">
              Elevate your space with our curated collection of the season's most designs.
            </h2>
            {/* <h2 className="text-sm sm:text-lg md:text-xl lg:text-2xl mb-2 sm:mb-6 text-white ml-[10%] md:hidden sm:hidden">
              Elevate your space with our Lights
            </h2> */}
            <Link to={`/post/${post?._id}`} className="px-2 sm:px-4 md:px-6 py-1 sm:py-2 md:py-3 bg-white text-black text-base md:text-lg font-semibold rounded hover:bg-gray-200 transition ml-[10%] sm:inline-block  hidden">
              Explore Now
            </Link>
          </div>
          <img src={post?.image[0]} className='w-full h-full md:py-10 sm:py-10 py-5 col-span-1'/>
        </Link>
      ): <Skeleton variant="rounded" height={200} className='my-7'/>}
    
      <div className='text-center mt-6 md:mt-20 text-lg md:text-2xl lg:text-3xl'>Explore Luxe Outdoor Lights</div>

      <div className='mx-1'>
      {posts.length > 0 ? <Splide
      className="md:mt-7 mt-4 md:mb-10 mb-7 "
      options={{
        // focus      : 'center',
        // pagination : true,
        // fixedWidth : 120,
        // fixedHeight: 150,
      
        gap    : 20,
        perPage: 4,
        pagination : false,
        breakpoints: {
          1100: {
            perPage: 3,
          },
          700: {
            perPage: 2,
          },
        },
      
        // focus  : 0,
        // omitEnd: true,
      
        // type    : 'loop',
        // autoplay: 'pause',
      }}
      aria-label="Beautiful Images"
      >
        {posts?.filter(pr => pr?.category === "outdoor")
        .map((fr, index) =>
          <SplideSlide key={fr._id}>
            <Postcard1 {...fr} />
          </SplideSlide>
        )}
      </Splide> : 
      <Splide
      className="md:mt-7 mt-4 md:mb-10 mb-7 "
      options={{
        // focus      : 'center',
        // pagination : true,
        // fixedWidth : 120,
        // fixedHeight: 150,
      
        gap    : 20,
        perPage: 4,
        pagination : false,
        breakpoints: {
          1100: {
            perPage: 3,
          },
          700: {
            perPage: 2,
          },
        },
      
        // focus  : 0,
        // omitEnd: true,
      
        // type    : 'loop',
        // autoplay: 'pause',
      }}
      aria-label="Beautiful Images"
      >
        <SplideSlide>
          <div className="flex flex-col items-center justify-center h-[350px] w-full bg-gray-200 rounded">
            <div className='w-40'><LogoAnimation/></div>
          </div>
          <div className="h-[30px] w-[170px] bg-gray-300 rounded mt-2"></div>
        </SplideSlide>
        <SplideSlide>
          <div className="flex flex-col items-center justify-center h-[350px] w-full bg-gray-200 rounded">
            <div className='w-40'><LogoAnimation/></div>
          </div>
          <div className="h-[30px] w-[170px] bg-gray-300 rounded mt-2"></div>
        </SplideSlide>
        <SplideSlide>
          <div className="flex flex-col items-center justify-center h-[350px] w-full bg-gray-200 rounded">
            <div className='w-40'><LogoAnimation/></div>
          </div>
          <div className="h-[30px] w-[170px] bg-gray-300 rounded mt-2"></div>
        </SplideSlide>
        <SplideSlide>
          <div className="flex flex-col items-center justify-center h-[350px] w-full bg-gray-200 rounded">
            <div className='w-40'><LogoAnimation/></div>
          </div>
          <div className="h-[30px] w-[170px] bg-gray-300 rounded mt-2"></div>
        </SplideSlide>
      </Splide>
      }
      </div>

      <div className='text-center mt-6 md:mt-20 text-lg md:text-2xl lg:text-3xl'>Explore our Festive(Diwali) Radiance</div>
          
      <div className='mx-1'>
      {posts.length > 0 ? <Splide
      className="md:mt-7 mt-4 md:mb-10 mb-7 "
      options={{
        // focus      : 'center',
        // pagination : true,
        // fixedWidth : 120,
        // fixedHeight: 150,
      
        gap    : 20,
        perPage: 4,
        pagination : false,
        breakpoints: {
          1100: {
            perPage: 3,
          },
          700: {
            perPage: 2,
          },
        },
      
        // focus  : 0,
        // omitEnd: true,
      
        // type    : 'loop',
        // autoplay: 'pause',
      }}
      aria-label="Beautiful Images"
      >
        {posts?.filter(pr => pr?.category === "diwali")
        .map((fr, index) =>
          <SplideSlide key={fr._id}>
            <Postcard1 {...fr} />
          </SplideSlide>
        )}
      </Splide> :
      <Splide
      className="md:mt-7 mt-4 md:mb-10 mb-7 "
      options={{
        gap    : 20,
        perPage: 4,
        pagination : false,
        breakpoints: {
          1100: {
            perPage: 3,
          },
          700: {
            perPage: 2,
          },
        },
      
        // focus  : 0,
        // omitEnd: true,
      
        // type    : 'loop',
        // autoplay: 'pause',
      }}
      aria-label="Beautiful Images"
      >
        <SplideSlide>
          <div className="flex flex-col items-center justify-center h-[350px] w-full bg-gray-200 rounded">
            <div className='w-40'><LogoAnimation/></div>
          </div>
          <div className="h-[30px] w-[170px] bg-gray-300 rounded mt-2"></div>
        </SplideSlide>
        <SplideSlide>
          <div className="flex flex-col items-center justify-center h-[350px] w-full bg-gray-200 rounded">
            <div className='w-40'><LogoAnimation/></div>
          </div>
          <div className="h-[30px] w-[170px] bg-gray-300 rounded mt-2"></div>
        </SplideSlide>
        <SplideSlide>
          <div className="flex flex-col items-center justify-center h-[350px] w-full bg-gray-200 rounded">
            <div className='w-40'><LogoAnimation/></div>
          </div>
          <div className="h-[30px] w-[170px] bg-gray-300 rounded mt-2"></div>
        </SplideSlide>
        <SplideSlide>
          <div className="flex flex-col items-center justify-center h-[350px] w-full bg-gray-200 rounded">
            <div className='w-40'><LogoAnimation/></div>
          </div>
          <div className="h-[30px] w-[170px] bg-gray-300 rounded mt-2"></div>
        </SplideSlide>
      </Splide>
      }
      </div>

      <div className='text-center mt-0 md:mt-12 text-base md:text-xl bg-gray-100 py-2'>Follow us on Social Media</div>
      
      <div className=' grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-2'>
        <a href='https://www.linkedin.com/in/tushar-saini-60bb242a3/' className='bg-gray-100 text-center flex justify-center items-center'>
          <FaFacebook className='my-6 lg:w-14 sm:w-12 w-10 lg:h-14 sm:h-12 h-10 me-4' />
          <div className='text-start'>
            <div className='text-base'>Facebook</div>
            <div className='text-sm text-gray-700'>Join us</div>
            <div className='text-sm text-gray-700'>@luxloom</div>
          </div>
        </a>
        <a href='https://www.instagram.com/_.tusharsaini' className='bg-gray-100 text-center flex justify-center items-center'>
          <IoLogoInstagram className='my-6 lg:w-14 sm:w-12 w-10 lg:h-14 sm:h-12 h-10 me-4' />
          <div className='text-start'>
            <div className='text-base'>Instagram</div>
            <div className='text-sm text-gray-700'>Join our Page</div>
            <div className='text-sm text-gray-700'>@luxloom</div>
          </div>
        </a>
        <button onClick={() => window.open("https://api.whatsapp.com/send?phone=917451811626", "_blank")}  className='bg-gray-100 text-center flex justify-center items-center'>
          <MdWhatsapp className='my-6 lg:w-14 sm:w-12 w-10 lg:h-14 sm:h-12 h-10 me-4' />
          <div className='text-start'>
            <div className='text-base'>WhatsApp</div>
            <div className='text-sm text-gray-700'>Reach us at</div>
            <div className='text-sm text-gray-700'>+91-7451811626</div>
          </div>
        </button>
        <a href='https://www.linkedin.com/in/tushar-saini-60bb242a3/' className='bg-gray-100 text-center flex justify-center items-center'>
          <FaLinkedin className='my-6 lg:w-14 sm:w-12 w-10 lg:h-14 sm:h-12 h-10 me-4' />
          <div className='text-start'>
            <div className='text-base'>Linkedin</div>
            <div className='text-sm text-gray-700'>Conact us</div>
            <div className='text-sm text-gray-700'>@luxloom</div>
          </div>
        </a>
      </div>

      <div className='text-center mt-6 sm:mt-10 md:mt-16 text-lg md:text-2xl lg:text-3xl'>Shop From Our Instagram</div>

      <div className='mx-1 md:block hidden'>
      {posts.length > 0 ? <Splide
      className="md:mt-7 mt-4 md:mb-10 mb-7 "
      options={{
        gap    : 20,
        perPage: 6,
        pagination : false,
        breakpoints: {
          1300: {
            perPage: 5,
          },
          100: {
            perPage: 4,
          },
          800: {
            perPage: 3,
          },
          600: {
            perPage: 2,
          },
        },
      }}
      aria-label="Beautiful Images"
      >
        {posts?.filter(pr => pr?.instagram === true)
        .map((fr, index) =>
          <SplideSlide key={fr._id}>
            <Postcard2 {...fr} />
          </SplideSlide>
        )}
      </Splide> :
      <Splide
      className="md:mt-7 mt-4 md:mb-10 mb-7 "
      options={{
        gap    : 20,
        perPage: 6,
        pagination : false,
        breakpoints: {
          1100: {
            perPage: 3,
          },
          700: {
            perPage: 2,
          },
        },
      }}
      aria-label="Beautiful Images"
      >
        <SplideSlide>
          <div className="flex flex-col items-center justify-center h-[250px] w-full bg-gray-200 rounded">
            <div className='w-40'><LogoAnimation/></div>
          </div>
          <div className="h-[30px] w-[170px] bg-gray-300 rounded mt-2"></div>
        </SplideSlide>
        <SplideSlide>
          <div className="flex flex-col items-center justify-center h-[250px] w-full bg-gray-200 rounded">
            <div className='w-40'><LogoAnimation/></div>
          </div>
          <div className="h-[30px] w-[170px] bg-gray-300 rounded mt-2"></div>
        </SplideSlide>
        <SplideSlide>
          <div className="flex flex-col items-center justify-center h-[250px] w-full bg-gray-200 rounded">
            <div className='w-40'><LogoAnimation/></div>
          </div>
          <div className="h-[30px] w-[170px] bg-gray-300 rounded mt-2"></div>
        </SplideSlide>
        <SplideSlide>
          <div className="flex flex-col items-center justify-center h-[250px] w-full bg-gray-200 rounded">
            <div className='w-40'><LogoAnimation/></div>
          </div>
          <div className="h-[30px] w-[170px] bg-gray-300 rounded mt-2"></div>
        </SplideSlide>
        <SplideSlide>
          <div className="flex flex-col items-center justify-center h-[250px] w-full bg-gray-200 rounded">
            <div className='w-40'><LogoAnimation/></div>
          </div>
          <div className="h-[30px] w-[170px] bg-gray-300 rounded mt-2"></div>
        </SplideSlide>
        <SplideSlide>
          <div className="flex flex-col items-center justify-center h-[250px] w-full bg-gray-200 rounded">
            <div className='w-40'><LogoAnimation/></div>
          </div>
          <div className="h-[30px] w-[170px] bg-gray-300 rounded mt-2"></div>
        </SplideSlide>
      </Splide>
      }
      </div>

      <div className='mx-1 md:hidden'>
      {posts.length > 0 ? <Splide
      className="md:mt-7 mt-4 md:mb-10 mb-7 "
      options={{
        fixedWidth : 150,
        fixedHeight: 150,
        gap        : 10,
        arrows: false,
        pagination : false,
      }}
      aria-label="Beautiful Images"
      >
        {posts?.filter(pr => pr?.instagram === true)
        .map((fr, index) =>
          <SplideSlide key={fr._id}>
            <Postcard2 {...fr} />
          </SplideSlide>
        )}
      </Splide> :
      <Splide
      className="md:mt-7 mt-4 md:mb-10 mb-7 "
      options={{
        // focus      : 'center',
        // pagination : true,
        // fixedWidth : 120,
        // fixedHeight: 150,
      
        gap    : 20,
        perPage: 4,
        pagination : false,
        breakpoints: {
          1100: {
            perPage: 3,
          },
          700: {
            perPage: 2,
          },
        },
      
        // focus  : 0,
        // omitEnd: true,
      
        // type    : 'loop',
        // autoplay: 'pause',
      }}
      aria-label="Beautiful Images"
      >
        <SplideSlide>
          <div className="flex flex-col items-center justify-center h-[350px] w-full bg-gray-200 rounded">
            <div className='w-40'><LogoAnimation/></div>
          </div>
          <div className="h-[30px] w-[170px] bg-gray-300 rounded mt-2"></div>
        </SplideSlide>
        <SplideSlide>
          <div className="flex flex-col items-center justify-center h-[350px] w-full bg-gray-200 rounded">
            <div className='w-40'><LogoAnimation/></div>
          </div>
          <div className="h-[30px] w-[170px] bg-gray-300 rounded mt-2"></div>
        </SplideSlide>
        <SplideSlide>
          <div className="flex flex-col items-center justify-center h-[350px] w-full bg-gray-200 rounded">
            <div className='w-40'><LogoAnimation/></div>
          </div>
          <div className="h-[30px] w-[170px] bg-gray-300 rounded mt-2"></div>
        </SplideSlide>
        <SplideSlide>
          <div className="flex flex-col items-center justify-center h-[350px] w-full bg-gray-200 rounded">
            <div className='w-40'><LogoAnimation/></div>
          </div>
          <div className="h-[30px] w-[170px] bg-gray-300 rounded mt-2"></div>
        </SplideSlide>
      </Splide>
      }
      </div>

      
      {/* <div className=''>
        <div className='mt-16 text-2xl font-semibold'>Built-in Projects</div>
        <div className="grid mt-7 border grid-cols-1 md:grid-cols-2 gap-2">
              {posts.filter((post) => post.category === "built")
                .map((post) => (
                    <Postcard2 key={post._id} {...post} />
                ))}
        </div>
      </div> */}

      
      <div className=' grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:mt-20 md:mt-14 sm:mt-8 gap-4'>
        <div className='text-center bg-gray-100 md:bg-white sm:py-0 py-2'>
          <img src="https://cdn.iconscout.com/icon/free/png-256/free-cash-on-delivery-icon-download-in-svg-png-gif-file-formats--payment-hand-food-services-pack-icons-1569374.png?f=webp&w=256" alt='image' className='w-10 md:w-16 xl:w-20 mx-auto'/>
          <div className='mt-2 sm:text-base text-sm'>Cash on Delivery Available</div>
        </div>
        <div className='text-center bg-gray-100 md:bg-white sm:py-0 py-2'>
          <img src="https://cdn-icons-png.flaticon.com/256/1067/1067566.png" alt='image' className='w-10 md:w-16 xl:w-20 mx-auto' />
          <div className='mt-2 sm:text-base text-sm'>24/7 Customer Support</div>
        </div>
        <div className='text-center bg-gray-100 md:bg-white sm:py-0 py-2'>
          <img src="https://cdn-icons-png.flaticon.com/512/1212/1212158.png" alt='image' className='w-10 md:w-16 xl:w-20 mx-auto' />
          <div className='mt-2 sm:text-base text-sm'>Premium quality products</div>
        </div>
        <div className='text-center bg-gray-100 md:bg-white sm:py-0 py-2'>
          <img src="https://www.svgrepo.com/show/40440/secure-payment.svg" alt='image' className='w-10 md:w-16 xl:w-20 mx-auto' />
          <div className='mt-2 sm:text-base text-sm'>Secure Payments</div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center mt-24 hidden">
          <div className="w-full md:w-1/2 xl:w-1/4 sm:mt-0 mt-6"> 
              <div className=' flex'>
                <div className=' w-16 h-10'><img src={shipping} className="h-10 mx-auto  my-auto" /></div>
                <h2 className="font-semibold mb-2 ">Free Shipping</h2>
              </div>
              <p className=" ml-16">Free Shipping on all prepaid <br /> orders above Rs. 999</p>
          </div>
          <div className="w-full md:w-1/2 xl:w-1/4 sm:mt-0 mt-6">
              <div className=' flex'>
                <div className=' w-16 h-10'><img src={carts} className='h-10 mx-auto my-auto' /></div>
                <h2 className="font-semibold mb-2">Quality Assurance</h2>
              </div>
              <p className=" ml-16">Enjoy 100% premium quality <br /> products</p>
          </div>
          <div className="w-full md:w-1/2 xl:w-1/4 sm:mt-0 mt-6">
              <div className=' flex'>
                <div className=' w-16 h-10'><img src={support} className="h-10 mx-auto my-auto" /></div>
                <h2 className="font-semibold mb-2">Top-notch Support</h2>
              </div>
              <p className=" ml-16">Call: +91 7451811626</p>
              <p className=" ml-16">Mail: <a href="mailto:ttushar476@gmail.com" className="text-blue-600 hover:text-blue-900">support@electrobazar.in</a></p>
              <p className=" ml-16">Timings: 9am to 9pm, <br /> Days: Mon-Sun</p>
          </div>
          <div className="w-full md:w-1/2 xl:w-1/4 sm:mt-0 mt-6">
              <div className=' flex'>
                <div className=' w-16 h-10'><img src={secure} className="h-10 mx-auto my-auto" /></div>
                <h2 className="font-semibold mb-2">Secure Payments</h2>
              </div>
              <p className=" ml-16">100% Secure Payments by  <br /> Trusted Payment Gateways</p>
          </div>
      </div>
    </ div>
  )
}

export default allpost
