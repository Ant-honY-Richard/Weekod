import { Link } from 'wouter';

const Logo = () => {
  return (
    <Link href="/">
      <a className="flex items-center">
        <svg className="w-10 h-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 10 L70 30 L50 50 L30 30 Z" fill="#E0E0E0"/>
          <path d="M70 30 L90 50 L70 70 L50 50 Z" fill="#E0E0E0"/>
          <path d="M30 30 L50 50 L30 70 L10 50 Z" fill="#E0E0E0"/>
        </svg>
        <span className="ml-2 text-2xl font-display font-bold text-silver">WEEKOD</span>
      </a>
    </Link>
  );
};

export default Logo;
