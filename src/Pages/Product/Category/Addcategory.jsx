import React, { useState } from 'react';
import {
  TextField,
  Button,
} from '@mui/material';
import './Addcatagori.css'; 

let initialValue = {
  categoryName: '',
  description: '',
  file: null,
};

export const Addcategory = () => {
  const [addCategory, setAddCategory] = useState(initialValue);
  const [images, setImages] = useState([null, null, null]);

  const handleOnChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      const newImages = [...images];
      Array.from(files).forEach((file, index) => {
        if (index < 3) {
          newImages[index] = file; 
        }
      });
      setImages(newImages); 
    } else {
      setAddCategory((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const newFormData = new FormData();
    Object.keys(addCategory).forEach((key) => {
      if (addCategory[key] !== null) {
        newFormData.append(key, addCategory[key]);
      }
    });

    images.forEach((image, index) => {
      if (image) {
        newFormData.append(`image${index + 1}`, image);
      }
    });

    try {
      const response = await PostCategoryData(newFormData); // Implement your API call here
      if (response) {
        alert('Category data added successfully');
        // Optionally clear the form and images here
        setAddCategory(initialValue);
        setImages([null, null, null]);
      }
    } catch (error) {
      console.log('Facing problem in post data in API:', error);
    }
  };

  return (
    <div className="form-container5">
      <h2>Add Category</h2>
      <form>
        <div className="form-group5">
          <TextField
            name="categoryName"
            label="Category Name"
            value={addCategory.categoryName}
            onChange={handleOnChange}
            sx={{ height: '50px' }}
            variant="outlined"
            fullWidth
            required
          />
          <small>Do Not Exceed 20 Characters When Entering The Category Name.</small>
        </div>
        <div className="form-group5">
          <TextField
            name="description"
            label="Description"
            value={addCategory.description}
            onChange={handleOnChange}
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            required
          />
          <small>Do not exceed 100 characters when entering the description.</small>
        </div>
        <div className="upload-images5">
          <h4>Upload Images</h4>
          <input
            type="file"
            name="file"
            accept="image/*"
            multiple
            id="image-upload"
            onChange={handleOnChange}
          />
          <div className="upload-boxes">
            {images.map((image, index) => (
              <div key={index} className="upload-box">
                {image ? (
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Upload ${index}`}
                    className="upload-preview5"
                  />
                ) : (
                  <label htmlFor="image-upload">
                    {index === 0 ? 'Upload Image 1' : index === 1 ? 'Upload Image 2' : 'Upload Image 3'}
                  </label>
                )}
              </div>
            ))}
          </div>
        </div>
        <Button
          variant="contained"
          color="primary"
          className="save-button5"
          onClick={handleSave}
        >
          Save Category
        </Button>
      </form>
    </div>
  );
};

// Dummy function to simulate API call
const PostCategoryData = async (data) => {
  // Replace this with your actual API call
  console.log('Posting data:', data);
  return Promise.resolve(true);
};
