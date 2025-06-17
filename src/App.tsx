import React from 'react';
import './App.css';
import Login from './pages/Login';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';
import Home from './pages/Home';

const App: React.FC = () => {

  return (
    <>
    <Router>
     <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/home' element={
        <PrivateRoute>
          <Home />
        </PrivateRoute>
      } />
     </Routes>
    </Router>
    </>
  )
};

export default App;
