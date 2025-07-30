import React from "react";

/**
 * Footer - Displays the footer with links and copyright.
 * Used at the bottom of the landing page.
 */
const Footer: React.FC = () => {
  return (
    <footer className="bg-white mt-12 py-6 text-xs text-gray-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 gap-2">
        <div className="flex gap-4 mb-2 md:mb-0">
          <a href="#" className="hover:underline">
            Terms of Service
          </a>
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Contact Us
          </a>
        </div>
        <div className="text-center md:text-right">
          &copy; 2025 PhysicsWallah. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
