import React, { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ImageCarousel.css';

const ImageListComponent = ({ imageUrls, handleImageSelect, handleSave }) => {
  const sliderRef = useRef(null);

  const handleCopy = (imageUrl) => {
    navigator.clipboard.writeText(imageUrl)
      .then(() => {
        alert('Image URL copied to clipboard!');
      })
      .catch((error) => {
        console.error('Failed to copy image URL:', error);
      });
  };

  const handleSaveImage = (imageUrl) => {
    handleSave(imageUrl);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000, // Auto scroll interval in milliseconds (10 seconds)
    cssEase: 'linear',
    nextArrow: <button className="carousel-button carousel-next">Next</button>,
    prevArrow: <button className="carousel-button carousel-prev">Previous</button>
  };

  return (
    <div className="carousel-container">
      {imageUrls && imageUrls.length > 0 ? (
        <Slider ref={sliderRef} {...settings}>
          {imageUrls.map((imageUrl, index) => (
            <div key={index} className="carousel-slide">
              <img
                src={imageUrl}
                alt={`Image ${index}`}
                className="carousel-image"
                onClick={() => handleImageSelect(imageUrl)}
              />
              <button className="btn btn-info rounded-pill m-2" onClick={() => handleCopy(imageUrl)}>Copy</button>
              <button className="btn btn-success rounded-pill m-2" onClick={() => handleSaveImage(imageUrl)}>Save</button>
            </div>
          ))}
        </Slider>
      ) : (
        <p>No images found</p>
      )}
    </div>
  );
};

export default ImageListComponent;
