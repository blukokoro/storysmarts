
import React from 'react';
import { Home, FileText, LogIn, UserCircle } from 'lucide-react';
import { NavBar } from "@/components/ui/tubelight-navbar";
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { user } = useAuth();
  
  const navItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'Pricing', url: '/pricing', icon: FileText }
  ];

  const renderAuthButtons = () => {
    if (user) {
      return (
        <Link to="/profile">
          <Button variant="ghost" className="flex items-center gap-2">
            <UserCircle className="h-5 w-5" />
            Profile
          </Button>
        </Link>
      );
    }
    
    return (
      <div className="flex gap-2">
        <Link to="/sign-in">
          <Button variant="ghost" className="flex items-center gap-2">
            <LogIn className="h-5 w-5" />
            Sign In
          </Button>
        </Link>
        <Link to="/sign-up">
          <Button variant="default">Sign Up</Button>
        </Link>
      </div>
    );
  };

  return (
    <NavBar 
      items={navItems} 
      children={renderAuthButtons()} 
    />
  );
};

export default Navbar;
