import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import SavedImagesPage from './components/Images/SavedImagesPage';
import './App.css';

const App = () => {
  const [savedImageUrls, setSavedImageUrls] = useState([]);

  const handleSave = (imageUrl) => {
    setSavedImageUrls((prevSavedImageUrls) => [...prevSavedImageUrls, imageUrl]);
  };

  return (
    <Router>
      <div className="App">
        <nav>
      <div className='bg-dark'>
          <Link className='col-1 btn btn-outline-light m-2 btn-sm' to="/">Home</Link>

          <Link className='col-1 btn btn-outline-light btn-sm' to="/saved-images">Images</Link>
          </div>
        </nav>

        <Routes>
          <Route
            path="/"
            element={<HomePage handleSave={handleSave} />}
          />
          <Route
            path="/saved-images"
            element={<SavedImagesPage savedImageUrls={savedImageUrls} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
