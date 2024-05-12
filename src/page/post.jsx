import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button, } from '../component'
import {useSelector} from 'react-redux'
import img1 from "../component/images/whishlist1.png";
import img2 from "../component/images/whishlist2.png";
import '../component/signup.css'
import axios from 'axios'
import edit from "../component/images/edit.png"
import del from "../component/images/delete1.png"
import { toast } from 'react-toastify';
import conf from "../component/conf/conf"


function Post() {
  const userData = useSelector(state => state.auth.userData)
  const { slug } = useParams();

  const active = useSelector(state => state.auth.status)

  // console.log("ui", slug)
  const navigate = useNavigate();
  const [post, setPost] = useState()
  console.log("this is product post", post);
  const [value, setValue] = useState(1);
  const [img, setImg] = useState(0);
  const [like, setLike] = useState(false)

  useEffect(() => {
    axios.post(`${conf.apiUrl}/wishlist/getWishlistById/${post?._id}`, {}, {
      withCredentials: true
    }).then((lk) => {
      // console.log("lk", lk);
      if (lk) {
        setLike(lk.data.data)
      }
    })
  })

  // title, brand, userid, price, image, quantity
  const onClick = async() => {
    if (active) {
      try {
        const cart = await axios.post(`${conf.apiUrl}/cart/create/${post._id}`, {quantity: value}, {
          withCredentials: true
        })
        if (cart) {
          navigate('/cart');
        }
      } catch (error) {
        console.log(error.message)
      }
    } else {
      toast.error("First login to add something in Cart")
    }
    
  }


  const wish = async() => {
    if (active) {
      try {
        await axios.post(`${conf.apiUrl}/wishlist/addWishlist/${post._id}`, {}, {
          withCredentials: true
        }).then((wish) => {
          if (wish) {
            // console.log("wish", wish);
            setLike(wish.data.data)
            toast.success(wish.data.message)
          }
        })
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
    } else {
      toast.error("First login to add something in wishlist")
    }
    
  }


  const handledelete = async () => {
    // alert('Are you sure to delete this item')
    const auth = await axios.post(`${conf.apiUrl}/product/deleteProduct/${post._id}`, {}, {
      withCredentials: true
    })
    if (auth) {
      toast.success(auth.data.message)
      navigate('/')
    }
  }

  useEffect(() => {
    // console.log("working");
    if (slug) {
      axios.post(`${conf.apiUrl}/product/getProduct/${slug}`, {}, {
        withCredentials: true
      }).then((post) => {
        if (post) setPost(post.data.data);
        else navigate("/")
      });
    }else navigate("/")
  }, [slug, navigate]);

  const checkActive = () => {
    if (active) {
      navigate(`/order/${post._id}?quantity=${value}`)
    } else {
      toast.error("First Login to order something")
    }
  }
  
  if (!post) {
    // If post is still being fetched or is undefined, you can show a loading state
    return <p>Loading...</p>;
  } else {
    // console.log('post', post)
  }
  
  const isAuthor = userData?._id && post?.owner ? userData._id === post.owner : false;
  

  return (
    <div className='bg-gray-100 mt-1'>
      <div id='post' className='w-full pt-5 h-screen mx-auto px-4 bg-gray-100'>
          <div id='post1' className='w-1/2 h-full float-left'>
            <div id='post123' className='w-full bg-white'>
              <div className='float-left mx-8 my-5 '>
                {post.image?.slice(0, 6).map((post, index) => (
                  <img key={index} onMouseOver={() => setImg(index)} id='post11' className={`mb-5  ${img === index? 'border border-red-600': ''} cursor-pointer`} style={{ width: '85px', height: '75px' }} src={post} alt="Image" />
                ))}
              </div>
              {post.image[0]? <img height="900" className='float-left mx-6 mt-5 ml-20 zoomable-image' style={{ width: '400px' }} src={post.image[img]} alt="Image" /> : null}
            </div>
            <div id='clear' className='my-8 h-48 clear-left bg-white'>
              <p className='text-xl font-semibold mx-14 pt-7 w-auto float-left clear-left text-violet-900'>Brand : </p><span className='text-gray-700 mt-7 ml-40 float-left text-xl font-semibold'>{post.brand}</span>
              <p className='text-xl font-semibold mx-14 pt-7 w-auto float-left clear-left text-violet-900'>Use of product : </p><span className='text-gray-700 mt-7 ml-20 float-left text-xl font-semibold'>{post.use}</span>
              <p className='text-xl font-semibold mx-14 pt-7 w-auto float-left clear-left text-violet-900'>Material : &nbsp;</p><span className='text-gray-700 mt-7 ml-32 float-left text-xl font-semibold'>{post.material}</span>
            </div >

            <div id='clear' className='my-8 h-48 clear-left bg-white'>
              <p className='text-xl font-semibold mx-14 pt-7 w-auto float-left clear-left text-violet-900'>Height : </p><span className='text-gray-700 mt-7 ml-20 float-left text-xl font-semibold'>{post.height}</span>
              <p className='text-xl font-semibold mx-14 pt-7 w-auto float-left clear-left text-violet-900'>Width : &nbsp;</p><span className='text-gray-700 mt-7 ml-20 float-left text-xl font-semibold'>{post.width}</span>
              <p className='text-xl font-semibold mx-14 pt-7 w-auto float-left clear-left text-violet-900'>Weight : </p><span className='text-gray-700 mt-7 ml-20 float-left text-xl font-semibold'>{post.weight}</span>
            </div>
          </div>
              
          <div id='post2' className='h-full  float-left bg-white'>
          <button className='widthdis ' onClick={() => wish()}><img src={like? img2 : img1} className='w-6 mt-2'/></button>
              <div className='flex justify-evenly'>
                <h1 className=' text-2xl font-semibold ml-8 mb-3'>{post.title}</h1>
                {isAuthor && (
                  <div className='flex justify-evenly '>
                    <Link to={`/edit/${slug}`}><button className='mt-4 h-10 mb-2 w-10 rounded-sm text-white mr-2'><img src={edit} className='w-8 h-8 mx-auto '/></button></Link>
                    <Link><button onClick={() => handledelete()} className='mt-4 h-10 mb-2 w-10 rounded-sm text-white ml-2' ><img src={del} className='w-8 h-8 mx-auto '/></button></Link>
                  </div>
                )}
              </div>
              <div className='w-full border'></div>
              <p className='mx-10 mt-8 text-xl text-gray-600 font-semibold'><span className='text-white pl-3 py-1 bg-green-600'>Model : </span>&nbsp;&nbsp;&nbsp;{post.model}</p>
              <p className='mx-10 mt-8 text-red-500 text-3xl font-semibold'><span className='text-black text-2xl'>Price : </span><span className='text-gray-900'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>₹ {post.price}</p>
              <p className='text-xl mt-8 ml-10 font-semibold'>Quantity : </p> 
              <button onClick={() =>  (value > 1) ? setValue(value -1) : null} className='bg-red-600 text-white ml-10 px-4 rounded-lg pb-2 text-2xl font-bold'>-</button><input className='mx-2 mt-5 px-3 py-2 rounded-lg bg-white text-black outline-none
              focus:bg-gray-50 duration-200 border border-gray-200' value={value} type='number' placeholder='Quantity'></input><button onClick={() => (value < 20) ? setValue(value + 1) : null} className='bg-green-600 rounded-lg  text-white px-3 pb-2 text-2xl font-bold'>+</button>
              <div className='mx-10 mt-10 text-xl'><button onClick={onClick} className='w-64 bg-green-600 transform hover:scale-110 duration-300 mr-5 py-2 text-white'>Add To Cart</button><button onClick={checkActive} className='w-64 bg-violet-900 transform hover:scale-110 duration-300 py-2 text-white'>Buy Now</button></div>
              <div className='mx-10 mt-10 text-2xl text-gray-700 font-semibold m-auto'><p>Description : </p></div>
              <div className='mx-10 mt-5 text-xl text-gray-700 font-semibold m-auto'>{post.description}</div>
          </div>
      </div>
    </div>
  )
}

export default Post
