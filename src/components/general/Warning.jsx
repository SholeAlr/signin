import React from "react";

function Warning({ warningText }) {
  return (
    // <div className='absolute top-[10px] left-0 right-0 mx-auto w-[90vw] h-[40px] bg-gray-300 rounded-md alert alert-warning'>
    //   Warning
    // </div>
    <div
      role='alert'
      className='alert alert-warning absolute top-[10px] left-0 right-0 mx-auto w-[90vw] h-[40px] flex flex-row text-sm'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='stroke-current shrink-0 h-6 w-6'
        fill='none'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
        />
      </svg>
      <span>{warningText}</span>
    </div>
  );
}

export default Warning;
