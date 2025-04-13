import { Link } from 'wouter';

const Logo = () => {
  return (
    <div className="flex items-center">
      <Link href="/">
        <div className="flex items-center cursor-pointer group">
          <div className="w-11 h-11 relative overflow-visible">
            <svg className="w-full h-full transform transition-all duration-300 group-hover:scale-105" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <g className="filter drop-shadow-md">
                {/* Left Wing Upper */}
                <path 
                  d="M50 15 C30 25, 20 40, 25 65 C15 45, 25 25, 50 15" 
                  fill="url(#silverGradient)" 
                  className="animate-[pulse_3s_ease-in-out_infinite]" 
                />
                {/* Left Wing Lower */}
                <path 
                  d="M35 30 C20 40, 15 55, 18 75 C10 55, 20 35, 35 30" 
                  fill="url(#silverGradient)" 
                  className="animate-[pulse_3s_ease-in-out_infinite_0.5s]" 
                />
                {/* Right Wing Upper */}
                <path 
                  d="M50 15 C70 25, 80 40, 75 65 C85 45, 75 25, 50 15" 
                  fill="url(#silverGradient)" 
                  className="animate-[pulse_3s_ease-in-out_infinite]" 
                />
                {/* Right Wing Lower */}
                <path 
                  d="M65 30 C80 40, 85 55, 82 75 C90 55, 80 35, 65 30" 
                  fill="url(#silverGradient)" 
                  className="animate-[pulse_3s_ease-in-out_infinite_0.5s]" 
                />
                {/* Center Element (W shape) */}
                <path 
                  d="M35 65 L45 40 L50 65 L55 40 L65 65" 
                  stroke="url(#silverGradient)" 
                  strokeWidth="3" 
                  fill="none" 
                  className="animate-[pulse_4s_ease-in-out_infinite]" 
                />
                
                {/* Define silver gradient */}
                <defs>
                  <linearGradient id="silverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f5f5f5" />
                    <stop offset="50%" stopColor="#e0e0e0" />
                    <stop offset="100%" stopColor="#d0d0d0" />
                  </linearGradient>
                </defs>
              </g>
            </svg>
            {/* Glow effect */}
            <div className="absolute inset-0 bg-white/0 rounded-full filter blur-md group-hover:bg-white/20 transition-all duration-500"></div>
          </div>
          <span className="ml-3 text-2xl font-display font-bold text-silver-light">WEEKOD</span>
        </div>
      </Link>
    </div>
  );
};

export default Logo;
