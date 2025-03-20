
import React from 'react';
import { Home, FileText, LogIn, PenLine, Sparkles, BookOpen } from 'lucide-react';
import { NavBar } from "@/components/ui/tubelight-navbar";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const navItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'Learn More', url: '/learn-more', icon: BookOpen },
    { name: 'Pricing', url: '/pricing', icon: FileText }
  ];

  return (
    <NavBar items={navItems} />
  );
};

export default Navbar;
