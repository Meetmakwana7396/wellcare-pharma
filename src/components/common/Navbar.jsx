import React from 'react'

const Navbar = () => {
  return (
    <div className='navbar p-4 grid grid-cols-3 gap-4'>
      <div className="">
      <h1 className='text-danger border-2'>Navbar Title</h1>
      </div>
      <div className="border-2 col-span-2 text-right">
        <h2> links</h2>
      </div>
    </div>
  )
}

export default Navbar
