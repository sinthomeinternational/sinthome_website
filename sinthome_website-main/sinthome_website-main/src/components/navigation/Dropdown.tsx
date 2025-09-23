import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface DropdownItem {
  label: string;
  href: string;
  description?: string;
}

interface DropdownProps {
  label: string;
  items: DropdownItem[];
  className?: string;
}

export default function Dropdown({ label, items, className = "" }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-4 py-2 text-zinc-400 hover:text-white transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {label}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M12 15.25a.74.74 0 0 1-.53-.22l-5-5A.75.75 0 0 1 7.53 9L12 13.44 16.47 9a.75.75 0 0 1 1.06 1l-5 5a.74.74 0 0 1-.53.25"
          />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-1 left-0 z-50 min-w-[200px] bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl overflow-hidden"
          >
            {items.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="block px-4 py-3 hover:bg-zinc-800 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <div className="text-white font-medium">{item.label}</div>
                {item.description && (
                  <div className="text-zinc-400 text-sm mt-1">{item.description}</div>
                )}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}