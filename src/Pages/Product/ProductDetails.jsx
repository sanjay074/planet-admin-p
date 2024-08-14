import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetSingleProduct } from "../../Service/Allapi";
import "./ProductDetails.css";

export const ProductDetails = () => {
  const { id } = useParams();
  // console.log(id, "id from the db.>>>>..");

  const [product, setProduct] = useState({});
  // console.log(product, "product details");
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const result = await GetSingleProduct(id);
        // console.log(result, "result data /////////");

        setProduct(result.data.record);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, []);

  return (
    <div className="product-details-container1">
      <div className="product-details-left1">
      <img
      src={(product.images && Array.isArray(product.images) && product.images.length > 0 ? product.images[0] : "default-image.jpg")}
      alt={product.name || "Product Image"}
      className="product-image1"
    />
        <div
      className={`stock-status ${
        product.stock ? "in-stock" : "out-of-stock"
      }`}
    >
      {product.stock ? "In Stock" : "Out Of Stock"}
    </div>
      </div>
      <div className="product-details-right1">
        <div className="headline-box">
          <h1>Product Details</h1>
        </div>
        <div className="details-grid">
          {[
            { label: "Product ID", value: product._id || "N/A" },
            { label: "Name", value: product.name || "N/A" },
            { label: "Base Price", value: `Rs ${product.basePrice || "N/A"}` },
            {
              label: "Final Price",
              value: `Rs ${product.finalPrice || "N/A"}`,
            },
            {
              label: "Discount Price",
              value: `Rs ${product.discountPrice || "N/A"}`,
            },
            { label: "Description", value: product.description || "N/A" },
          ].map((field, index) => (
            <div key={index} className="details-card">
              <p>
                <strong>{field.label}:</strong>{" "}
                <span className="detail-value">{field.value}</span>
              </p>
            </div>
          ))}
        </div>
        <button
          onClick={() => window.history.back()}
          className="go-back-button"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};
