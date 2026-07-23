import React, { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X, CheckCircle2, Info, AlertTriangle, AlertCircle, Star } from 'lucide-react';

export type ToastType = 'success' | 'info' | 'warning' | 'error' | 'wishlist';

export interface Toast {
  id: string;
  messageAr: string;
  messageFr: string;
  type: ToastType;
}

interface ToastContextType {
  addToast: (messageAr: string, messageFr: string, type?: ToastType) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

interface ToastProviderProps {
  children: React.ReactNode;
  lang: 'ar' | 'fr';
}

export function ToastProvider({ children, lang }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const isAr = lang === 'ar';

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((messageAr: string, messageFr: string, type: ToastType = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, messageAr, messageFr, type }]);
    
    // Auto-remove toast after 4 seconds
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      
      {/* Toast Portal Area */}
      <div 
        id="toast-container" 
        className="fixed bottom-6 right-6 rtl:left-6 rtl:right-auto z-[9999] flex flex-col gap-3 w-full max-w-sm pointer-events-none px-4 sm:px-0"
      >
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => {
            const displayMessage = isAr ? toast.messageAr : toast.messageFr;
            
            // Icon configuration based on type
            let IconComponent = Info;
            let iconColorClass = 'text-blue-500';
            let bgClass = 'bg-cream/95 dark:bg-charcoal/95 border-sand/80 dark:border-sand-dark/20';
            let shadowClass = 'shadow-lg';

            if (toast.type === 'success') {
              IconComponent = CheckCircle2;
              iconColorClass = 'text-emerald-500';
            } else if (toast.type === 'warning') {
              IconComponent = AlertTriangle;
              iconColorClass = 'text-amber-500';
            } else if (toast.type === 'error') {
              IconComponent = AlertCircle;
              iconColorClass = 'text-rose-500';
            } else if (toast.type === 'wishlist') {
              IconComponent = Star;
              iconColorClass = 'text-gold fill-gold/20';
              bgClass = 'bg-cream/95 dark:bg-charcoal/95 border-gold/30 dark:border-gold/25';
            }

            return (
              <motion.div
                id={`toast-item-${toast.id}`}
                key={toast.id}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
                className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl border ${bgClass} ${shadowClass} backdrop-blur-md transition-shadow duration-300`}
              >
                {/* Accent Icon */}
                <div className={`shrink-0 mt-0.5 ${iconColorClass}`}>
                  <IconComponent className="w-5 h-5" />
                </div>

                {/* Content */}
                <div className="flex-grow space-y-0.5">
                  <p className="font-sans text-xs sm:text-sm font-semibold text-charcoal dark:text-cream leading-relaxed">
                    {displayMessage}
                  </p>
                </div>

                {/* Close Button */}
                <button
                  id={`toast-close-${toast.id}`}
                  onClick={() => removeToast(toast.id)}
                  className="shrink-0 p-1 text-charcoal/40 dark:text-cream/40 hover:text-charcoal dark:hover:text-cream hover:bg-charcoal/5 dark:hover:bg-cream/5 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
