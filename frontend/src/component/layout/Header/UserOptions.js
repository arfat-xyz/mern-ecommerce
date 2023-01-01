import { Backdrop, SpeedDial, SpeedDialAction } from "@mui/material";
import React from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import "./Header.css";
import {
  MdAccountCircle,
  MdDashboard,
  MdExitToApp,
  MdFilterListAlt,
} from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../actions/userAction";
const UserOptions = ({ user }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dashboard = () => {
    navigate("/dashboard");
    setOpen(false);
  };
  const orders = () => {
    navigate("/orders");
    setOpen(false);
  };
  const account = () => {
    navigate("/account");
    setOpen(false);
  };
  const logoutUser = () => {
    dispatch(logout());
    setOpen(false);
    toast.success("Logout Successfully");
    navigate("/");
  };

  const options = [
    {
      icon: <MdFilterListAlt />,
      name: "Orders",
      func: orders,
    },
    {
      icon: <MdAccountCircle />,
      name: "Profile",
      func: account,
    },
    {
      icon: <MdExitToApp />,
      name: "Logout",
      func: logoutUser,
    },
  ];
  if (user.role === "admin") {
    options.unshift({
      icon: <MdDashboard />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  return (
    <>
      <Backdrop open={open} style={{ zIndex: 10 }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        style={{ zIndex: 11 }}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : "/Profile.png"}
            alt="Profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
          />
        ))}
      </SpeedDial>
    </>
  );
};

export default UserOptions;
