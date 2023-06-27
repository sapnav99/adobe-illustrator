import React, { useState } from 'react';
import ColorPalette from './ColorPalette';
import PaintingCanvas from './PaintingCanvas';

const PaintingApp = () => {
  const [selectedColor, setSelectedColor] = useState('');

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  return (
    <div>
      <h1>Painting App</h1>
      <ColorPalette handleColorSelect={handleColorSelect} />
      <PaintingCanvas selectedColor={selectedColor} />
    </div>
  );
};

export default PaintingApp;
