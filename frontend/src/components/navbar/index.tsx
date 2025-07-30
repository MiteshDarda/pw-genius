import { useState } from "react";
import { Menu, X } from "lucide-react";

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

const Navbar = ({
  logoSrc = "../../../public/pw-logo-long.png",
  navItems,
  secondaryAction,
}: NavbarProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="w-full shadow-md bg-white fixed top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
          <div className="flex items-center gap-2">
            {/* <img src={logoSrc} alt="Logo" className="w-8 h-8" /> */}
            <img src={logoSrc} alt="Logo" className="h-12" />
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href ?? "#"}
                className="text-gray-700 hover:text-black font-medium"
              >
                {item.label}
              </a>
            ))}
            {/* {primaryAction && (
              <a
                href={primaryAction.href}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700"
              >
                {primaryAction.label}
              </a>
            )} */}
            {secondaryAction && (
              <button
                type="button"
                onClick={secondaryAction.onClick}
                className="bg-gray-200 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 cursor-pointer"
              >
                {secondaryAction.label}
              </button>
            )}
          </nav>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <button onClick={() => setOpen(!open)} aria-label="Toggle menu">
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {open && (
          <div className="md:hidden bg-white px-4 pb-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block py-2 text-gray-700 font-medium"
              >
                {item.label}
              </a>
            ))}
            {/* {primaryAction && (
              <a
                href={primaryAction.href}
                className="block w-full text-center bg-blue-600 text-white px-4 py-2 mt-2 rounded-lg font-semibold hover:bg-blue-700"
              >
                {primaryAction.label}
              </a>
            )} */}
            {secondaryAction && (
              <a
                href={secondaryAction.href}
                onClick={secondaryAction.onClick}
                className="block w-full text-center bg-gray-200 px-4 py-2 mt-2 rounded-lg font-medium hover:bg-gray-300"
              >
                {secondaryAction.label}
              </a>
            )}
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
