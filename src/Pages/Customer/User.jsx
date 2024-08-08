import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
 import "./User.css";
import { GettAllUserList } from "../../Service/Allapi";
// import '../../assets/Global.css'


export const User = () => {
  const [userList,setUserList]=useState([])
  console.log(userList,"userList getAll data ");
  useEffect(()=>{

    const getAllData= async()=>{
      try{
                 const result= await GettAllUserList()
                 console.log(result,"result data from api");
                 const product= result.data?.data || [];
                 if(Array.isArray(product)){
                  setUserList(product)
                 }else{
                  console.error('Expected an array from API, but got:', product);
                 }
      }catch(error){
        setUserList([])
        console.log('facing problem in resiving data from api');
      }
    }
    getAllData()
  },[])
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  const firstPage=currentPage*itemsPerPage
  const lastPage= firstPage-itemsPerPage
  const currentItems = Array.isArray(userList) ? userList.slice(firstPage,lastPage):[];
  // Calculate total pages
  const totalPages = Math.ceil(userList.length / itemsPerPage);

  // Get current items
  
  const downloadAsTxt = () => {
    const content = products
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
  }
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container4">
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
              
              <th>Product ID</th>
              <th>name</th>
              <th>Email</th>
              <th>gender</th>
              <th>birthday</th>
              <th>alternative Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {
            userList.length===0 ? (
              <tr>
              <td colSpan="6">No user available</td>
            </tr>
            ):(
              currentItems.map((product) => (
              <tr key={product.id}>
                
                <td>{product.productId}</td>
                <td>{product.name}</td>
                <td>{product.Email}</td>
                <td>{product.gender}</td>
                <td>{product.birthday}</td>
                <td>{product.alternativeName}</td>
                <td>
                  <button>👁️</button>
                  <button>✏️</button>
                  <button>🗑️</button>
                </td>
              </tr>
            ))
            )
          }
            
          </tbody>
        </table>

        <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
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
  )
}
