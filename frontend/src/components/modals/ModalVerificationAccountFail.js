import React from 'react'
import { ExclamationTriangleIcon  } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'

const ModalVerificationAccount = ({ description, redirect, buttonDesctiption }) => {
    const navigate = useNavigate()
    const signupHandler = () => {
        navigate(redirect);
    }

  return (
    <>
      <div className="justify-center   items-center flex overflow-x-hidden overflow-y-auto fixed inset-1 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto  max-w-3xl">
          {/*content*/}

          <div className="max-w-xl p-8 text-center text-gray-800 bg-white shadow-xl lg:max-w-3xl rounded-3xl lg:p-12">
            <h3 className="text-2xl">Your link has expired</h3>
            <div className="flex justify-center">
              <ExclamationTriangleIcon
                className="h-32 w-32"
                aria-hidden="true"
              />
            </div>
            <p>{description}</p>
            <div className="mt-4">
              <button
                className="my-2 px-4 py-4 text-blue-200 bg-blue-600 rounded"
                onClick={signupHandler}
              >
                {buttonDesctiption}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-40 fixed inset-1 z-10 overflow-y-auto  bg-black"></div>
    </>
  );
}

export default ModalVerificationAccount