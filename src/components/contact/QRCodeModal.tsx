import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  platform: 'wechat' | 'rednote' | 'bilibili';
  qrCodeUrl: string;
}

const platformInfo = {
  wechat: {
    title: 'WeChat',
    subtitle: 'Scan to add on WeChat',
    color: 'rgb(7, 193, 96)',
    bgGradient: 'from-green-500/20 to-green-600/10'
  },
  rednote: {
    title: 'RedNote (小红书)',
    subtitle: 'Scan to follow on RedNote',
    color: 'rgb(255, 45, 85)',
    bgGradient: 'from-red-500/20 to-pink-600/10'
  },
  bilibili: {
    title: 'Bilibili',
    subtitle: 'Scan to follow on Bilibili',
    color: 'rgb(0, 161, 214)',
    bgGradient: 'from-blue-500/20 to-cyan-600/10'
  }
};

export default function QRCodeModal({ isOpen, onClose, platform, qrCodeUrl }: QRCodeModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousOverflowRef = useRef<string>('');
  const info = platformInfo[platform];

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Store the previous overflow value and prevent body scroll when modal is open
      previousOverflowRef.current = document.body.style.overflow || '';
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      // Restore the previous overflow value
      document.body.style.overflow = previousOverflowRef.current;
    };
  }, [isOpen, onClose]);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25
            }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[101]"
          >
            <div className={`bg-gradient-to-br ${info.bgGradient} backdrop-blur-md rounded-2xl p-1 shadow-2xl`}>
              <div className="bg-black/90 rounded-2xl p-6 sm:p-8 max-w-sm">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3
                      className="text-2xl font-bold text-white mb-1"
                      style={{ textShadow: `0 0 20px ${info.color}` }}
                    >
                      {info.title}
                    </h3>
                    <p className="text-zinc-400 text-sm">{info.subtitle}</p>
                  </div>

                  {/* Close button */}
                  <button
                    onClick={onClose}
                    className="text-zinc-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
                    aria-label="Close modal"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* QR Code Container */}
                <div className="relative group">
                  <div
                    className="absolute inset-0 rounded-xl opacity-50 blur-xl transition-all duration-500 group-hover:opacity-70"
                    style={{ background: `radial-gradient(circle, ${info.color}, transparent)` }}
                  />
                  <div className={`relative bg-white rounded-xl flex items-center justify-center ${
                    platform === 'rednote' ? 'p-2' : 'p-4'
                  }`}>
                    <img
                      src={qrCodeUrl}
                      alt={`${info.title} QR Code`}
                      className="w-48 h-48 sm:w-56 sm:h-56 object-contain"
                    />
                  </div>
                </div>

                {/* Footer text */}
                <p className="text-center text-zinc-500 text-xs mt-4">
                  Scan with your phone camera or {info.title} app
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}