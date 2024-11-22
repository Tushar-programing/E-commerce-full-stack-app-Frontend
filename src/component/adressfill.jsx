import React from 'react'
import { useState } from 'react';
import conf from "../component/conf/conf"
import { useForm } from 'react-hook-form';
import axios from 'axios';

import { Input, } from './index';
import ClipLoader from "react-spinners/ClipLoader";

function adressfill({isOpen}) {
  const  { register, handleSubmit, formState: { errors }  } = useForm();
  const [load, setLoad] = useState(false);

    const create = (data) => {
        setLoad(true)
        axios.post(`${conf.apiUrl}/adress/createAdress`, data, {
            withCredentials: true
        }).then((data) => {
          if (data) {
            console.log("this is all created: ", data.data.data._id);
          isOpen(data?.data?.data?._id)
          setLoad(false)
          }else {
            setLoad(false)
          }
        })
    }

  return (
    <div>
      <form className='max-w-96 ' onSubmit={handleSubmit(create)}>
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
              "Phone number must be a valid ! ",
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
          {errors.name && <p className='text-red-400 text-center mt-2'>{errors.name.message}</p>}
          {errors.company && <p className='text-red-400 text-center mt-2'>{errors.company.message}</p>}
          {errors.phone && <p className='text-red-400 text-center mt-2'>{errors.phone.message}</p>}
          
          <div className='text-end mt-4'><button className='my-auto border py-1 px-10 bg-gray-800 text-gray-100 rounded-md' onClick={handleSubmit(create)}>{load && <ClipLoader size={16} color={"#fff"} />}Create </button>
          <button className='my-auto border border-gray-400 py-1 px-4 text-gray-600 rounded-md ms-2' onClick={isOpen}>Cancel</button>
          </div>
      </form>
    </div>
  )
}

export default adressfill
