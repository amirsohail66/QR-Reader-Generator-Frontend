// App.js

import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';
import Gallery from './components/Gallery';
import ShareImagePage from './components/ShareImagePage';
import SuccessPage from './components/success';
import SingleImage from './components/SingleImage';
import ImageUploadForm from './components/ImageUpload';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/share-image" element={<ShareImagePage />} />
        <Route path="/share-success" element={<SuccessPage />} />
        <Route exact path="/image" element={<SingleImage/>} />
        <Route exact path="/upload" element={<ImageUploadForm/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
