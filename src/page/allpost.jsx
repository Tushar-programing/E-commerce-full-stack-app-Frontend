import React, {useState, useEffect} from 'react'
import { Postcard } from '../component'
import { Postcard1 } from '../component'
import { Link } from 'react-router-dom'
import axios from "axios"
import img1 from "../component/images/scroller1.1.png";
import img2 from "../component/images/scroller2.png";
import img3 from "../component/images/scroller3.png";
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

import mob1 from "../component/images/scroller1m.png"
import mob2 from "../component/images/scroller2m.png"
import mob3 from "../component/images/scroller3m.png"

import whatsapp from "../component/images/whatsapp.png"
import whatsappmob from "../component/images/whatsappMob.png"

import Postcard2 from '../component/postcard2'

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
    <div className='bg-gray-100 pb-20 '>
      {/* <LoginPopup open={active}/> */}

      <Splide
        options={{
          type: 'loop',
          perPage: 1,
          autoplay: true,
          interval: 2000,
        }}
        className="sm:mt-8 mt-0 sm:block hidden"
      >
        <SplideSlide className="relative ">
          <div className="relative w-full h-full">
            <img src={img2} className="w-full h-full" />
            <button className="absolute xl:bottom-24 lg:bottom-16 md:bottom-10 sm:bottom-6 bottom-2 xl:right-[500px] lg:right-[380px] md:right-64 sm:right-58 right-28  bg-blue-500 text-white xl:px-8 md:px-6 sm:px-4 px-2 lg:py-3 md:py-2 py-1 lg:text-base md:text-sm text-xs rounded">
              Learn More
            </button>
          </div>
        </SplideSlide>
        <SplideSlide className="relative ">
          <div className="relative w-full h-full">
            <img src={img1} className="w-full h-full" />
            <button className="absolute xl:bottom-24 lg:bottom-16 md:bottom-10 sm:bottom-6 bottom-2   xl:left-40 lg:left-28 md:left-20 sm:left-12 left-10  bg-blue-500 text-white xl:px-8 md:px-6 sm:px-4 px-2 lg:py-3 md:py-2 py-1 lg:text-base md:text-sm text-xs  rounded">
              Learn More
            </button>
          </div>
        </SplideSlide>
        <SplideSlide className="relative ">
          <div className="relative w-full h-full">
            <img src={img3} className="w-full h-full" />
            <button className="absolute xl:bottom-24 lg:bottom-16 md:bottom-10 sm:bottom-6 bottom-2   xl:left-40 lg:left-28 md:left-20 sm:left-12 left-10  bg-blue-500 text-white xl:px-8 md:px-6 sm:px-4 px-2 lg:py-3 md:py-2 py-1 lg:text-base md:text-sm text-xs  rounded">
              Learn More
            </button>
          </div>
        </SplideSlide>
      </Splide>


      <Splide
        options={{
          type: 'loop',
          perPage: 1,
          autoplay: true,
          interval: 2000,
        }}
        className="sm:mt-8 mt-0 sm:hidden block"
      >
        <SplideSlide className="relative ">
          <div className="relative w-full h-full">
            <img src={mob1} className="w-full h-full" />
            <button className="absolute xl:bottom-24 lg:bottom-16 md:bottom-10 sm:bottom-6 bottom-10 xl:right-[500px] lg:right-[380px] md:right-64 sm:right-58 right-28  bg-blue-500 text-white xl:px-8 md:px-6 sm:px-4 px-2 lg:py-3 md:py-2 py-1 lg:text-base md:text-sm text-xs rounded">
              Learn More
            </button>
          </div>
        </SplideSlide>
        <SplideSlide className="relative ">
          <div className="relative w-full h-full">
            <img src={mob2} className="w-full h-full" />
            <button className="absolute xl:bottom-24 lg:bottom-16 md:bottom-10 sm:bottom-6 bottom-8   xl:left-40 lg:left-28 md:left-20 sm:left-12 left-9  bg-blue-500 text-white xl:px-8 md:px-6 sm:px-4 px-2 lg:py-3 md:py-2 py-1 lg:text-base md:text-sm text-xs  rounded">
              Learn More
            </button>
          </div>
        </SplideSlide>
        <SplideSlide className="relative ">
          <div className="relative w-full h-full">
            <img src={mob3} className="w-full h-full" />
            <button className="absolute xl:bottom-24 lg:bottom-16 md:bottom-10 sm:bottom-6 bottom-8   xl:left-40 lg:left-28 md:left-20 sm:left-12 left-8  bg-blue-500 text-white xl:px-8 md:px-6 sm:px-4 px-2 lg:py-3 md:py-2 py-1 lg:text-base md:text-sm text-xs  rounded">
              Learn More
            </button>
          </div>
        </SplideSlide>
      </Splide>

      <img 
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
      />

      {/* <a href="https://wa.me/12345678900" target="_blank">Chat with us on WhatsApp</a> */}



      <div className=' sm:max-w-7xl max-w-3xl mx-auto px-2 '>
        <div className=' h-auto sm:mt-10 mt-5 sm:mb-7 mb-0 '>
            <p className='sm:text-2xl text-lg font-semibold mb-7'>Our Collections</p>
            <div className="sm:h-auto h-[320px] grid lg:grid-cols-5 sm:grid-cols-5 grid-cols-3 ">
              <Link to="/result?cat=drones">
                <div className="flex flex-col items-center ">
                  <div className="border lg:w-48 md:w-36 w-20 lg:h-48 md:h-36 h-20 rounded-full overflow-hidden hover:scale-105 transition-transform duration-300 ">
                    <img
                      src="https://media.karousell.com/media/photos/products/2017/02/24/racing_drone_fpv_kit_1487935777_72a72e10.jpg"
                      alt="Image 1"
                      className=" lg:w-48 md:w-36 w-20 lg:h-48 md:h-36 h-20 object-cover"
                    />
                  </div>
                  <p className="sm:text-base text-sm text-center mt-4 text-gray-800 hover:text-red-600 transform sm:hover:translate-x-[-6px] hover:translate-x-[-10px] duration-200 cursor-pointer font-semibold">
                    Drone and Rc planes <span className="font-bold">&rarr;</span>
                  </p>
                </div>
              </Link>
              <Link to="/result?cat=boards">
                <div className="flex flex-col items-center">
                  <div className="lg:w-48 md:w-36 w-20 lg:h-48 md:h-36 h-20 rounded-full overflow-hidden hover:scale-105 transition-transform duration-300 outline outline-white">
                    <img
                      src="https://pimylifeup.com/wp-content/uploads/2015/08/Raspberry-Pi-Vs-Arduino.jpg"
                      alt="Image 2"
                      className="lg:w-48 md:w-36 w-20 lg:h-48 md:h-36 h-20 object-cover"
                    />
                  </div>
                  <p className="sm:w-auto w-24 sm:text-base text-sm text-center mt-4 text-gray-800 hover:text-red-600 transform sm:hover:translate-x-[-6px] hover:translate-x-[-10px] duration-200 cursor-pointer font-semibold">
                    Arduino Boards <span className="font-bold">&rarr;</span>
                  </p>
                </div>
              </Link>
              <Link to="/result?cat=sensors">
                <div className="flex flex-col items-center">
                  <div className="lg:w-48 md:w-36 w-20 lg:h-48 md:h-36 h-20 rounded-full overflow-hidden hover:scale-105 transition-transform duration-300 outline outline-white">
                    <img
                      src="https://tutorial45.com/wp-content/uploads/2017/11/arduino-gas-sensor.jpg"
                      alt="Image 3"
                      className="lg:w-48 md:w-36 w-20 lg:h-48 md:h-36 h-20 object-cover"
                    />
                  </div>
                  <p className="sm:w-auto w-24 sm:text-base text-sm text-center mt-4 text-gray-800 hover:text-red-600 transform sm:hover:translate-x-[-6px] hover:translate-x-[-10px] duration-200 cursor-pointer font-semibold">
                    All type Sensors <span className="font-bold">&rarr;</span>
                  </p>
                </div>
              </Link>
              <Link to="/result?cat=led">
                <div className="flex flex-col items-center">
                  <div className="lg:w-48 md:w-36 w-20 lg:h-48 md:h-36 h-20 rounded-full overflow-hidden hover:scale-105 transition-transform duration-300 outline outline-white">
                    <img
                      src="https://ae01.alicdn.com/kf/Hc696125dd61f4c31aee47ea8e9f60ee9S/12mm-bullet-DC12V-WS2818-RGB-full-color-addressable-LED-pixel-light-IP68-all-BLACK-wire-100pcs.jpg"
                      alt="Image 4"
                      className="lg:w-48 md:w-36 w-20 lg:h-48 md:h-36 h-20 object-cover"
                    />
                  </div>
                  <p className="sm:w-auto w-16 sm:text-base text-sm text-center mt-4 text-gray-800 hover:text-red-600 transform sm:hover:translate-x-[-6px] hover:translate-x-[-10px] duration-200 cursor-pointer font-semibold">
                    Pixel LED's <span className="font-bold">&rarr;</span>
                  </p>
                </div>
              </Link>
              <Link to="/result?cat=speakers">
                <div className="flex flex-col items-center">
                  <div className="lg:w-48 md:w-36 w-20 lg:h-48 md:h-36 h-20 rounded-full overflow-hidden hover:scale-105 transition-transform duration-300 outline outline-10 outline-white">
                    <img
                      src="https://m.media-amazon.com/images/I/61Ou6sDalKL._UX250_.jpg"
                      alt="Image 5"
                      className="lg:w-48 md:w-36 w-20 lg:h-48 md:h-36 h-20 object-cover"
                    />
                  </div>
                  <p className="sm:text-base text-sm text-center mt-4 text-gray-800 hover:text-red-600 transform sm:hover:translate-x-[-6px] hover:translate-x-[-10px] duration-200 cursor-pointer font-semibold">
                    Bass and Speakers <span className="font-bold">&rarr;</span>
                  </p>
                </div>
              </Link>
            </div>

        </div>

          <div className='mt-10 sm:mt-16 md:mt-20 text-xl sm:text-2xl font-semibold text-center '>Featured Products </div>

          <div className='flex flex-wrap sm:mt-10 mt-6 '>
                  {posts.filter((post) => post.status === true)
                  
                  .map((post) => (                     
                      <div key={post._id} className='sm:p-2 p-0 sm:w-1/4 w-1/2 '>
                          <Postcard {...post}/>
                      </div>   
                  ))}
          </div>

          <div className='mt-12 text-xl sm:text-2xl font-semibold'>IOT Sensors</div>

          <div className="flex sm:overflow-hidden overflow-x-scroll mt-7">
                {/* Transition container */}
                <div className="flex transition-transform duration-500">
                {posts.filter((post) => post.category === "sensors")
                  .map((post) => (                     
                        <div key={post._id} className='w-64 h-auto border border-r-1 bg-white '>
                          {/* $id, title, image, price, brand, description */}
                          <Postcard1 {...post} />
                        </div>
                  ))}
                </div>
          </div>

          <div className='mt-16 text-2xl font-semibold'>Built-in Projects</div>

          <div className="grid mt-7 border grid-cols-1 md:grid-cols-2 gap-2">
                {posts.filter((post) => post.category === "built")
                  .map((post) => (
                      <Postcard2 key={post._id} {...post} />
                  ))}
          </div>
          
      </div>
      <section className="bg-gray-100 py-16 sm:mx-24 mx-4 mt-10 ">
          <div className="container mx-auto ">
              <div className="flex flex-wrap justify-center ">
                  <div className="w-full md:w-1/2 xl:w-1/4 sm:mt-0 mt-6"> 
                      <div className=' flex'>
                        <div className=' w-16 h-10'><img src={shipping} className="h-10 mx-auto  my-auto" /></div>
                        <h2 className="text-xl font-bold mb-2 ">Free Shipping</h2>
                      </div>
                      <p className="text-lg ml-16">Free Shipping on all prepaid <br /> orders above Rs. 999</p>
                  </div>
                  <div className="w-full md:w-1/2 xl:w-1/4 sm:mt-0 mt-6">
                      <div className=' flex'>
                        <div className=' w-16 h-10'><img src={carts} className='h-10 mx-auto my-auto' /></div>
                        <h2 className="text-xl font-bold mb-2">Quality Assurance</h2>
                      </div>
                      <p className="text-lg ml-16">Enjoy 100% premium quality <br /> products</p>
                  </div>
                  <div className="w-full md:w-1/2 xl:w-1/4 sm:mt-0 mt-6">
                      <div className=' flex'>
                        <div className=' w-16 h-10'><img src={support} className="h-10 mx-auto my-auto" /></div>
                        <h2 className="text-xl font-bold mb-2">Top-notch Support</h2>
                      </div>
                      <p className="text-lg ml-16">Call: +91 7451811626</p>
                      <p className="text-lg ml-16">Mail: <a href="mailto:ttushar476@gmail.com" className="text-blue-600 hover:text-blue-900">support@electrobazar.in</a></p>
                      <p className="text-lg ml-16">Timings: 9am to 9pm, <br /> Days: Mon-Sun</p>
                  </div>
                  <div className="w-full md:w-1/2 xl:w-1/4 sm:mt-0 mt-6">
                      <div className=' flex'>
                        <div className=' w-16 h-10'><img src={secure} className="h-10 mx-auto my-auto" /></div>
                        <h2 className="text-xl font-bold mb-2">Secure Payments</h2>
                      </div>
                      <p className="text-lg ml-16">100% Secure Payments by  <br /> Trusted Payment Gateways</p>
                  </div>
              </div>
          </div>
      </section>
    </ div>
  )
}

export default allpost
