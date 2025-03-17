
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Book, 
  Film, 
  User, 
  Menu, 
  LogIn,
  Square
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black/40 backdrop-blur-lg border-b border-white/5 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-white font-sans font-light text-xl flex items-center gap-2">
                <div className="relative w-6 h-6 flex items-center justify-center">
                  {/* Minimal logo - just a square */}
                  <div className="absolute inset-0 bg-white rounded-sm opacity-90"></div>
                  <Square className="relative w-3 h-3 text-black z-10" strokeWidth={1} />
                </div>
                <span className="font-light tracking-wide">
                  Story<span className="font-normal">Smarts</span>
                </span>
              </Link>
            </div>
            <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
              <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-light">
                Home
              </Link>
              <Link to="/pricing" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-light">
                Pricing
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center">
            <Link to="/sign-in" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-light">
              Sign In
            </Link>
            <Button asChild size="sm" className="ml-4">
              <Link to="/sign-up">
                Get Started
              </Link>
            </Button>
          </div>
          <div className="flex items-center md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-300">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] sm:w-[300px] bg-background border-l border-white/5">
                <div className="flex flex-col space-y-4 mt-8">
                  <Link to="/" className="flex items-center px-4 py-2 text-sm text-gray-300 hover:text-white font-light" onClick={() => setIsOpen(false)}>
                    <Book className="mr-2 h-4 w-4" /> Home
                  </Link>
                  <Link to="/pricing" className="flex items-center px-4 py-2 text-sm text-gray-300 hover:text-white font-light" onClick={() => setIsOpen(false)}>
                    <Film className="mr-2 h-4 w-4" /> Pricing
                  </Link>
                  <Link to="/profile" className="flex items-center px-4 py-2 text-sm text-gray-300 hover:text-white font-light" onClick={() => setIsOpen(false)}>
                    <User className="mr-2 h-4 w-4" /> Profile
                  </Link>
                  <Link to="/sign-in" className="flex items-center px-4 py-2 text-sm text-gray-300 hover:text-white font-light" onClick={() => setIsOpen(false)}>
                    <LogIn className="mr-2 h-4 w-4" /> Sign In
                  </Link>
                  <Button asChild className="mt-4 mx-4">
                    <Link to="/sign-up" onClick={() => setIsOpen(false)}>
                      Get Started
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
