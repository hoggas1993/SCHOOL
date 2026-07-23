import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Trash2, Calendar, ArrowRight, ArrowLeft } from 'lucide-react';
import { Course } from '../types';
import { COURSES } from '../data';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'ar' | 'fr';
  wishlist: string[];
  onRemoveItem: (courseId: string) => void;
  onRegister: (courseId: string) => void;
  onViewCourse: (courseId: Course) => void;
}

export default function WishlistDrawer({
  isOpen,
  onClose,
  lang,
  wishlist,
  onRemoveItem,
  onRegister,
  onViewCourse,
}: WishlistDrawerProps) {
  const isAr = lang === 'ar';
  
  // Find favorited courses
  const favoritedCourses = COURSES.filter((course) => wishlist.includes(course.id));

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-charcoal/40 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: isAr ? '-100%' : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: isAr ? '-100%' : '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed top-0 bottom-0 z-50 w-full max-w-md bg-cream border-y-0 border-sand shadow-2xl p-6 flex flex-col justify-between ${
              isAr ? 'left-0 border-r' : 'right-0 border-l'
            }`}
            style={{ direction: isAr ? 'rtl' : 'ltr' }}
          >
            {/* Header */}
            <div className="flex justify-between items-center pb-4 border-b border-sand">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                <h2 className="font-display font-extrabold text-sm sm:text-base text-charcoal">
                  {isAr ? 'قائمة الدورات المفضلة' : 'Ma Liste de Favoris'}
                </h2>
                <span className="font-mono text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold">
                  {favoritedCourses.length}
                </span>
              </div>
              
              <button
                onClick={onClose}
                className="p-1.5 rounded-xl bg-sand hover:bg-charcoal hover:text-cream text-charcoal transition-all duration-300 cursor-pointer"
                aria-label="Close drawer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* List Content */}
            <div className="flex-grow overflow-y-auto py-6 space-y-4 pr-1">
              {favoritedCourses.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-3 p-4">
                  <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-400">
                    <Heart className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-sm text-charcoal">
                      {isAr ? 'قائمتك فارغة تماماً' : 'Votre liste est vide'}
                    </h3>
                    <p className="font-sans text-[11px] text-charcoal/50 max-w-xs mt-1">
                      {isAr 
                        ? 'تصفح كوكبة دوراتنا المعتمدة واضغط على أيقونة القلب لحفظ الدورة هنا للرجوع إليها لاحقاً.'
                        : 'Explorez nos formations professionnelles agréées et cliquez sur le cœur pour sauvegarder vos cours favoris.'
                      }
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="px-4 py-2 bg-brand-deep hover:bg-brand-medium text-cream rounded-xl font-sans text-xs font-bold transition-all duration-300 cursor-pointer mt-2"
                  >
                    {isAr ? 'تصفح دليل الدورات' : 'Découvrir nos cours'}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {favoritedCourses.map((course) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      key={course.id}
                      className="p-3 bg-white hover:bg-sand/20 border border-sand hover:border-gold/30 rounded-2xl flex gap-3 transition-all duration-300"
                    >
                      {/* Image Thumbnail */}
                      <img
                        src={course.image}
                        alt={isAr ? course.titleAr : course.titleFr}
                        className="w-16 h-16 rounded-xl object-cover border border-sand shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => {
                          onViewCourse(course);
                          onClose();
                        }}
                        referrerPolicy="no-referrer"
                      />

                      {/* Content details */}
                      <div className="flex-grow flex flex-col justify-between min-w-0">
                        <div>
                          <h4 
                            onClick={() => {
                              onViewCourse(course);
                              onClose();
                            }}
                            className="font-display font-bold text-xs text-charcoal hover:text-gold transition-colors cursor-pointer leading-tight truncate"
                          >
                            {isAr ? course.titleAr : course.titleFr}
                          </h4>
                          <span className="font-mono text-[9px] text-gold uppercase tracking-wider block mt-1">
                            {isAr ? course.durationAr : course.durationFr}
                          </span>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <span className="font-display font-extrabold text-xs text-brand-deep">
                            {course.price.toLocaleString()} {isAr ? course.currencyAr : course.currencyFr}
                          </span>
                          
                          <div className="flex items-center gap-1.5">
                            {/* Fast enrollment */}
                            <button
                              onClick={() => {
                                onRegister(course.id);
                                onClose();
                              }}
                              className="px-2.5 py-1 bg-gold hover:bg-gold-hover text-cream font-sans text-[10px] font-bold rounded-lg transition-colors cursor-pointer"
                              title={isAr ? 'حجز مقعد' : 'S\'inscrire'}
                            >
                              {isAr ? 'تسجيل' : 'Inscrire'}
                            </button>

                            {/* Delete button */}
                            <button
                              onClick={() => onRemoveItem(course.id)}
                              className="p-1 rounded-lg bg-red-50 hover:bg-red-500 text-red-500 hover:text-white transition-all duration-200 cursor-pointer"
                              title={isAr ? 'حذف من المفضلة' : 'Supprimer'}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Sticky footer register action for entire wishlist */}
            {favoritedCourses.length > 0 && (
              <div className="border-t border-sand pt-4 mt-auto">
                <button
                  onClick={() => {
                    onRegister(favoritedCourses[0].id);
                    onClose();
                  }}
                  className="w-full py-3 bg-brand-deep hover:bg-brand-medium text-cream rounded-xl font-sans text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Calendar className="w-4 h-4" />
                  <span>
                    {isAr 
                      ? 'التسجيل الجماعي للدورة الأولى' 
                      : 'S\'inscrire à la formation prioritaire'
                    }
                  </span>
                  {isAr ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
