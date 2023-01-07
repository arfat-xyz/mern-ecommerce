import React, { useEffect, useState } from "react";
import "./UpdateProfile.css";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FaceIcon from "@mui/icons-material/Face";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loadUser, updateProfile } from "../../actions/userAction";
import Loading from "../extraComponent/Loading";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstant";
import MetaData from "../layout/MetaData";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const updateProfileSubmit = (e) => {
    e.preventDefault();

    let myForm = new FormData();

    myForm.append("name", name);
    myForm.append("email", email);
    myForm.set("avatar", avatar);

    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      // console.log("reader", reader);
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setName(user?.name);
      setEmail(user?.email);
      setAvatarPreview(user?.avatar?.url);
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("Profile is Updated");
      dispatch(loadUser());
      navigate("/account");
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, isUpdated, navigate, user]);
  loading && <Loading />;
  return (
    <>
      <MetaData title="Update Profile" />
      <div className="updateProfileContainer">
        <div className="updateProfileBox">
          <h2 className="updateProfileHeading">Update Profile</h2>
          <form
            className="updateProfileForm"
            encType="multipart/form-data"
            onSubmit={updateProfileSubmit}
          >
            <div className="updateProfileName">
              <FaceIcon />
              <input
                type="text"
                placeholder="Name"
                required
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="updateProfileEmail">
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div id="updateProfileImage">
              <img src={avatarPreview} alt="Avatar Preview" />
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProfileDataChange}
              />
            </div>
            <input
              type="submit"
              value="Update Profile"
              className="updateProfileBtn"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
