import React, {useId} from 'react'

const input = React.forwardRef( function Input({
  label,
  type = "text",
  className1 = "",
  className2 = "",
  ...props
}, ref){
  const id = useId()
  return (
    <div className='w-full'>
      {label && <label className={`inline-block pl-1 mb-1 ${className1}`}  htmlFor={id}>{label}</label>}
      <input type={type} 
      className={`px-3 py-2 rounded-lg bg-white text-black outline-none
       duration-200 border border-gray-200 w-full
      ${className2}`} id={id} ref={ref} {...props}/>
    </div>
  )
})

export default input
