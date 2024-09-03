import React, {useState, useEffect} from 'react'
import { Postcard } from '../component'
import { Postcard1 } from '../component'
import { Link } from 'react-router-dom'
import axios from "axios"
import img1 from "../component/images/splide1.png";
import img2 from "../component/images/splide2.png";
import img3 from "../component/images/splide3.png";
import img31 from "../component/images/scroller4.png"
import img4 from "../component/images/drone.png";
import img5 from "../component/images/board.jpeg";
import img6 from "../component/images/ultra.jpg";
import img7 from "../component/images/pixel.jpg"
import img8 from "../component/images/speaker.jpg"
import slider from "../component/images/rslider.png"

import delivery from "../component/images/info.png"
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

import mob1 from "../component/images/splideM1.png"
import mob2 from "../component/images/splideM2.png"
import mob3 from "../component/images/splideM3.png"

import whatsapp from "../component/images/whatsapp.png"
import whatsappmob from "../component/images/whatsappMob.png"

import Postcard2 from '../component/postcard2'
import TrendyPro from '../component/trendyPro'


function allpost() {
    const [posts, setPosts] = useState([]);

    const active = useSelector(state => state.auth.status)

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


    useEffect(() => {
      try {
        axios.post(`${conf.apiUrl}/product/products`, {}, {
          withCredentials: true,
      }).then((post) => setPosts(post.data.data))
      } catch (error) {
        console.log(error);
      }
      
  }, [])
    

  return (
    <div className='bg-white pb-20 max-w-[1536px] mx-auto'>
      {/* <LoginPopup open={active}/> */}

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
            <img src={img1} className="w-full h-full" />
            <div className='absolute top-[35%] left-[42%] text-white sm:text-xl md:text-2xl lg:text-4xl text-center'>
              <div>Tag line here</div>
              <button className="md:text-base text-sm lg:px-5 md:px-4 sm:px-3 lg:py-3 md:py-2 sm:py-1 bg-black text-white rounded-full sm:mt-3 md:mt-6 lg:mt-8">
                Buy now
              </button>
            </div>
          </div>
        </SplideSlide>
        <SplideSlide className="relative ">
          <div className="relative w-full h-full">
            <img src={img2} className="w-full h-full" />
            <div className='absolute top-[35%] left-[42%] text-white sm:text-xl md:text-2xl lg:text-4xl text-center'>
              <div>Best Indoor light</div>
              <button className="md:text-base text-sm lg:px-5 md:px-4 sm:px-3 lg:py-3 md:py-2 sm:py-1 bg-black text-white rounded-full sm:mt-3 md:mt-6 lg:mt-8">
                Buy now
              </button>
            </div>
          </div>
        </SplideSlide>
        <SplideSlide className="relative ">
          <div className="relative w-full h-full">
            <img src={img3} className="w-full h-full" />
            <div className='absolute top-[40%] right-[16%] text-white sm:text-xl md:text-2xl lg:text-4xl text-right'>
              <div>Tag line here</div>
              <button className="md:text-base text-sm lg:px-5 md:px-4 sm:px-3 lg:py-3 md:py-2 sm:py-1 bg-black text-white rounded-full sm:mt-3 md:mt-6 lg:mt-8">
                Buy now
              </button>
            </div>
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
            <img src={mob1} className="w-full h-full" />
            <div className='absolute top-[35%] left-[34%] text-white text-2xl text-center'>
              <div>Tag line here</div>
              <button className=" text-base px-4 py-1 bg-black text-white rounded-full mt-3">
                Buy now
              </button>
            </div>
          </div>
        </SplideSlide>
        <SplideSlide className="relative ">
          <div className="relative w-full h-full">
            <img src={mob2} className="w-full h-full" />
            <div className='absolute top-[35%] left-[34%] text-white text-2xl text-center'>
              <div>Tag line here</div>
              <button className=" text-base px-4 py-1 bg-black text-white rounded-full mt-3">
                Buy now
              </button>
            </div>
          </div>
        </SplideSlide>
        <SplideSlide className="relative ">
          <div className="relative w-full h-full">
            <img src={mob3} className="w-full h-full" />
            <div className='absolute top-[35%] left-[34%] text-white text-2xl text-center'>
              <div>Tag line here</div>
              <button className=" text-base px-4 py-1 bg-black text-white rounded-full mt-3">
                Buy now
              </button>
            </div>
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
      

      <div className='text-center mt-10 md:mt-16 text-lg md:text-2xl'>Lux Loom Collections</div>

      <Splide
      className="md:mt-7 mt-4 md:mb-10 mb-7 md:hidden"
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
          <div>
            <img src="https://images-cdn.ubuy.co.in/634d0f039b41f53d1522b115-crystal-flush-mount-led-ceiling-light.jpg?_gl=1*gdmnco*_gcl_au*MTMyNDk4NDY3Ny4xNzI1MjE5OTMw" className='w-full h-full' />
            <div className='text-sm md:text-base w-full text-center text-black bg-white pt-1 z-10'>Ceiling Fixtures</div>
          </div>
        </SplideSlide>
        <SplideSlide>
          <div>
            <img src="https://m.media-amazon.com/images/I/71GmM4--DdL._AC_UF894,1000_QL80_.jpg" className='w-full h-full' />
            <div className='text-sm md:text-base w-full text-center text-black bg-white pt-1 z-10'>Chandeliers</div>
          </div>
        </SplideSlide>
        <SplideSlide>
          <div>
            <img src="https://m.media-amazon.com/images/I/81FMq3e3BZL._AC_SX679_.jpg" className='w-full h-full' />
            <div className='text-sm md:text-base w-full text-center text-black bg-white pt-1 z-10'>Lamps & Lighting</div>
          </div>
        </SplideSlide>
        <SplideSlide>
          <div>
            <img src="https://img.lazcdn.com/g/p/5d06742dba5d36409c5e5b9a95594516.jpg_720x720q80.jpg_.webp" className='w-full h-full' />
            <div className='text-sm md:text-base w-full text-center text-black bg-white pt-1 z-10'>Outdoor Lighting</div>
          </div>
        </SplideSlide>
        <SplideSlide>
          <div>
            <img src="https://m.media-amazon.com/images/I/71vrVCqbWZL.jpg" className='w-full h-full' />
            <div className='text-sm md:text-base w-full text-center text-black bg-white pt-1 z-10'>Plants light</div>
          </div>
        </SplideSlide>
      </Splide>

      <div className='md:grid hidden grid-cols-5 gap-3 lg:gap-6 my-10 '>
          <div>
            <img src="https://images-cdn.ubuy.co.in/634d0f039b41f53d1522b115-crystal-flush-mount-led-ceiling-light.jpg?_gl=1*gdmnco*_gcl_au*MTMyNDk4NDY3Ny4xNzI1MjE5OTMw" className='w-full' alt="Product" />
            <div className='mt-2 text-center'>Ceiling Fixtures</div>
          </div>
          <div>
            <img src="https://m.media-amazon.com/images/I/71GmM4--DdL._AC_UF894,1000_QL80_.jpg" className='w-full' alt="Product" />
            <div className='mt-2 text-center'>Chandeliers</div>
          </div>
          <div>
            <img src="https://m.media-amazon.com/images/I/81FMq3e3BZL._AC_SX679_.jpg" className='w-full' alt="Product" />
            <div className='mt-2 text-center'>Lamps & Lighting</div>
          </div>
          <div>
            <img src="https://img.lazcdn.com/g/p/5d06742dba5d36409c5e5b9a95594516.jpg_720x720q80.jpg_.webp" className='w-full' alt="Product" />
            <div className='mt-2 text-center'>Outdoor Lighting</div>
          </div>
          <div>
            <img src="https://m.media-amazon.com/images/I/71vrVCqbWZL.jpg" className='w-full' alt="Product" />
            <div className='mt-2 text-center'>Plants & Botanicals</div>
          </div>
      </div>

      <div className='text-center mt-10 md:mt-20 text-lg md:text-2xl lg:text-3xl'>Ultimate Trendy Treasure Collections</div>
      
      <TrendyPro post={posts.filter(pr => pr?.subCategory === "new")} />

      <div className='text-center mt-10 md:mt-20 text-lg md:text-2xl lg:text-3xl'>Explore our Chandeliers Collections</div>

      {posts?.length > 0 ? <Splide
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
      </Splide> : <p>Loading...</p>}

      <div className=' '>
        <div className='sm:block hidden h-auto sm:mb-7 mb-0 '>
            <p className='sm:text-2xl text-lg font-semibold mb-7'>Our Collections</p>
            <div className="sm:h-auto h-auto grid lg:grid-cols-5 sm:grid-cols-5 grid-cols-5 ">
              <Link to="/result?cat=drones">
                <div className="flex flex-col items-center ">
                  <div className=" xl:w-40 lg:w-32 md:w-28 sm:w-20 w-14 xl:h-40 lg:h-32 md:h-28 sm:h-20 h-14 rounded-full overflow-hidden hover:scale-105 transition-transform duration-300 ">
                    <img
                      src="https://media.karousell.com/media/photos/products/2017/02/24/racing_drone_fpv_kit_1487935777_72a72e10.jpg"
                      alt="Image 1"
                      className=" xl:w-40 lg:w-32 md:w-28 sm:w-20 w-14 xl:h-40 lg:h-32 md:h-28 sm:h-20 h-14 object-cover"
                    />
                  </div>
                  <p className="sm:text-base text-sm text-center mt-4 text-gray-800 hover:text-red-600 transform sm:hover:translate-x-[-6px] hover:translate-x-[-3px] duration-200 cursor-pointer font-semibold">
                  <span className='md:block hidden'>Drone and Rc planes </span><span className='md:hidden block'>Drone </span><span className="font-bold">&rarr;</span>
                  </p>
                </div>
              </Link>
              <Link to="/result?cat=boards">
                <div className="flex flex-col items-center">
                  <div className="xl:w-40 lg:w-32 md:w-28 sm:w-20 w-14 xl:h-40 lg:h-32 md:h-28 sm:h-20 h-14 rounded-full overflow-hidden hover:scale-105 transition-transform duration-300 outline outline-white">
                    <img
                      src="https://pimylifeup.com/wp-content/uploads/2015/08/Raspberry-Pi-Vs-Arduino.jpg"
                      alt="Image 2"
                      className="xl:w-40 lg:w-32 md:w-28 sm:w-20 w-14 xl:h-40 lg:h-32 md:h-28 sm:h-20 h-14 object-cover"
                    />
                  </div>
                  <p className="sm:w-auto w-24 sm:text-base text-sm text-center mt-4 text-gray-800 hover:text-red-600 transform sm:hover:translate-x-[-6px] hover:translate-x-[-3px] duration-200 cursor-pointer font-semibold">
                  <span className='md:block hidden'>Arduino Boards </span><span className='md:hidden block'>Boards </span><span className="font-bold">&rarr;</span>
                  </p>
                </div>
              </Link>
              <Link to="/result?cat=sensors">
                <div className="flex flex-col items-center">
                  <div className="xl:w-40 lg:w-32 md:w-28 sm:w-20 w-14 xl:h-40 lg:h-32 md:h-28 sm:h-20 h-14 rounded-full overflow-hidden hover:scale-105 transition-transform duration-300 outline outline-white">
                    <img
                      src="https://tutorial45.com/wp-content/uploads/2017/11/arduino-gas-sensor.jpg"
                      alt="Image 3"
                      className="xl:w-40 lg:w-32 md:w-28 sm:w-20 w-14 xl:h-40 lg:h-32 md:h-28 sm:h-20 h-14 object-cover"
                    />
                  </div>
                  <p className="sm:w-auto w-24 sm:text-base text-sm text-center mt-4 text-gray-800 hover:text-red-600 transform sm:hover:translate-x-[-6px] hover:translate-x-[-3px] duration-200 cursor-pointer font-semibold">
                  <span className='md:block hidden'>All type Sensors </span><span className='md:hidden block'>Sensors </span><span className="font-bold">&rarr;</span>
                  </p>
                </div>
              </Link>
              <Link to="/result?cat=led">
                <div className="flex flex-col items-center">
                  <div className="xl:w-40 lg:w-32 md:w-28 sm:w-20 w-14 xl:h-40 lg:h-32 md:h-28 sm:h-20 h-14 rounded-full overflow-hidden hover:scale-105 transition-transform duration-300 outline outline-white">
                    <img
                      src="https://ae01.alicdn.com/kf/Hc696125dd61f4c31aee47ea8e9f60ee9S/12mm-bullet-DC12V-WS2818-RGB-full-color-addressable-LED-pixel-light-IP68-all-BLACK-wire-100pcs.jpg"
                      alt="Image 4"
                      className="xl:w-40 lg:w-32 md:w-28 sm:w-20 w-14 xl:h-40 lg:h-32 md:h-28 sm:h-20 h-14 object-cover"
                    />
                  </div>
                  <p className="sm:w-auto w-16 sm:text-base text-sm text-center mt-4 text-gray-800 hover:text-red-600 transform sm:hover:translate-x-[-6px] hover:translate-x-[-3px] duration-200 cursor-pointer font-semibold">
                    <span className='md:block hidden'>Pixel LED's </span><span className='md:hidden block'>LED's </span><span className="font-bold">&rarr;</span>
                  </p>
                </div>
              </Link>
              <Link to="/result?cat=speakers">
                <div className="flex flex-col items-center">
                  <div className="xl:w-40 lg:w-32 md:w-28 sm:w-20 w-14 xl:h-40 lg:h-32 md:h-28 sm:h-20 h-14 rounded-full overflow-hidden hover:scale-105 transition-transform duration-300 outline outline-10 outline-white">
                    <img
                      src="https://m.media-amazon.com/images/I/61Ou6sDalKL._UX250_.jpg"
                      alt="Image 5"
                      className="xl:w-40 lg:w-32 md:w-28 sm:w-20 w-14 xl:h-40 lg:h-32 md:h-28 sm:h-20 h-14 object-cover"
                    />
                  </div>
                  <p className="sm:text-base text-sm text-center mt-4 text-gray-800 hover:text-red-600 transform sm:hover:translate-x-[-6px] hover:translate-x-[-3px] duration-200 cursor-pointer font-semibold">
                  <span className='md:block hidden'>Bass and Speakers </span><span className='md:hidden block'>Speakers </span><span className="font-bold">&rarr;</span>
                  </p>
                </div>
              </Link>
            </div>

        </div>

        <div className='mt-3 sm:mt-16 text-lg sm:text-2xl font-semibold text-center '>Home Decor Products </div>
        <div className=' grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 2xl:gap-8 xl:gap-6 lg:gap-5 md:gap-4 sm:gap-5 gap-3 md:mt-16 mt-8'>
                {posts.filter((post) => post.status === true)
                
                .map((post) => (
                      <Postcard key={post._id} {...post}/>
                ))}
        </div>
        <div className='mt-12 text-xl sm:text-2xl font-semibold '>IOT Sensors</div>
        <div className="flex sm:overflow-hidden overflow-x-scroll mt-7 ">
              {/* Transition container */}
              <div className="flex transition-transform duration-500">
              {posts.filter((post) => post.category === "sensors")
                .map((post) => (
                        <Postcard1 key={post?._id} {...post} />
                ))}
              </div>
        </div>
          
      </div>
      <div className=''>
        <div className='mt-16 text-2xl font-semibold'>Built-in Projects</div>
        <div className="grid mt-7 border grid-cols-1 md:grid-cols-2 gap-2">
              {posts.filter((post) => post.category === "built")
                .map((post) => (
                    <Postcard2 key={post._id} {...post} />
                ))}
        </div>
      </div>

      <section className="bg-gray-100 py-16 mt-10 ">
          <div className="container mx-auto ">
              <div className="flex flex-wrap justify-center ">
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
          </div>
      </section>
    </ div>
  )
}

export default allpost
