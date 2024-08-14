import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import './InsertOffer.css';

export const InsertOffer = () => {
  const [sliderName, setSliderName] = useState("");
  const [sliderUrl, setSliderUrl] = useState("");
  const [sliderImage, setSliderImage] = useState(null);

  const handleOnChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'sliderImage') {
      setSliderImage(files[0]);
    } else {
      if (name === 'sliderName') setSliderName(value);
      if (name === 'sliderUrl') setSliderUrl(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newFormData = new FormData();
    newFormData.append('sliderName', sliderName);
    newFormData.append('sliderUrl', sliderUrl);
    if (sliderImage) newFormData.append('sliderImage', sliderImage);

    try {
      const response = await PostOfferData(newFormData); 
      if (response) {
        alert('Offer data added successfully');
        setSliderName("");
        setSliderUrl("");
        setSliderImage(null);
      }
    } catch (error) {
      console.log('Error uploading data:', error);
    }
  };

  return (
    <div className="form-container8">
      <h2>Add Offer</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group8">
          <TextField
            name="sliderName"
            label="Slider Name"
            variant="outlined"
            fullWidth
            value={sliderName}
            onChange={handleOnChange}
            required
          />
        </div>
        <div className="form-group8">
          <TextField
        
            name="sliderUrl"
            label="Slider URL"
            variant="outlined"
            fullWidth
            value={sliderUrl}
            onChange={handleOnChange}
            required
          />
        </div>
        <div className="upload-images8">
        <label htmlFor="image-upload" className="upload-label8">Upload Image</label>
          <input
            type="file"
            name="sliderImage"
            accept="image/*"
            id="image-upload"
            onChange={handleOnChange}
          />
          <div className="upload-box8">
            {sliderImage ? (
              <img
                src={URL.createObjectURL(sliderImage)}
                alt="Preview"
                className="upload-preview8"
              />
            ) : (
              <label htmlFor="image-upload">Upload Image</label>
            )}
          </div>
        </div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="submit-button8"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

// Dummy function to simulate API call
const PostOfferData = async (data) => {
  console.log('Posting data:', data);
  return Promise.resolve(true);
};
