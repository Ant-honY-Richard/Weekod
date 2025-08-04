// client/src/components/ui/ChatBot.tsx
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, Sparkles, Code, Zap, Clock, Wrench, Palette, Database, Laptop, Smartphone, ShoppingCart, BarChart } from 'lucide-react';
import { Button } from './button';
import { Avatar } from './avatar';
import { Card } from './card';
import { Input } from './input';
import { services, processes, technologies } from '@/lib/data';
import { cn } from '@/lib/utils';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  quickReplies?: string[];
  icon?: React.ReactNode;
};

type ConversationContext = {
  topic: 'general' | 'services' | 'timeline' | 'maintenance' | 'process' | 'technologies' | 'contact';
  lastQuery: string;
};

const initialMessages: Message[] = [
  {
    id: '1',
    text: "Hello! I'm weeBot, your WeekodPro guide. Ready to explore how we can boost your digital presence? 😄 What's on your mind today?",
    sender: 'bot',
    icon: <Sparkles className="h-4 w-4 text-yellow-400" />,
    quickReplies: [
      'What services do you provide?',
      'How long does a project take?',
      'Tell me about your tech stack',
      'How do you work?',
    ],
  },
];

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [pulseEffect, setPulseEffect] = useState(true);
  const [context, setContext] = useState<ConversationContext>({ topic: 'general', lastQuery: '' });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Toggle pulse effect
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseEffect((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = useCallback(() => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Dynamic typing delay based on response complexity
    setTimeout(() => {
      const botResponse = generateResponse(inputValue);
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, Math.min(800 + inputValue.length * 20, 1500));
  }, [inputValue]);

  const handleQuickReply = useCallback((reply: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: reply,
      sender: 'user',
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = generateResponse(reply);
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, Math.min(800 + reply.length * 20, 1500));
  }, []);

  const generateResponse = useCallback(
    (query: string): Message => {
      const lowerQuery = query.toLowerCase().trim();
      setContext((prev) => ({ ...prev, lastQuery: query }));

      // Service-related queries
      if (lowerQuery.includes('service') || lowerQuery.includes('offer') || lowerQuery.includes('provide')) {
        setContext((prev) => ({ ...prev, topic: 'services' }));
        const serviceList = services
          .map((s) => `• ${s.title}: ${s.description}`)
          .join('\n');
        return {
          id: Date.now().toString(),
          text: `We offer a range of tailored digital solutions:\n\n${serviceList}\n\nInterested in one of these? Let me dive deeper into any service you'd like!`,
          sender: 'bot',
          icon: <Palette className="h-4 w-4 text-fuchsia-400" />,
          quickReplies: services.map((s) => `More on ${s.title}`),
        };
      }

      // Specific service follow-ups
      if (context.topic === 'services' && services.some((s) => lowerQuery.includes(s.title.toLowerCase()))) {
        const service = services.find((s) => lowerQuery.includes(s.title.toLowerCase()));
        if (service) {
          return {
            id: Date.now().toString(),
            text: `${service.title}:\n\n${service.description}\n\nWant to know how we can apply this to your project? Or shall we explore another service?`,
            sender: 'bot',
            icon: <Laptop className="h-4 w-4 text-blue-400" />,
            quickReplies: ['Apply to my project', 'Explore another service', 'Schedule a consultation'],
          };
        }
      }

      // Project-related queries (redirected to services)
      if (lowerQuery.includes('portfolio') || lowerQuery.includes('work') || lowerQuery.includes('projects')) {
        setContext((prev) => ({ ...prev, topic: 'services' }));
        return {
          id: Date.now().toString(),
          text: "I'd love to tell you about the amazing projects we can build for you! We specialize in creating custom digital solutions tailored to your needs.\n\nLet me share our core services and how we can help bring your vision to life:",
          sender: 'bot',
          icon: <Code className="h-4 w-4 text-blue-400" />,
          quickReplies: ['What services do you provide?', 'Tell me about your process', 'Get a custom quote', 'Schedule consultation'],
        };
      }

      // Timeline-related queries
      if (lowerQuery.includes('how long') || lowerQuery.includes('timeline') || lowerQuery.includes('project take')) {
        setContext((prev) => ({ ...prev, topic: 'timeline' }));
        return {
          id: Date.now().toString(),
          text: "Timelines depend on your project's scope:\n\n• Landing Page: 2-3 weeks\n• Corporate Site: 4-8 weeks\n• E-commerce Platform: 8-12 weeks\n• Custom App: 12-16 weeks\n\nWe use an agile process with regular updates. Curious about what affects timelines or want a custom estimate?",
          sender: 'bot',
          icon: <Clock className="h-4 w-4 text-green-400" />,
          quickReplies: ['What affects timelines?', 'Get a custom estimate', 'Your development process', 'Typical milestones'],
        };
      }

      // Maintenance-related queries
      if (lowerQuery.includes('maintenance') || lowerQuery.includes('support') || lowerQuery.includes('after launch')) {
        setContext((prev) => ({ ...prev, topic: 'maintenance' }));
        return {
          id: Date.now().toString(),
          text: "We keep your site running smoothly post-launch:\n\n• Basic: Security patches, backups\n• Pro: Content updates, minor tweaks\n• Elite: Performance tuning, analytics\n\nAll plans include 24/7 monitoring. Want details on a specific plan or how we handle updates?",
          sender: 'bot',
          icon: <Wrench className="h-4 w-4 text-orange-400" />,
          quickReplies: ['Basic plan details', 'Pro plan details', 'Elite plan details', 'How updates work'],
        };
      }

      // Process-related queries
      if (lowerQuery.includes('process') || lowerQuery.includes('how do you work') || lowerQuery.includes('methodology')) {
        setContext((prev) => ({ ...prev, topic: 'process' }));
        const processList = processes
          .map((p) => `• ${p.title}: ${p.description}`)
          .join('\n');
        return {
          id: Date.now().toString(),
          text: `Our process ensures top-notch results:\n\n${processList}\n\nEach step is collaborative. Want to zoom in on any phase, like design or testing?`,
          sender: 'bot',
          icon: <Zap className="h-4 w-4 text-yellow-400" />,
          quickReplies: processes.map((p) => `${p.title} details`),
        };
      }

      // Specific process follow-ups
      if (context.topic === 'process' && processes.some((p) => lowerQuery.includes(p.title.toLowerCase()))) {
        const process = processes.find((p) => lowerQuery.includes(p.title.toLowerCase()));
        if (process) {
          return {
            id: Date.now().toString(),
            text: `${process.title}:\n\n${process.description}\n\nThis phase is key to our success. Want to know more about it or another step in our process?`,
            sender: 'bot',
            icon: <Zap className="h-4 w-4 text-yellow-400" />,
            quickReplies: ['More on this phase', 'Another process step', 'Start a project'],
          };
        }
      }

      // Technology-related queries
      if (lowerQuery.includes('tech') || lowerQuery.includes('stack') || lowerQuery.includes('technologies')) {
        setContext((prev) => ({ ...prev, topic: 'technologies' }));
        const techGroups = {
          Frontend: technologies.filter((t) =>
            ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Wouter', 'React Query', 'Radix UI', 'Lucide React'].includes(t.name)
          ),
          Backend: technologies.filter((t) =>
            ['Node.js', 'Express.js', 'Drizzle ORM', 'Neon (PostgreSQL)'].includes(t.name)
          ),
          Tools: technologies.filter((t) => ['Vite', 'ESBuild', 'PostCSS', 'TSX'].includes(t.name)),
        };
        const techSummary = Object.entries(techGroups)
          .map(([category, techs]) => `${category}: ${techs.map((t) => t.name).join(', ')}`)
          .join('\n');
        return {
          id: Date.now().toString(),
          text: `Our tech stack is built for performance:\n\n${techSummary}\n\nWe pick tools like React and Node.js to match your needs. Curious about a specific tech or how we use it?`,
          sender: 'bot',
          icon: <Database className="h-4 w-4 text-purple-400" />,
          quickReplies: ['Frontend details', 'Backend details', 'Tools details', 'Why this stack?'],
        };
      }

      // Specific technology follow-ups
      if (context.topic === 'technologies' && (lowerQuery.includes('frontend') || lowerQuery.includes('backend') || lowerQuery.includes('tools'))) {
        const category = lowerQuery.includes('frontend') ? 'Frontend' : lowerQuery.includes('backend') ? 'Backend' : 'Tools';
        const techs = technologies.filter((t) =>
          category === 'Frontend'
            ? ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Wouter', 'React Query', 'Radix UI', 'Lucide React'].includes(t.name)
            : category === 'Backend'
            ? ['Node.js', 'Express.js', 'Drizzle ORM', 'Neon (PostgreSQL)'].includes(t.name)
            : ['Vite', 'ESBuild', 'PostCSS', 'TSX'].includes(t.name)
        );
        return {
          id: Date.now().toString(),
          text: `${category} Tech:\n\n${techs.map((t) => `• ${t.name}: ${t.description}`).join('\n')}\n\nWant to know how we use these in projects or explore another category?`,
          sender: 'bot',
          icon: <Database className="h-4 w-4 text-purple-400" />,
          quickReplies: ['Use in projects', 'Another tech category', 'Tech selection process'],
        };
      }

      // Contact-related queries
      if (lowerQuery.includes('contact') || lowerQuery.includes('schedule') || lowerQuery.includes('call') || lowerQuery.includes('talk')) {
        setContext((prev) => ({ ...prev, topic: 'contact' }));
        return {
          id: Date.now().toString(),
          text: "Let's get in touch! Options include:\n\n• Book a Call: Pick a time that works for you\n• Email: hello@weekodpro.com\n• Website Form: Share your project details\n\nWe respond within 24 hours. Ready to start or need more info first?",
          sender: 'bot',
          icon: <Sparkles className="h-4 w-4 text-blue-400" />,
          quickReplies: ['Book a call', 'Email details', 'Website form', 'More project info'],
        };
      }

      // Default response with context awareness
      return {
        id: Date.now().toString(),
        text: `Hmm, I want to make sure I get this right! Could you tell me more about what you're looking for? Maybe something about ${context.topic !== 'general' ? context.topic : 'your project goals'}? Here are some ideas to explore!`,
        sender: 'bot',
        icon: <Sparkles className="h-4 w-4 text-purple-400" />,
        quickReplies: [
          'Services overview',
          'Tech stack details',
          'Development process',
          'Start a project',
        ],
      };
    },
    [context.topic]
  );

  return (
    <>
      {/* Chat toggle button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        role="button"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        <Button
          onClick={toggleChat}
          className={cn(
            'w-14 h-14 rounded-full bg-gradient-to-r from-accent-purple to-accent-magenta shadow-lg hover:shadow-accent-purple/50 p-0 flex items-center justify-center',
            pulseEffect && !isOpen && 'after:absolute after:inset-0 after:rounded-full after:animate-pulse after:bg-accent-purple/30 after:blur-md after:-z-10'
          )}
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <div className="relative">
              <MessageCircle className="h-6 w-6" />
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            </div>
          )}
        </Button>
      </motion.div>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 h-[500px] max-h-[80vh] rounded-xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ ease: 'easeOut', duration: 0.2 }}
            role="dialog"
            aria-labelledby="chatbot-title"
          >
            <Card className="flex flex-col h-full border-0 bg-gradient-to-b from-gray-900 to-gray-950">
              {/* Chat header */}
              <div className="p-4 border-b border-gray-800 bg-gradient-to-r from-gray-900 to-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 bg-gradient-to-r from-accent-purple to-accent-magenta">
                    <Bot className="h-4 w-4 text-white" />
                  </Avatar>
                  <div>
                    <h3 id="chatbot-title" className="font-semibold text-white">
                      weeBot <span className="text-accent-magenta">🤖</span>
                    </h3>
                    <p className="text-xs text-gray-400">WeekodPro Assistant</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={toggleChat} className="hover:bg-gray-800" aria-label="Close chat">
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Chat messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-900/50 to-gray-950" role="log" aria-live="polite">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.sender === 'bot' && (
                      <Avatar className="h-8 w-8 mr-2 mt-1 bg-gradient-to-r from-accent-purple to-accent-magenta flex-shrink-0">
                        {message.icon || <Bot className="h-4 w-4 text-white" />}
                      </Avatar>
                    )}
                    <div
                      className={cn(
                        'max-w-[85%] rounded-2xl p-3',
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-accent-purple to-accent-magenta text-white rounded-tr-none'
                          : 'bg-gray-800/80 text-gray-100 border border-gray-700/50 rounded-tl-none'
                      )}
                    >
                      <p className="text-sm whitespace-pre-line">{message.text}</p>

                      {/* Quick replies */}
                      {message.sender === 'bot' && message.quickReplies && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {message.quickReplies.map((reply, index) => (
                            <button
                              key={index}
                              onClick={() => handleQuickReply(reply)}
                              className="text-xs bg-gray-700/80 hover:bg-gray-600 text-white px-3 py-1.5 rounded-full transition-colors border border-gray-600/50 hover:border-gray-500"
                              aria-label={`Select ${reply}`}
                            >
                              {reply}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <Avatar className="h-8 w-8 mr-2 mt-1 bg-gradient-to-r from-accent-purple to-accent-magenta flex-shrink-0">
                      <Bot className="h-4 w-4 text-white" />
                    </Avatar>
                    <div className="bg-gray-800/80 rounded-2xl p-3 max-w-[85%] border border-gray-700/50 rounded-tl-none">
                      <div className="flex space-x-1">
                        <motion.div
                          className="w-2 h-2 rounded-full bg-accent-purple"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ repeat: Infinity, duration: 0.8, delay: 0 }}
                        />
                        <motion.div
                          className="w-2 h-2 rounded-full bg-accent-purple"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }}
                        />
                        <motion.div
                          className="w-2 h-2 rounded-full bg-accent-purple"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Chat input */}
              <div className="p-4 border-t border-gray-800 bg-gradient-to-r from-gray-900 to-gray-800">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 bg-gray-800/80 border-gray-700/50 focus-visible:ring-accent-purple rounded-full px-4"
                    aria-label="Chat input"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="bg-gradient-to-r from-accent-purple to-accent-magenta hover:from-accent-purple/90 hover:to-accent-magenta/90 rounded-full"
                    disabled={!inputValue.trim()}
                    aria-label="Send message"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}