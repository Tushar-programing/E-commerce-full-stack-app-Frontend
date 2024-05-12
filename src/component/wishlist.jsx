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
        <div className='bg-white h-40 flex justify-between mt-2'>
            <Link to={`/post/${product_details?._id}`}><div className='width h-40 w-[450px] flex justify-between'>
              <div className=' w-56 overflow-hidden'>
                <img src={product_details?.image[0]} className='mx-8 h-40' />
              </div>
              <div className='w-56'>
                <p className='mt-5 mx-5 text-red-600'>{product_details?.title.length > 23 ? (<span>{product_details?.title.slice(0, 23)}...</span>) : (<span>{product_details?.title}</span>)}</p>
                <p className='mt-5 mx-5 '><span className='text-violet-900'>Brand : </span> {product_details?.brand.length > 23? (<span>{product_details?.brand.slice(0, 23)}...</span>) : (<span>{product_details?.brand}</span>)}</p>
                <p className='mx-5 mt-5'><span className='text-violet-900'>Desc : </span> {product_details?.description.length > 23? (<span>{product_details?.description.slice(0, 17)}...</span>) : (<span>{product_details?.description}</span>)}</p>
              </div>
            </div></Link>
            <div className='h-40 w-40'>
              <p className=' mt-16 mx-8 '>{createdAt?.slice(0, 10)}</p>
            </div>
            <div className='h-40 w-40'>
              <p className='mt-16 mx-12 text-green-600'>₹ {product_details?.price}</p>
            </div>
            <div className=' h-40 w-40'>
              <select value={selectedNumber} onChange={handleSelectChange} className='border mt-16 mx-8 w-24 outline-none px-4 py-1'>
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
            <div className=' h-40 w-40'>
              <button onClick={() => onclick()} className='  mt-16 w-32 ml-4 bg-green-600 text-white py-1'>Add to Cart</button>
            </div>
            <div className=' h-40 w-40'>
              <button onClick={() => delt()}><img src={del} className=' w-10 mt-14 mx-14 '/></button>
            </div>
        </div>
    )
}

export default wishlist
