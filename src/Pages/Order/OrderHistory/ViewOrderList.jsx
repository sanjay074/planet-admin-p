import React from 'react';
import './ViewOrderList.css'; // Make sure to import the CSS file
import { Link } from 'react-router-dom';

export const ViewOrderList = () => {
  // Sample data (you might fetch this data from an API or use props)
  const order = {
    userId: '12345',
    productId: '67890',
    quantity: 1,
    address: '123 Main St, Springfield',
    totalPrice: '$99.99',
    orderDate: '2024-08-13',
    imageUrl: 'https://th.bing.com/th/id/OIP.C2SLOBsA6wA-OeW2nCSRcAHaHa?rs=1&pid=ImgDetMain'  // Update with the actual path
  };

  return (
    <div className="classname01-container">
      <div className="classname01-card">
        <div className="classname01-image-col">
          <img src={order.imageUrl} alt="Product" className="classname01-product-image" />
          <button className="classname01-stock-button">In Stock</button>
        </div>
        <div className="classname01-details-col">
          <h2 className="classname01-order-title">Order Details</h2>
          <div className="classname01-order-details">
            <div className="classname01-order-detail">
              <div className="classname01-order-field"><strong>User ID:</strong></div>
              <div className="classname01-order-value">{order.userId}</div>
            </div>
            <div className="classname01-order-detail">
              <div className="classname01-order-field"><strong>Product ID:</strong></div>
              <div className="classname01-order-value">{order.productId}</div>
            </div>
            <div className="classname01-order-detail">
              <div className="classname01-order-field"><strong>Quantity:</strong></div>
              <div className="classname01-order-value">{order.quantity}</div>
            </div>
            <div className="classname01-order-detail">
              <div className="classname01-order-field"><strong>Address:</strong></div>
              <div className="classname01-order-value">{order.address}</div>
            </div>
            <div className="classname01-order-detail">
              <div className="classname01-order-field"><strong>Total Price:</strong></div>
              <div className="classname01-order-value">{order.totalPrice}</div>
            </div>
            <div className="classname01-order-detail">
              <div className="classname01-order-field"><strong>Order Date:</strong></div>
              <div className="classname01-order-value">{order.orderDate}</div>
            </div>
            <Link to='/OrderHistory'>
              <button className='classname01-btn'>Back</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
