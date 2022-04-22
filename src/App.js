import React from 'react';
import Signup from './components/Form/Signup/Signup';
import Login from './components/Form/Login/Login';
import './App.css';

import {Routes,Route,Navigate} from 'react-router-dom';

function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
    );
}

export default App;
