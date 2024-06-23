import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BrewerySearch from './Components/BrewerySearch';
import BreweryInfo from './Components/BreweryInfo';
import AuthPage from './Components/AuthPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<AuthPage/>} />
        <Route path="/search" exact element={<BrewerySearch />} />
        <Route path="/brewery/:id" element={<BreweryInfo />} />
      </Routes>
    </BrowserRouter>
    // <BrewerySearch/>
  );
}

export default App;