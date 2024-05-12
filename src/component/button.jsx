import React from 'react'

function button({
    children,
    type='button',
    bgColor= 'bg-violet-900',
    textColor='text-white',
    className="",
    ...props
}) {
  return (
    <button type={type} className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}> 
        {children}
    </button>
  )
}

export default button

