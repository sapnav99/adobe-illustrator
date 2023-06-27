import React, { useRef, useState, useEffect } from 'react';
import './PaintingCanvas.css';

const PaintingCanvas = ({ selectedColor }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [brushSize, setBrushSize] = useState(5);
  const [painting, setPainting] = useState(false);
  const [erasing, setErasing] = useState(false);
  const [eraserSize, setEraserSize] = useState(10);
  const [copiedImageUrl, setCopiedImageUrl] = useState('');
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [customizationMode, setCustomizationMode] = useState('');
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [imageScale, setImageScale] = useState(1);
  const [imageRotation, setImageRotation] = useState(0);
  const [prevPosition, setPrevPosition] = useState({ x: 0, y: 0 });

  const handleBrushSizeChange = (event) => {
    const newSize = parseInt(event.target.value);
    setBrushSize(newSize);
    setEraserSize(newSize * 2); // Update eraser size proportionally
  };

  const handleEraserSizeChange = (event) => {
    const newSize = parseInt(event.target.value);
    setEraserSize(newSize);
    setBrushSize(newSize / 2); // Update brush size proportionally
  };

  const handlePaint = (event) => {
    if (painting) {
      const { offsetX, offsetY } = event.nativeEvent;
      const context = contextRef.current;
      context.lineTo(offsetX, offsetY);
      context.stroke();
    }
  };

  const handleMouseDown = (event) => {
    if (!isCustomizing) {
      setPainting(true);
      const { offsetX, offsetY } = event.nativeEvent;
      const context = contextRef.current;
      context.strokeStyle = erasing ? 'rgb(211, 241, 241)' : selectedColor;
      context.lineWidth = brushSize;
      context.beginPath();
      context.moveTo(offsetX, offsetY);
    }
  };

  const handleCanvasMouseMove = (event) => {
    handlePaint(event);
    if (isCustomizing && customizationMode === 'crop') {
      const { clientX, clientY } = event;
      const dx = clientX - prevPosition.x;
      const dy = clientY - prevPosition.y;
      if (prevPosition.x !== 0 && prevPosition.y !== 0) {
        setImagePosition((prevPosition) => ({
          x: prevPosition.x + dx,
          y: prevPosition.y + dy,
        }));
      }
      setPrevPosition({ x: clientX, y: clientY });
    }
  };

  const handleMouseUp = () => {
    setPainting(false);
    const context = contextRef.current;
    context.closePath();
  };

  const handleEraserToggle = () => {
    setErasing((prevErasing) => !prevErasing);
  };

  const handleRotateLeft = () => {
    setImageRotation((prevRotation) => prevRotation - 10);
  };

  const handleRotateRight = () => {
    setImageRotation((prevRotation) => prevRotation + 10);
  };

  const handleScaleUp = () => {
    setImageScale((prevScale) => prevScale + 0.1);
  };

  const handleScaleDown = () => {
    setImageScale((prevScale) => prevScale - 0.1);
  };

  const handleCanvasMouseDown = (event) => {
    if (isCustomizing && customizationMode === 'crop') {
      setPrevPosition({ x: event.clientX, y: event.clientY });
    }
  };

  const handleCanvasMouseUp = () => {
    if (isCustomizing && customizationMode === 'crop') {
      setCustomizationMode('');
      setPrevPosition({ x: 0, y: 0 });
    }
  };

  const handleCanvasMouseLeave = () => {
    if (isCustomizing && customizationMode === 'crop') {
      setCustomizationMode('');
      setPrevPosition({ x: 0, y: 0 });
    }
  };

  const handleCustomizeButtonClick = () => {
    setIsCustomizing((prevCustomizing) => !prevCustomizing);
    setCustomizationMode('crop');
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas size to match its displayed size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    contextRef.current = ctx;

    if (copiedImageUrl) {
      const image = new Image();
      image.src = copiedImageUrl;

      image.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(
          canvas.width / 2 + imagePosition.x,
          canvas.height / 2 + imagePosition.y
        );
        ctx.rotate((imageRotation * Math.PI) / 180);
        ctx.scale(imageScale, imageScale);
        ctx.drawImage(
          image,
          -canvas.width / 2,
          -canvas.height / 2,
          canvas.width,
          canvas.height
        );
        ctx.restore();
      };
    }
  }, [copiedImageUrl, imagePosition, imageScale, imageRotation]);

  const handlePaste = () => {
    if (!isCustomizing) {
      setCopiedImageUrl('');
      setIsCustomizing(true);
      setCustomizationMode('crop');
    }
    navigator.clipboard
      .readText()
      .then((text) => {
        setCopiedImageUrl(text);
      })
      .catch((error) => {
        console.error('Failed to read clipboard:', error);
      });
  };

  return (
    <div>
      <div className="painting-controls">
        <input
          type="range"
          min="1"
          max="20"
          value={brushSize}
          onChange={handleBrushSizeChange}
        />
        <div className="brush-size">{brushSize}</div>
        <button
          onClick={handleEraserToggle}
          className="btn btn-secondary rounded-pill m-2"
        >
          {erasing ? 'Disable Eraser' : 'Enable Eraser'}
        </button>
        {erasing && (
          <div>
            <label className="Label">Eraser Size:</label>
            <input
              type="range"
              min="1"
              max="50"
              value={eraserSize}
              onChange={handleEraserSizeChange}
            />
            <div className="brush-size">{eraserSize}</div>
          </div>
        )}
      </div>
      <canvas
        className="painting-canvas"
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleCanvasMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleCanvasMouseLeave}
      ></canvas>

      <button
        className="btn btn-primary rounded-pill m-2"
        onClick={handleCustomizeButtonClick}
      >
        {isCustomizing ? 'Stop Customization' : 'Customize'}
      </button>

      {!isCustomizing && (
        <button
          className="btn btn-primary rounded-pill m-2"
          onClick={handlePaste}
        >
          Paste
        </button>
      )}

      {isCustomizing && (
        <div className="customization-controls">
          <div className="customization-buttons">
            <button
              className="btn btn-secondary rounded-pill m-2"
              onClick={handleRotateLeft}
            >
              Rotate Left
            </button>
            <button
              className="btn btn-secondary rounded-pill m-2"
              onClick={handleRotateRight}
            >
              Rotate Right
            </button>
            <button
              className="btn btn-secondary rounded-pill m-2"
              onClick={handleScaleUp}
            >
              Scale Up
            </button>
            <button
              className="btn btn-secondary rounded-pill m-2"
              onClick={handleScaleDown}
            >
              Scale Down
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaintingCanvas;
