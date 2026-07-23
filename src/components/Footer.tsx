import React, { useState } from 'react';
import { Award, ArrowRight, Heart, Loader, ShieldCheck } from 'lucide-react';
import Logo from './Logo';
import SocialFollow from './SocialFollow';

interface FooterProps {
  lang: 'ar' | 'fr';
  setActiveTab: (tab: string) => void;
  onOpenRegister: () => void;
}

export default function Footer({ lang, setActiveTab, onOpenRegister }: FooterProps) {
  const isAr = lang === 'ar';
  
  // Newsletter Subscribe states
  const [email, setEmail] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      setEmail('');
    }, 1200);
  };

  const footerLinks = [
    { id: 'home', labelAr: 'الرئيسية', labelFr: 'Accueil' },
    { id: 'courses', labelAr: 'دليل الدورات', labelFr: 'Nos Cursus' },
    { id: 'about', labelAr: 'من نحن وقيمنا', labelFr: 'À Propos de Nous' },
    { id: 'certifications', labelAr: 'الشهادات والاعتمادات', labelFr: 'Certifications & Tarifs' },
    { id: 'portal', labelAr: 'بوابة المتابعة للطلاب', labelFr: 'Portail Étudiants' },
    { id: 'contact', labelAr: 'تواصل معنا', labelFr: 'Nous Contacter' },
  ];

  return (
    <footer className="bg-sand/30 border-t border-sand pt-0 pb-8 transition-all duration-300">
      {/* Professional Social Media follow banner */}
      <SocialFollow lang={lang} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-sand">
          
          {/* Column 1: Brand details */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center">
              <Logo className="h-12 w-auto" />
            </div>
            
            <p className="font-sans text-xs sm:text-sm text-charcoal/60 leading-relaxed max-w-sm">
              {isAr ? (
                'مؤسسة معتمدة من قبل وزارة التكوين والتعليم المهنيين (رقم الاعتماد: 014/25). نسعى جاهدين لتقديم تكوين مهني وحرفي وتكنولوجي متميز يؤهلك مباشرة لولوج عالم الشغل أو إطلاق مشروعك الخاص بنجاح.'
              ) : (
                'Établissement agréé par le Ministère de la Formation et de l\'Enseignement Professionnels (Agrément N°: 014/25). Nous vous accompagnons dans l\'acquisition de compétences techniques et pratiques de haut niveau.'
              )}
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-mono text-xs font-bold text-gold uppercase tracking-wider">
              {isAr ? 'روابط سريعة' : 'NAVIGATION'}
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.id}>
                  <button
                    id={`footer-nav-link-${link.id}`}
                    onClick={() => setActiveTab(link.id)}
                    className="font-sans text-xs sm:text-sm text-charcoal/70 hover:text-gold transition-colors duration-300 cursor-pointer text-left rtl:text-right"
                  >
                    {isAr ? link.labelAr : link.labelFr}
                  </button>
                </li>
              ))}
              <li>
                <button
                  id="footer-nav-link-register"
                  onClick={onOpenRegister}
                  className="font-sans text-xs sm:text-sm text-charcoal font-semibold hover:text-gold transition-colors duration-300 cursor-pointer text-left rtl:text-right"
                >
                  {isAr ? 'حجز مقعد دراسي' : 'S\'inscrire aux sessions'}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Newsletter Form */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-mono text-xs font-bold text-gold uppercase tracking-wider">
              {isAr ? 'النشرة الإخبارية الإبداعية' : 'NEWSLETTER CRÉATIVE'}
            </h4>
            <p className="font-sans text-xs text-charcoal/60 leading-relaxed">
              {isAr ? (
                'احصل على إرشادات التصميم المجانية وآخر أخبار المعسكرات والورشات التدريبية المباشرة.'
              ) : (
                'Recevez chaque mois nos tutoriels, guides de design gratuits et les annonces de nos nouveaux bootcamps.'
              )}
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <input
                  id="footer-email-input"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={isAr ? 'أدخل بريدك الإلكتروني...' : 'Ex: jean@email.com'}
                  className="flex-grow px-3.5 py-2.5 bg-sand border border-sand-dark/10 rounded-xl font-sans text-xs text-charcoal focus:outline-none focus:border-gold transition-colors duration-300"
                />
                <button
                  id="footer-subscribe-btn"
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2.5 bg-charcoal hover:bg-gold hover:text-cream text-cream rounded-xl font-sans text-xs font-bold transition-all duration-300 cursor-pointer flex items-center justify-center disabled:opacity-50"
                >
                  {submitting ? (
                    <Loader className="w-4 h-4 animate-spin" />
                  ) : (
                    <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
                  )}
                </button>
              </div>

              {success && (
                <p className="font-sans text-[11px] text-emerald-600 mt-1">
                  {isAr ? 'تم الاشتراك بنجاح، تفقد بريدك الوارد قريباً!' : 'Inscription réussie ! Merci de nous suivre.'}
                </p>
              )}
            </form>
          </div>

        </div>

        {/* SEO Google Indexing Compliance Banner */}
        <div id="footer-seo-compliance-banner" className="mt-8 p-5 bg-white border border-sand rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5.5 h-5.5" />
            </div>
            <div className="space-y-1">
              <p className="font-display font-extrabold text-charcoal text-xs sm:text-sm">
                {isAr ? 'بنية برمجية معتمدة ومتوافقة بالكامل مع محركات البحث (Google SEO)' : 'Architecture Technique Conforme aux Standards d\'Indexation Google'}
              </p>
              <p className="font-sans text-[11px] text-charcoal/60 leading-relaxed">
                {isAr 
                  ? 'تمت هندسة البنية الشاملة لموقع مدرسة رافا لتتوافق كلياً مع أحدث معايير الأرشفة لمحرك بحث Google (مؤشرات الأداء الأساسية للويب، بيانات منظمة، توافق كامل للهواتف) لضمان الأرشفة الفورية وتصدر قائمة أفضل معاهد ومواقع التكوين المهني المعتمدة بالجزائر.'
                  : 'L\'architecture globale du site de Rafa School est entièrement optimisée selon les standards d\'indexation Google (Core Web Vitals, métadonnées sémantiques, compatibilité mobile) pour garantir un référencement optimal et assurer un classement d\'excellence parmi les meilleurs instituts de formation professionnelle en Algérie.'}
              </p>
            </div>
          </div>
          <div className="shrink-0 flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1.5 rounded-xl font-mono text-[10px] font-bold self-end md:self-auto">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Google Index Ready</span>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Location metadata */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 text-[11px] text-charcoal/40 font-sans gap-4">
          <p>
            &copy; 2026 {isAr ? 'مدرسة رافا - حي بوسحاقي، باب الزوار، الجزائر. جميع الحقوق محفوظة. رقم الاعتماد: 014/25' : 'Rafa School - Cité Boushaki, Bab Ezzouar, Alger. Tous droits réservés. Agrément N°: 014/25'}
          </p>
          <div className="flex items-center gap-1">
            <span>{isAr ? 'صُنع بكل حب في الجزائر' : 'Conçu avec passion à Alger'}</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-current animate-pulse" />
          </div>
        </div>

      </div>
    </footer>
  );
}
