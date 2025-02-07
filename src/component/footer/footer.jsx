import React, { useState } from "react";
import { FaFacebook, FaInstagram, FaPinterest, FaEnvelope } from "react-icons/fa";
import { FaLinkedin, FaWhatsapp } from "react-icons/fa6";
import {Link} from "react-router-dom"

const Footer = () => {
  const [customerServiceOpen, setCustomerServiceOpen] = useState(false);
  const [aboutUsOpen, setAboutUsOpen] = useState(false);

  return (
    <footer className="bg-black text-white py-10 md:px-10">
      <div className="px-4 md:px-0 max-w-[1200px] mx-auto">
        {/* Desktop View */}
        <div className="hidden md:flex justify-between">
          <div>
            <h3 className="font-bold text-lg">Customer Service</h3>
            <ul className="mt-2">
              <li className=" mb-1"><Link to={"/policy"} className="hover:underline">Track Your Order</Link></li>
              <li className=" mb-1"><Link to={"/policy"} className="hover:underline">Shipping and Returns Policy</Link></li>
              <li className=" mb-1"><Link to={"/policy"} className="hover:underline">Submit a Return Request</Link></li>
              <li className=" mb-1"><Link to={"/policy"} className="hover:underline">Buy in Bulk</Link></li>
              <li className=" mb-1"><Link to={"/contact"} className="hover:underline">Contact us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg">About Us</h3>
            <ul className="mt-2">
              <li className="mb-1"><Link to={"/story"}  className="hover:underline">Our Story</Link></li>
              <li className="mb-1"><Link to={"/"}  className="hover:underline">Our Blog - The Artisan's Journal</Link></li>
              <li className="mb-1"><Link to={"/policy"}  className="hover:underline">Privacy Policy</Link></li>
              <li className="mb-1"><Link to={"/policy"} className="hover:underline">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <p className="max-w-xs">
              At Not Just Spoons, we offer a carefully curated selection of kitchen essentials designed to enhance your cooking experience. From high-quality spoons with elegant ceramic handles to versatile kitchen tools.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href='https://www.linkedin.com/in/tushar-saini-60bb242a3/' target="_blank" className="hover:underline"><FaLinkedin size={24} className="text-white"  /></a>
              <a href='https://www.instagram.com/_.tusharsaini' target="_blank" className="hover:underline"><FaInstagram size={24} className="text-white" /></a>
              <button onClick={() => window.open("https://api.whatsapp.com/send?phone=917451811626", "_blank")} className="hover:underline"><FaWhatsapp size={24} className="text-white" /></button>
              <a href="mailto:ttushar476@gmail.com" className="hover:underline"><FaEnvelope size={24} className="text-white"  /></a>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet View */}
        <div className="md:hidden">
          <div className="border-t border-gray-700 pt-4">
            <button
              className="flex justify-between w-full py-2"
              onClick={() => setCustomerServiceOpen(!customerServiceOpen)}
            >
              <span>Customer Service</span>
              <span>{customerServiceOpen ? "-" : "+"}</span>
            </button>
            {customerServiceOpen && (
              <ul className="pl-4 mt-2">
                <li><a href="#" className="hover:underline block py-1">Track Your Order</a></li>
                <li><a href="#" className="hover:underline block py-1">Shipping and Returns Policy</a></li>
                <li><a href="#" className="hover:underline block py-1">Submit a Return Request</a></li>
                <li><a href="#" className="hover:underline block py-1">Buy in Bulk</a></li>
                <li><a href="#" className="hover:underline block py-1">Contact us</a></li>
              </ul>
            )}
          </div>

          <div className="border-t border-gray-700 pt-4">
            <button
              className="flex justify-between w-full py-2"
              onClick={() => setAboutUsOpen(!aboutUsOpen)}
            >
              <span>About Us</span>
              <span>{aboutUsOpen ? "-" : "+"}</span>
            </button>
            {aboutUsOpen && (
              <ul className="pl-4 mt-2 ">
                <li><a href="#" className="hover:underline block py-1">Our Story</a></li>
                <li><a href="#" className="hover:underline block py-1">Our Blog - The Artisan's Journal</a></li>
                <li><a href="#" className="hover:underline block py-1">Privacy Policy</a></li>
                <li><a href="#" className="hover:underline block py-1">Terms of Service</a></li>
              </ul>
            )}
          </div>

          <div className="border-t border-gray-700 pt-4">
            <p className="text-sm">
              Imagined in India, Home Artisan offers a unique selection of modern and elegant home décor products. From
              Scandinavian design inspired lanterns to geometric photo frames, we design and curate products that exude
              superior craftsmanship and reflect global trends.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href='https://www.linkedin.com/in/tushar-saini-60bb242a3/' target="_blank" className="hover:underline"><FaLinkedin size={24} className="text-white"  /></a>
              <a href='https://www.instagram.com/_.tusharsaini' target="_blank" className="hover:underline"><FaInstagram size={24} className="text-white" /></a>
              <button onClick={() => window.open("https://api.whatsapp.com/send?phone=917451811626", "_blank")} className="hover:underline"><FaWhatsapp size={24} className="text-white" /></button>
              <a href="mailto:ttushar476@gmail.com" className="hover:underline"><FaEnvelope size={24} className="text-white"  /></a>
            </div>
          </div>
        </div>

        <div className="text-center text-sm mt-8">
          <p>© 2024 Home Artisan. Build in React/Node.js technology's</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
