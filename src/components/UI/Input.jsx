import React from 'react'

function Input(props) {
  return (
    <div className='relative'>
        <label className='text-sm'>{props?.label}</label>
        <input disabled={props?.disabled} value={props?.value} onChange={props?.onChange} onBlur={props?.onBlur} name={props?.name} className={`${props?.error &&props?.touched ? 'border-sv-red border-2':'border-sv-grey border'} w-full h-12 border-solid rounded-lg mt-1 p-3`} type={props.type}/>
        {props?.touched && props?.error && <p className='text-sv-red text-sm mt-1'>{props?.error}</p>}
    </div>
  )
}

export default Input