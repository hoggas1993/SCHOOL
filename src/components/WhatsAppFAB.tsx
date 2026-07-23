import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Phone, ShieldCheck, Heart } from 'lucide-react';

interface WhatsAppFABProps {
  lang: 'ar' | 'fr';
}

export default function WhatsAppFAB({ lang }: WhatsAppFABProps) {
  const isAr = lang === 'ar';
  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Available support departments corresponding to the school's contacts
  const agents = [
    {
      nameAr: 'مصلحة التسجيل والتوجيه',
      nameFr: 'Service Inscriptions & Orientation',
      phone: '213542581226',
      displayPhone: '0542 58 12 26',
      statusAr: 'نشط الآن',
      statusFr: 'En ligne',
      defaultMsgAr: 'مرحباً مدرسة رافا، أريد الاستفسار عن شروط وتكاليف التسجيل في دوراتكم.',
      defaultMsgFr: 'Bonjour Rafa School, je souhaite avoir des informations sur les inscriptions et tarifs.',
    },
    {
      nameAr: 'الإدارة العامة والمتابعة',
      nameFr: 'Administration Générale',
      phone: '213773976998',
      displayPhone: '0773 97 69 98',
      statusAr: 'نشط الآن',
      statusFr: 'En ligne',
      defaultMsgAr: 'السلام عليكم، أريد التواصل مع إدارة المدرسة بخصوص التكوينات أو زيارة المقر.',
      defaultMsgFr: 'Bonjour, je souhaite contacter l\'administration de l\'école Rafa School pour des détails.',
    }
  ];

  const handleOpenWhatsApp = (phone: string, text: string) => {
    const encodedText = encodeURIComponent(text);
    const url = `https://wa.me/${phone}?text=${encodedText}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 font-sans">
      
      {/* 1. Expandable Assistant Widget Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="w-[320px] sm:w-[360px] bg-white rounded-3xl shadow-2xl border border-sand/60 overflow-hidden text-charcoal flex flex-col"
          >
            {/* Header of widget */}
            <div className="bg-gradient-to-br from-[#0A3EA6] to-[#1C58A6] p-5 text-white relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
              
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                aria-label={isAr ? "إغلاق نافذة دعم واتساب" : "Fermer la fenêtre d'assistance WhatsApp"}
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0 shadow-inner">
                  {/* WhatsApp Custom High-Fidelity Icon SVG */}
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.966a9.9 9.9 0 0 0-6.98-2.855C5.936 2.015 1.7 6.262 1.697 11.69c-.001 1.747.502 3.42 1.457 4.898L2.122 20.3l3.96-.921c.15.082.302.164.456.242z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm tracking-tight text-white flex items-center gap-1.5">
                    {isAr ? 'مساعد واتساب الفوري' : 'Support WhatsApp Actif'}
                  </h4>
                  <p className="text-[10px] text-white/80 mt-0.5">
                    {isAr ? 'نرد عادة خلال دقائق معدودة' : 'Nous répondons généralement en quelques minutes'}
                  </p>
                </div>
              </div>
            </div>

            {/* Support info banner */}
            <div className="px-4 py-2.5 bg-emerald-50 border-b border-sand/40 text-[11px] text-emerald-800 flex items-center gap-1.5 justify-center">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{isAr ? 'مستشارونا جاهزون للإجابة عن تساؤلاتكم' : 'Conseillers officiels agréés par l\'école'}</span>
            </div>

            {/* List of active departments */}
            <div className="p-4 space-y-3 max-h-[300px] overflow-y-auto">
              {agents.map((agent, index) => (
                <div 
                  key={index}
                  className="p-3.5 bg-sand/20 hover:bg-sand/40 border border-sand/40 hover:border-brand-sky/20 rounded-2xl transition-all duration-300 flex flex-col justify-between gap-3 group"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-display font-bold text-xs text-charcoal block group-hover:text-brand-deep transition-colors">
                        {isAr ? agent.nameAr : agent.nameFr}
                      </span>
                      <span className="font-mono text-[10px] text-charcoal/45 block mt-0.5">
                        {agent.displayPhone}
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-sans text-[9px] font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      {isAr ? agent.statusAr : agent.statusFr}
                    </span>
                  </div>

                  <button
                    onClick={() => handleOpenWhatsApp(agent.phone, isAr ? agent.defaultMsgAr : agent.defaultMsgFr)}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-sans text-[11px] font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isAr ? 'بدء محادثة واتساب' : 'Discuter sur WhatsApp'}</span>
                  </button>
                </div>
              ))}
            </div>

            {/* Footer warning */}
            <div className="p-3 text-center bg-sand/10 border-t border-sand/30 text-[9px] text-charcoal/40 flex items-center justify-center gap-1">
              <Heart className="w-3 h-3 text-red-400" />
              <span>{isAr ? 'فريق مدرسة رافا سعيد بخدمتكم' : 'Propulsé avec soin par Rafa School'}</span>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Floating action button */}
      <div className="flex items-center gap-2">
        {/* Animated tooltip alongside button when hovered */}
        <AnimatePresence>
          {hovered && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.95 }}
              className="bg-white px-3 py-1.5 rounded-xl shadow-lg border border-sand/50 text-xs font-semibold text-charcoal/80 whitespace-nowrap hidden sm:block"
            >
              {isAr ? 'مساعدة فورية عبر واتساب؟ 💬' : 'Besoin d\'aide sur WhatsApp ? 💬'}
            </motion.div>
          )}
        </AnimatePresence>

        {/* The main green pulsating circle container and button */}
        <motion.button
          id="whatsapp-fab-btn"
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl relative cursor-pointer focus:outline-none transition-colors duration-300 ${
            isOpen 
              ? 'bg-charcoal text-cream border border-sand/25' 
              : 'bg-emerald-500 hover:bg-emerald-600 text-white'
          }`}
          aria-label={isAr ? "الدعم الفني والتواصل الفوري عبر واتساب" : "Support technique et assistance directe via WhatsApp"}
        >
          {/* Pulsating glow animation when closed */}
          {!isOpen && (
            <span className="absolute inset-0 rounded-full bg-emerald-400/30 animate-ping -z-10"></span>
          )}

          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -45, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 45, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="whatsapp"
                initial={{ rotate: 45, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -45, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex items-center justify-center"
              >
                {/* SVG High fidelity WhatsApp icon */}
                <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.966a9.9 9.9 0 0 0-6.98-2.855C5.936 2.015 1.7 6.262 1.697 11.69c-.001 1.747.502 3.42 1.457 4.898L2.122 20.3l3.96-.921c.15.082.302.164.456.242z" />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Micro red badge to draw attention if closed */}
          {!isOpen && (
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full flex items-center justify-center font-mono text-[8px] text-white font-bold">
              1
            </span>
          )}
        </motion.button>
      </div>

    </div>
  );
}
