import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import BikesList from './pages/BikesList';
import BikeDetails from './pages/BikeDetails';
import SpareParts from './pages/SpareParts';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#121212] text-[#f5f5f5] font-sans">
        <Toaster position="top-right" toastOptions={{
          style: {
            background: '#1f1f1f',
            color: '#fff',
            border: '1px solid #333'
          }
        }} />
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/bikes" element={<BikesList />} />
            <Route path="/bikes/:id" element={<BikeDetails />} />
            <Route path="/parts" element={<SpareParts />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
