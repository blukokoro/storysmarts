
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { FileText, LogIn, Menu, X } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<{ name?: string, email: string } | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        localStorage.removeItem('user');
      }
    }
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">StorySmarts</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      isActive('/') && "bg-accent text-accent-foreground"
                    )}
                  >
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/pricing" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      isActive('/pricing') && "bg-accent text-accent-foreground"
                    )}
                  >
                    Pricing
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-2">
            {user ? (
              <Button asChild variant="outline">
                <Link to="/profile">
                  <span className="hidden sm:inline-block">My Profile</span>
                </Link>
              </Button>
            ) : (
              <>
                <Button asChild variant="outline">
                  <Link to="/sign-in">
                    <LogIn className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline-block">Sign In</span>
                  </Link>
                </Button>
                <Button asChild>
                  <Link to="/sign-up">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-background">
          <nav className="flex flex-col p-4 space-y-2">
            <Link
              to="/"
              className={cn(
                "px-4 py-2 rounded-md",
                isActive('/') ? "bg-accent text-accent-foreground" : "hover:bg-accent/50"
              )}
            >
              Home
            </Link>
            <Link
              to="/pricing"
              className={cn(
                "px-4 py-2 rounded-md",
                isActive('/pricing') ? "bg-accent text-accent-foreground" : "hover:bg-accent/50"
              )}
            >
              Pricing
            </Link>
            <div className="border-t border-white/10 my-2 pt-2">
              {user ? (
                <Link
                  to="/profile"
                  className="w-full px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 flex justify-center"
                >
                  My Profile
                </Link>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/sign-in"
                    className="flex items-center px-4 py-2 rounded-md bg-transparent border border-white/20 hover:bg-accent/50 justify-center"
                  >
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign In
                  </Link>
                  <Link
                    to="/sign-up"
                    className="flex items-center px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 justify-center"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
