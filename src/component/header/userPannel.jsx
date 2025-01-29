import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'

import { CiDeliveryTruck } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { CiLocationArrow1 } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";

import conf from "../conf/conf.js"
import axios from "axios";

import {Logoutbtn}  from '../index';

function userPannel() {

  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState()
  

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    axios.post(
      `${conf.apiUrl}/users/getCurrentUser`, {}, { withCredentials: true }
    ).then((userData) => {
      if (userData) {
        setUserData(userData?.data?.data);
      }
    })
  }, [])

  
  return (
    <div className="p-4 md:p-8 lg:p-16 max-w-[1400px] mx-auto min-h-[600px] border-t-2">
      <div className="text-center md:text-xl text-lg md:mt-2 mt-1">YOUR PROFILE</div>
      {/* Account Section */}
      <div className="mb-6">
        <h2 className="text-lg font- mb-4">ACCOUNT</h2>
        <div className="grid grid-cols-2 gap-3">
          <Link to={"/orderpage"} className="bg-gray-100 flex items-center space-x-4 px-2 md:py-3 py-2 shadow ">
            <CiDeliveryTruck className="w-8 md:w-10 md:h-10 h-8 rounded-full" />
            <p className="text-sm font-semibold">MY ORDERS</p>
          </Link>

          <Link to={"/wishlist"} className="bg-gray-100 flex items-center space-x-4 px-2 md:py-3 py-2 shadow ">
            <CiBookmark className="w-6 h-6 md:w-8 md:h-8 rounded-full"/>
            <p className="text-sm font-semibold">MY WISHLIST</p>
          </Link>

          <Link to={"/address"} className="bg-gray-100 flex items-center space-x-4 px-2 md:py-3 py-2 shadow ">
            <CiLocationArrow1 className="w-6 h-6 md:w-8 md:h-8 rounded-full"/>
            <p className="text-sm font-semibold">MY ADDRESS</p>
          </Link>

          <Link to={"/account-info"} className="bg-gray-100 flex items-center space-x-4 px-2 md:py-3 py-2 shadow ">
            <IoCallOutline className="w-6 h-6 md:w-8 md:h-8 rounded-full"/>
            <p className="text-sm font-semibold">CONTACT US</p>
          </Link>
        </div>
      </div>

      <div className='mt-8 py-2'>
        <div className="text-lg font- mb-0">PRIVACY</div>
        <div className='text-gray-600'>Customise your privacy to make experience better</div>
        
            <div className="w-full max-w-2xl mx-auto mt-3 px-2 bg-gray-100 mb-1">
              <div
                onClick={toggleAccordion}
                className="flex justify-between items-center w-full text-black py-2 cursor-pointer"
              >
                <div className="text-lg text-gray-800">Your Profile</div>
                <span className="text-lg font-bold">{isOpen ? "-" : "+"}</span>
              </div>

              {/* Accordion Content */}
              {isOpen && (
                <div className="w-full pb-4 border-b ">
                  {userData?.mobile && <div>Mobile No : {userData?.mobile}</div>}
                  {userData?.email && <div>Email-id : {userData?.email}</div>}
                  <div>Name : {userData?.fullName}</div>
                </div>
              )}
            </div>
            
            <div className="w-full max-w-2xl mx-auto mt-0 px-2 bg-gray-100 mb-1">
              <div
                className="flex justify-between items-center w-full text-black py-2 cursor-pointer"
              >
                <div className="text-lg text-gray-800">Change Password</div>
                <span className="text-lg font-bold"></span>
              </div>
            </div>
            
            <div className="w-full max-w-2xl mx-auto mt-0 px-2 bg-gray-100 mb-1">
              <div
                className="flex justify-between items-center w-full text-black py-2 cursor-pointer"
              >
                <Logoutbtn />
              </div>
            </div>
      </div>
    </div>
  )
}

export default userPannel
