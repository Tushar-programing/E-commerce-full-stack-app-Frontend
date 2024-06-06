import React, {useEffect, useState} from 'react'
import { Adress } from '../component'
import '../component/signup.css'
import { Link } from 'react-router-dom'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { useForm } from 'react-hook-form'
import { Input, } from '../component';
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import conf from "../component/conf/conf"

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { EmptyComp } from '../component';


function adress() {
  // const userData = useSelector(state  => state.auth.userData);
  const navigate = useNavigate();

  const [open, setOpen] = useState(true)

  const [posts, setPosts] = useState([]);
  console.log("this is adrees data", posts);
  
  const userData = useSelector(state =>  state.auth.userData);
  const  { register, handleSubmit, formState: { errors }  } = useForm();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  // name, company, adress1,phone, adress2, city, zip, country, state, userid
  const create = (data) => {
    const creste = axios.post(`${conf.apiUrl}/adress/createAdress`, data, {
      withCredentials: true
    })
    if (creste) {
      setIsDialogOpen(false)
    }
  }

  useEffect(() => {
    axios.post(`${conf.apiUrl}/adress/getAllAdress`, {}, {
      withCredentials: true
    }).then((datas) => {
      if (datas) {
        setPosts(datas.data.data);
        setOpen(false)
      }
    })
  }, [isDialogOpen])
  // console.log("post", posts);

  if ( open ) {
    return <div className='w-full h-[800px]'><Backdrop
              className='w-full h-[800px]'
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={open}
              ><div className='mr-5'>Fetching Adress Details</div>
              <CircularProgress color="inherit" />
            </Backdrop></div>
  }



  return (
    <div id='width' className='mx-auto'>
        <div className=' flex justify-center'>
            <button onClick={openDialog} className='w-96 text-2xl font-semibold bg-green-500 pb-2 pt-2 rounded-xl my-8 text-white rounded-t-none'>+ Add new  address</button>
        </div>
        <Dialog open={isDialogOpen} onClose={closeDialog}>
          <DialogTitle>Enter Here your  Address</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <form className='w-96 ' onSubmit={handleSubmit(create)}>
                <Input label="Full Name" type="text" 
                {...register("name", {
                  required: true,
                })}
                />
                <Input label="Company" type="text" 
                {...register("company", {
                  required: true,
                })}
                />
                <Input 
                label="Phone"
                type="number"
                {...register("phone", {
                  required: true,
                  validate: {
                    matchPattern: (value) => /^[0-9]{10}$/.test(value) ||
                    "Phone number must be a valid : ",
                  }
                })}
                />
                <Input label="Adress1" type="text" 
                {...register("adress1", {
                  required: true,
                })}
                />
                <Input label="adress2" type="text" 
                {...register("adress2", {
                  required: true,
                })}
                />
                <div className='flex justify-evenly'><Input className1="" className2="mr-2" label="City" type="text" 
                {...register("city", {
                  required: true,
                })}
                />
                <Input className1="" className2="ml-2" label="Zip code" type="number" 
                {...register("zip", {
                  required: true,
                })}
                />
                </div>
                <Input label="Country" type="text" 
                {...register("country", {
                  required: true,
                })}
                />
                <Input label="state" type="text" 
                {...register("state", {
                  required: true,
                })}
                />
                {errors.name && <p>{errors.name.message}</p>}
                {errors.company && <p>{errors.company.message}</p>}
                {errors.phone && <p>{errors.phone.message}</p>}
              </form>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDialog}>cancel</Button>
            <Button onClick={handleSubmit(create)}>save</Button>
          </DialogActions>
        </Dialog>
      <div className='flex flex-wrap '>
        {(userData && posts.length > 0)? posts?.filter((post) => userData.$id === post.userid)
        .map((post) => (
          <div key={post.$id} className='p-2 w-1/4'>
            <Adress  {...post}/>
          </div>
        )): <div className=' ml-[410px]'><EmptyComp size="w-0" line1="Your Adress is Empty" line2="You have no Adress in your Adress Page. Start Adding " /></div>

        }
      </div>
    </div>
  )
}

export default adress
