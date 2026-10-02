// components/PublicLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';


const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#1a0505] via-[#050506] to-black">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;