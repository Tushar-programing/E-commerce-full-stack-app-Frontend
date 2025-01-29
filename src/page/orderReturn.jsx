import React, {useEffect, useState} from 'react'
import axios from 'axios';
import conf from "../component/conf/conf"
import OrderReturn from '../component/orderReturn';
import { EmptyComp } from '../component';


function orderReturn() {
    const [order, setOrder] = useState([]);
    const [filteredOrder, setFilteredOrder] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        axios
          .post(`${conf.apiUrl}/order/ownerReturn`, {}, { withCredentials: true })
          .then((response) => {
            if (response) {
              setOrder(response.data.data);
              setFilteredOrder(response.data.data); // Set both orders and filtered orders initially
            }
          });
      }, []);
    
      // Handle search input change
      const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
    
        // Filter orders by order._id
        const filtered = order.filter((item) =>
          item._id.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredOrder(filtered);
      };
    
      if (order?.length <= 0) {
        return (
          <div>
            <EmptyComp
              classes="ml-96"
              size="w-0"
              line1="Your return order is Empty"
              line2="You have no client orders yet. Start Adding "
            />
          </div>
        );
      }

  return (
    <div className="w-full">
    <div className="text-center text-lg my-10">Order Return</div>

    {/* Search Input */}
    <div className="mx-16 mb-5">
      <input
        type="text"
        placeholder="Search by order ID"
        value={searchQuery}
        onChange={handleSearchChange}
        className="border p-2 w-full md:w-1/3"
      />
    </div>

    {/* Order List */}
    <div className="mx-16 border">
      {filteredOrder.length > 0 ? (
        filteredOrder.map((or) => (
          <OrderReturn key={or?._id} {...or} />
        ))
      ) : (
        <div className="text-center text-xl text-red-600 bg-gray-100 p-4">
          No matching orders found
        </div>
      )}
    </div>
  </div>
  )
}

export default orderReturn
