
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, X, User, Settings, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white font-bold text-xl px-3 py-2 rounded-lg mr-3">
                TS
              </div>
              <span className="text-xl font-bold text-gray-900">TechSewa</span>
              <Badge className="ml-2 bg-green-100 text-green-700 hover:bg-green-200">BETA</Badge>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">About Us</Link>
            <Link to="/services-browse" className="text-gray-700 hover:text-blue-600 transition-colors">Services</Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</Link>
            {user && (
              <Link to="/services" className="text-gray-700 hover:text-blue-600 transition-colors">My Services</Link>
            )}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
                  <User className="mr-2 h-4 w-4" />
                  {user.email}
                </Button>
              </div>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
                    <User className="mr-2 h-4 w-4" />
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors py-2">About Us</Link>
              <Link to="/services-browse" className="text-gray-700 hover:text-blue-600 transition-colors py-2">Services</Link>
              <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors py-2">Contact</Link>
              {user && (
                <Link to="/services" className="text-gray-700 hover:text-blue-600 transition-colors py-2">My Services</Link>
              )}
              <div className="pt-4 space-y-2">
                {user ? (
                  <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-blue-600">
                    <User className="mr-2 h-4 w-4" />
                    {user.email}
                  </Button>
                ) : (
                  <>
                    <Link to="/auth">
                      <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-blue-600">
                        <User className="mr-2 h-4 w-4" />
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/auth">
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700">
                        Get Started
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
