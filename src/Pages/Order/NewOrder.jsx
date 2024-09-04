import React, { useEffect, useState } from "react";
import "./NewOrder.css";
import { DeleteOrderList, NewProductList, updateProductDetail} from "../../Service/Allapi";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const NewOrder = () => {
  const [orderList, setOrderList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [orderStatus, setOrderStatus] = useState({ status: "" });
  const navigate = useNavigate();
  const itemsPerPage = 5;

  useEffect(() => {
    const getProduct = async () => {
      try {
        const result = await NewProductList();
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

  const totalPages = Math.ceil(orderList.length / itemsPerPage);
  const currentItems = orderList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const downloadAsTxt = () => {
    const content = orderList
      .map(
        (order) =>
          `Order ID: ${order._id}, Address: ${order.address?.name || "N/A"}, Total Price: Rs ${order.totalPrice || "N/A"}`
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

  const handleOrderView = (id) => {
    navigate(`/OrderDetails/${id}`);
  };

  const handleEditDetails = (id) => {
    navigate(`/EditNewOrderDetails/${id}`);
  };

  const handleDelete = async (id) => {
   const isConfirm= window.confirm(" are you sure you want to delete Order")
   if(isConfirm){
    const data = await DeleteOrderList(id);
    setOrderList(orderList.filter((item) => item._id !== id));
   }
   
  };

  const handleUpdateStatus = (e) => {
    setOrderStatus({ status: e.target.value });
  };

  const handleUpdateProductItem = async (item_id) => {
    try {
      const response = await updateProductDetail(item_id, orderStatus);
      toast.success("Order status updated successfully");
      setOrderList((prevOrderList) =>
        prevOrderList.map((order) =>
          order._id === item_id ? { ...order, status: orderStatus.status } : order
        )
      );
    } catch (error) {
      toast.error("Error updating Order Status");
    }
  };

  return (
    <div className="offers-container1">
      <div className="container2">
        <div className="actions">
          <button onClick={downloadAsTxt}>Txt</button>
          <button onClick={downloadAsExcel}>Excel</button>
          <button onClick={printPage}>Print</button>
          <input type="text" placeholder="Search" className="search" />
          <button className="add-new">+ Add New</button>
        </div>
        <table className="order-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Product ID</th>
              <th>Product Image</th>
              <th>Quantity</th>
              <th>Address</th>
              <th>Total Price</th>
              <th>Order Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((order) => (
              <tr key={order._id}>
                <td>
                  {order.orderItems?.[0]?.productId?.name || "N/A"}
                </td>
                <td>{order._id || "N/A"}</td>
                <td>
                  {order.orderItems?.[0]?.productId?.images?.[0] ? (
                    <img
                      src={order.orderItems[0].productId.images[0]}
                      alt={order.orderItems[0].productId.name || "N/A"}
                    />
                  ) : "N/A"}
                </td>
                <td>
                  {order.orderItems?.map((item, index) => (
                    <div key={index} className="product-quantity">
                      {item.quantity || "N/A"}
                    </div>
                  )) || "N/A"}
                </td>
                <td>
                  <div>Name: {order.address?.name || "N/A"}</div>
                  <div>Mobile: {order.address?.mobile || "N/A"}</div>
                  <div>Email: {order.address?.email || "N/A"}</div>
                  <div>Pincode: {order.address?.Pincode || "N/A"}</div>
                  <div>Landmark: {order.address?.Landmark || "N/A"}</div>
                  <div>District: {order.address?.district || "N/A"}</div>
                  <div>State: {order.address?.state || "N/A"}</div>
                </td>
                <td>Rs {order.totalPrice || "N/A"}</td>
                <td>{order.orderDate ? new Date(order.orderDate).toLocaleDateString() : "N/A"}</td>
                <td>{order.status || "N/A"}</td>
                <td className="action">
                  <button onClick={() => handleOrderView(order._id)}>👁️</button>
                  <select
                  className="selectopction"
                    name="orderStatus"
                    id="orderStatus"
                    onChange={handleUpdateStatus}
                    value={orderStatus.status}
                  >
                    <option value="">Select Item Status</option>
                    <option value="Processed">Processed</option>
                    <option value="shipped">Shipped</option>
                    <option value="inRoute">InRoute</option>
                    <option value="Arrival">Arrival</option>
                    <option value="delivered">Delivered</option>
                    <option value="Returned">Returned</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="outofStock">OutofStock</option>
                  </select>
                  <button onClick={() => handleUpdateProductItem(order._id)}>
                    Update
                  </button>
                  <button onClick={() => handleDelete(order._id)}>❌</button>
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
      <ToastContainer />
    </div>
  );
};
