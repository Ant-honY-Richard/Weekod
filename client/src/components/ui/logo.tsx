import { Link } from 'wouter';
import logo from '/public/weekod-logo.svg'; // Adjust path based on your project structure

const Logo = () => {
  return (
    <div className="flex items-center">
      <Link href="/">
        <div className="flex items-center cursor-pointer group">
          {/* Use external SVG logo */}
          <div className="w-9 h-9 sm:w-11 sm:h-11 relative">
            <img
              src={logo}
              alt="Weekod Logo"
              className="w-full h-full object-contain transition-all duration-300 group-hover:scale-105"
            />
            {/* Optional Glow */}
            <div className="absolute inset-0 bg-white/0 rounded-full blur-md group-hover:bg-white/10 transition-all duration-500"></div>
          </div>
          <span className="ml-2 sm:ml-3 text-xl sm:text-2xl font-display font-bold text-silver-light">
            WEEKOD
          </span>
        </div>
      </Link>
    </div>
  );
};

export default Logo;
