import React, { useEffect, useState } from 'react';
import './SavedImagesPage.css';

const SavedImagesPage = ({ savedImageUrls }) => {
  const [savedImages, setSavedImages] = useState([]);

  useEffect(() => {
    setSavedImages(savedImageUrls);
  }, [savedImageUrls]);

  const handleDeleteImage = (index) => {
    const updatedImages = [...savedImages];
    updatedImages.splice(index, 1);
    setSavedImages(updatedImages);
  };

  return (
    <div className="saved-images-page">
      <h1 className="saved-images-title">Saved Images</h1>
      <div className="saved-images-grid">
        {savedImageUrls.length > 0 ? (
          savedImageUrls.map((imageUrl, index) => (
            <div className="saved-image-item" key={index}>
              <img className="saved-image" src={imageUrl} alt={`Saved Image ${index}`} />
              
            </div>
          ))
        ) : (
          <p>No saved images found</p>
        )}
      </div>
    </div>
  );
};

export default SavedImagesPage;
