import React, { useEffect, useState } from "react";
import "./NewOrder.css";
import { DeleteOrderList, NewProductList } from "../../Service/Allapi";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { Navigate, useNavigate } from "react-router-dom";

export const NewOrder = () => {
  const [orderList, setOrderList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navaigate = useNavigate();
  const itemsPerPage = 5;
  console.log(orderList, "orderlist api >>>>>>>>.");

  useEffect(() => {
    const getProduct = async () => {
      try {
        const result = await NewProductList();
        console.log(result, "result data from api");

        // Ensure orderList is an array
        const data = Array.isArray(result.data.recentOrder)
          ? result.data.recentOrder
          : [];
        setOrderList(data);
      } catch (error) {
        console.log("Facing error in getting data from API", error);
      }
    };
    getProduct();
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil(orderList.length / itemsPerPage);

  // Get current items
  const currentItems = orderList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const downloadAsTxt = () => {
    const content = orderList
      .map(
        (order) =>
          `Order ID: ${order._id}, Address: ${order.address}, Total Price: Rs ${order.totalPrice}`
      )
      .join("\n");
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "orders.txt");
  };

  const downloadAsExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(orderList);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
    XLSX.writeFile(workbook, "orders.xlsx");
  };

  const printPage = () => {
    window.print();
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handalOrederView = (id) => {
    navaigate(`/OrderDetails/${id}`);
  };
  const handalEditDetails = (id) => {
    navaigate(`/ViewNewOrderDetails/${id}`);
  };

  const handaleDelete = async (id) => {
    const data = await DeleteOrderList(id);
    console.log(data, "delete data ...");

    setOrderList(orderList.filter((item, index) => item._id !== id));
  };

  return (
    <div className="offers-container1">
      <div className="container2">
        <div className="actions">
          <button onClick={downloadAsTxt}>Txt</button>
          <button onClick={downloadAsExcel}>Excel</button>
          <button onClick={printPage}>Print</button>
          <input type="text" placeholder="Search" className="search" />
          {/* <button className="delete">Delete</button> */}
          <button className="add-new">+ Add New</button>
        </div>
        <table className="order-table">
          <thead>
            <tr>
              <th>UserId</th>
              <th>Product ID</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Address</th>
              <th>TotalPrice</th>
              <th>OrderDate</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((order) => (
              <tr key={order._id}>
                <td>{order.userId}</td>
                <td>{order._id}</td>
                <td>
                  {order.orderItems.map((item, index) => (
                    <div key={index} className="product-details">
                      {item.productId &&
                        item.productId.images &&
                        item.productId.images.length > 0 && (
                          <div>
                            <img
                              src={item.productId.images[0]}
                              alt={item.productId.name}
                            />
                            <div className="product-name">
                              {item.productId.name}
                            </div>
                          </div>
                        )}
                    </div>
                  ))}
                </td>
                <td>
                  {order.orderItems.map((item, index) => (
                    <div key={index} className="product-quantity">
                      {item.quantity}
                    </div>
                  ))}
                </td>
                <td>
                  <div>Name:{order.address.name}</div>
                  <div> Mobile:{order.address.mobile}</div>
                  <div>Email:{order.address.email}</div>
                  <div>Pincode:{order.address.Pincode}</div>
                  <div>Landmark:{order.address.Landmark}</div>
                  <div>district:{order.address.district}</div>
                  <div>state:{order.address.state}</div>
                </td>
                <td>Rs {order.totalPrice || "N/A"}</td>
                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                <td>{order.status}</td>
                <td className="action">
                  <button onClick={() => handalOrederView(order._id)}>
                    👁️
                  </button>
                  <button onClick={() => handalEditDetails(order._id)}>
                    ✏️
                  </button>
                  <button onClick={() => handaleDelete(order._id)}>❌</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
          {currentPage < totalPages && (
            <button onClick={() => handlePageChange(currentPage + 1)}>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
