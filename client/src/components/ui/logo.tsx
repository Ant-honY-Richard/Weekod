import { Link } from 'wouter';

const Logo = () => {
  return (
    <div className="flex items-center">
      <Link href="/">
        <div className="flex items-center cursor-pointer group">
          <div className="w-10 h-10 relative overflow-visible">
            <svg className="w-full h-full transform transition-all duration-300 group-hover:scale-105" viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg">
              <g fill="#f5f5f5" className="filter drop-shadow-md">
                {/* Left Wing Upper */}
                <path d="M200 120 C160 150, 140 190, 150 250 C130 210, 140 140, 200 120" className="animate-[pulse_3s_ease-in-out_infinite]" />
                {/* Left Wing Lower */}
                <path d="M160 160 C120 190, 100 230, 110 290 C90 250, 100 180, 160 160" className="animate-[pulse_3s_ease-in-out_infinite_0.5s]" />
                {/* Right Wing Upper */}
                <path d="M300 120 C340 150, 360 190, 350 250 C370 210, 360 140, 300 120" className="animate-[pulse_3s_ease-in-out_infinite]" />
                {/* Right Wing Lower */}
                <path d="M340 160 C380 190, 400 230, 390 290 C410 250, 400 180, 340 160" className="animate-[pulse_3s_ease-in-out_infinite_0.5s]" />
                {/* Center Element */}
                <path d="M250 160 L230 220 L250 280 L270 220 Z" className="animate-[pulse_2s_ease-in-out_infinite]" />
              </g>
            </svg>
            {/* Glow effect */}
            <div className="absolute inset-0 bg-accent-purple/0 rounded-full filter blur-md group-hover:bg-accent-purple/20 transition-all duration-500"></div>
          </div>
          <span className="ml-3 text-2xl font-display font-bold text-white">WEEKOD</span>
        </div>
      </Link>
    </div>
  );
};

export default Logo;
