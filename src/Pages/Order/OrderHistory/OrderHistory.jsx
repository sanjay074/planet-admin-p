import React, { useEffect, useState } from "react";
import "./OrderHistory.css";
import { ProductHistory } from "../../../Service/Allapi";
import { saveAs } from "file-saver"; // Import file-saver for download functionalities
import * as XLSX from "xlsx"; // Import xlsx for Excel download
import { useNavigate } from "react-router-dom";

export const OrderHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [orderHistory, setOrderHistory] = useState([]);
  const itemsPerPage = 5;
  const navigate=useNavigate()
  useEffect(() => {
    const getAllHistory = async () => {
      try {
        const result = await ProductHistory();
        const data = Array.isArray(result.data.getAllData)
          ? result.data.getAllData
          : [];
        setOrderHistory(data);
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };
    getAllHistory();
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil(orderHistory.length / itemsPerPage);

  // Get current items
  const currentItems = orderHistory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const downloadAsTxt = () => {
    const content = orderHistory
      .map(
        (order) =>
          `Order ID: ${order._id}, User ID: ${order.userId}, Total Price: Rs ${order.totalPrice}, Order Date: ${order.orderDate}, Status: ${order.status}, Address: ${order.address.name}, ${order.address.mobile}, ${order.address.email}, ${order.address.Pincode}, ${order.address.Landmark}, ${order.address.district}, ${order.address.state}`
      )
      .join("\n");
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "orders.txt");
  };

  const downloadAsExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      orderHistory.map((order) => ({
        OrderID: order._id,
        UserID: order.userId,
        TotalPrice: order.totalPrice,
        OrderDate: order.orderDate,
        Status: order.status,
        AddressName: order.address.name,
        AddressMobile: order.address.mobile,
        AddressEmail: order.address.email,
        AddressPincode: order.address.Pincode,
        AddressLandmark: order.address.Landmark,
        AddressDistrict: order.address.district,
        AddressState: order.address.state,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
    XLSX.writeFile(workbook, "orders.xlsx");
  };

  const downloadCSS = () => {
    const content = `
      .container3 {
        height: 100vh;
        margin-top: 115px;
        background-color: whitesmoke;
        color: black;
        margin-left: 5px;
      }
      .actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
      }
      .actions button, .actions input {
        margin: 0 5px;
        padding: 10px;
        border: none;
        cursor: pointer;
      }
      .search {
        flex-grow: 1;
        padding: 10px;
        border-radius: 5px;
      }
      .delete {
        background-color: red;
        color: white;
      }
      .add-new {
        background-color: purple;
        color: white;
      }
      table {
        width: 100%;
        border-collapse: collapse;
      }
      thead {
        background-color: #f4f4f4;
      }
      th, td {
        padding: 10px;
        text-align: left;
        border: 1px solid #ddd;
      }
      img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
        vertical-align: middle;
      }
      .pagination {
        display: flex;
        justify-content: center;
        margin-top: 20px;
      }
      .pagination button {
        margin: 0 5px;
        padding: 10px;
        border: none;
        cursor: pointer;
      }
      .pagination .active {
        background-color: purple;
        color: white;
      }
    `;
    const blob = new Blob([content], { type: "text/css;charset=utf-8" });
    saveAs(blob, "styles.css");
  };

  const printPage = () => {
    window.print();
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
   const handalViewHistory=async(id)=>{
    navigate(`/ViewOrderList/${id}`)
   }
   const handalEditHistory= async(id)=>{
    navigate(`/EditOrderHistory/${id}`)
   }
  const handalDeleteHistory= ()=>{

  }
  return (
    <div className="container3">
      <div className="actions1">
        <button onClick={downloadCSS}>Css</button>
        <button onClick={downloadAsTxt}>Txt</button>
        <button onClick={downloadAsExcel}>Excel</button>
        <button onClick={printPage}>Print</button>
        <input type="text" placeholder="Search" className="search" />
        {/* <button className="delete">Delete</button> */}
        <button className="add-new">+ Add New</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>UserId</th>
            <th>OrderID</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Address</th>
            <th>Total Price</th>
            <th>Order Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((order) => (
            <tr key={order._id}>
              <td>{order.userId}</td>
              <td>{order._id}</td>
              <td>
                <td>
                  {order.orderItems.map((item, index) => (
                    <div key={index} className="product-image-name">
                      {item.productId &&
                      item.productId.images &&
                      item.productId.images.length > 0 ? (
                        <>
                          <img
                            src={item.productId.images[0]}
                            alt={item.productId.name}
                          />
                          <div className="product-name">
                            {item.productId.name}
                          </div>
                        </>
                      ) : (
                        <div>No image available</div>
                      )}
                    </div>
                  ))}
                </td>
              </td>

              <td>
                {order.orderItems.map((item, index) => (
                  <div key={index}>{item.quantity}</div>
                ))}
              </td>
              <td>
                <div className="address-info">
                  <div className="address-item">
                    <span>Name:</span> {order.address.name}
                  </div>
                  <div className="address-item">
                    <span>Mobile:</span> {order.address.mobile}
                  </div>
                  <div className="address-item">
                    <span>Email:</span> {order.address.email}
                  </div>
                  <div className="address-item">
                    <span>Pincode:</span> {order.address.Pincode}
                  </div>
                  <div className="address-item">
                    <span>Landmark:</span> {order.address.Landmark}
                  </div>
                  <div className="address-item">
                    <span>District:</span> {order.address.district}
                  </div>
                  <div className="address-item">
                    <span>State:</span> {order.address.state}
                  </div>
                </div>
              </td>
              <td>Rs {order.totalPrice}</td>
              <td>{new Date(order.orderDate).toLocaleDateString()}</td>
              <td>{order.status}</td>
              <td className="action">
                <button onClick={()=>{handalViewHistory(order._id)}}>👁️</button>
                <button onClick={()=>{handalEditHistory(order._id)}}>✏️</button>
                <button onClick={()=>{handalDeleteHistory(order._id)}}>❌</button>
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
  );
};
