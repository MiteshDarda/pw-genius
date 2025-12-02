import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

interface NavItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface NavbarProps {
  logoSrc?: string;
  brand?: string;
  navItems: NavItem[];
  secondaryAction?: NavItem;
}

const Navbar = ({ navItems, secondaryAction }: NavbarProps) => {
  const [open, setOpen] = useState(false);

  const renderSecondaryAction = (
    action: NavItem,
    isMobile: boolean = false,
  ) => {
    const baseClasses = isMobile
      ? "btn block w-full text-center mt-2"
      : "btn cursor-pointer";

    if (action.onClick) {
      return (
        <button type="button" onClick={action.onClick} className={baseClasses}>
          {action.label}
        </button>
      );
    }

    if (action.href) {
      return (
        <a href={action.href} className={baseClasses}>
          {action.label}
        </a>
      );
    }

    return null;
  };

  return (
    <>
      <header className="w-full shadow-md brand-gradient-vertical fixed top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
          <div className="flex items-center gap-2">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <img src={"/pw-logo-long2.png"} alt="Logo" className="h-12" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item, index) => (
              <a
                key={`${item.label}-${index}`}
                href={item.href ?? "#"}
                className="text-white hover:opacity-90 font-medium"
              >
                {item.label}
              </a>
            ))}
            {secondaryAction && renderSecondaryAction(secondaryAction)}
          </nav>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <button onClick={() => setOpen(!open)} aria-label="Toggle menu">
              {open ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {open && (
          <div className="md:hidden brand-gradient-vertical px-4 pb-4">
            {navItems.map((item, index) => (
              <a
                key={`${item.label}-${index}`}
                href={item.href}
                className="block py-2 text-white font-medium"
              >
                {item.label}
              </a>
            ))}
            {secondaryAction && renderSecondaryAction(secondaryAction, true)}
          </div>
        )}
      </header>
      <div
        className={`h-16 md:h-20 ${open ? "mt-16 md:mt-20" : "mt-0"} transition-all`}
      />
    </>
  );
};

export default Navbar;
