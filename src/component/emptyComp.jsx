import React from 'react'
import img from './images/empty.png'


function emptyComp({
    title,
    size,
    line1,
    line2,
    classes
}) {
  return (
        <div className={classes}>
            <div className='text-center text-2xl mt-10'>{title}</div>
            <hr className={`mx-auto mt-2 border border-gray-300 ${size} `} />
            <img src={img} className=' mx-auto mt-24 '/>
            <div className=' text-center text-xl  mt-3'>{line1}</div>
            <div className=' text-center font-light mt-1  mb-28'>{line2}</div>
        </div>
  )
}

export default emptyComp
