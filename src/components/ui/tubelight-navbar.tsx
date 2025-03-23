
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface NavItemProps {
  name: string;
  url: string;
  icon: React.ElementType;
  isActive?: boolean;
}

const NavItem = ({ name, url, icon: Icon, isActive }: NavItemProps) => {
  return (
    <Link
      to={url}
      className={cn(
        "group relative flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-300",
        isActive 
          ? "text-amber-400" 
          : "text-amber-200 hover:text-amber-100"
      )}
    >
      {/* Tubelight effect */}
      <span className={cn(
        "absolute bottom-0 left-0 h-0.5 w-0 bg-amber-400 transition-all duration-300 group-hover:w-full",
        isActive && "w-full"
      )} />
      
      <Icon className="h-4 w-4" />
      <span>{name}</span>
    </Link>
  );
};

interface NavBarProps {
  items: NavItemProps[];
  className?: string;
  children?: React.ReactNode; // Add this line to include children in the props
}

export const NavBar = ({ items, className, children }: NavBarProps) => {
  // Get current path to determine active state
  const pathname = window.location.pathname;
  
  return (
    <nav className={cn("bg-black/40 backdrop-blur-lg border-b border-white/5 sticky top-0 z-50", className)}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white font-sans font-light text-xl flex items-center gap-2 mr-6">
              <div className="relative w-6 h-6 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-300 rounded-sm opacity-90"></div>
                <span className="relative text-black z-10 text-xs font-bold">SS</span>
              </div>
              <span className="font-light tracking-wide">
                Story<span className="font-normal">Smarts</span>
              </span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-2">
              {items.map((item) => (
                <NavItem
                  key={item.name}
                  {...item}
                  isActive={pathname === item.url}
                />
              ))}
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            {children}
          </div>
          
          {/* Mobile menu button - we can implement mobile menu later */}
          <div className="flex items-center md:hidden">
            <Button variant="ghost" size="icon" className="text-amber-200">
              <span className="sr-only">Open menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
