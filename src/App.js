import { Route } from 'react-router-dom';
import './App.css';
import './BrandColors.css';
import data from './brands.json';
import BrandIdentity from './BrandIdentity';
import BrandPage from './BrandPage';
import Posters from './Posters';
import AboutMe from './AboutMe';
import Coding from './Coding';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<BrandIdentity />}></Route>
          <Route path="/posters" element={<Posters />}></Route>
          <Route path="/about-me" element={<AboutMe />}></Route>
          <Route path="/coding" element={<Coding />}></Route>
          <Route path="/brand/:productId" element={<BrandPage props={data.data}/>}></Route>
        </Routes>
    </div>
  );
}

export default App;
