import React from "react";

const ResidentFooter = () => {
  return (
    <footer className="bg-gray-100 mt-8 py-6 text-center text-gray-600">
      <p>
        &copy; {new Date().getFullYear()} Waste Management App. All rights reserved.
      </p>
    </footer>
  );
};

export default ResidentFooter;
