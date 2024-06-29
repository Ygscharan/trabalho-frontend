import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import List from './components/List';
import Details from './components/Details';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/list" element={<List />} />
        <Route path="/details/:name" element={<Details />} />
      </Routes>
    </Router>
  );
};

export default App;
