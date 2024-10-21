import Image from "next/image";
import logo from '@/app/Assets/logo.jpg'
// components/NavBar.js


const NavBar = () => {
  return (
    <nav className=" p-4 relative pb-10">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Image */}
        <div className="absolute left-4 top-4">
         
        </div>

     

        {/* Right Image */}
        <div className="absolute right-4 top-4">
        <Image
            src={logo}
            alt="Left Corner"
            className="h-8 w-8 object-contain"
          />
        </div>

      
      </div>
    </nav>
  );
};

export default NavBar;
