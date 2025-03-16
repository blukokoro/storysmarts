
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Book, 
  Film, 
  User, 
  Menu, 
  X,
  LogIn,
  Sparkles
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
    <nav className="bg-black/40 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-primary font-bold text-xl flex items-center gap-2">
                <div className="relative w-7 h-7 flex items-center justify-center">
                  {/* Minimal gradient circle background */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-fuchsia-500 opacity-90"></div>
                  {/* Center sparkle */}
                  <Sparkles className="absolute w-4 h-4 text-white/90" />
                </div>
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent font-bold">
                  StorySmarts
                </span>
              </Link>
            </div>
            <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
              <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link>
              <Link to="/pricing" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Pricing
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center">
            <Link to="/sign-in" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
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
              <SheetContent side="right" className="w-[250px] sm:w-[300px] bg-background border-l border-white/10">
                <div className="flex flex-col space-y-4 mt-8">
                  <Link to="/" className="flex items-center px-4 py-2 text-sm text-gray-300 hover:text-white" onClick={() => setIsOpen(false)}>
                    <Book className="mr-2 h-4 w-4" /> Home
                  </Link>
                  <Link to="/pricing" className="flex items-center px-4 py-2 text-sm text-gray-300 hover:text-white" onClick={() => setIsOpen(false)}>
                    <Film className="mr-2 h-4 w-4" /> Pricing
                  </Link>
                  <Link to="/profile" className="flex items-center px-4 py-2 text-sm text-gray-300 hover:text-white" onClick={() => setIsOpen(false)}>
                    <User className="mr-2 h-4 w-4" /> Profile
                  </Link>
                  <Link to="/sign-in" className="flex items-center px-4 py-2 text-sm text-gray-300 hover:text-white" onClick={() => setIsOpen(false)}>
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
