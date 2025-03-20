
import React from 'react';
import { Home, FileText, LogIn, PenLine, Sparkles } from 'lucide-react';
import { NavBar } from "@/components/ui/tubelight-navbar";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const navItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'Pricing', url: '/pricing', icon: FileText }
  ];

  return (
    <>
      <NavBar items={navItems} />
      
      {/* Add the logo separately to be able to customize it */}
      <style jsx>{`
        .navbar-logo {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
        }
      `}</style>
    </>
  );
};

export default Navbar;
