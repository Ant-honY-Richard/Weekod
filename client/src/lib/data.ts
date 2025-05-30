// client/src/lib/data.ts

// Services Data
export const services = [
  {
    icon: 'fas fa-laptop-code',
    title: 'Website Design & Development',
    description: 'Custom websites that capture your brand\'s essence, focusing on exceptional user experience and conversion optimization.',
    link: '#',
  },
  {
    icon: 'fas fa-search',
    title: 'Search Engine Optimization',
    description: 'Enhance your site\'s search rankings with our SEO services, using advanced techniques to drive traffic and increase conversions.',
    link: '#',
  },
  {
    icon: 'fas fa-bullhorn',
    title: 'Digital Marketing',
    description: 'Comprehensive digital marketing solutions that drive brand awareness, engagement, and conversions across multiple channels.',
    link: '#',
  },
  {
    icon: 'fas fa-paint-brush',
    title: 'Branding & Identity',
    description: 'Create a compelling brand identity with our logo design, visual identity, and brand strategy services that make your business stand out.',
    link: '#',
  },
  {
    icon: 'fas fa-hashtag',
    title: 'Social Media Marketing',
    description: 'Build your online presence with strategic social media campaigns that engage your audience and expand your digital footprint.',
    link: '#',
  },
  {
    icon: 'fas fa-chart-line',
    title: 'Analytics & Reporting',
    description: 'Gain insights into your digital performance with comprehensive analytics and reporting that helps you make data-driven decisions.',
    link: '#',
  },
];

// Process Steps
export const processes = [
  {
    title: 'Discovery',
    description: 'We begin by understanding your business, goals, target audience, and requirements through consultations and research.',
  },
  {
    title: 'Planning & Design',
    description: 'We create a strategic plan and design mockups that align with your brand identity and business objectives.',
  },
  {
    title: 'Development',
    description: 'Our skilled developers bring the design to life, creating a fully functional website with all the required features.',
  },
  {
    title: 'Content Integration',
    description: 'We integrate your content, imagery, and other elements, ensuring that everything is properly organized and displayed.',
  },
  {
    title: 'Testing & Review',
    description: 'We thoroughly test the website across devices and browsers, making necessary adjustments to ensure optimal performance.',
  },
  {
    title: 'Launch & Support',
    description: 'After launch, we provide ongoing support and maintenance to ensure your website continues to perform at its best.',
  },
];

// Technologies
export const technologies = [
  {
    name: 'React',
    icon: '/tech-logos/react.svg',
    color: '#61DAFB',
    description: 'A JavaScript library for building interactive UIs',
  },
  {
    name: 'TypeScript',
    icon: '/tech-logos/typescript.svg',
    color: '#3178C6',
    description: 'Type-safe JavaScript for robust development',
  },
  {
    name: 'Tailwind CSS',
    icon: '/tech-logos/tailwindcss.svg',
    color: '#06B6D4',
    description: 'Utility-first CSS for rapid, responsive styling',
  },
  {
    name: 'Framer Motion',
    icon: '/tech-logos/framer-motion.svg',
    color: '#000000',
    description: 'Smooth animations and transitions',
  },
  {
    name: 'Wouter',
    icon: '/tech-logos/wouter.svg',
    color: '#FF6F61',
    description: 'Lightweight routing for React applications',
  },
  {
    name: 'React Query',
    icon: '/tech-logos/react-query.svg',
    color: '#FF4154',
    description: 'Efficient data fetching and state management',
  },
  {
    name: 'Radix UI',
    icon: '/tech-logos/radix-ui.svg',
    color: '#161618',
    description: 'Accessible, unstyled UI components',
  },
  {
    name: 'Lucide React',
    icon: '/tech-logos/lucide-react.svg',
    color: '#2E2E2E',
    description: 'Beautiful, customizable icons',
  },
  {
    name: 'Node.js',
    icon: '/tech-logos/nodejs.svg',
    color: '#339933',
    description: 'Server-side JavaScript runtime',
  },
  {
    name: 'Express.js',
    icon: '/tech-logos/express.svg',
    color: '#000000',
    description: 'Fast, minimalist web framework',
  },
  {
    name: 'Drizzle ORM',
    icon: '/tech-logos/drizzle-orm.svg',
    color: '#00C7B7',
    description: 'Type-safe ORM for database operations',
  },
  {
    name: 'Neon (PostgreSQL)',
    icon: '/tech-logos/neon.svg',
    color: '#1A1A1A',
    description: 'Serverless PostgreSQL database',
  },
  {
    name: 'Vite',
    icon: '/tech-logos/vite.svg',
    color: '#646CFF',
    description: 'Next-generation frontend tooling',
  },
  {
    name: 'ESBuild',
    icon: '/tech-logos/esbuild.svg',
    color: '#FFCF00',
    description: 'Ultra-fast JavaScript bundler',
  },
  {
    name: 'PostCSS',
    icon: '/tech-logos/postcss.svg',
    color: '#DD3A0A',
    description: 'CSS transformation and processing',
  },
  {
    name: 'TSX',
    icon: '/tech-logos/typescript.svg',
    color: '#3178C6',
    description: 'Direct TypeScript execution',
  },
];

