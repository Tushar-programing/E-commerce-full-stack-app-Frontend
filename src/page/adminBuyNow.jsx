import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import conf from "../component/conf/conf";

const adminBuyNow = () => {
    // console.log(conf.apiUrl);
    
  const [startDate, setStartDate] = useState(() => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    return yesterday.toISOString().split("T")[0];
  });

  const [endDate, setEndDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });

  const [cartData, setCartData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // For filtered results
  const [searchQuery, setSearchQuery] = useState(""); // For search input
  const [loading, setLoading] = useState(false);

  const fetchCartData = async (start, end) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${conf.apiUrl}/buyNow/getBuyNowByDateRange`,
        {
          startDate: start,
          endDate: end,
        },
        { withCredentials: true }
      );
      setCartData(response.data.data);
      setFilteredData(response.data.data); // Initialize filtered data
    } catch (error) {
      console.error("Error fetching cart data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleButtonFetch = (days) => {
    const today = new Date();
    const start = new Date(today);
    if (days === "all") {
      fetchCartData("1970-01-01", today.toISOString().split("T")[0]); // Fetch all data
    } else {
      start.setDate(today.getDate() - days);
      fetchCartData(
        start.toISOString().split("T")[0],
        today.toISOString().split("T")[0]
      );
    }
  };

  const handleDays = (e) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - e.target.value);
    fetchCartData(
      yesterday.toISOString().split("T")[0],
      yesterday.toISOString().split("T")[0]
    );
  };


  
  {/* {
    _id: new ObjectId('674ef886d4c71da371a7c2c0'),
    productId: new ObjectId('66d6108a434a2b14186ca489'),
    buyer_id: new ObjectId('662d45405512856c0d361808'),
    repeat: 2,
    createdAt: 2024-12-03T12:24:38.662Z,
    productDetails: { title: 'Eternal Shine Chandelier', price: 1620 },
    buyerDetails: {
      _id: new ObjectId('662d45405512856c0d361808'),
      email: 'ttushar476@gmail.com'
    }
  } */}


  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    if (query) {
      const filtered = cartData.filter(
        (item) =>
          item?.buyerDetails?._id?.toLowerCase().includes(query) ||
          item?.buyerDetails?.mobile?.toString().includes(query) ||
          item?.productId?.toString().includes(query)
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(cartData);
    }
  };

  useEffect(() => {
    fetchCartData(startDate, endDate); // Fetch data on load for default date range
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">
        BUY NOW Data by Date Range
      </h1>

      {/* Date Range Inputs */}
      <div className="flex justify-center items-center mb-4 space-x-4">
        <div>
          <label className="block text-sm font-medium">Start Date</label>
          <input
            type="date"
            className="border border-gray-300 rounded-md px-3 py-2 w-40"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">End Date</label>
          <input
            type="date"
            className="border border-gray-300 rounded-md px-3 py-2 w-40"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button
          onClick={() => fetchCartData(startDate, endDate)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Fetch Custom Date Range
        </button>
      </div>

      {/* Quick Fetch Buttons */}
      <div className="flex justify-center mb-4 space-x-4">
        <div className="sm:block hidden my-auto text-center col-span-1 lg:col-span-2">
          <select
            onChange={(e) => handleDays(e)}
            className="border w-16 lg:w-32 outline-none px-2 lg:px-4 py-1"
          >
            <option value={0}>Today</option>
            <option value={1}>1 Day before</option>
            <option value={2}>2 Day before</option>
            <option value={3}>3 Day before</option>
            <option value={4}>4 Day before</option>
            <option value={5}>5 Day before</option>
            <option value={6}>6 Day before</option>
            <option value={7}>7 Day before</option>
            <option value={8}>8 Day before</option>
            <option value={9}>9 Day before</option>
            <option value={10}>10 Day before</option>
            <option value={11}>11 Day before</option>
            <option value={12}>12 Day before</option>
            <option value={13}>13 Day before</option>
            <option value={14}>14 Day before</option>
            <option value={15}>15 Day before</option>
          </select>
        </div>
        <button
          onClick={() => handleButtonFetch(0)} // Fetch Today's Data
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Today's Data
        </button>
        <button
          onClick={() => handleButtonFetch(5)} // Fetch Last 5 Days
          className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
        >
          Last 5 Days
        </button>
        <button
          onClick={() => handleButtonFetch(15)} // Fetch Last 15 Days
          className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
        >
          Last 15 Days
        </button>
        <button
          onClick={() => handleButtonFetch("all")} // Fetch All Data
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          All Data
        </button>
      </div>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by ID or Mobile Number"
          value={searchQuery}
          onChange={handleSearch}
          className="w-full border border-gray-300 rounded-md px-3 py-2"
        />
      </div>

      {/* Loading Indicator */}
      {loading && <p className="text-center">Loading...</p>}

      {/* Results Found */}
      {!loading && filteredData.length > 0 && (
        <p className="text-center text-gray-700 font-semibold mb-4">
          {filteredData.length} results found
        </p>
      )}

      {/* Grid Layout for Table */}
      {!loading && filteredData.length > 0 && (
        <div className="grid grid-cols-12 border border-gray-300">
          {/* Table Header */}
          <div className="col-span-4 bg-gray-100 p-2 font-semibold border-b border-r border-gray-300">
            User Info
          </div>
          <div className="col-span-4 bg-gray-100 p-2 font-semibold border-b border-r border-gray-300">
            Product Details
          </div>
          <div className="col-span-2 bg-gray-100 p-2 font-semibold border-b border-r border-gray-300">
            Created At
          </div>
          <div className="col-span-2 bg-gray-100 p-2 font-semibold border-b border-gray-300">
            Action
          </div>


          {/* Data Rows */}
          {filteredData.map((cart, index) => (
            <React.Fragment key={index}>
              <div className="col-span-4 p-2 border-b border-r border-gray-300">
                <div>ID: {cart?.buyerDetails?._id || "N/A"}</div>
                <div>Name: {cart?.buyerDetails?.fullName || "N/A"}</div>
                {cart?.buyerDetails?.mobile && <div>Mobile : {cart?.buyerDetails?.mobile || "N/A"}</div>}
                {cart?.buyerDetails?.email && <div>Email : {cart?.buyerDetails?.email || "N/A"}</div>}
              </div>

              <Link
                to={`/post/${cart?.productDetails?._id}`}
                className="col-span-4 p-2 border-b border-r border-gray-300"
              >
                <img src={cart?.productDetails?.image[0]} className="w-24" />
                <div>{cart?.productDetails?.title }</div>
                <div>{cart?.productDetails?.price }</div>
              </Link>

              <div className="col-span-2 p-2 border-b border-gray-300">
                {new Date(cart.createdAt).toLocaleString()}
              </div>

              <div className="col-span-2 p-2 border-b border-l border-gray-300">
                <button className="border px-4 py-2 bg-gray-800 text-gray-200">
                  SEND MESS
                </button>
              </div>
            </React.Fragment>
          ))}
        </div>
      )}

      {/* No Results Message */}
      {!loading && filteredData.length === 0 && (
        <p className="text-center text-gray-500">No data found for this range.</p>
      )}
    </div>
  );
};

export default adminBuyNow;
