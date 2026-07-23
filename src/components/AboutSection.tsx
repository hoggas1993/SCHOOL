import React from 'react';
import { Award, Users, BookOpen, Target, Sparkles, Star, ShieldCheck } from 'lucide-react';
import { INSTRUCTORS } from '../data';

interface AboutSectionProps {
  lang: 'ar' | 'fr';
}

export default function AboutSection({ lang }: AboutSectionProps) {
  const isAr = lang === 'ar';

  const stats = [
    {
      value: '2,500+',
      labelAr: 'خريج متميز',
      labelFr: 'Diplômés qualifiés',
      descAr: 'اقتحموا سوق الشغل أو أسسوا مشاريعهم',
      descFr: 'Intégrés avec succès sur le marché',
      icon: Users,
    },
    {
      value: '15+',
      labelAr: 'دورة معتمدة',
      labelFr: 'Formations certifiées',
      descAr: 'تغطي الحرف والتقنيات العصرية',
      descFr: 'Programmes théoriques et de terrain',
      icon: BookOpen,
    },
    {
      value: '98%',
      labelAr: 'نسبة الرضا والنجاح',
      labelFr: 'Taux de satisfaction',
      descAr: 'توجيه ومتابعة فردية لضمان التفوق',
      descFr: 'Accompagnement individualisé garanti',
      icon: Target,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 animate-fade-in">
      
      {/* 1. Header Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-brand-deep to-brand-royal text-cream p-8 sm:p-12 md:p-16 shadow-xl border border-brand-royal/20">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="relative max-w-3xl space-y-4">
          <span className="font-mono text-xs font-bold text-brand-sky uppercase tracking-widest block bg-white/10 px-3 py-1 rounded-full w-fit">
            {isAr ? 'قصتنا ورؤيتنا' : 'NOTRE HISTOIRE & NOTRE MISSION'}
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
            {isAr ? (
              <>مدرسة رافا: صناعة <span className="text-brand-sky">قادة الغد</span> المبدعين والحرفيين في الجزائر</>
            ) : (
              <>Rafa School : Façonner <span className="text-brand-sky">les talents</span> et les professionnels de demain</>
            )}
          </h1>
          <p className="font-sans text-sm sm:text-base md:text-lg text-white/80 leading-relaxed">
            {isAr ? (
              'تأسست مدرسة رافا كمركز تدريب مهني معتمد (رقم الاعتماد: 014/25) لتقديم بديل تعليمي يجمع بين عمق المعرفة ونبل الحرفة وسرعة الابتكار التكنولوجي. نسعى لتمكين الشباب والنساء والحرفيين من مهارات حقيقية تجعلهم مستقلين مادياً وقادرين على الابتكار والمنافسة.'
            ) : (
              'Agréée par le Ministère de la Formation Professionnelle (N° 014/25), Rafa School est née de l\'ambition d\'offrir un enseignement pratique et immersif. Nous formons les esprits créatifs, les artisans et les techniciens aux exigences réelles des entreprises et du freelancing.'
            )}
          </p>
        </div>
      </div>

      {/* 2. Brand Core Values */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="font-mono text-xs font-bold text-brand-deep uppercase tracking-widest block">
              {isAr ? 'قيمنا التوجيهية' : 'NOS VALEURS FONDAMENTALES'}
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-charcoal">
              {isAr ? 'كيف نحدث الفرق في رحلتك التعليمية؟' : 'Comment nous faisons la différence ?'}
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-deep/10 text-brand-deep flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm sm:text-base text-charcoal">
                  {isAr ? 'الاعتماد والاعتراف الرسمي للدولة' : 'Diplômes Agréés par l\'État'}
                </h4>
                <p className="font-sans text-xs sm:text-sm text-charcoal/60 mt-1">
                  {isAr ? 'جميع شهاداتنا معترف بها رسمياً وتساعدك على الحصول على بطاقة حرفي، أو تمويلات بنكية (ANGEM/ANADE) لبدء مشروعك.' : 'Toutes nos formations longues sont couronnées par des attestations et diplômes officiels facilitant l\'obtention de cartes d\'artisans et financements.'}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-brand-deep/10 text-brand-deep flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm sm:text-base text-charcoal">
                  {isAr ? 'التميز التطبيقي (لا نظريات جوفاء)' : 'Pratique Directe de Terrain'}
                </h4>
                <p className="font-sans text-xs sm:text-sm text-charcoal/60 mt-1">
                  {isAr ? 'نؤمن أن الحرفة تُكتسب باليد لا بالعين. نوفر لك الأقمشة، ماكينات الخياطة الصناعية الحديثة، معدات الإضاءة، وحواسيب مجهزة.' : 'Nous croyons que le savoir s\'acquiert par le geste. Nous fournissons tous les équipements de pointe nécessaires à vos séances de travaux pratiques.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-4/3 group">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80"
            alt="Students collaborating"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/80 via-transparent to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6 text-white p-2">
            <span className="font-mono text-[10px] text-brand-sky font-bold block mb-1">
              {isAr ? 'بيئة تعاونية' : 'ENVIRONNEMENT COLLABORATIF'}
            </span>
            <p className="font-display font-semibold text-sm sm:text-base">
              {isAr ? 'نشجع الطلاب على تبادل الخبرات وإطلاق مبادرات مشتركة' : 'Nous stimulons l\'émulation positive et le travail d\'équipe.'}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Stat Grid */}
      <section className="bg-brand-sky/5 rounded-3xl p-8 sm:p-12 border border-brand-sky/15">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x md:divide-brand-sky/20 rtl:divide-x-reverse">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="pt-6 md:pt-0 first:pt-0 space-y-2 flex flex-col items-center">
                <div className="w-12 h-12 rounded-2xl bg-brand-deep text-cream flex items-center justify-center mb-2 shadow-md">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="font-display font-black text-3xl sm:text-4xl text-brand-deep">
                  {stat.value}
                </div>
                <h4 className="font-display font-bold text-sm text-charcoal">
                  {isAr ? stat.labelAr : stat.labelFr}
                </h4>
                <p className="font-sans text-xs text-charcoal/50 max-w-xs">
                  {isAr ? stat.descAr : stat.descFr}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Executive Mentors / Our Team Section */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <span className="font-mono text-xs font-bold text-brand-deep uppercase tracking-widest block">
            {isAr ? 'طاقم التدريب المتميز' : 'CORPS ENSEIGNANT DE HAUT NIVEAU'}
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-charcoal">
            {isAr ? 'خبراء مكرسون لنقل مهاراتهم الحقيقية إليك' : 'Apprenez auprès de professionnels accomplis'}
          </h2>
          <p className="font-sans text-xs sm:text-sm text-charcoal/60 max-w-xl mx-auto">
            {isAr ? 'نحن لا نوظف مدربين أكاديميين فقط، بل خبراء ممارسين للمهنة يومياً ولديهم باع طويل في السوق لمرافقتك.' : 'Nos formateurs ne sont pas de simples enseignants théoriques, ce sont des professionnels en activité qui partagent leurs secrets du métier.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
          {INSTRUCTORS.map((instructor) => (
            <div 
              key={instructor.id}
              className="bg-cream rounded-3xl border border-sand/60 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-square">
                <img
                  src={instructor.avatar}
                  alt={isAr ? instructor.nameAr : instructor.nameFr}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-xs font-bold text-amber-500 shadow-sm">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{instructor.rating}</span>
                  <span className="text-charcoal/40 font-normal">({instructor.reviewsCount})</span>
                </div>
              </div>

              <div className="p-6 flex-grow space-y-3 flex flex-col justify-between">
                <div className="space-y-1">
                  <h3 className="font-display font-extrabold text-base sm:text-lg text-charcoal">
                    {isAr ? instructor.nameAr : instructor.nameFr}
                  </h3>
                  <p className="font-mono text-[10px] sm:text-xs text-brand-deep font-bold uppercase tracking-wide">
                    {isAr ? instructor.roleAr : instructor.roleFr}
                  </p>
                </div>
                
                <p className="font-sans text-xs text-charcoal/60 leading-relaxed pt-2 border-t border-sand/40">
                  {isAr ? instructor.bioAr : instructor.bioFr}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
