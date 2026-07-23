import React, { useState, useEffect } from 'react';
import { Award, Languages, Compass, Send, BookOpen, Users, ShieldCheck, UserCheck, Menu, X, Sun, Moon, Heart } from 'lucide-react';
import Logo from './Logo';
import { useToast } from './Toast';
import WishlistDrawer from './WishlistDrawer';
import { Course } from '../types';

interface HeaderProps {
  lang: 'ar' | 'fr';
  setLang: (lang: 'ar' | 'fr') => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenRegister: (courseId?: string) => void;
  onSelectCourse: (course: Course) => void;
  isDarkMode: boolean;
  setIsDarkMode: (isDark: boolean) => void;
}

export default function Header({ 
  lang, 
  setLang, 
  activeTab, 
  setActiveTab, 
  onOpenRegister,
  onSelectCourse,
  isDarkMode,
  setIsDarkMode
}: HeaderProps) {
  const isAr = lang === 'ar';
  const [isOpen, setIsOpen] = useState(false);
  const { addToast } = useToast();

  // Wishlist states and sync
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('rafa-wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const syncWishlist = () => {
      try {
        const saved = localStorage.getItem('rafa-wishlist');
        const current = saved ? JSON.parse(saved) : [];
        setWishlist(current);
      } catch {}
    };

    // Listen to standard storage and custom local updates
    window.addEventListener('storage', syncWishlist);
    window.addEventListener('wishlist-updated', syncWishlist);

    // Fallback periodic sync (extremely robust across client views)
    const interval = setInterval(syncWishlist, 1000);

    return () => {
      window.removeEventListener('storage', syncWishlist);
      window.removeEventListener('wishlist-updated', syncWishlist);
      clearInterval(interval);
    };
  }, []);

  const handleRemoveWishlistItem = (courseId: string) => {
    try {
      const saved = localStorage.getItem('rafa-wishlist');
      const current: string[] = saved ? JSON.parse(saved) : [];
      const updated = current.filter(id => id !== courseId);
      localStorage.setItem('rafa-wishlist', JSON.stringify(updated));
      setWishlist(updated);
      
      // Dispatch custom event to notify other mounted views
      window.dispatchEvent(new Event('wishlist-updated'));

      addToast(
        '💔 تم حذف الدورة من قائمتك المفضلة',
        '💔 Formation retirée de vos favoris',
        'info'
      );
    } catch {}
  };

  const menuItems = [
    { id: 'home', labelAr: 'الرئيسية', labelFr: 'Accueil', icon: Compass },
    { id: 'courses', labelAr: 'الدورات', labelFr: 'Cours', icon: BookOpen },
    { id: 'about', labelAr: 'من نحن', labelFr: 'À Propos', icon: Users },
    { id: 'certifications', labelAr: 'الشهادات والاعتمادات', labelFr: 'Certifications', icon: ShieldCheck },
    { id: 'portal', labelAr: 'بوابة الطلاب', labelFr: 'Espace Étudiant', icon: UserCheck },
    { id: 'contact', labelAr: 'تواصل معنا', labelFr: 'Contact', icon: Send },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-cream/90 backdrop-blur-md border-b border-sand/50 transition-all duration-300">
      {/* Official Accreditation Top Banner */}
      <div className="w-full bg-charcoal text-cream py-1.5 px-4 text-center text-[10px] sm:text-xs font-sans tracking-wide border-b border-white/5 flex items-center justify-center gap-2">
        <Award className="w-3.5 h-3.5 text-gold animate-pulse shrink-0" />
        <span>
          {isAr ? (
            <>مؤسسة معتمدة من قبل وزارة التكوين والتعليم المهنيين - رقم الاعتماد: <strong className="text-gold">014/25</strong></>
          ) : (
            <>Établissement agréé par le Ministère de la Formation et de l'Enseignement Professionnels - Agrément N°: <strong className="text-gold">014/25</strong></>
          )}
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <button 
            id="header-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center group cursor-pointer shrink-0"
            aria-label={isAr ? "الصفحة الرئيسية لمدرسة رافا" : "Page d'accueil de Rafa School"}
          >
            <Logo className="h-12 sm:h-14 w-auto hover:opacity-90 transition-all duration-300" isDark={isDarkMode} />
          </button>

          {/* Desktop Navigation (visible on large screens) */}
          <nav className="hidden lg:flex items-center gap-1 bg-sand/40 p-1 rounded-full border border-sand">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  id={`nav-item-${item.id}`}
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-sans text-xs font-semibold transition-all duration-300 cursor-pointer ${
                    isActive 
                      ? 'bg-charcoal text-cream shadow-sm scale-102' 
                      : 'text-charcoal/70 hover:bg-sand hover:text-charcoal'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{isAr ? item.labelAr : item.labelFr}</span>
                </button>
              );
            })}
          </nav>

          {/* Action buttons & Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher */}
            <button
              id="lang-switcher-btn"
              onClick={() => setLang(isAr ? 'fr' : 'ar')}
              className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl bg-sand hover:bg-charcoal hover:text-cream text-charcoal font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer"
              title={isAr ? 'Changer en Français' : 'تغيير إلى العربية'}
              aria-label={isAr ? "Changer la langue de l'application en Français" : "تغيير لغة التطبيق إلى العربية"}
            >
              <Languages className="w-4 h-4" />
              <span>{isAr ? 'FR' : 'عربي'}</span>
            </button>

            {/* High-Contrast Theme Switcher */}
            <button
              id="theme-switcher-btn"
              onClick={() => {
                const nextDark = !isDarkMode;
                setIsDarkMode(nextDark);
                addToast(
                  nextDark ? 'تم تفعيل الوضع المظلم عالي التباين 🌙' : 'تم تفعيل الوضع المضيء ☀️',
                  nextDark ? 'Mode sombre haute-visibilité activé 🌙' : 'Mode clair classique activé ☀️',
                  'info'
                );
              }}
              className="flex items-center justify-center p-2 rounded-xl bg-sand hover:bg-charcoal hover:text-cream text-charcoal transition-all duration-300 cursor-pointer"
              title={isAr ? (isDarkMode ? 'تفعيل الوضع المضيء' : 'تفعيل الوضع المظلم عالي التباين') : (isDarkMode ? 'Activer le Mode Clair' : 'Activer le Mode Sombre Haute-Visibilité')}
              aria-label={isAr ? (isDarkMode ? "تفعيل نمط الألوان المضيء العادي" : "تفعيل نمط الألوان الداكن عالي التباين") : (isDarkMode ? "Activer le mode de couleurs clair standard" : "Activer le mode de couleurs sombre de haute visibilité")}
            >
              {isDarkMode ? (
                <Sun className="w-4.5 h-4.5 text-amber-500 animate-pulse" />
              ) : (
                <Moon className="w-4.5 h-4.5" />
              )}
            </button>

            {/* Wishlist Sidebar Toggle Button with Count Badge */}
            <button
              id="header-wishlist-toggle-btn"
              onClick={() => setIsWishlistOpen(true)}
              className="relative flex items-center justify-center p-2 rounded-xl bg-sand hover:bg-charcoal hover:text-cream text-charcoal transition-all duration-300 cursor-pointer"
              title={isAr ? 'عرض الدورات المفضلة' : 'Voir les favoris'}
              aria-label={isAr ? `عرض الدورات المحفوظة والمفضلة - لديك ${wishlist.length} دورة` : `Afficher vos formations favorites enregistrées - vous en avez ${wishlist.length}`}
            >
              <Heart className={`w-4.5 h-4.5 ${wishlist.length > 0 ? 'text-red-500 fill-red-500 animate-pulse' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white shadow-sm ring-2 ring-cream">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Inscription CTA (hidden on very small screens to save space, but accessible in mobile drawer) */}
            <button
              id="header-cta-btn"
              onClick={onOpenRegister}
              className="hidden sm:block px-4 py-2.5 bg-gold hover:bg-gold-hover text-cream text-xs sm:text-sm font-medium rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
              aria-label={isAr ? "فتح استمارة التسجيل في دورات مدرسة رافا" : "Ouvrir le formulaire d'inscription aux formations Rafa School"}
            >
              {isAr ? 'التسجيل الآن' : 'S\'inscrire'}
            </button>

            {/* Hamburger Button (visible on mobile/tablet) */}
            <button
              id="header-hamburger-btn"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-sand/60 hover:bg-sand text-charcoal lg:hidden transition-colors duration-300 cursor-pointer"
              aria-label={isAr ? "عرض أو إخلاق قائمة التصفح والتنقل" : "Afficher ou masquer le menu de navigation mobile"}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu (visible on lg:hidden when open) */}
      {isOpen && (
        <div className="lg:hidden animate-fade-in bg-cream border-t border-sand/40 px-4 py-6 space-y-4 shadow-inner">
          <nav className="flex flex-col gap-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  id={`mobile-nav-item-${item.id}`}
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-sans text-sm font-semibold transition-all duration-200 text-left rtl:text-right cursor-pointer ${
                    isActive 
                      ? 'bg-brand-deep text-cream' 
                      : 'text-charcoal/70 hover:bg-sand'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{isAr ? item.labelAr : item.labelFr}</span>
                </button>
              );
            })}
          </nav>

          {/* Mobile Theme Switcher */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-sand/30 border border-sand/40">
            <span className="font-sans text-xs font-semibold text-charcoal/80 flex items-center gap-2">
              {isDarkMode ? <Moon className="w-4 h-4 text-brand-deep" /> : <Sun className="w-4 h-4 text-gold" />}
              {isAr ? 'الوضع المظلم عالي التباين' : 'Mode sombre haute-visibilité'}
            </span>
            <button
              id="mobile-theme-switcher-btn"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sand hover:bg-charcoal hover:text-cream text-charcoal text-xs font-bold transition-all duration-300 cursor-pointer"
            >
              {isDarkMode ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span>{isAr ? 'مضيء' : 'Clair'}</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5" />
                  <span>{isAr ? 'مظلم' : 'Sombre'}</span>
                </>
              )}
            </button>
          </div>

          {/* Mobile Wishlist Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-sand/30 border border-sand/40">
            <span className="font-sans text-xs font-semibold text-charcoal/80 flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              {isAr ? 'قائمة رغباتي وحفظ الدورات' : 'Ma liste d\'envies'}
            </span>
            <button
              id="mobile-wishlist-toggle-btn"
              onClick={() => {
                setIsWishlistOpen(true);
                setIsOpen(false); // Close mobile main menu drawer
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sand hover:bg-charcoal hover:text-cream text-charcoal text-xs font-bold transition-all duration-300 cursor-pointer relative"
            >
              <span>{isAr ? 'عرض' : 'Voir'}</span>
              <span className="bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                {wishlist.length}
              </span>
            </button>
          </div>
          
          <div className="pt-4 border-t border-sand/40">
            <button
              id="mobile-header-cta-btn"
              onClick={() => {
                onOpenRegister();
                setIsOpen(false);
              }}
              className="w-full py-3 bg-gold hover:bg-gold-hover text-cream text-center text-sm font-bold rounded-xl shadow-sm transition-all cursor-pointer"
            >
              {isAr ? 'ابدأ رحلتك الإبداعية والمهنية' : 'S\'inscrire maintenant'}
            </button>
          </div>
        </div>
      )}

      {/* Slide-out Wishlist Sidebar Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        lang={lang}
        wishlist={wishlist}
        onRemoveItem={handleRemoveWishlistItem}
        onRegister={(courseId) => onOpenRegister(courseId)}
        onViewCourse={(course) => onSelectCourse(course)}
      />
    </header>
  );
}
