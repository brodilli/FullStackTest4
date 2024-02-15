import React, { useState, useEffect } from "react"
import { Link, useNavigate, useLocation, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { verifyUser, verifyUserStatus } from '../../actions/userActions'
import ModalVerificationAccount from "../../components/modals/ModalVerificationAccount";
import ModalVerificationAccountFail from "../../components/modals/ModalVerificationAccountFail";

const VerificationAccountScreen = () => {
  const { id, verifyid } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userVerify = useSelector((state) => state.userVerify)
  const { loading, error, userInfo } = userVerify
  const userVerifyStatus = useSelector((state) => state.userVerifyStatus)
  const { loading: loadingStatus, error: errorStatus, status } = userVerifyStatus

  useEffect(() => {
    if (error) {
      navigate('/signup')
    }
    if (userInfo) {
      navigate('/login')
    }
    if(errorStatus === 'Not found'){
      navigate('/notfound')
    }
    if(!errorStatus && !status){
      dispatch(verifyUserStatus(id, verifyid))
    }
  }, [dispatch, navigate, error, userInfo, errorStatus])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(verifyUser(id, verifyid))
  }
  return (
    <div>
      {status && <ModalVerificationAccount onSubmit={submitHandler} />}
      {!status && (
        <ModalVerificationAccountFail
          description="To keep going with the process is necessary to Sign up again"
          redirect="/signup"
          buttonDesctiption="Click to Go to Sign up"
        />
      )}
    </div>
  );
}

export default VerificationAccountScreen