// Portfolio Categories
export const categories = [
  { value: 'web-design', label: 'Web Design' },
  { value: 'e-commerce', label: 'E-Commerce' },
  { value: 'corporate', label: 'Corporate' },
  { value: 'landing-pages', label: 'Landing Pages' },
];

// Portfolio Items
export const portfolioItems = [
  {
    id: 1,
    title: 'Fashion Boutique Website',
    subtitle: 'E-commerce Website',
    description: 'A high-end fashion e-commerce store with a focus on user experience and conversion optimization.',
    tags: ['E-Commerce', 'React', 'UI/UX'], // Updated tags
    category: 'e-commerce',
    link: '#',
  },
  {
    id: 2,
    title: 'Financial Services Firm',
    subtitle: 'Corporate Website',
    description: 'A professional corporate website with a custom CMS for a leading financial services company.',
    tags: ['Corporate', 'Node.js', 'SEO'], // Updated tags
    category: 'corporate',
    link: '#',
  },
  {
    id: 3,
    title: 'Project Management Tool',
    subtitle: 'Web Application',
    description: 'A comprehensive project management application with real-time collaboration features.',
    tags: ['SaaS', 'React', 'Full-Stack'],
    category: 'web-design',
    link: '#',
  },
  {
    id: 4,
    title: 'Product Launch Campaign',
    subtitle: 'Landing Page',
    description: 'A high-converting landing page for a new product launch with integrated marketing tools.',
    tags: ['Landing Page', 'Marketing', 'CRO'],
    category: 'landing-pages',
    link: '#',
  },
  {
    id: 5,
    title: 'Health & Fitness App',
    subtitle: 'Web App',
    description: 'A comprehensive health tracking application with personalized fitness plans and nutrition guidance.',
    tags: ['Web', 'React', 'UI/UX'], // Updated tags
    category: 'web-design',
    link: '#',
  },
  {
    id: 6,
    title: 'Tech Startup Rebrand',
    subtitle: 'Branding',
    description: 'A complete brand overhaul for a growing technology startup, including logo, visual identity, and brand guidelines.',
    tags: ['Branding', 'Logo Design', 'Identity'],
    category: 'corporate',
    link: '#',
  },
];

// Testimonials
export const testimonials = [
  {
    name: 'Sarah Johnson',
    position: 'Marketing Director',
    company: 'TechCorp',
    content: 'Working with Weekod was a game-changer for our business. They delivered a stunning website on time and on budget, and the results have been incredible. Our online inquiries have increased by 150% since launch!',
    rating: 5,
  },
  {
    name: 'David Chen',
    position: 'Founder',
    company: 'StyleHub',
    content: 'The team at Weekod understood our vision from the start. Their expertise in e-commerce development transformed our online store, resulting in a 75% increase in conversion rates and a significant boost in revenue.',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    position: 'CEO',
    company: 'Creative Minds Agency',
    content: 'Weekod delivered a website that perfectly captures our brand essence. Their attention to detail, responsive communication, and technical expertise made the entire process smooth and enjoyable. Highly recommended!',
    rating: 5,
  },
];

// Team Members
export const teamMembers = [
  {
    name: 'Michael Anderson',
    position: 'Founder & CEO',
    socialLinks: [
      { platform: 'linkedin', url: '#' },
      { platform: 'twitter', url: '#' },
      { platform: 'email', url: '#' },
    ],
  },
  {
    name: 'Sarah Johnson',
    position: 'Creative Director',
    socialLinks: [
      { platform: 'linkedin', url: '#' },
      { platform: 'twitter', url: '#' },
      { platform: 'email', url: '#' },
    ],
  },
  {
    name: 'David Lee',
    position: 'Lead Developer',
    socialLinks: [
      { platform: 'linkedin', url: '#' },
      { platform: 'twitter', url: '#' },
      { platform: 'email', url: '#' },
    ],
  },
  {
    name: 'Emily Rodriguez',
    position: 'UX/UI Designer',
    socialLinks: [
      { platform: 'linkedin', url: '#' },
      { platform: 'twitter', url: '#' },
      { platform: 'email', url: '#' },
    ],
  },
];