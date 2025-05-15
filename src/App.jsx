import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import './styles.css';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<StudentForm />} />
      <Route path="/list" element={<StudentList />} />
    </Routes>
  </BrowserRouter>
);

export default App;
