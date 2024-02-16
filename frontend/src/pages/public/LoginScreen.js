import React, { useState, useEffect, useRef } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";
import { login, getLoginData } from "../../actions/userActions";
import Alert from "../../components/alerts/Alert";
import AlertArray from "../../components/alerts/AlertArray";
import SuccessAlert from "../../components/alerts/SuccessAlert";
import ModalForgetPassword from "../../components/modals/ModalForgetPassword";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Input from "@mui/material/Input";
import Logo from "../../assets/AitiuLogo.png";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [captchaMessage, setCaptchaMessage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgetPassword, setShowForgetPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const [searchParams, setSearchParams] = useSearchParams();
  const userRegister = useSelector((state) => state.userRegister);
  const {
    loading: loadingRegister,
    error: errorRegister,
    userInfo: registerInfo,
  } = userRegister;
  const userVerify = useSelector((state) => state.userVerify);
  const {
    loading: loadingVerify,
    error: errorVerify,
    userInfo: verifyInfo,
  } = userVerify;
  const userForgotPassword = useSelector((state) => state.userForgotPassword);
  const {
    loading: loadingForgotPwd,
    error: errorForgotPwd,
    message,
  } = userForgotPassword;
  const userResetPassword = useSelector((state) => state.userResetPassword);
  const {
    loading: loadingResetPass,
    error: errorResetPass,
    message: messageResetPass,
  } = userResetPassword;

  var invalidEmail;

  const redirect = "/dashboard";
  useEffect(() => {
    if (
      (userInfo && userInfo.userType === "Admin") ||
      (searchParams.get("username") && searchParams.get("userType") === "Admin")
    ) {
      navigate("/admin");
    }
    if (
      (userInfo && userInfo.userType === "Adviser") ||
      (searchParams.get("username") &&
        searchParams.get("userType") === "Adviser")
    ) {
      navigate("/adviser/ordenes");
    }
    /*if (!userInfo && !error) {
      dispatch(getLoginData());
    }*/
    if (
      error &&
      (error === "Captcha not valid" || captcha.current.getValue())
    ) {
      window.grecaptcha.reset();
    }
  }, [navigate, dispatch, userInfo, error, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (process.env.NODE_ENV === "development" || captcha.current.getValue()) {
      dispatch(login(username, password, captcha.current.getValue()));
    } else {
      setCaptchaMessage(true);
    }
  };

  const captcha = useRef(null);

  const onChange = () => {
    if (captcha.current.getValue()) {
      setCaptchaMessage(false);
    }
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleForgetPassword = () => {
    setShowForgetPassword(!showForgetPassword);
  };

  return (
    <>
      {showForgetPassword && (
        <ModalForgetPassword handler={handleForgetPassword} />
      )}

      <div className="flex h-[calc(100vh-96px)]">
        <div className="mx-auto mt-16 w-full max-w-sm lg:w-96">
          <div>
            <div className="flex justify-center">
              <img className="h-auto w-40" src={Logo} alt="Your Company" />
            </div>
          </div>

          <div className="mt-8">
            <div className="mt-6">
              {registerInfo && (
                <SuccessAlert
                  title="Registered User"
                  text={registerInfo.message}
                />
              )}
              {verifyInfo && (
                <SuccessAlert
                  title="Verification Successful"
                  text={verifyInfo.message}
                />
              )}
              {message && (
                <SuccessAlert
                  title="Recover Password Successful"
                  text={message.message}
                />
              )}
              {messageResetPass && (
                <SuccessAlert
                  title="Password Change Successful"
                  text={message}
                />
              )}
              {error === "Unauthorized" && (
                <Alert
                  title="Login failed"
                  text="Password or Username incorrect"
                />
              )}
              {errorForgotPwd && (
                <Alert title="Recover Password Failed" text={errorForgotPwd} />
              )}
              {errorResetPass && (
                <Alert title="Reset Password Failed" text={errorResetPass} />
              )}
              {invalidEmail && (
                <AlertArray title="Login failed" text={invalidEmail} />
              )}
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Usuario o Email
                  </label>
                  <div className="mt-1">
                    <input
                      id="username"
                      value={username}
                      onChange={(e) =>
                        setUsername(e.target.value.toLowerCase())
                      }
                      name="username"
                      type="username"
                      autoComplete="username"
                      required
                      className="block h-12 w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Contraseña
                  </label>
                  <div className="mt-1">
                    <Input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      required
                      className="block w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton onClick={handleClickShowPassword}>
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Recordarme
                    </label>
                  </div>

                  <div className="text-sm">
                    <button
                      className="font-medium text-[#E35F21] hover:text-[#FAAB05]"
                      onClick={handleForgetPassword}
                    >
                      Olvidaste tu contraseña?
                    </button>
                  </div>
                </div>
                {captchaMessage && (
                  <Alert title="CAPTCHA invalid" text="Please accept CAPTCHA" />
                )}
                {error === "Captcha not valid" && (
                  <Alert title="Login failed" text={error} />
                )}
                <div className="flex items-center justify-center py-4">
                  <ReCAPTCHA
                    ref={captcha}
                    sitekey="6LejoWwpAAAAAC2DI4iluimFQL9Xlu8Iv7_4lN3-"
                    onChange={onChange}
                  />
                </div>

                <div>
                  <button
                    onClick={submitHandler}
                    type="submit"
                    className="flex w-full justify-center rounded-md border border-transparent bg-gray-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Iniciar Sesion
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginScreen;
