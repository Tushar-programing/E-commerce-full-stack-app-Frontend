import React, {useState} from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Button, Input } from '.'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
// import {Button as Buto} from '@mui/material/Button';
import './signup.css'
import axios from 'axios';
import conf from "./conf/conf";


function Post({ post }) {
  console.log(post)
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const userData = useSelector((state) => state.auth.userData);

  const [category, setCategory] = useState('boards');

  const handleChange = (e) => {
      const selectedCategory = e.target.value;
      setCategory(selectedCategory);
  };


  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      description: post?.description || "",
      price: post?.price || "",
      brand: post?.brand || "",
      model: post?.model || "",
      use: post?.use || "",
      material: post?.material || "",
      keyword: post?.keyword || "",
      status: post?.status ||"",
      weight: post?.weight ||"",
      height: post?.height || "",
      width: post?.width || "",
    },
  })

  const List = async (data) => {
    setOpen(true)
    // Create a FormData object
    const formData = new FormData();

    // Append all form fields and files to the FormData object
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('keyword', data.keyword);
    formData.append('status', data.status);
    formData.append('brand', data.brand);
    formData.append('model', data.model);
    formData.append('use', data.use);
    formData.append('material', data.material);
    formData.append('width', data.width);
    formData.append('height', data.height);
    formData.append('weight', data.weight);
    formData.append('category', category)
    formData.append('price', data.price);

    // Append all images from the form input to the FormData object
    if (data.images.length > 0) {
      for (let i = 0; i < data.images.length; i++) {
        formData.append('images', data.images[i]);
      }
    } 

    if (post) {
      try {
        console.log(formData.images);
        const response = await axios.post(`${conf.apiUrl}/product/updateProduct/${post._id}`, formData, {
            withCredentials: true,
        });

        if (response) {
            
            navigate(`/post/${response.data.data._id}`);
            toast.success(response.data.message)
        }
      } catch (error) {
          console.error('Error while listing product:', error);
          toast.error(error.message)
      }
    } else {
      try {
        console.log(formData.images);
        const response = await axios.post(`${conf.apiUrl}/product/listProduct`, formData, {
            withCredentials: true, 
        });

        if (response) {
            
            navigate(`/post/${response.data.data._id}`);
            toast.success(response.data.message)
        }
      } catch (error) {
        setOpen(false)
          // Handle errors
          console.error('Error while listing product:', error);
          toast.error(error.message)
      }
    }
};

    

  // title#, keyword#, status#, brand$, model$, use$, material$, width@, height@, weight@, userid(), price, image
  return (
    <div className='w-full h-auto flex justify-center'>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      ><div className='mr-5 text-white py-2 px-3 bg-black'>Please wait while uploading your product</div>
        <CircularProgress color="inherit" />
      </Backdrop>
      <form onSubmit={handleSubmit(List)} id='form3' >
        <div><h1 className='text-2xl text-center mb-10 mr-11 mt-5 font-semibold'>Add item</h1></div>
        <div id='rd' className='mr-20 float-left'>
          <Input
            label="Title : "
            className1=" mb-5 text-violet-900 font-semibold"
            className2=" mb-8  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder='Title...'
            autocomplete="off"
            {...register("title", {     //here name is keyword
              required: true,
            })}
          />
          <label className='inline-block mb-5 pl-1 text-violet-900 font-semibold'>Description : </label>
          <textarea rows={4} cols={100} className="px-3 py-2 rounded-lg bg-white text-black outline-none
           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 duration-200 border border-gray-200 w-full" type="text" placeholder="Description.."
            {...register("description", {     //here name is keyword
              required: true,
            })}
          >
          </textarea>
          <Input
            label="Price : "
            type="number"
            className1=" mb-5 mt-5 text-violet-900 font-semibold"
            className2=" mb-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder='Price...'
            autocomplete="off"
            {...register("price", {     //here name is keyword
              required: true,
            })}
          />
          <Input
            label="Brand : "
            className1=" mb-5 text-violet-900 font-semibold"
            className2=" mb-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder='Brand...'
            autocomplete="off"
            {...register("brand", {     //here name is keyword
              required: true,
            })}
          />
          <Input
            label="Model name: "
            className1=" mb-5 text-violet-900 font-semibold"
            className2=" mb-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder='Model name...'
            autocomplete="off"
            {...register("model", {     //here name is keyword
              required: true,
            })}
          />
          <Input
            label="Uses of : "
            className1=" mb-5 text-violet-900 font-semibold"
            className2=" mb-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder='Full Name...'
            autocomplete="off"
            {...register("use", {     //here name is keyword
              required: true,
            })}
          />
          <Input
            label="Material : "
            className1=" mb-5 text-violet-900 font-semibold"
            className2=" mb-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder='Material...'
            autocomplete="off"
            {...register("material", {     //here name is keyword
              required: true,
            })}
          />
        </div>

        <div id='rd' className='ml-20 float-left'>
          <label className='inline-block mb-5 pl-1 font-semibold text-violet-900'>Enter keywords : </label>
          <textarea rows={3} cols={100} className="px-3 mb-8 py-2 rounded-lg bg-white text-black outline-none
           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 duration-200 border border-gray-200 w-full" type="text" placeholder="keywords.."
            {...register("keyword", {     //here name is keyword
              required: true,
            })}
          >
          </textarea>

          <label className='mt-5 text-violet-900 font-semibold' >Choose status :</label>
          <select className='px-3 mb-10 mt-4 py-2 rounded-lg bg-white text-black outline-none
           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 duration-200 border border-gray-200 w-full' {...register("status", {     //here name is keyword
            required: true,
          })}>
            <option className='text-violet-900' value={true}>Active</option>
            <option className='text-violet-900' value={false}>inActive</option>
          </select>
          <Input
            label="Weight: "
            type="number"
            className1=" mb-5 text-violet-900 font-semibold"
            className2=" mb-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder='weight...'
            autocomplete="off"
            {...register("weight", {     //here name is keyword
              required: true,
            })}
          />
          <Input
            label="Height: "
            type="number"
            className1=" mb-5 text-violet-900 font-semibold"
            className2=" mb-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder='height...'
            autocomplete="off"
            {...register("height", {     //here name is keyword
              required: true,
            })}
          />
          <Input
            label="Width : "
            type="number"
            className1=" mb-5 text-violet-900 font-semibold"
            className2=" mb-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder='width...'
            autocomplete="off"
            {...register("width", {     //here name is keyword
              required: true,
            })}
          />
          <label className='mt-5 text-violet-900 font-semibold' >Choose category :</label>
          <select  className='px-3 mb-10 mt-4 py-2 rounded-lg bg-white text-black outline-none
           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 duration-200 border border-gray-200 w-full' 
           value={category}
           onChange={handleChange}
          >
            <option className='text-violet-900' value="boards">Boards</option>
            <option className='text-violet-900' value="sensors">Sensors</option>
            <option className='text-violet-900' value="motors">Dc motors</option>
            <option className='text-violet-900' value="speakers">Buzzers & Speakers</option>
            <option className='text-violet-900' value="batteries">Batteries</option>
            <option className='text-violet-900' value="chargers">Chargers</option>
            <option className='text-violet-900' value="bluthooth">Bluetooth module</option>
            <option className='text-violet-900' value="capacitors">Capacitors & Transistors</option>
            <option className='text-violet-900' value="led">LED's</option>
            <option className='text-violet-900' value="drones">Drones</option>
            <option className='text-violet-900' value="cars">Rc cars</option>
            <option className='text-violet-900' value="other">other's</option>
          </select>
          <Input
            label="Image : "
            type="file"
            multiple="multiple"
            className1=" mb-5 text-violet-900 font-semibold"
            className2=" mb-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder='images...'
            autocomplete="off"
            {...register("images", {     //here name is keyword
              required: post? false : true,
            })}
          />
          {post && (
            <div className=' h-20 w-min flex justify-evenly'>
              {post.image.slice(0, 5).map((imge, index) => (
                <div key={index} className='w-24  border overflow-hidden'>
                <img
                width={80}
                src={imge}
                alt={imge}
                className="rounded-lg mx-auto"
                />
                </div>
              ))}
            </div>
          )}
          <Button className='w-full mt-5 mb-16 text-xl hover:bg-violet-800' type="submit">{post? (<span>Update Item</span>) : (<span>List Item</span>)}</Button>
        </div>
      </form>
    </div>
  )
}

export default Post
