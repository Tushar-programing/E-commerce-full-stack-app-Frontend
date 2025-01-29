import React, {useEffect, useState} from 'react'
import axios from 'axios';
import conf from "../component/conf/conf"
import OrderReturn from '../component/orderReturn';
import { EmptyComp } from '../component';


function orderReturn() {
    const [order, setOrder] = useState([]);
    console.log("this is client order", order);

    useEffect(() => {
        axios.post(`${conf.apiUrl}/order/customerCancel`, {}, {
            withCredentials: true,
        }).then((order) => {
            if (order) {
                setOrder(order.data.data);
            }
        })
    }, [])

    if ( order?.length <= 0 ) {
        return  <div >
                  <EmptyComp classes="ml-96" size="w-0" line1="Your return order is Empty" line2="You have no client orders yet. Start Adding " />
                </div>
      }

  return (
    <div className='w-full'>
        <div className='text-center text-xl my-10'>CANCELLED ORDER</div>
        <div className='mx-16 border'>
            {order?.map((or) => 
                <OrderReturn key={or?._id} {...or} />
            )}
        </div>
    </div>
  )
}

export default orderReturn
