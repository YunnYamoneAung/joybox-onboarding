import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Welcome from './pages/Welcome.jsx';
import SignUp from './pages/SignUp.jsx';
import Confirm from './pages/Confirm.jsx';
import ProfileSetup from './pages/ProfileSetup.jsx';
import Landing from './pages/Landing.jsx';

// Simple placeholder pages for each navigation tab
function Dashboard() {
  return <div className="container"><h2>Welcome to your Dashboard</h2><p>This is where your overview metrics will appear.</p></div>;
}

function Content() {
  return <div className="container"><h2>Content</h2><p>This is where you will manage your uploaded or drafted content.</p></div>;
}

function Analytics() {
  return <div className="container"><h2>Analytics</h2><p>This section will show your engagement and growth statistics.</p></div>;
}

function AITools() {
  return <div className="container"><h2>AI Tools</h2><p>This is where you will access and use Joy-Box’s AI tools.</p></div>;
}

export default function App() {
  return (
    <Routes>
      {/* Auth-related routes */}
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Welcome />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/confirm" element={<Confirm />} />
      <Route path="/profile-setup" element={<ProfileSetup />} />

      {/* Landing layout with nested navigation */}
      <Route path="/landing" element={<Landing />}>
        {/* Default route: redirect to dashboard */}
        <Route index element={<Navigate to="dashboard" replace />} />

        <Route path="dashboard" element={<Dashboard />} />
        <Route path="content" element={<Content />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="ai-tools" element={<AITools />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
