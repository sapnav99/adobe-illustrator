import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ColorPalette from './Color/ColorPalette';
import ImageListComponent from './Images/ImageListComponent';

import PaintingCanvas from './Painting/PaintingCanvas';

const API_KEY = 'j6rEvm0z6Tmy92lNy3Qg87s5vq67042RVjVfNSstrpGWoGKP0gjKTspd';

const HomePage = ({ handleSave }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [imageUrls, setImageUrls] = useState([]);
  const [selectedImages, setSelectedImages] = useState('');
  const [brushSize, setBrushSize] = useState(5);
  const [copiedImage, setCopiedImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [erasing, setErasing] = useState(false);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setErasing(false); // Reset eraser mode when selecting a color
  };
  

  const handleImageCopy = (imageUrl) => {
    setCopiedImage(imageUrl);
  };

  const handleImageSelect = (imageUrl) => {
    setSelectedImages((prevImages) => [...prevImages, imageUrl]);
  };

  const handleLoadMore = async () => {
    try {
      const response = await axios.get(
        `https://api.pexels.com/v1/search?query=${searchQuery}&per_page=10&page=${currentPage + 1}`,
        {
          headers: {
            Authorization: API_KEY,
          },
        }
      );

      const images = response.data.photos.map((photo) => photo.src.large);
      setImageUrls((prevUrls) => [...prevUrls, ...images]);
      setCurrentPage((prevPage) => prevPage + 1);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.log('Error fetching images:', error);
    }
  };

  const fetchImages = async () => {
    try {
      const response = await axios.get(
        `https://api.pexels.com/v1/search?query=${searchQuery}&per_page=10&page=${currentPage}`,
        {
          headers: {
            Authorization: API_KEY,
          },
        }
      );

      const images = response.data.photos.map((photo) => photo.src.large);
      setImageUrls(images);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.log('Error fetching images:', error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [searchQuery, currentPage]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 col-sm-12">
          <div>
            <input
              className="col-4 border border-success border-3 rounded m-4 ps-2"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search here"
            />
            
          </div>
          <ImageListComponent
            imageUrls={imageUrls}
            handleImageSelect={handleImageSelect}
            handleImageCopy={handleImageCopy}
            handleLoadMore={handleLoadMore}
            totalPages={totalPages}
            handleSave={handleSave}
            
          />
        </div>
        <div className="col-md-6 col-sm-12">
        <ColorPalette selectedColor={selectedColor} setSelectedColor={setSelectedColor} />

          <div>
            <label className='btn btn-secondary rounded-pill m-2 '>Brush Size:</label>
            <select className='btn btn-light m-2 '
              value={brushSize}
              onChange={(e) => setBrushSize(parseInt(e.target.value))}
            >
              <option value="1">Small</option>
              <option value="3">Medium</option>
              <option value="5">Large</option>
            </select>
          </div>
          <PaintingCanvas selectedColor={selectedColor} />

        </div>
      </div>
    </div>
  );
};

export default HomePage;
