import React from 'react'

const ResetPass = () => {
  return (
    <div className="container bg-[#f2f2f2] mx-auto flex justify-center items-center h-[100vh]">
      <div className='p-5 border-2 w-fit'>
        <h1 className='mx-[100px]'>Reset Password</h1>
        <div className="mb-3">
              <label htmlFor="ctnEmail">Email address</label>
              <input
                id="ctnEmail"
                type="email"
                name="email"
                placeholder="name@example.com"
                className={`rounded-md w-[100%]`}
                onChange={(e) => handleChange(e)}
              />
              {/* {hasError.email ? (
                <span className="text-danger text-sm font-semibold">
                  Required
                </span>
              ) : (
                ""
              )} */}
            </div>
      </div>
    </div>
  )
}

export default ResetPass
