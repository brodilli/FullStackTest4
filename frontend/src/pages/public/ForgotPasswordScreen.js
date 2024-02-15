import React, { useEffect } from 'react'
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import ModalResetPassword from "../../components/modals/ModalResetPassword";
import ModalVerificationAccountFail from "../../components/modals/ModalVerificationAccountFail";
import { verifyForgotStatus } from '../../actions/userActions'
import { useDispatch } from 'react-redux';

const ForgotPasswordScreen = () => {
    const { id, verifyid } = useParams();
    const dispatch = useDispatch()

    const userForgotStatus = useSelector((state) => state.userForgotStatus);
    const { loading, error, message } = userForgotStatus; 


    useEffect(() => {
        dispatch(verifyForgotStatus(id, verifyid));
    }, [dispatch, id, verifyid])
  return (
    <div>
      {message && <ModalResetPassword id={id} verifyid={verifyid}/>}
      {error && (
        <ModalVerificationAccountFail
          description="To keep going with the process is necessary to resend the email"
          redirect="/login"
          buttonDesctiption="Click to Go to Log in"
        />
      )}
    </div>
  );
}

export default ForgotPasswordScreen