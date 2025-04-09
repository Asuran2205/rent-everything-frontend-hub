
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Users, ShoppingBag, ClipboardCheck, 
  Truck, DollarSign, BarChart3, ShieldAlert, FileText, 
  Settings, Bell, Menu, X, ChevronRight, User, Package
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type NavItemProps = {
  to: string;
  icon: React.ReactNode;
  title: string;
  isExpanded: boolean;
  hasSubItems?: boolean;
  subItems?: { to: string; title: string }[];
};

const NavItem = ({ to, icon, title, isExpanded, hasSubItems, subItems }: NavItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  if (hasSubItems && subItems) {
    return (
      <div>
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start px-2 gap-3 my-1",
            !isExpanded && "justify-center px-0"
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          {icon}
          {isExpanded && (
            <>
              <span className="flex-1 text-left">{title}</span>
              <ChevronRight className={cn("h-4 w-4 transition-transform", isOpen && "rotate-90")} />
            </>
          )}
        </Button>
        
        {isExpanded && isOpen && (
          <div className="pl-8 py-1 space-y-1">
            {subItems.map((subItem, index) => (
              <NavLink 
                key={index} 
                to={subItem.to} 
                className={({ isActive }) => cn(
                  "block px-2 py-1.5 text-sm rounded-md",
                  isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                )}
              >
                {subItem.title}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    );
  }
  
  return (
    <NavLink
      to={to}
      className={({ isActive }) => cn(
        "flex items-center px-2 py-2 gap-3 rounded-md my-1",
        !isExpanded && "justify-center px-0",
        isActive 
          ? "bg-primary text-primary-foreground" 
          : "hover:bg-muted text-muted-foreground hover:text-foreground"
      )}
    >
      {icon}
      {isExpanded && <span>{title}</span>}
    </NavLink>
  );
};

const AdminSidebar = () => {
  const [expanded, setExpanded] = useState(true);
  
  const navItems = [
    { 
      to: "/admin", 
      icon: <LayoutDashboard className="h-5 w-5" />, 
      title: "Dashboard"
    },
    { 
      to: "/admin/vendors", 
      icon: <Users className="h-5 w-5" />, 
      title: "Vendors" 
    },
    { 
      to: "/admin/customers", 
      icon: <User className="h-5 w-5" />, 
      title: "Customers" 
    },
    { 
      to: "/admin/products", 
      icon: <Package className="h-5 w-5" />, 
      title: "Products" 
    },
    { 
      to: "/admin/orders", 
      icon: <ShoppingBag className="h-5 w-5" />, 
      title: "Orders & Rentals" 
    },
    { 
      to: "/admin/delivery", 
      icon: <Truck className="h-5 w-5" />, 
      title: "Delivery Partners" 
    },
    { 
      to: "/admin/finance", 
      icon: <DollarSign className="h-5 w-5" />, 
      title: "Payments & Finance" 
    },
    { 
      to: "/admin/reports", 
      icon: <BarChart3 className="h-5 w-5" />, 
      title: "Reports" 
    },
    { 
      to: "/admin/disputes", 
      icon: <ShieldAlert className="h-5 w-5" />, 
      title: "Disputes" 
    },
    { 
      to: "/admin/content", 
      icon: <FileText className="h-5 w-5" />, 
      title: "Content" 
    },
    { 
      to: "/admin/settings", 
      icon: <Settings className="h-5 w-5" />, 
      title: "Settings" 
    },
    { 
      to: "/admin/notifications", 
      icon: <Bell className="h-5 w-5" />, 
      title: "Notifications" 
    }
  ];

  return (
    <div 
      className={cn(
        "bg-background border-r flex flex-col transition-all duration-300",
        expanded ? "w-64" : "w-16"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b">
        {expanded && (
          <div className="font-semibold text-xl">Admin Panel</div>
        )}
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setExpanded(!expanded)}
          className="ml-auto"
        >
          {expanded ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>
      
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item, index) => (
          <NavItem 
            key={index} 
            to={item.to} 
            icon={item.icon} 
            title={item.title} 
            isExpanded={expanded}
          />
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar;
