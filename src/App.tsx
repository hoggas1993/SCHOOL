import React, { useState, useEffect } from 'react';
import { BookOpen, Star, Sparkles, Award, ShieldCheck, Check, ArrowRight, Video, Flame, Layout } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import Catalog from './components/Catalog';
import CourseDetail from './components/CourseDetail';
import RegistrationForm from './components/RegistrationForm';
import ContactMap from './components/ContactMap';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import Newsletter from './components/Newsletter';
import AboutSection from './components/AboutSection';
import CertificationsSection from './components/CertificationsSection';
import StudentPortal from './components/StudentPortal';
import WhatsAppFAB from './components/WhatsAppFAB';
import SEOManager from './components/SEOManager';
import AIChatbot from './components/AIChatbot';
import Breadcrumbs from './components/Breadcrumbs';
import { COURSES, TESTIMONIALS } from './data';
import { Course } from './types';
import { ToastProvider } from './components/Toast';

export default function App() {
  // Dynamic courses and testimonials loaded from backend API (Strapi adapter)
  const [courses, setCourses] = useState<Course[]>(COURSES);
  const [testimonials, setTestimonials] = useState<any[]>(TESTIMONIALS);

  useEffect(() => {
    // Fetch courses from full-stack backend
    fetch('/api/courses')
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Failed to fetch courses');
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setCourses(data);
          console.log('[Frontend] Loaded dynamic courses:', data.length);
        }
      })
      .catch(err => console.warn('[Frontend] Using local course fallback:', err));

    // Fetch testimonials from full-stack backend
    fetch('/api/testimonials')
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Failed to fetch testimonials');
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setTestimonials(data);
          console.log('[Frontend] Loaded dynamic testimonials:', data.length);
        }
      })
      .catch(err => console.warn('[Frontend] Using local testimonials fallback:', err));
  }, []);

  // Localization: 'ar' (Arabic) by default, togglable to 'fr' (French)
  const [lang, setLang] = useState<'ar' | 'fr'>('ar');
  
  // Navigation active tab: 'home', 'courses', 'contact'
  const [activeTab, setActiveTab] = useState<string>('home');
  
  // Selected course details state
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  
  // Registration Overlay wizard state
  const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);
  const [registerPreselectedId, setRegisterPreselectedId] = useState<string>('');

  // Dark Mode high-contrast theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('rafa-theme');
    return saved === 'dark';
  });

  // Sync Dark Mode class with document root
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('rafa-theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('rafa-theme', 'light');
    }
  }, [isDarkMode]);

  // Sync Document Layout Direction (RTL / LTR) dynamically based on language selection
  useEffect(() => {
    const html = document.documentElement;
    if (lang === 'ar') {
      html.setAttribute('dir', 'rtl');
      html.setAttribute('lang', 'ar');
    } else {
      html.setAttribute('dir', 'ltr');
      html.setAttribute('lang', 'fr');
    }
  }, [lang]);

  const isAr = lang === 'ar';

  const handleSelectCourse = (course: Course) => {
    setSelectedCourse(course);
    setActiveTab('courses'); // Navigate to courses context
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenRegister = (courseId: string = '') => {
    setRegisterPreselectedId(courseId);
    setIsRegisterOpen(true);
    // Scroll smoothly to form
    setTimeout(() => {
      const element = document.getElementById('registration-anchor');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleCloseRegister = () => {
    setIsRegisterOpen(false);
    setRegisterPreselectedId('');
  };

  return (
    <ToastProvider lang={lang}>
      <SEOManager lang={lang} activeTab={activeTab} selectedCourse={selectedCourse} />
      <div className="min-h-screen flex flex-col justify-between bg-cream selection:bg-gold/20 selection:text-charcoal transition-all duration-300">
      
      {/* Header component */}
      <Header 
        lang={lang} 
        setLang={setLang} 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSelectedCourse(null); // Clear selected course on primary menu click
        }}
        onOpenRegister={(courseId) => handleOpenRegister(courseId)}
        onSelectCourse={handleSelectCourse}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      {/* Main Views Router */}
      <main className="flex-grow">
        
        {/* Breadcrumb Navigation for Catalog and Course Detail */}
        <Breadcrumbs 
          lang={lang} 
          activeTab={activeTab} 
          selectedCourse={selectedCourse} 
          onNavigate={(tab) => {
            setActiveTab(tab);
            setSelectedCourse(null);
          }}
          onBackToCatalog={() => setSelectedCourse(null)} 
        />

        {/* VIEW: HOME */}
        {activeTab === 'home' && !selectedCourse && (
          <div className="animate-fade-in space-y-16 pb-16">
            
            {/* Hero Section */}
            <Hero 
              lang={lang} 
              onNavigate={(tab) => {
                setActiveTab(tab);
                setSelectedCourse(null);
              }}
              onSelectCourse={handleSelectCourse}
            />

            {/* Creative USP / Highlights grid */}
            <section className="py-12 bg-sand/35 border-y border-sand">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="text-center mb-10">
                  <span className="font-mono text-[10px] font-bold text-gold uppercase tracking-widest block mb-1">
                    {isAr ? 'لماذا تختار مدرسة رافا؟' : 'POURQUOI REJOINDRE RAFA SCHOOL ?'}
                  </span>
                  <h2 className="font-display font-extrabold text-2xl text-charcoal">
                    {isAr ? 'بيئة تعلم تسرع نموك المهني' : 'Un tremplin pour votre carrière'}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  
                  {/* USP 1 */}
                  <div className="p-6 bg-cream rounded-2xl border border-sand/60 hover:shadow-md transition-shadow duration-300">
                    <div className="w-10 h-10 rounded-xl bg-gold/10 text-gold flex items-center justify-center mb-4">
                      <Flame className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-bold text-sm sm:text-base text-charcoal mb-2">
                      {isAr ? 'مناهج تطبيقية 100٪' : 'Programmes ultra-pratiques'}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-charcoal/60 leading-relaxed">
                      {isAr ? 'مناهجنا تطبيقية وميدانية بنسبة تفوق 90٪، مبنية على ورشات حية وتدريبات تطبيقة مستمرة لتمكينك من المهنة مباشرة.' : 'Fini les cours théoriques ennuyeux. Nos formations sont construites à plus de 90% autour d\'ateliers pratiques et de travaux dirigés.'}
                    </p>
                  </div>

                  {/* USP 2 */}
                  <div className="p-6 bg-cream rounded-2xl border border-sand/60 hover:shadow-md transition-shadow duration-300">
                    <div className="w-10 h-10 rounded-xl bg-gold/10 text-gold flex items-center justify-center mb-4">
                      <Video className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-bold text-sm sm:text-base text-charcoal mb-2">
                      {isAr ? 'تأطير مهني وتوجيه فردي' : 'Feedback Live & Coaching'}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-charcoal/60 leading-relaxed">
                      {isAr ? 'أنت لست وحدك. يشرف عليك أساتذة ومهندسون ذوو خبرة طويلة لضمان تصحيح أخطائك وصقل مهاراتك خطوة بخطوة.' : 'Vous n\'êtes jamais seul. Bénéficiez d\'un encadrement de qualité assuré par des professionnels expérimentés et bienveillants.'}
                    </p>
                  </div>

                  {/* USP 3 */}
                  <div className="p-6 bg-cream rounded-2xl border border-sand/60 hover:shadow-md transition-shadow duration-300">
                    <div className="w-10 h-10 rounded-xl bg-gold/10 text-gold flex items-center justify-center mb-4">
                      <Layout className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-bold text-sm sm:text-base text-charcoal mb-2">
                      {isAr ? 'مرافقة للتشغيل والعمل الحر' : 'Placement & Réseau'}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-charcoal/60 leading-relaxed">
                      {isAr ? 'نساعد خريجينا المتميزين في الحصول على فرص تربص وعمل لدى شبكة شركائنا الاقتصاديين في الجزائر.' : 'Nous connectons nos meilleurs diplômés avec nos partenaires économiques en Algérie pour des opportunités de stage et d\'emploi.'}
                    </p>
                  </div>

                </div>

              </div>
            </section>

            {/* Quick Catalog preview */}
            <Catalog 
              lang={lang} 
              onSelectCourse={handleSelectCourse} 
              courses={courses}
            />

            {/* Student Reviews & Testimonials */}
            <section className="py-12 bg-sand/20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                  <span className="font-mono text-[10px] font-bold text-gold uppercase tracking-widest block mb-1">
                    {isAr ? 'ماذا يقول خريجونا؟' : 'TÉMOIGNAGES DE NOS DIPLÔMÉS'}
                  </span>
                  <h2 className="font-display font-extrabold text-2xl text-charcoal">
                    {isAr ? 'قصص نجاح من قلب الواقع' : 'Ils ont transformé leur passion'}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {testimonials.map((test) => (
                    <div 
                      id={`testimonial-${test.id}`}
                      key={test.id} 
                      className="p-6 sm:p-8 bg-cream border border-sand/60 rounded-3xl relative"
                    >
                      <div className="flex text-amber-500 mb-4">
                        {[...Array(test.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      
                      <p className="font-sans text-xs sm:text-sm text-charcoal/70 leading-relaxed mb-6 italic">
                        "{isAr ? test.contentAr : test.contentFr}"
                      </p>

                      <div className="flex items-center gap-3">
                        <img 
                          src={test.avatar} 
                          alt={isAr ? test.authorAr : test.authorFr} 
                          className="w-10 h-10 rounded-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <h4 className="font-display font-bold text-xs sm:text-sm text-charcoal leading-none">
                            {isAr ? test.authorAr : test.authorFr}
                          </h4>
                          <p className="font-sans text-[10px] sm:text-xs text-gold font-medium mt-1">
                            {isAr ? test.roleAr : test.roleFr}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Accordion style FAQ Section */}
            <FaqSection lang={lang} />

          </div>
        )}

        {/* VIEW: COURSE CATALOG */}
        {activeTab === 'courses' && !selectedCourse && (
          <div className="animate-fade-in">
            <Catalog 
              lang={lang} 
              onSelectCourse={handleSelectCourse} 
              courses={courses}
            />
          </div>
        )}

        {/* VIEW: COURSE DETAIL SYLLABUS */}
        {activeTab === 'courses' && selectedCourse && (
          <div className="animate-fade-in">
            <CourseDetail 
              course={selectedCourse} 
              lang={lang} 
              onBack={() => setSelectedCourse(null)} 
              onRegister={(courseId) => handleOpenRegister(courseId)}
            />
          </div>
        )}

        {/* VIEW: ABOUT US */}
        {activeTab === 'about' && (
          <div className="animate-fade-in">
            <AboutSection lang={lang} />
          </div>
        )}

        {/* VIEW: CERTIFICATIONS & PRICES */}
        {activeTab === 'certifications' && (
          <div className="animate-fade-in">
            <CertificationsSection 
              lang={lang} 
              onSelectCourse={(courseId) => {
                const course = courses.find(c => c.id === courseId);
                if (course) {
                  handleSelectCourse(course);
                }
              }}
            />
          </div>
        )}

        {/* VIEW: STUDENT PORTAL */}
        {activeTab === 'portal' && (
          <div className="animate-fade-in">
            <StudentPortal lang={lang} />
          </div>
        )}

        {/* REGISTRATION FORM COMPONENT (Smooth Reveal Section) */}
        <div id="registration-anchor" className="scroll-mt-24">
          {isRegisterOpen && (
            <section className="py-12 bg-sand/15 border-t border-sand animate-fade-in">
              <div className="max-w-3xl mx-auto px-4 sm:px-6">
                <RegistrationForm 
                  lang={lang} 
                  preselectedCourseId={registerPreselectedId} 
                  onClose={handleCloseRegister}
                />
              </div>
            </section>
          )}
        </div>

        {/* VIEW: CONTACT & MAPS (Always accessible at bottom of home or as a tab) */}
        {(activeTab === 'contact' || activeTab === 'home') && (
          <ContactMap lang={lang} />
        )}

      </main>

      {/* Newsletter Section */}
      <Newsletter lang={lang} />

      {/* Footer component */}
      <Footer 
        lang={lang} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSelectedCourse(null);
        }}
        onOpenRegister={() => handleOpenRegister()}
      />

      {/* Floating WhatsApp Assistance Hub */}
      <WhatsAppFAB lang={lang} />

      {/* Floating AI chatbot Assistant */}
      <AIChatbot lang={lang} />

    </div>
    </ToastProvider>
  );
}
