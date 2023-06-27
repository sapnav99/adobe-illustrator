import React, { useState } from 'react';
import './ColorPalette.css';


const ColorPalette = ({ selectedColor, setSelectedColor }) => {
 

  const generateRandomColor = () => {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
  };

  const generateRandomPalette = () => {
    const palette = [];
    for (let i = 0; i < 5; i++) {
      const color = generateRandomColor();
      palette.push(color);
    }
    return palette;
  };
  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };
  

  const randomPalette = generateRandomPalette();

  return (
    <div>
      <div className="color-palette">
        <div className="color-display">
          {randomPalette.map((color, index) => (
            <div
              key={index}
              className={`color-box ${color === selectedColor ? 'selected' : ''}`}
              style={{ backgroundColor: color }}
              onClick={() => handleColorSelect(color)}
            ></div>
          ))}
        </div>
      </div>
    
    </div>
  );
};

export default ColorPalette;
