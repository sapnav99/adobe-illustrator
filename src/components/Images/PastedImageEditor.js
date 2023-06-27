import React, { useState } from 'react';

const PastedImageEditor = ({ imageUrl }) => {
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);

  const handleRotationChange = (event) => {
    const rotationValue = parseInt(event.target.value);
    setRotation(rotationValue);
  };

  const handleScaleChange = (event) => {
    const scaleValue = parseFloat(event.target.value);
    setScale(scaleValue);
  };

  return (
    <div>
      <div>
        <label>Rotation:</label>
        <input type="range" min="0" max="360" value={rotation} onChange={handleRotationChange} />
      </div>
      <div>
        <label>Scale:</label>
        <input type="range" min="0.1" max="3" step="0.1" value={scale} onChange={handleScaleChange} />
      </div>
      <div>
        <img src={imageUrl} alt="Pasted Image" style={{ transform: `rotate(${rotation}deg) scale(${scale})` }} />
      </div>
    </div>
  );
};

export default PastedImageEditor;
