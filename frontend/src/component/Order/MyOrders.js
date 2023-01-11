import React, { useState } from "react";
import Loading from "../extraComponent/Loading";
import MetaData from "../layout/MetaData";
import { DataGrid } from "@mui/x-data-grid";
import "./MyOrders.css";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { clearErrors, myOrders } from "../../actions/orderAction";
import { Link } from "react-router-dom";
import { MdLaunch } from "react-icons/md";
const MyOrders = () => {
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);
  const [pageSize, setPageSize] = useState(5);

  //   columns and rows
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
      renderCell: (params) => {
        return <>$ {params.getValue(params.id, "amount")}</>;
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <MdLaunch />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });
  //   console.log(orders);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(myOrders());
  }, [dispatch, error]);
  return (
    <>
      <MetaData title={`${user?.name} - Orders`} />
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="myOrdersPage">
            <DataGrid
              rows={rows}
              columns={columns}
              //   pageSize={10}
              disableSelectionOnClick
              className="myOrdersTable"
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[5, 10, 20]}
              autoHeight
            />

            <Typography id="myOrdersHeading">{user?.name}'s Orders</Typography>
          </div>
        </>
      )}
    </>
  );
};

export default MyOrders;
