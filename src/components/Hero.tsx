import React from 'react';
import { ArrowRight, Sparkles, Star, Users, MapPin, Zap } from 'lucide-react';
import { COURSES } from '../data';
import { Course } from '../types';

interface HeroProps {
  lang: 'ar' | 'fr';
  onNavigate: (tab: string) => void;
  onSelectCourse: (course: Course) => void;
}

export default function Hero({ lang, onNavigate, onSelectCourse }: HeroProps) {
  const isAr = lang === 'ar';

  return (
    <section className="relative overflow-hidden py-12 lg:py-24 bg-cream transition-all duration-300">
      {/* Decorative background shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-purple-accent/5 rounded-full blur-3xl -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Text content */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            
            {/* Tagline / Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-sand rounded-full border border-sand/80">
              <span className="flex h-2 w-2 rounded-full bg-gold animate-ping" />
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-charcoal/80">
                {isAr ? 'بدأ التسجيل للموسم الجديد' : 'Inscriptions Ouvertes - Rentrée 2026'}
              </span>
            </div>

            {/* Main Title with dramatic lettering */}
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-charcoal leading-[1.15] tracking-tight">
              {isAr ? (
                <>
                  ابنِ مستقبلك <br />
                  <span className="text-gold relative">
                    المهني والعملي
                    <svg className="absolute left-0 -bottom-2 w-full h-2 text-gold/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                      <path d="M0,5 Q50,10 100,5" stroke="currentColor" strokeWidth="4" fill="none" />
                    </svg>
                  </span>
                </>
              ) : (
                <>
                  Bâtissez votre avenir <br />
                  <span className="text-gold relative">
                    Professionnel & Pratique
                    <svg className="absolute left-0 -bottom-2 w-full h-2 text-gold/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                      <path d="M0,5 Q50,10 100,5" stroke="currentColor" strokeWidth="4" fill="none" />
                    </svg>
                  </span>
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="font-sans text-base sm:text-lg text-charcoal/70 leading-relaxed max-w-xl">
              {isAr ? (
                'انضم إلى مدرسة رافا، مؤسسة معتمدة من الدولة تقدم تكوينات مهنية وحرفية وتكنولوجية متميزة: الخياطة، تصميم الملابس، تصفيف الشعر، إنشاء المواقع، الإعلام الآلي، والأمن والسلامة والبيئة (HSE).'
              ) : (
                'Rejoignez Rafa School, établissement de formation agréé par l\'État proposant des spécialisations professionnelles, artisanales et technologiques d\'avenir : Couture, Stylisme de mode, Coiffure, Création web, Bureautique, et Agent HSE.'
              )}
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 items-center py-2">
              {/* Rating */}
              <div className="flex items-center gap-1.5 bg-sand/50 px-3.5 py-1.5 rounded-xl border border-sand">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-mono text-xs font-bold text-charcoal">4.9 / 5.0</span>
              </div>

              {/* Algiers Bab Ezzouar Location */}
              <div className="flex items-center gap-1.5 bg-sand/50 px-3.5 py-1.5 rounded-xl border border-sand">
                <MapPin className="w-3.5 h-3.5 text-gold" />
                <span className="font-sans text-xs font-semibold text-charcoal">
                  {isAr ? 'باب الزوار، الجزائر' : 'Bab Ezzouar, Alger'}
                </span>
              </div>
            </div>

            {/* CTA Group */}
            <div className="flex flex-wrap gap-4 w-full sm:w-auto">
              <button
                id="hero-courses-btn"
                onClick={() => onNavigate('courses')}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-charcoal text-cream hover:bg-gold hover:text-cream font-sans font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer text-base"
              >
                <span>{isAr ? 'تصفح دليل الدورات' : 'Découvrir nos formations'}</span>
                <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
              </button>

              <button
                id="hero-contact-btn"
                onClick={() => onNavigate('contact')}
                className="flex items-center justify-center gap-2 px-6 py-4 bg-sand hover:bg-sand/80 text-charcoal font-sans font-medium rounded-xl transition-all duration-300 cursor-pointer text-base border border-sand"
              >
                <span>{isAr ? 'تواصل معنا' : 'Nous contacter'}</span>
              </button>
            </div>

            {/* Students Join avatar row */}
            <div className="flex items-center gap-3 pt-4">
              <div className="flex -space-x-3 rtl:space-x-reverse">
                <img className="inline-block h-10 w-10 rounded-full ring-2 ring-cream object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop" alt="Student" />
                <img className="inline-block h-10 w-10 rounded-full ring-2 ring-cream object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop" alt="Student" />
                <img className="inline-block h-10 w-10 rounded-full ring-2 ring-cream object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop" alt="Student" />
                <div className="flex items-center justify-center h-10 w-10 rounded-full ring-2 ring-cream bg-gold text-cream font-mono text-xs font-bold">
                  +180
                </div>
              </div>
              <p className="font-sans text-xs text-charcoal/60">
                {isAr ? 'طالب مبدع تخرّج وانطلق في العمل معنا هذا العام' : 'étudiants créatifs formés et actifs cette année'}
              </p>
            </div>

          </div>

          {/* Hero Interactive Floating Cards (Right Side) */}
          <div className="lg:col-span-5 relative h-[450px] sm:h-[500px] flex items-center justify-center">
            
            {/* Visual background rings */}
            <div className="absolute w-[350px] h-[350px] border border-charcoal/5 rounded-full" />
            <div className="absolute w-[240px] h-[240px] border border-gold/10 rounded-full animate-spin-slow" />

            {/* Floating Card 1: Couture (Perspective tilt left) */}
            <div 
              id="hero-floating-card-1"
              onClick={() => onSelectCourse(COURSES[0])}
              className="absolute top-8 left-4 sm:left-8 w-64 p-4 rounded-2xl glass-panel shadow-xl border border-white/60 hover:border-gold/30 hover:scale-105 transition-all duration-500 cursor-pointer group z-20 hover:-translate-y-2"
              style={{ transform: 'rotate(-4deg)' }}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="px-2 py-1 bg-purple-accent/10 text-purple-accent font-mono text-[9px] font-bold uppercase rounded-md">
                  {isAr ? 'حرف وأزياء' : 'Couture'}
                </span>
                <span className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                  <Star className="w-3 h-3 fill-current" />
                  4.9
                </span>
              </div>
              <h3 className="font-display font-bold text-sm text-charcoal mb-1 leading-snug group-hover:text-gold transition-colors duration-300">
                {isAr ? 'الخياطة وتفصيل الملابس' : 'Couture & Modélisme'}
              </h3>
              <p className="font-sans text-[11px] text-charcoal/60 mb-3 line-clamp-2">
                {isAr ? 'تعلم أخذ المقاسات ورسم الباترونات والقص الاحترافي' : 'Maîtriser la coupe de tissu, les patrons et l\'assemblage.'}
              </p>
              <div className="flex items-center justify-between border-t border-charcoal/5 pt-2.5">
                <span className="font-mono text-xs text-charcoal/40">{isAr ? '3 أشهر' : '3 Mois'}</span>
                <span className="font-mono text-xs font-bold text-purple-accent">18000 DA</span>
              </div>
            </div>

            {/* Floating Card 2: Stylisme (Perspective tilt right, centered) */}
            <div 
              id="hero-floating-card-2"
              onClick={() => onSelectCourse(COURSES[1])}
              className="absolute top-44 right-2 sm:right-6 w-64 p-4 rounded-2xl bg-charcoal text-cream shadow-2xl border border-charcoal/50 hover:scale-105 hover:border-gold/50 transition-all duration-500 cursor-pointer group z-30 hover:-translate-y-2"
              style={{ transform: 'rotate(3deg)' }}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 font-mono text-[9px] font-bold uppercase rounded-md border border-emerald-500/20">
                  {isAr ? 'تصميم وموضة' : 'Stylisme'}
                </span>
                <span className="flex items-center gap-1 text-emerald-400 text-xs font-bold">
                  <Zap className="w-3 h-3 fill-current" />
                  {isAr ? 'شائع' : 'Populaire'}
                </span>
              </div>
              <h3 className="font-display font-bold text-sm text-cream mb-1 leading-snug group-hover:text-gold transition-colors duration-300">
                {isAr ? 'تصميم الملابس والأزياء' : 'Design de Mode & Stylisme'}
              </h3>
              <p className="font-sans text-[11px] text-cream/60 mb-3 line-clamp-2">
                {isAr ? 'رسم المانيكان، تنسيق الألوان، وابتكار المجموعات' : 'Croquis de silhouettes de mode et étude de collections.'}
              </p>
              <div className="flex items-center justify-between border-t border-white/5 pt-2.5">
                <span className="font-mono text-xs text-cream/40">{isAr ? '3 أشهر' : '3 Mois'}</span>
                <span className="font-mono text-xs font-bold text-emerald-400">24000 DA</span>
              </div>
            </div>

            {/* Floating Card 3: Coiffure (Skewed bottom left) */}
            <div 
              id="hero-floating-card-3"
              onClick={() => onSelectCourse(COURSES[2])}
              className="absolute bottom-6 left-8 sm:left-14 w-60 p-4 rounded-2xl glass-panel shadow-lg border border-white/60 hover:border-gold/30 hover:scale-105 transition-all duration-500 cursor-pointer group z-10 hover:-translate-y-2"
              style={{ transform: 'rotate(-2deg)' }}
            >
              <div className="flex items-start justify-between mb-2">
                <span className="px-2 py-0.5 bg-amber-500/10 text-amber-600 font-mono text-[9px] font-bold uppercase rounded-md">
                  {isAr ? 'جمال وتصفيف' : 'Coiffure'}
                </span>
              </div>
              <h4 className="font-display font-bold text-xs text-charcoal mb-1 leading-snug group-hover:text-gold transition-colors duration-300">
                {isAr ? 'قص وتسريح وتصفيف الشعر والصبغات' : 'Coiffure, Coupe & Visagisme'}
              </h4>
              <div className="flex items-center justify-between mt-2.5 text-[10px]">
                <span className="font-mono text-charcoal/40">{isAr ? 'شهرين' : '2 Mois'}</span>
                <span className="font-mono font-bold text-amber-600">16000 DA</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
