import React, { useEffect, useState } from "react";
import "./UpdatePassword.css";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import FaceIcon from "@mui/icons-material/Face";
import toast from "react-hot-toast";
import { Dispatch, useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  loadUser,
  updatePassword,
} from "../../actions/userAction";
import Loading from "../extraComponent/Loading";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstant";
import MetaData from "../layout/MetaData";
import { useNavigate } from "react-router-dom";
const UpdatePassword = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    let myForm = new FormData();

    myForm.append("oldPassword", oldPassword);
    myForm.append("newPassword", newPassword);
    myForm.append("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("Password updated successfully");
      dispatch(loadUser());
      navigate("/account");
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, isUpdated, navigate, user]);
  return (
    <>
      <MetaData title="Update Password" />
      <div className="updatePasswordContainer">
        <div className="updatePasswordBox">
          <h2 className="updatePasswordHeading">Update Password</h2>
          <form
            className="updatePasswordForm"
            encType="multipart/form-data"
            onSubmit={updatePasswordSubmit}
          >
            <div className="loginPassword">
              <VpnKeyIcon />
              <input
                type="password"
                placeholder="Old password"
                required
                name="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div className="loginPassword">
              <LockOpenIcon />
              <input
                type="password"
                placeholder="new Password"
                required
                name="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="loginPassword">
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
            <input
              type="submit"
              value="Update Password"
              className="updatePasswordBtn"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;
