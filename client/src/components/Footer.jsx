import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-center p-4 mt-8">
      <p>&copy; {new Date().getFullYear()} Waste Collection Tracker. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
