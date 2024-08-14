import React, { useEffect, useState } from "react";
import "./OrderDetails.css";
import { Link, useParams } from 'react-router-dom';
import { ViewOrderList } from "../../Service/Allapi";

export const OrderDetails = () => {
  const { id } = useParams();
  // Initialize state
  console.log(id, "idddddddd");
  
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const getAllOrder = async () => {
      try {
        const result = await ViewOrderList(id);
        console.log(result, "result .........>>>>>");
        
        if (result) {
          setOrder(result);  
        }
      } catch (error) {
        console.error('Facing problem in getting data from details', error);
      }
    };
    getAllOrder();
  }, [id]); // Add id as a dependency to refetch if the id changes

  // Check if order has data before rendering
  const hasOrderItems = order && order.orderItems && order.orderItems.length > 0;
  const firstOrderItem = hasOrderItems ? order.orderItems[0] : null;
  const productId = firstOrderItem && firstOrderItem.productId;
  const images = productId && productId.images;
  
  return (
    <div className="order-details-container">
      <div className="headline-box">
        <h1>Order Details</h1>
      </div>
      <div className="order-card">
        <div className="order-card-content">
          <div className="image-col">
            {images && images.length > 0 && (
              <img src={images[0]} alt="Product" className="product-image" />
            )}
            <button className="stock-button">{order && order.status === 'Processed' ? 'Processed' : 'In Stock'}</button>
          </div>
          <div className="details-col">
            <div className="order-details">
              <div className="order-detail">
                <div className="order-field"><strong>Order ID:</strong></div>
                <div className="order-value">{order ? order._id : 'N/A'}</div>
              </div>
              <div className="order-detail">
                <div className="order-field"><strong>User ID:</strong></div>
                <div className="order-value">{order ? order.userId : 'N/A'}</div>
              </div>
              <div className="order-detail">
                <div className="order-field"><strong>Product Name:</strong></div>
                <div className="order-value">
                  {firstOrderItem && productId ? productId.name : 'N/A'}
                </div>
              </div>
              <div className="order-detail">
                <div className="order-field"><strong>Quantity:</strong></div>
                <div className="order-value">
                  {firstOrderItem ? firstOrderItem.quantity : 'N/A'}
                </div>
              </div>
              <div className="order-detail">
                <div className="order-field"><strong>Address:</strong></div>
                <div className="order-value">
                  {order && order.address ? `${order.address.name}, ${order.address.mobile}, ${order.address.email}, ${order.address.Pincode}, ${order.address.Landmark}, ${order.address.district}, ${order.address.state}` : 'N/A'}
                </div>
              </div>
              <div className="order-detail">
                <div className="order-field"><strong>Total Price:</strong></div>
                <div className="order-value">{order ? `$${order.totalPrice}` : 'N/A'}</div>
              </div>
              <div className="order-detail">
                <div className="order-field"><strong>Order Date:</strong></div>
                <div className="order-value">{order ? new Date(order.orderDate).toLocaleDateString() : 'N/A'}</div>
              </div>
              <div className="order-detail">
                <div className="order-field"><strong>Status:</strong></div>
                <div className="order-value">{order ? order.status : 'N/A'}</div>
              </div>
            </div>
            <Link to='/NewOrder'>
              <button className="btn5">Back</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
