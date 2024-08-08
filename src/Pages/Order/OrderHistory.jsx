import React, { useEffect, useState } from "react";
import "./OrderHistory.css";
import { GetProductList } from "../../Service/Allapi";
// import '../assets/Global.css'

export const OrderHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [orderHistory, setOrderHistory] = useState([]);
  const itemsPerPage = 5;

  useEffect(() => {
    const getAllHistory = async () => {
      try {
        const result = await GetProductList();
        console.log(result, "result data from api");

        const data = Array.isArray(result.data.getAllData)
          ? result.data.getAllData
          : [];
        setOrderHistory(data);
      } catch (error) {
        console.error(`facing error inside the order history`, error);
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
        (product) =>
          `Product: ${product.name}, Product ID: ${product.productId}, Price: Rs ${product.price}, Sale: ${product.sale}, Stock: ${product.stock}`
      )
      .join("\n");
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "products.txt");
  };

  const downloadAsExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(products);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
    XLSX.writeFile(workbook, "products.xlsx");
  };

  const downloadCSS = () => {
    const content = `
      .container {
        width: 80%;
        margin: 0 auto;
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
  return (
    <div className="container3">
      <div className="actions">
        <button onClick={downloadCSS}>Css</button>
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
            <th>productId</th>
            <th>quantity</th>
            <th>address</th>
            <th>total Price</th>
            <th>OrderDate</th>
            <th>status</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((product) => (
            <tr key={product.id}>
              <td>
                <img src={product.imageUrl} alt={product.name} />
                {product.userId}
              </td>
              <td>{product.productId}</td>
              <td>{product.quantity}</td>
              <td>{product.address}</td>
              <td>Rs {product.totalPrice}</td>
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
            next
          </button>
        )}
      </div>
    </div>
  );
};
