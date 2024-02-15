import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";
import validator from "validator";
import PasswordStrengthBar from "react-password-strength-bar";
import { register } from "../../actions/userActions";
import Alert from "../../components/alerts/Alert";
import AlertArray from "../../components/alerts/AlertArray";
import { passwordStrength } from "check-password-strength";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Input from "@mui/material/Input";

const SignupScreen = () => {
  const [firstname, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [captchaMessage, setCaptchaMessage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [invalidInput, setInvalidInput] = useState({});

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const {
    loading: loadingRegister,
    error: errorRegister,
    userInfo: registerInfo,
  } = userRegister;
  const userVerify = useSelector((state) => state.userVerify);
  const { loading, error, userInfo } = userVerify;
  const redirect = "/login";

  useEffect(() => {
    if (registerInfo) {
      navigate(redirect);
    }
    if (errorRegister) {
      window.grecaptcha.reset();
    }
  }, [navigate, errorRegister, registerInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (captcha.current.getValue()) {
      dispatch(
        register(
          firstname,
          lastName,
          username,
          email,
          password,
          captcha.current.getValue()
        )
      );
    } else {
      setCaptchaMessage(true);
    }
  };
  const preSubmitForm = (e) => {
    e.preventDefault();
    const notValid = [];
    const invalidInputs = {};
    if (validator.isAlpha(firstname?.trim(), "es-ES", { ignore: " " })) {
      setFirstname(firstname?.trim());
    } else {
      invalidInputs["firstname"] = "Firstname must be only Letters";
    }

    if (validator.isAlpha(lastName?.trim(), "es-ES", { ignore: " " })) {
      setLastname(lastName?.trim());
    } else {
      invalidInputs["lastName"] = "Lastname must be only Letters";
    }

    if (
      validator.isAlphanumeric(username?.trim(), "es-ES", { ignore: "-" }) &&
      username?.trim().length >= 5 &&
      username?.trim().length <= 12
    ) {
      setUsername(username?.trim());
    } else {
      invalidInputs["username"] =
        "Username must be only alphanumeric, special characters: -, length from 5 to 12 characters";
    }
    if (validator.isEmail(email?.trim())) {
      setEmail(email?.trim());
    } else {
      invalidInputs["email"] = "Email not valid";
    }
    if (password !== confirmPassword) {
      invalidInputs["password"] = "Passwords do not match";
    } else if (passwordStrength(password).id < 2) {
      invalidInputs["password"] =
        "Passwords is too weak. At least 8 characters, mayus, minus, number and special character";
    }
    if (Object.keys(invalidInputs).length > 0) {
      setInvalidInput(invalidInputs);
    } else {
      setInvalidInput({});
      submitHandler(e);
    }
  };
  const captcha = useRef(null);

  const onChange = () => {
    if (captcha.current.getValue()) {
      setCaptchaMessage(false);
    } else {
    }
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  return (
    <div>
      <div className="flex min-h-full">
        <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <img
                className="h-20 w-auto"
                src={process.env.PUBLIC_URL + "/logo.svg"}
                alt="Your Company"
              />
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
                Create new account
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Or{" "}
                <Link
                  className="font-medium text-[#E35F21] hover:text-[#FAAB05]"
                  to="/login"
                >
                  Sign in
                </Link>
              </p>
            </div>

            <div className="mt-8">
              <div>
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Sign up with
                  </p>

                  <div className="mt-1 grid grid-cols-3 gap-3">
                    <div>
                      <a
                        href="http://localhost:5000/api/users/auth/facebook"
                        className="inline-flex w-full bg-[#F5F4F2] justify-center rounded-md border border-gray-300  py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                      >
                        <span className="sr-only">Sign up with Facebook</span>
                        <svg
                          className="h-5 w-5"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    </div>

                    <div>
                      <a
                        href="http://localhost:5000/api/users/auth/twitter"
                        className="inline-flex w-full justify-center rounded-md border border-gray-300  py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                      >
                        <span className="sr-only">Sign up with Twitter</span>
                        <svg
                          className="h-5 w-5"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </a>
                    </div>

                    <div>
                      <a
                        href="http://localhost:5000/api/users/auth/google"
                        className="inline-flex w-full justify-center rounded-md border bg-[#F5F4F2] border-gray-300  py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                      >
                        <span className="sr-only">Sign up with Google</span>
                        <svg
                          className="h-5 w-5"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="relative mt-6">
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-[#F5F4F2] px-2  text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                {error && <Alert title="Verification Failed" text={error} />}
                {errorRegister && (
                  <Alert title="Register failed" text={errorRegister} />
                )}
                {message && <Alert title="Register failed" text={message} />}
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="firstname"
                      className="block text-sm font-medium text-gray-700 "
                    >
                      Firstname
                    </label>
                    <div className="mt-1">
                      <input
                        id="firstname"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        name="firstname"
                        type="text"
                        placeholder="Firstname"
                        autoComplete="firstname"
                        required
                        className={
                          (invalidInput.firstname
                            ? "border-red-500"
                            : "border-gray-300") +
                          " block w-full appearance-none bg-[#F5F4F2] rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        }
                      />
                      {invalidInput.firstname && (
                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                          {invalidInput.firstname}
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Lastname
                    </label>
                    <div className="mt-1">
                      <input
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastname(e.target.value)}
                        name="lastName"
                        type="text"
                        placeholder="Lastname"
                        autoComplete="lastName"
                        required
                        className={
                          (invalidInput.lastName
                            ? "border-red-500"
                            : "border-gray-300") +
                          " block w-full appearance-none bg-[#F5F4F2] rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        }
                      />
                      {invalidInput.lastName && (
                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                          {invalidInput.lastName}
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email Address
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        autoComplete="email"
                        required
                        className={
                          (invalidInput.email
                            ? "border-red-500"
                            : "border-gray-300") +
                          " block w-full appearance-none bg-[#F5F4F2] rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        }
                      />
                      {invalidInput.email && (
                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                          {invalidInput.email}
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Username
                    </label>
                    <div className="mt-1">
                      <input
                        id="username"
                        value={username}
                        onChange={(e) =>
                          setUsername(e.target.value.toLowerCase())
                        }
                        name="username"
                        type="text"
                        placeholder="Username"
                        autoComplete="username"
                        required
                        className={
                          (invalidInput.username
                            ? "border-red-500"
                            : "border-gray-300") +
                          " block w-full appearance-none rounded-md bg-[#F5F4F2] border px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        }
                      />
                      {invalidInput.username && (
                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                          {invalidInput.username}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <div className="mt-1">
                      <Input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                        required
                        className={
                          (invalidInput.password
                            ? "border-red-500"
                            : "border-gray-300") +
                          " block w-full appearance-none rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        }
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton onClick={handleClickShowPassword}>
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      <PasswordStrengthBar password={password} />
                      {invalidInput.password && (
                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                          {invalidInput.password}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Confirm Password
                    </label>
                    <div className="mt-1">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        autoComplete="confirmPassword"
                        required
                        className={
                          (invalidInput.password
                            ? "border-red-500"
                            : "border-gray-300") +
                          " block w-full appearance-none rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        }
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowConfirmPassword}
                            >
                              {showConfirmPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      <PasswordStrengthBar password={confirmPassword} />
                      {invalidInput.password && (
                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                          {invalidInput.password}
                        </span>
                      )}
                    </div>
                  </div>
                  {captchaMessage && (
                    <Alert
                      title="CAPTCHA invalid"
                      text="Please accept CAPTCHA"
                    />
                  )}
                  <div className="flex items-center justify-center">
                    <ReCAPTCHA
                      ref={captcha}
                      sitekey="6LfgJUEiAAAAAMp5U3Jovg_zXmfaCN56-vAzhsU_"
                      onChange={onChange}
                    />
                  </div>
                  <div>
                    <button
                      onClick={preSubmitForm}
                      className="flex w-full justify-center rounded-md border border-transparent hover:bg-[#94A3B8] py-2 px-4 text-sm font-medium text-white shadow-sm bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Sign up
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default SignupScreen;
