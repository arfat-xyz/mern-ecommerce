import React, { useEffect, useState } from "react";
import "./ResetPassword.css";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import FaceIcon from "@mui/icons-material/Face";
import toast from "react-hot-toast";
import { Dispatch, useDispatch, useSelector } from "react-redux";
import { clearErrors, loadUser, resetPassword } from "../../actions/userAction";
import Loading from "../extraComponent/Loading";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstant";
import MetaData from "../layout/MetaData";
import { useNavigate, useParams } from "react-router-dom";
const ResetPassword = (props) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { token } = useParams();
  const navigate = useNavigate();
  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      let myForm = new FormData();

      myForm.append("password", password);
      myForm.append("confirmPassword", confirmPassword);

      dispatch(resetPassword(token, myForm));
    } else {
      toast.error("password didn't match");
    }
  };

  // console.log(token, password, confirmPassword);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      toast.success("Password updated successfully");
      dispatch(loadUser());
      navigate("/login");
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, success, navigate, user]);
  return (
    <>
      <MetaData title="Update Password" />
      <div className="resetPasswordContainer">
        <div className="resetPasswordBox">
          <h2 className="resetPasswordHeading">Update Password</h2>
          <form
            className="resetPasswordForm"
            encType="multipart/form-data"
            onSubmit={resetPasswordSubmit}
          >
            <div>
              <LockOpenIcon />
              <input
                type="password"
                placeholder="new Password"
                required
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <LockPersonIcon />
              <input
                type="password"
                placeholder="confirm Password"
                required
                name="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <input type="submit" value="Update" className="resetPasswordBtn" />
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
