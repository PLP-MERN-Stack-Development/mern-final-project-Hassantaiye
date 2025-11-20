import React from "react";

const DriverFooter = () => {
  return (
    <footer className="bg-indigo-50 mt-10 py-6 text-center text-gray-600 border-t border-indigo-200">
      &copy; {new Date().getFullYear()} WasteDriver. All rights reserved.
    </footer>
  );
};

export default DriverFooter;
