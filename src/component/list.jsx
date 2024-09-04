import React, {useState} from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Input } from '.'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
// import {Button as Buto} from '@mui/material/Button';
import './signup.css'
import axios from 'axios';
import conf from "./conf/conf";

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


function Post({ post }) {
  console.log("this is category", post?.category);

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  
  console.log(post)
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const userData = useSelector((state) => state.auth.userData);

  const [situation, setSituation] = useState('category');

  const [category, setCategory] = useState(post?.category || 'brand');
  const [subCategory, setSubCategory] = useState(post?.subCategory || '');
  const [instagram, setInstagram] = useState(post?.instagram || '');

  const [selectedFiles, setSelectedFiles] = useState([]);

  const [allImages, setAllImages] = useState([])

  const handleChange = (e) => {
      const selectedCategory = e.target.value;
      setCategory(selectedCategory);
  };

  const subhandleChange = (e) => {
    const subCategory = e.target.value;
    setSubCategory(subCategory);
  };

  const handleInstagram = (e) => {
    const subCategory = e.target.value;
    setInstagram(subCategory);
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
    console.log(data);
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
    formData.append('subCategory', subCategory)
    formData.append('instagram', instagram)
    formData.append('price', data.price);

    // Append all images from the form input to the FormData object
    if (selectedFiles?.length > 0) {
      selectedFiles.forEach(file => {
        formData.append('images', file);
      });
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
        console.log(formData);
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

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setAllImages(imageUrls);
  };


  const handleImageChange = () => {
    console.log(post?.image?.length);
    if (selectedFiles.length > 0 || post?.image?.length > 0) {
      setSituation('about');
    } else {
      toast.error('Please upload at least one image');
    }
  };

  // title#, keyword#, status#, brand$, model$, use$, material$, width@, height@, weight@, userid(), price, image
  return (
    <div className='w-full h-auto '>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      ><div className='mr-5 text-white py-2 px-3 bg-black'>Please wait while uploading your product</div>
        <CircularProgress color="inherit" />
      </Backdrop>

      <div className=' grid grid-cols-12 mx-10 gap-3 '>
          <div className='border col-span-2'><button className={`border w-full py-3 text-white ${situation === 'category'? 'bg-black' : 'bg-gray-800'} `}>Category</button></div>
          <div className='border col-span-2'><button className={`border w-full py-3 text-white ${situation === 'image'? 'bg-black' : 'bg-gray-800'} `}>Image</button></div>
          <div className='border col-span-2'><button className={`border w-full py-3 text-white ${situation === 'about'? 'bg-black' : 'bg-gray-800'} `}>About product</button></div>
      </div>

      <form onSubmit={handleSubmit(List)} className=' mx-10 mt-5'>

          {situation === 'category' && <><label className='mt-5 text-violet-900 font-semibold' >Choose category :</label>
          <select  className='px-3 mb-2 mt-4 py-2 rounded-lg bg-white text-black outline-none
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 duration-200 border border-gray-200 w-full' 
            value={category}
            onChange={handleChange}
          >
            <option className='text-violet-900' value="ceiling">Ceiling Fixtures</option>
            <option className='text-violet-900' value="chandelier">Chandeliers</option>
            <option className='text-violet-900' value="lamp">Lamps & Lighting</option>
            <option className='text-violet-900' value="outdoor">Outdoor Lighting</option>
            <option className='text-violet-900' value="plants">Plants & Botanicals</option>
            <option className='text-violet-900' value="wall">Wall Lamps</option>
            <option className='text-violet-900' value="garden">Garden Lighting</option>
            <option className='text-violet-900' value="floor">Floor Lamp</option>
            <option className='text-violet-900' value="diwali">Diwali Light</option>
            <option className='text-violet-900' value="mood">Mood Lighting</option>
            <option className='text-violet-900' value="patio">Patio Lights</option>
            <option className='text-violet-900' value="other">Other's</option>
          </select>

          <select  className='px-3 mb-10 py-2 rounded-lg bg-white text-black outline-none
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 duration-200 border border-gray-200 w-full max-w-64' 
            value={subCategory}
            onChange={subhandleChange}
          >
            <option className='text-violet-900' value="">Category</option>
            <option className='text-violet-900' value="trend">Trend</option>
            <option className='text-violet-900' value="new">new</option>
          </select>

          <select  className='ms-3 px-3 mb-10 py-2 rounded-lg bg-white text-black outline-none
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 duration-200 border border-gray-200 w-full max-w-64' 
            value={instagram}
            onChange={handleInstagram}
          >
            <option className='text-violet-900' value="false">false</option>
            <option className='text-violet-900' value="true">true</option>
          </select>

          <div className=' text-center'><Button className='w-44' onClick={() => setSituation('image')} variant="outlined">Next</Button></div>
          </>}

          {situation === 'image' && <div className='mb-8'>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <VisuallyHiddenInput type="file" multiple="multiple" onChange={handleFileChange} 
              />
            </Button>
            <div className=' h-auto my-5 mt-10 grid grid-cols-12 gap-3'>
              {((allImages.length > 0 && allImages) || post?.image)?.map((img, index) => (
                <div key={index} className='border col-span-2'>
                  <img src={img} alt={`img-${index}`} className='h-full w-full object-cover' />
                </div>
              ))}
              {(!allImages.length > 0 && !post?.image?.length > 0) && <div className='border col-span-2 h-56'></div>}
            </div>
            <div className=' text-center mt-5  mx-96 grid grid-cols-2 gap-5'>
                <Button onClick={() => setSituation('category')} variant="outlined">Back</Button>
                <Button onClick={handleImageChange} variant="outlined">Next</Button>
            </div>
            {/* <div className=' text-center'><Button onClick={() => setSituation('about')} variant="outlined">Next</Button></div> */}
          </div>}

          {situation === "about" && <div>
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

            <label className='inline-block mb-5 pl-1 font-semibold text-violet-900'>Enter keywords : </label>
            <textarea rows={3} cols={100} className="px-3 mb-8 py-2 rounded-lg bg-white text-black outline-none
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 duration-200 border border-gray-200 w-full" type="text" placeholder="keywords.."
              {...register("keyword", {     //here name is keyword
                required: true,
              })}
            >
            </textarea>

            <label className='mt-5 text-violet-900 font-semibold' >Choose status :</label>
            <select defaultValue={true} className='px-3 mb-10 mt-4 py-2 rounded-lg bg-white text-black outline-none
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

            {/* <Input
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
            /> */}
            {/* {post && (
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
            )} */}
            <div className=' text-center grid grid-cols-2 gap-3 mx-96 mb-5'>
                <Button variant="outlined" className='col-span-1 w-32 text-xl hover:bg-violet-800' type="submit">Back</Button>
                <Button variant="outlined" className='col-span-1 w-48 text-xl hover:bg-violet-800' type="submit">{post? (<span>Update Item</span>) : (<span>Add Item</span>) }</Button>
            </div>
          </div>}

      </form>
    </div>
  )
}

export default Post
