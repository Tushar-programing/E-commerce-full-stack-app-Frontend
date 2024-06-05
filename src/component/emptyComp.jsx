import React from 'react'
import img from './images/empty.png'


function emptyComp({
    line1,
    line2
}) {
  return (
        <div className=''>
            <img src={img} className=' mx-auto mt-32 '/>
            <div className=' text-center text-xl  mt-3'>{line1}</div>
            <div className=' text-center font-light mt-1  mb-28'>{line2}</div>
        </div>
  )
}

export default emptyComp
