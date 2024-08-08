import React, { useEffect, useState } from "react";
import "./NewOrder.css";
import { GetProductList } from "../../Service/Allapi";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

export const NewOrder = () => {
  const [orderList, setOrderList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;


  // console.log(orderList,"order list from api ");
  
  useEffect(() => {
    const getProduct = async () => {
      try {
        const result = await GetProductList();
        console.log(result,"result data from api");
        
        // Ensure orderList is an array
        const data = Array.isArray(result.data.getAllData) ? result.data.getAllData: [];
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
        (product) =>
          `Product: ${product.name}, Product ID: ${product._id}, Price: Rs ${product.basePrice}, Sale: ${product.discountPrice || 'N/A'}, Stock: ${product.stock}`
      )
      .join("\n");
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "products.txt");
  };

  const downloadAsExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(orderList);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
    XLSX.writeFile(workbook, "products.xlsx");
  };

  const printPage = () => {
    window.print();
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container2">
      <div className="actions">
        <button onClick={downloadAsTxt}>Txt</button>
        <button onClick={downloadAsExcel}>Excel</button>
        <button onClick={printPage}>Print</button>
        <input type="text" placeholder="Search" className="search" />
        <button className="delete">Delete</button>
        <button className="add-new">+ Add New</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>UserId</th>
            <th>Product ID</th>
            <th>Quantity</th>
            <th>Address</th>
            <th>TotalPrice</th>
            <th>OrderDate</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((product) => (
            <tr key={product._id}>
              <td>
                <img src={product.userId} alt={product.name} />
                {product.name}
                {product.userId}
              </td>
              <td>{product.orderItems.productId}</td>
              <td>Rs {product.orderItems.quantity}</td>
              <td>{product.address}</td>
              <td>{product.totalPrice || 'N/A'}</td>
              
              <td>{product.orderDate}</td>
              <td>{product.status}</td>
              <td>
                <button>👁️</button>
                <button>✏️</button>
                <button>🗑️</button>
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
