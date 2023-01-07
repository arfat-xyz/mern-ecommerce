import React, { useEffect, useState } from "react";
import "./ForgotPassword.css";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import FaceIcon from "@mui/icons-material/Face";
import toast from "react-hot-toast";
import { Dispatch, useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../actions/userAction";
import Loading from "../extraComponent/Loading";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstant";
import MetaData from "../layout/MetaData";
import { useNavigate } from "react-router-dom";
import MailOutline from "@mui/icons-material/MailOutline";
const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );
  const [email, setEmail] = useState("");
  //   console.log(email);
  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      toast.success(message);
      
    }
    // loading && <Loading />;
  }, [dispatch, error, message]);
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <MetaData title="Forget Password" />
      <div className="forgotPasswordContainer">
        <div className="forgotPasswordBox">
          <h2 className="forgotPasswordHeading">Forget Password</h2>
          <form
            className="forgotPasswordForm"
            encType="multipart/form-data"
            onSubmit={forgotPasswordSubmit}
          >
            <div className="updateProfileEmail">
              <MailOutline />
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <input type="submit" value="Send" className="forgotPasswordBtn" />
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
