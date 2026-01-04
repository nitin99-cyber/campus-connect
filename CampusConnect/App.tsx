import React from 'react';
// Fixed: use named imports from react-router-dom
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout.tsx';
import { Home } from './pages/Home.tsx';
import { Search } from './pages/Search.tsx';
import { Profile } from './pages/Profile.tsx';
import { AlumniProfile } from './pages/AlumniProfile.tsx';
import { StudentDirectory } from './pages/StudentDirectory.tsx';
import { AlumniDirectory } from './pages/AlumniDirectory.tsx';
import { AlumniMessage } from './pages/AlumniMessage.tsx';
import { Collaborate } from './pages/Collaborate.tsx';
import { Leaderboard } from './pages/Leaderboard.tsx';
import { Analytics } from './pages/Analytics.tsx';
import { Quiz } from './pages/Quiz.tsx';
import { Login } from './pages/Login.tsx';
import { Register } from './pages/Register.tsx';
import { AdminDashboard } from './pages/AdminDashboard.tsx';
import { OurStory, Team, Careers, Vision, PrivacyPolicy, TermsOfService } from './pages/StaticPages.tsx';

export const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<Search />} />
          <Route path="/students" element={<StudentDirectory />} />
          <Route path="/alumni" element={<AlumniDirectory />} />
          <Route path="/alumni/message/:id" element={<AlumniMessage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/student/:id" element={<Profile />} />
          <Route path="/alumni-profile/:id" element={<AlumniProfile />} />
          <Route path="/collaborate" element={<Collaborate />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/admin" element={<AdminDashboard />} />
          
          {/* Static Pages */}
          <Route path="/our-story" element={<OurStory />} />
          <Route path="/team" element={<Team />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/vision" element={<Vision />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
