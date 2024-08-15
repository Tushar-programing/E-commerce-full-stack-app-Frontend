import React from 'react'
import { Link } from 'react-router-dom'

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Fade from '@mui/material/Fade';

import { IoLogoWhatsapp } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";

function footer() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };
  return (
    <div className='bg--100 md:bg-white border'>
      <div className=' bg-white w-auto border-t-2 md:block hidden'>
        <div className=' md:w-1/3 sm:w-1/2 w-full float-left text-center '>
          <a><h1 className='mt-6 sm:mt-16 text-lg font-semibold text-violet-900'>About us</h1></a>
          <div className='mt-2 sm:mt-8'><h1>Electrobazar in best online store to buy STEM Kits, Electronics, Robotics, Aeromodelling Drone Parts, IoT, Prototyping and Arts & Crafts Materials at low price.</h1></div>
        </div>
        <div className=' md:w-1/3 sm:w-1/2 w-full float-left text-start ps-6 sm:ms-0 sm:text-center'>
          <a><h1 className='mt-4 sm:mt-6 text-lg font-semibold text-violet-900'>My Account</h1></a>
          <a><h1 className='mt-1 sm:mt-4 text-lg font-semibold text-gray-600'>My Account</h1></a>
          <a><h1 className='mt-1 sm:mt-4 text-lg font-semibold text-gray-600'>Order History</h1></a>
          <a><h1 className='mt-1 sm:mt-4 text-lg font-semibold text-gray-600'>Wish List</h1></a>
          <a><h1 className='mt-1 sm:mt-4 text-lg font-semibold text-gray-600'>Newsletter</h1></a>
          <a><h1 className='mt-1 sm:mt-4 text-lg font-semibold text-gray-600'>Privacy Policy</h1></a>
          <Link to="/list"><h1 className='mt-1 sm:mt-4 text-lg font-semibold text-gray-700'>List-item</h1></Link>

        </div>
        <div className=' md:w-1/3 sm:w-1/2 w-full float-left text-start ps-6 sm:ms-0 sm:text-center'>
          <a><h1 className='mt-4 sm:mt-6 text-lg font-semibold text-violet-900'>Connect With Us</h1></a>
          <a href='https://www.linkedin.com/in/tushar-saini-60bb242a3/'><h1 className='mt-1 sm:mt-4 text-lg font-semibold text-gray-600'>Linked in</h1></a>
          <a href='https://www.instagram.com/tusharsaini4678/'><h1 className='mt-1 sm:mt-4 text-lg font-semibold text-gray-600'>Instagram</h1></a>
          <a href='https://whatsapp.com/dl/code=1WjxHdWwtW'><h1 className='mt-1 sm:mt-4 text-lg font-semibold text-gray-600'>Whatsapp</h1></a>
        </div>

      </div>
      <div className='md:hidden block my-10 '>
          <div className='text-center mt-7 mb-3 '>About us</div>
          <div className='mx-7 mb-4'>Electrobazar in best online store to buy STEM Kits, Electronics, Robotics, Aeromodelling Drone Parts, IoT, Prototyping and Arts & Crafts Materials at low price.</div>
          <div className='mx-7'>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Typography>My Account</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                    <a><h1 className='mt-1 '>My Account</h1></a>
                    <a><h1 className='mt-1 '>Order History</h1></a>
                    <a><h1 className='mt-1 '>Wish List</h1></a>
                    <a><h1 className='mt-1 '>Newsletter</h1></a>
                    <a><h1 className='mt-1'>Privacy Policy</h1></a>
                    <Link to="/list"><h1 className='mt-1 '>List-item</h1></Link>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
          <div className='text-center mt-7 mb-3 text-xl'>Connect with us</div>
          <div className='grid grid-cols-4 px-5 mt-5'>
              <a  target='_blank' href='https://www.linkedin.com/in/tushar-saini-60bb242a3/'><IoLogoWhatsapp className='mx-auto w-8 h-8' /></a>
              <a  target='_blank' href='https://www.instagram.com/_.tusharsaini/'><FaInstagram    className='mx-auto w-8  h-8'/></a>
              <a  target='_blank' href='https://www.linkedin.com/in/tushar-saini-60bb242a3/'><CiLinkedin     className='mx-auto w-9 h-9'/></a>
              <a  target='_blank' href='href="tel+91 7451811626'><IoCallOutline  className='mx-auto w-8 h-8'/></a>
          </div>
          {/* <div className=' md:w-1/3 sm:w-1/2 w-full float-left text-start ps-6 sm:ms-0 sm:text-center'>
            <a><h1 className='mt-4 sm:mt-6 text-lg font-semibold text-violet-900'>Connect With Us</h1></a>
            <a href='https://www.linkedin.com/in/tushar-saini-60bb242a3/'><h1 className='mt-1 sm:mt-4 text-lg font-semibold text-gray-600'>Linked in</h1></a>
            <a href='https://www.instagram.com/tusharsaini4678/'><h1 className='mt-1 sm:mt-4 text-lg font-semibold text-gray-600'>Instagram</h1></a>
            <a href='https://whatsapp.com/dl/code=1WjxHdWwtW'><h1 className='mt-1 sm:mt-4 text-lg font-semibold text-gray-600'>Whatsapp</h1></a>
          </div> */}
      </div>
    </div>
  )
}

export default footer
