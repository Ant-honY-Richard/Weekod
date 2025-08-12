import { motion } from 'framer-motion';

interface TestimonialCardProps {
  name: string;
  position: string;
  company: string;
  content: string;
  rating: number;
}

const TestimonialCard = ({ name, position, company, content, rating }: TestimonialCardProps) => {
  return (
    <motion.div 
      className="relative rounded-2xl p-8 transition-all duration-300 overflow-hidden backdrop-blur-md bg-white/10 border border-white/20"
      whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.3 } }}
      style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
      }}
    >
      {/* Bokeh Background Effect */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-30 blur-xl animate-pulse"></div>
        <div className="absolute top-10 -right-6 w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full opacity-40 blur-lg animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute -bottom-2 left-10 w-14 h-14 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-35 blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-8 -right-2 w-12 h-12 bg-gradient-to-r from-green-400 to-teal-500 rounded-full opacity-30 blur-lg animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-r from-indigo-400 to-purple-600 rounded-full opacity-20 blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      {/* Glass Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 rounded-2xl"></div>
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center mb-6">
          <div className="mr-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              {name.charAt(0)}
            </div>
          </div>
          <div>
            <h4 className="text-xl font-display font-semibold text-white drop-shadow-sm">{name}</h4>
            <p className="text-white/80 font-medium">{position}, {company}</p>
          </div>
        </div>
        <div className="text-yellow-300 mb-4 flex">
          {Array.from({ length: 5 }).map((_, index) => (
            <svg 
              key={index}
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-5 w-5 ${index < rating ? 'text-yellow-300' : 'text-white/20'} drop-shadow-sm`} 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <p className="text-white/90 font-medium leading-relaxed">
          "{content}"
        </p>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
