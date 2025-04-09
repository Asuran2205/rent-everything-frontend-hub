
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, userType, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const getUserDashboardLink = () => {
    if (userType === 'CUSTOMER') return '/dashboard/customer';
    if (userType === 'VENDOR') return '/dashboard/vendor';
    if (userType === 'DELIVERY') return '/dashboard/delivery';
    return '/login';
  };

  return (
    <header className="w-full bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/6a454940-7057-498c-a2dd-1dfa4ad8cf17.png" 
            alt="RentEverything.Shop" 
            className="h-10"
          />
          <span className="ml-2 text-xl font-bold gradient-text">RentEverything.Shop</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          {!user ? (
            <>
              <Link to="/for-vendor">
                <Button variant="outline" className="border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white">
                  For Vendor
                </Button>
              </Link>
              <Link to="/for-delivery">
                <Button variant="outline" className="border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white">
                  For Delivery Partner
                </Button>
              </Link>
              <Link to="/for-customer">
                <Button className="bg-gradient-to-r from-brand-orange to-brand-purple text-white">
                  For Customer
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/categories">Categories</Link>
              <Link to="/products">Products</Link>
              
              {userType === 'CUSTOMER' && (
                <Link to="/cart" className="relative">
                  <ShoppingCart className="h-6 w-6" />
                  <span className="absolute -top-2 -right-2 bg-brand-orange text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    0
                  </span>
                </Link>
              )}
              
              <div className="flex items-center space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center">
                      <User className="h-5 w-5 mr-2" />
                      Dashboard
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link to={getUserDashboardLink()}>
                        {userType?.toLowerCase() === 'customer' ? 'Customer Dashboard' : 
                         userType?.toLowerCase() === 'vendor' ? 'Vendor Dashboard' : 
                         'Delivery Dashboard'}
                      </Link>
                    </DropdownMenuItem>
                    {userType === 'CUSTOMER' && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link to="/dashboard/vendor">Switch to Vendor Dashboard</Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    {userType === 'VENDOR' && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link to="/dashboard/customer">Switch to Customer Dashboard</Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </>
          )}
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden flex items-center"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white px-4 pt-2 pb-4 shadow-lg">
          {!user ? (
            <div className="flex flex-col space-y-3">
              <Link to="/for-vendor" onClick={toggleMenu}>
                <Button variant="outline" className="w-full border-brand-orange text-brand-orange">
                  For Vendor
                </Button>
              </Link>
              <Link to="/for-delivery" onClick={toggleMenu}>
                <Button variant="outline" className="w-full border-brand-purple text-brand-purple">
                  For Delivery Partner
                </Button>
              </Link>
              <Link to="/for-customer" onClick={toggleMenu}>
                <Button className="w-full bg-gradient-to-r from-brand-orange to-brand-purple text-white">
                  For Customer
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col space-y-3">
              <Link to="/categories" onClick={toggleMenu} className="py-2 border-b">
                Categories
              </Link>
              <Link to="/products" onClick={toggleMenu} className="py-2 border-b">
                Products
              </Link>
              
              {userType === 'CUSTOMER' && (
                <Link to="/cart" onClick={toggleMenu} className="py-2 border-b flex justify-between">
                  <span>Cart</span>
                  <span className="bg-brand-orange text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    0
                  </span>
                </Link>
              )}
              
              <Link to={getUserDashboardLink()} onClick={toggleMenu} className="py-2 border-b">
                {userType?.toLowerCase() === 'customer' ? 'Customer Dashboard' : 
                 userType?.toLowerCase() === 'vendor' ? 'Vendor Dashboard' : 
                 'Delivery Dashboard'}
              </Link>
              
              {userType === 'CUSTOMER' && (
                <Link to="/dashboard/vendor" onClick={toggleMenu} className="py-2 border-b">
                  Switch to Vendor Dashboard
                </Link>
              )}
              
              {userType === 'VENDOR' && (
                <Link to="/dashboard/customer" onClick={toggleMenu} className="py-2 border-b">
                  Switch to Customer Dashboard
                </Link>
              )}
              
              <Button onClick={logout} variant="ghost" className="justify-start px-0">
                Logout
              </Button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
