import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { userForgotPassword } from "../../actions/userActions";

const ModalForgetPassword = ({ handler }) => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const submitForgetPassword = () => {
    dispatch(userForgotPassword(email));
  };
  const click = () => {
    submitForgetPassword()
    handler()
  }
  return (
    <>
      <div className="justify-center   items-center flex overflow-x-hidden overflow-y-auto fixed inset-1 z-50 outline-none focus:outline-none">
        <div className="relative w-full my-6 mx-auto  max-w-3xl">
          {/*content*/}
          <main
            id="content"
            role="main"
            className="w-full min-h-1/2 max-w-md mx-auto p-6 my-3"
          >
            <div className="mt-7 bg-gray-50  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
              <button
                type="button"
                className="absolute md:top-1/8 md:right-1/4 sm:left-1/4 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                onClick={handler}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 sm:p-7">
                <div className="text-center">
                  <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                    Forgot password?
                  </h1>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Remember your password?
                    <button
                      className="text-blue-600 decoration-2 hover:underline font-medium"
                      onClick={handler}
                    >
                      Login here
                    </button>
                  </p>
                </div>

                <div className="mt-5">
                  <div>
                    <div className="grid gap-y-4">
                      <div>
                        <label className="block text-sm font-bold ml-1 mb-2 dark:text-white">
                          Email address
                        </label>
                        <div className="relative">
                          <input
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            autoComplete="email"
                            required
                            className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                          />
                        </div>
                      </div>
                      <button
                        onClick={click}
                        className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                      >
                        Reset password
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="opacity-40 fixed inset-1 z-10 overflow-y-auto  bg-black"></div>
    </>
  );
};

export default ModalForgetPassword;
