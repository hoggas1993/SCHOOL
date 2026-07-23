import React from 'react';
import { motion } from 'motion/react';
import { Linkedin, Facebook, Instagram, Share2, ExternalLink } from 'lucide-react';
import { useToast } from './Toast';

interface SocialFollowProps {
  lang: 'ar' | 'fr';
}

export default function SocialFollow({ lang }: SocialFollowProps) {
  const isAr = lang === 'ar';
  const { addToast } = useToast();

  const handleShare = async () => {
    const shareData = {
      title: 'Rafa School',
      text: isAr ? 'مدرسة رافا - تكوين مهني وحرفي وتكنولوجي متميز بالجزائر' : 'Rafa School - Formation professionnelle et technologique d\'excellence en Algérie',
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        addToast(
          '🔄 تم فتح واجهة المشاركة بنجاح!',
          '🔄 Fenêtre de partage ouverte avec succès !',
          'success'
        );
      } else {
        await navigator.clipboard.writeText(window.location.href);
        addToast(
          '📋 تم نسخ رابط الموقع إلى الحافظة!',
          '📋 Lien du site copié dans le presse-papiers !',
          'success'
        );
      }
    } catch (err) {
      // User cancelled share or other issue
      addToast(
        '📋 تم نسخ رابط الموقع لمشاركته مع أصدقائك!',
        '📋 Lien du site copié pour le partager !',
        'info'
      );
      try {
        await navigator.clipboard.writeText(window.location.href);
      } catch {}
    }
  };

  const platforms = [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/company/rafaschool',
      icon: Linkedin,
      color: 'bg-[#0077b5]/10 hover:bg-[#0077b5] text-[#0077b5] hover:text-cream',
      borderColor: 'border-[#0077b5]/20 hover:border-[#0077b5]',
      handle: 'rafa-school-dz',
      labelAr: 'لينكد إن',
      labelFr: 'LinkedIn',
      descAr: 'شبكة التواصل المهني والتوظيف',
      descFr: 'Réseau pro & opportunités',
    },
    {
      name: 'Facebook',
      url: 'https://facebook.com/rafaschool',
      icon: Facebook,
      color: 'bg-[#1877f2]/10 hover:bg-[#1877f2] text-[#1877f2] hover:text-cream',
      borderColor: 'border-[#1877f2]/20 hover:border-[#1877f2]',
      handle: 'Rafa School',
      labelAr: 'فيسبوك',
      labelFr: 'Facebook',
      descAr: 'أحدث إعلانات الدورات والفعاليات',
      descFr: 'Actualités & événements',
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/rafaschool25',
      icon: Instagram,
      color: 'bg-[#e1306c]/10 hover:bg-[#e1306c] text-[#e1306c] hover:text-cream',
      borderColor: 'border-[#e1306c]/20 hover:border-[#e1306c]',
      handle: '@rafaschool25',
      labelAr: 'إنستغرام',
      labelFr: 'Instagram',
      descAr: 'كواليس المدرسة ويوميات الطلاب',
      descFr: 'Coulisses & vie étudiante',
    },
  ];

  return (
    <div id="social-follow-section" className="w-full py-10 bg-sand/15 border-t border-b border-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          
          {/* Header Texts */}
          <div className="max-w-md">
            <h3 className="font-display font-black text-lg sm:text-xl text-charcoal leading-snug">
              {isAr ? 'تواصل وتفاعل معنا مهنياً واجتماعياً' : 'Suivez-nous sur les réseaux sociaux'}
            </h3>
            <p className="font-sans text-xs text-charcoal/60 mt-1.5 leading-relaxed">
              {isAr 
                ? 'انضم إلى مجتمعاتنا عبر شبكات التواصل لمتابعة مستجدات التعليم التقني والفرص المهنية الحصرية وكواليس معسكراتنا.'
                : 'Rejoignez nos communautés actives pour découvrir les coulisses de l\'école, les projets d\'étudiants et les opportunités d\'emploi.'}
            </p>
          </div>

          {/* Social Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full lg:w-auto lg:flex-grow max-w-4xl">
            {platforms.map((platform) => {
              const Icon = platform.icon;
              return (
                <motion.a
                  id={`social-follow-${platform.name.toLowerCase()}`}
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4 }}
                  className={`group flex items-center gap-4 p-4 rounded-2xl bg-cream border ${platform.borderColor} transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer`}
                >
                  {/* Styled Icon Wrapper */}
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${platform.color}`}>
                    <Icon className="w-5 h-5 stroke-[2]" />
                  </div>

                  {/* Context Info */}
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="font-display font-black text-xs sm:text-sm text-charcoal tracking-tight">
                        {isAr ? platform.labelAr : platform.labelFr}
                      </span>
                      <ExternalLink className="w-3 h-3 text-charcoal/30 group-hover:text-charcoal/70 transition-colors opacity-0 group-hover:opacity-100" />
                    </div>
                    <span className="font-mono text-[10px] text-charcoal/40 block leading-tight truncate mt-0.5">
                      {platform.handle}
                    </span>
                    <span className="font-sans text-[10px] text-charcoal/50 block leading-normal mt-1">
                      {isAr ? platform.descAr : platform.descFr}
                    </span>
                  </div>
                </motion.a>
              );
            })}
          </div>

          {/* Share website action */}
          <div className="shrink-0 w-full lg:w-auto">
            <button
              id="social-share-website-btn"
              onClick={handleShare}
              className="w-full lg:w-auto px-5 py-3.5 bg-charcoal hover:bg-gold text-cream hover:text-cream rounded-2xl font-sans text-xs font-black tracking-wider uppercase transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 shadow-sm"
            >
              <Share2 className="w-4 h-4" />
              <span>{isAr ? 'مشاركة موقع المدرسة' : 'Partager le site'}</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
