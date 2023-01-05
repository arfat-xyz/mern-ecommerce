import React from "react";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import "./Profile.css";
import { useSelector } from "react-redux";
import Loading from "../extraComponent/Loading";
import { useEffect } from "react";

const Profile = () => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  // const x = useSelector((state) => state.user);
  // console.log(x);
  useEffect(() => {}, []);
  if (isAuthenticated === false && loading === false) {
    navigate("/");
  }
  return loading ? (
    <Loading />
  ) : (
    <>
      {user?.name && <MetaData title={user?.name} />}
      <div className="profileContainer">
        <div>
          <h1>My Profile</h1>
          <img src={user?.avatar?.url} alt={user?.name} />
          <Link to="/me/update">Edit Profile</Link>
        </div>
        <div>
          <div>
            <h4>Full Name</h4>
            <p>{user.name}</p>
          </div>
          <div>
            <h4>Email</h4>
            <p>{user.email}</p>
          </div>
          <div>
            <h4>Joined On</h4>
            <p>{String(user.createdAt).substr(0, 10)}</p>
          </div>

          <div>
            <Link to="/orders">My Orders</Link>
            <Link to="/password/update">Change Password</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
