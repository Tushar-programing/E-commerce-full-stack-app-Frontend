import React, { useState, useEffect } from 'react';
import { Postcard } from '../component';
import { Postcard1 } from '../component';
import { Link } from 'react-router-dom';
import axios from 'axios';
import img1 from '../component/images/scroller1.1.png';
import img2 from '../component/images/scroller2.png';
import img3 from '../component/images/scroller3.png';
import img31 from '../component/images/scroller4.png';
import img4 from '../component/images/drone.png';
import img5 from '../component/images/board.jpeg';
import img6 from '../component/images/ultra.jpg';
import img7 from '../component/images/pixel.jpg';
import img8 from '../component/images/speaker.jpg';
import slider from '../component/images/rslider.png';
import '../component/signup.css';

import conf from '../component/conf/conf';
import { LoginPopup } from '../component';
import { useSelector } from 'react-redux';

function Allpost() {
  const [posts, setPosts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [blockLeft, setBlockLeft] = useState(true);
  const [blockRight, setBlockRight] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 640);

  const active = useSelector((state) => state.auth.status);

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
      }).then((post) => setPosts(post.data.data));
    } catch (error) {
      console.log(error);
    }
  }, []);

  const slides = [
    { id: 1, image: img1, text: 'First slide' },
    { id: 2, image: img2, text: 'Second slide' },
    { id: 3, image: img3, text: 'Third slide' },
  ];

  const slideInterval = 2000;

  const handleNextSlide = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex === 2 ? prevIndex - 2 : prevIndex + 1));
  };

  useEffect(() => {
    const intervalId = setInterval(handleNextSlide, slideInterval);
    return () => clearInterval(intervalId);
  }, [slideInterval]);

  const currentSlide = slides[currentSlideIndex];

  const handleNextSlid = () => {
    setBlockLeft(false);
    const newIndex = currentIndex + 1;
    if (newIndex === posts.length - 4) setBlockRight(true);
    if (newIndex <= posts.length - 4) setCurrentIndex(newIndex);
  };

  const handleBackSlid = () => {
    setBlockRight(false);
    const newIndex = currentIndex - 1;
    if (newIndex === 0) setBlockLeft(true);
    if (newIndex >= 0) setCurrentIndex(newIndex);
  };

  const handleTouchStart = (e) => {
    const touchStartX = e.touches[0].clientX;
    setStartX(touchStartX);
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const touchEndX = e.touches[0].clientX;
    const distance = startX - touchEndX;
    if (distance > 50) {
      handleNextSlid();
    } else if (distance < -50) {
      handleBackSlid();
    }
    setIsDragging(false);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  return (
    <div className='bg-gray-100 pb-20 '>
      <LoginPopup open={active} />
      <div className='lide w-32 absolute z-10'>
        {slides.map((slide) => (
          <button key={slide.id} onClick={() => setCurrentSlideIndex(slide.id - 1)} className={`sm:w-5 w-4 sm:h-5 h-4 border border-white  rounded-2xl ml-2  ${currentSlideIndex === (slide.id - 1) ? 'bg-white' : 'bg-gray-400'}`}></button>
        ))}
      </div>
      <div className="slideshow sm:mt-8 mt-0 ">
        <div className="flex overflow-hidden sm:mt-10 mt-3">
          <div className="flex transition-transform duration-500" style={{ transform: isSmallScreen ? `translateX(-${currentSlideIndex * 4 * 96}px)` : `translateX(-${currentSlideIndex * 4 * 400}px)` }}>
            {slides.map((img) => (
              <div key={img.id} className="outline w-screen">
                <img src={img.image} alt={img.text} className="screen" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className=' sm:max-w-7xl max-w-3xl mx-auto px-4 '>
        <div className=' h-auto sm:mt-10 mt-5 sm:mb-7 mb-0 border '>
          <p className='sm:text-2xl text-lg font-semibold mb-7'>Our Collections</p>
          <div className="sm:h-auto h-[320px] grid sm:grid-cols-5 grid-cols-3 ">
            <Link to="/result?cat=drones">
              <div className="flex flex-col items-center ">
                <div className="sm:w-52 w-20 sm:h-52 h-20 rounded-full overflow-hidden hover:scale-105 transition-transform duration-300 outline outline-white">
                  <img
                    src={img4}
                    alt="Image 1"
                    className="sm:w-52 w-20 sm:h-52 h-20 object-cover"
                  />
                </div>
                <p className="sm:text-base text-sm text-center mt-4 text-gray-800 hover:text-red-600 transform sm:hover:translate-x-[-15px] hover:translate-x-[-10px] duration-300 cursor-pointer font-semibold">
                  Drone and Rc planes <span className="font-bold">&rarr;</span>
                </p>
              </div>
            </Link>
            <Link to="/result?cat=boards">
              <div className="flex flex-col items-center">
                <div className="sm:w-52 w-20 sm:h-52 h-20 rounded-full overflow-hidden hover:scale-105 transition-transform duration-300 outline outline-white">
                  <img
                    src={img5}
                    alt="Image 2"
                    className="sm:w-52 w-20 sm:h-52 h-20 object-cover"
                  />
                </div>
                <p className="sm:w-auto w-24 sm:text-base text-sm text-center mt-4 text-gray-800 hover:text-red-600 transform sm:hover:translate-x-[-15px] hover:translate-x-[-10px] duration-300 cursor-pointer font-semibold">
                  Arduino Boards <span className="font-bold">&rarr;</span>
                </p>
              </div>
            </Link>
            <Link to="/result?cat=sensors">
              <div className="flex flex-col items-center">
                <div className="sm:w-52 w-20 sm:h-52 h-20 rounded-full overflow-hidden hover:scale-105 transition-transform duration-300 outline outline-white">
                  <img
                    src={img6}
                    alt="Image 3"
                    className="sm:w-52 w-20 sm:h-52 h-20 object-cover"
                  />
                </div>
                <p className="sm:w-auto w-24 sm:text-base text-sm text-center mt-4 text-gray-800 hover:text-red-600 transform sm:hover:translate-x-[-15px] hover:translate-x-[-10px] duration-300 cursor-pointer font-semibold">
                  All type Sensors <span className="font-bold">&rarr;</span>
                </p>
              </div>
            </Link>
            <Link to="/result?cat=led">
              <div className="flex flex-col items-center">
                <div className="sm:w-52 w-20 sm:h-52 h-20 rounded-full overflow-hidden hover:scale-105 transition-transform duration-300 outline outline-white">
                  <img
                    src={img7}
                    alt="Image 4"
                    className="sm:w-52 w-20 sm:h-52 h-20 object-cover"
                  />
                </div>
                <p className="sm:w-auto w-16 sm:text-base text-sm text-center mt-4 text-gray-800 hover:text-red-600 transform sm:hover:translate-x-[-15px] hover:translate-x-[-10px] duration-300 cursor-pointer font-semibold">
                  Pixel LED's <span className="font-bold">&rarr;</span>
                </p>
              </div>
            </Link>
            <Link to="/result?cat=speakers">
              <div className="flex flex-col items-center">
                <div className="sm:w-52 w-20 sm:h-52 h-20 rounded-full overflow-hidden hover:scale-105 transition-transform duration-300 outline outline-10 outline-white">
                  <img
                    src={img8}
                    alt="Image 5"
                    className="sm:w-52 w-20 sm:h-52 h-20 object-cover"
                  />
                </div>
                <p className="sm:text-base text-sm text-center mt-4 text-gray-800 hover:text-red-600 transform sm:hover:translate-x-[-15px] hover:translate-x-[-10px] duration-300 cursor-pointer font-semibold">
                  Bass and Speakers <span className="font-bold">&rarr;</span>
                </p>
              </div>
            </Link>
          </div>
        </div>
        <div className='flex flex-wrap sm:mt-12 mt-6'>
          {posts.filter((post) => post.status === true)
            .map((post) => (
              <div key={post.$id} className='sm:p-2 p-0 sm:w-1/4 w-1/2 '>
                <Postcard {...post} />
              </div>
            ))}
        </div>
        <div
          className="flex overflow-hidden mt-10"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 4 * 64}px)` }}>
            {posts.filter((post) => post.category === 'sensors')
              .map((post) => (
                <div key={post.$id} className='w-64 h-auto border '>
                  <Postcard1 {...post} />
                </div>
              ))}
          </div>
          {posts.filter((post) => post.category === 'sensors').length > 4 && (
            <>
              <button onClick={handleBackSlid} className={`margin absolute mt-40 bg-violet-900 ml-1 ${blockLeft ? 'hidden' : ''} sm:block hidden`}>
                <img className='w-6 ml-2' src={slider} style={{ transform: 'rotate(90deg)' }} />
              </button>
              <button onClick={handleNextSlid} className={`margin absolute mt-40 bg-violet-900 ${blockRight ? 'hidden' : ''} sm:block hidden`}>
                <img className='w-6 ml-3' src={slider} style={{ transform: 'rotate(-90deg)' }} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Allpost;
