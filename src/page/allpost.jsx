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
import "../component/signup.css"

import conf from "../component/conf/conf"
import { LoginPopup } from '../component'
import {useSelector} from 'react-redux'


function allpost() {
    const [posts, setPosts] = useState([]);
    // console.log("posts", posts);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [blockLeft, setBlockLeft] = useState(true)
    const [blockRight, setBlockRight] = useState(false)

    const active = useSelector(state => state.auth.status)

    useEffect(() => {
      try {
        axios.post(`${conf.apiUrl}/product/products`, {}, {
          withCredentials: true,
      }).then((post) => setPosts(post.data.data))
      } catch (error) {
        console.log(error);
      }
      
  }, [])

// console.log(posts.length);

const slides = [
  { id: 1, image: img1, text: 'First slide' },
  { id: 2, image: img2, text: 'Second slide' },
  { id: 3, image: img3, text: 'Third slide' },
  
];

console.log("currentSlideIndex", currentSlideIndex);

const slideInterval = 2000; 

// Function to handle changing the slide to the next one
const handleNextSlide = () => {
  setCurrentSlideIndex((prevIndex) => (prevIndex === 2? prevIndex -2:  prevIndex + 1));
};


    useEffect(() => {
      const intervalId = setInterval(handleNextSlide, slideInterval);
     
      return () => clearInterval(intervalId);
    }, [slideInterval]);

    const currentSlide = slides[currentSlideIndex];

    const handleNextSlid = () => {
        setBlockLeft(false)
        
        const newIndex = currentIndex +1;
        if (newIndex === posts.length - 4) setBlockRight(true)
        // console.log(posts.length);
        if (newIndex <= posts.length - 4) setCurrentIndex(newIndex);
    };

    const handleBackSlid = () => {
      setBlockRight(false)
      const newIndex = currentIndex -1;
        // console.log(posts.length);
        if (newIndex === 0) setBlockLeft(true) 
        if (newIndex >= 0) setCurrentIndex(newIndex);
    }
    

  return (
    <div className='bg-gray-100 pb-20 '>
      <LoginPopup open={active}/>
      <div className='lide w-32 absolute z-10'>
        {slides.map((slide) => (
          <button key={slide.id} onClick={() => setCurrentSlideIndex(slide.id -1)}  className={`w-5 h-5 border border-white  rounded-2xl ml-2  ${currentSlideIndex=== (slide.id - 1) ? 'bg-white' : 'bg-gray-400'}`}></button>
        ))}
      </div>
      
      <div className="slideshow mt-8">
          <div className="flex overflow-hidden mt-10">
            <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentSlideIndex * 4 * 400}px)` }}>
              {slides.map((img) => (
                <div key={img.id} className="outline w-screen">
                    <img src={img.image} alt={img.text} className="screen" />
                </div>
              ))}
            </div>
          </div>
              {/* <div className="">
                  <img src={currentSlide.image} alt={currentSlide.text} className=" w-screen" />
              </div> */}
      </div>
      <div className='w-full max-w-7xl mx-auto px-4'>
        <div className=' h-72 mt-10 mb-7'>
            <p className='text-2xl font-semibold mb-7'>Our Collections</p>
            <div className="h-60 flex justify-between">
            <Link to="/result?cat=drones"><div className="flex flex-col items-center ">
                <div className="w-52 h-52 rounded-full overflow-hidden hover:scale-105 transition-transform duration-300 outline outline-white">
                    <img
                        src={img4}
                        alt="Image 1"
                        className="w-52 h-52 object-cover"
                    />
                </div>
                <p className="mt-4 text-gray-800 hover:text-red-600 transform hover:translate-x-[-15px] duration-300 cursor-pointer font-semibold">Drone and Rc planes <span className='font-bold'>&rarr;</span></p>
            </div></Link>
            <Link to="/result?cat=boards"><div className="flex flex-col items-center">
                <div className="w-52 rounded-full overflow-hidden hover:scale-105 transition-transform duration-300 outline outline-white">
                    <img
                        src={img5}
                        alt="Image 2"
                        className="w-52 h-52 object-cover"
                    />
                </div>
                <p className="mt-4 text-gray-800 hover:text-red-600 transform hover:translate-x-[-15px] duration-300 cursor-pointer font-semibold">Arduino Boards <span className='font-bold'>&rarr;</span></p>
            </div></Link>
            <Link to="/result?cat=sensors"><div className="flex flex-col items-center">
                <div className="w-52 rounded-full overflow-hidden hover:scale-105 transition-transform duration-300 outline outline-white">
                    <img
                        src={img6}
                        alt="Image 3"
                        className="w-52 h-52 object-cover"
                    />
                </div>
                <p className="mt-4 text-gray-800 hover:text-red-600 transform hover:translate-x-[-15px] duration-300 cursor-pointer font-semibold">All type Sensors <span className='font-bold'>&rarr;</span></p>
            </div></Link>
            <Link to="/result?cat=led"><div className="flex flex-col items-center">
                <div className="w-52 rounded-full overflow-hidden hover:scale-105 transition-transform duration-300 outline outline-white">
                    <img
                        src={img7}
                        alt="Image 4"
                        className="w-52 h-52 object-cover"
                    />
                </div>
                <p className="mt-4 text-gray-800 hover:text-red-600 transform hover:translate-x-[-15px] duration-300 cursor-pointer font-semibold">Pixel LED's <span className='font-bold'>&rarr;</span></p>
            </div></Link>
            <Link to="/result?cat=speakers"><div className="flex flex-col items-center">
                <div className="w-52 rounded-full overflow-hidden hover:scale-105 transition-transform duration-300 outline outline-10 outline-white">
                    <img
                        src={img8}
                        alt="Image 5"
                        className="w-52 h-52 object-cover"
                    />
                </div>
                <p className="mt-4 text-gray-800 hover:text-red-600 transform hover:translate-x-[-15px] duration-300 cursor-pointer font-semibold">Bass and Speakers <span className='font-bold'>&rarr;</span></p>
            </div></Link>
          </div>
        </div>

          <div className='flex flex-wrap mt-12'>
                  {posts.filter((post) => post.status === true)
                  
                  .map((post) => (                     
                      <div key={post.$id} className='p-2 w-1/4'>
                          <Postcard {...post} />
                      </div>   
                  ))}
          </div>

          
          <div className="flex overflow-hidden mt-10">
                {/* Transition container */}
                <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 4 * 64}px)` }}>
                {posts.filter((post) => post.category === "sensors")
                  .map((post) => (                     
                        <div key={post.$id} className='w-64 h-auto border '>
                          {/* $id, title, image, price, brand, description */}
                          <Postcard1 {...post} />
                        </div>
                  ))}
                </div>
              {posts.filter((post) => post.category === "sensors").length > 4 && <button onClick={handleBackSlid} className={`margin absolute mt-40 bg-violet-900 ml-1 ${blockLeft? 'hidden' : ''} `}><img className='w-6 ml-2' src={slider} style={{ transform: `rotate(90deg)` }} /></button>}
              {posts.filter((post) => post.category === "sensors").length > 4 && <button onClick={handleNextSlid} className={`margin absolute mt-40 bg-violet-900 ${blockRight? 'hidden' : ''}`}><img className='w-6 ml-3' src={slider} style={{ transform: `rotate(-90deg)` }} /></button>}
            </div>
      </div> 
    </ div>
  )
}

export default allpost
