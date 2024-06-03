import React, {useState, useEffect} from 'react'
import del from "../component/images/delete.png"
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import conf from "./conf/conf";


function wishlist({userId, product_details, createdAt, _id}) {
    // console.log("products", userId, product_details, createdAt, _id);

    const [selectedNumber, setSelectedNumber] = useState(1);
    // console.log(selectedNumber);
    const  navigate = useNavigate();


    const handleSelectChange = (event) => {
        const value = event.target.value;
        setSelectedNumber(value);
    };

    const onclick = async() => {
        try {
            // console.log("product details", product_details._id, selectedNumber);
          const cart =await axios.post(`${conf.apiUrl}/cart/create/${product_details?._id}`, {quantity: parseInt(selectedNumber)}, {
            withCredentials: true
          })
          if (cart) {
            navigate('/cart');
          }
        } catch (error) {
          console.log(error.message)
        }
    }

    const delt = async() => {
        try {
            const update = await axios.post(`${conf.apiUrl}/wishlist/deleteList/${_id}`, {}, {
                withCredentials: true
            })
            if (update) {
              window.location.reload();
            }
        } catch (error) {
          console.log(error.message)
        }
    }

  return (
        <div className='bg-white sm:h-20 h-auto sm:flex block  sm:mt-5 mt-4 sm:mx-auto mx-8 shadow-md font-light'>
            <Link to={`/post/${product_details?._id}`}><div className='  width sm:h-20 h-auto sm:w-[730px] w-auto sm:flex  block'>
              <div className='  sm:w-32 w-52 overflow-hidden ml-2  my-1'>
                <img src={product_details?.image[0]} className='sm:h-20 sm:mx-auto sm:my-auto mx-5 h-40  ' />
              </div>
              <div className='w-[480px]  my-auto'>
                <p className=' sm:mt-0 mt-1 ml-8 mx-2 hover:text-red-600 transform sm:hover:translate-x-[-6px] duration-300 cursor-pointer'>{product_details?.title.length > 90 ? (<span>{product_details?.title.slice(0, 90)}...</span>) : (<span>{product_details?.title}</span>)}</p>
              </div>
            </div></Link>
            <div className='  sm:flex hidden h-20 w-32 '>
              <p className='  my-auto w-40 '>{createdAt?.slice(0, 10)}</p>
            </div>
            <div className='  sm:h-20 h-auto w-28 '>
              <p className='  my-7 sm:mx-0 mx-4 text-center '>₹ {product_details?.price}</p>
            </div>
            <div className='  sm:block hidden h-20 w-40 '>
              <select value={selectedNumber} onChange={handleSelectChange} className='border my-auto w-24 outline-none px-4 py-1 mt-6 ml-8'>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
              </select>
            </div>
            <div className=' flex justify-between'>
              <div className='  sm:h-20 h-auto w-40'>
                <button onClick={() => onclick()} className='sm:mt-6 mt-1 w-28 ml-6 bg-gray-50 text-green-500 py-[2px] font-medium border'>Add to Cart</button>
              </div> 
              <div className=' sm:h-20 h-auto sm:w-24 w-16 sm:mr-auto mr-2 text-center'>
                <button onClick={() => delt()} className=' text-4xl mt-5'>×</button>
              </div>
            </div>
        </div>
    )
}

export default wishlist
