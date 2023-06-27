import React, { useEffect, useState } from 'react';

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
    <div>
      <h1>Saved Images</h1>
      {savedImageUrls.length > 0 ? (
        savedImageUrls.map((imageUrl, index) => (
          <div key={index}>
            <img src={imageUrl} alt={`Saved Image ${index}`} />
            
          </div>
        ))
      ) : (
        <p>No saved images found</p>
      )}
    </div>
  );
};

export default SavedImagesPage;
