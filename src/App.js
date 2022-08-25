import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AddNewTask from './Components/AddNewTask';
import 'antd/dist/antd.css';
import React from 'react';
import HomeLayout from './Components/Layout/HomeLayout';
import HomeComponent from './Components/HomeComponent';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomeLayout />}>
          <Route path="*" element={<HomeComponent />} />
          <Route path="" element={<HomeComponent />} />
          <Route path="task" element={<AddNewTask />} />
        </Route>
      </Routes>

    </BrowserRouter>

  );
}

export default App;


