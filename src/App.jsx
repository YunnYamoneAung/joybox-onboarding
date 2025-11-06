import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Welcome from './pages/Welcome.jsx';
import SignUp from './pages/SignUp.jsx';
import Confirm from './pages/Confirm.jsx';
import ProfileSetup from './pages/ProfileSetup.jsx';
import Landing from './pages/Landing.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Welcome />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/confirm" element={<Confirm />} />
      <Route path="/profile-setup" element={<ProfileSetup />} />
      <Route path="/landing" element={<Landing />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
