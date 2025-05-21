import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom'; // Here Changed BrowserRouter to HashRouter
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import './styles.css';

const App = () => (
  <HashRouter> {/* Change BrowserRouter to HashRouter */}
    <Routes>
      <Route path="/" element={<StudentForm />} />
      <Route path="/list" element={<StudentList />} />
    </Routes>
  </HashRouter>
);

export default App;
