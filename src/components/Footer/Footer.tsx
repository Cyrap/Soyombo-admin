import React from 'react';

const Footer = () => {
  return (
    <footer className="flex justify-center bg-[#14213D] text-white py-10">
      <div className="container mx-auto flex flex-col items-center">
        <p>&copy; {new Date().getFullYear()} Soyombo.mn</p>
        <p>Address: //</p>
        <p>Email: //</p>
      </div>
    </footer>
  );
};

export default Footer;
