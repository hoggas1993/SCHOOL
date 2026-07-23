import React from 'react';
import { Award, CheckCircle, FileText, Check, Landmark, GraduationCap, Percent, BadgeCheck, HelpCircle } from 'lucide-react';
import { COURSES } from '../data';

interface CertificationsSectionProps {
  lang: 'ar' | 'fr';
  onSelectCourse: (courseId: string) => void;
}

export default function CertificationsSection({ lang, onSelectCourse }: CertificationsSectionProps) {
  const isAr = lang === 'ar';

  const steps = [
    {
      titleAr: 'التسجيل الأولي واختيار الدورة',
      titleFr: 'Inscription & Sélection',
      descAr: 'املأ نموذج التسجيل عبر الإنترنت أو تفضل بزيارة مدرستنا في باب الزوار لتأكيد حجز مقعدك.',
      descFr: 'Remplissez le formulaire en ligne ou visitez notre école à Bab Ezzouar pour valider votre dossier.',
    },
    {
      titleAr: 'التكوين التطبيقي والتقييم المستمر',
      titleFr: 'Pratique & Évaluation Continue',
      descAr: 'باشر حضور الورش الحية مع الأساتذة المحترفين، مع تقييم تطبيقي مستمر لكل تمرين لتطوير مهاراتك بشكل متسارع.',
      descFr: 'Assistez aux ateliers de terrain avec nos mentors et validez chaque module par des livrables concrets.',
    },
    {
      titleAr: 'مشروع التخرج والتحكيم',
      titleFr: 'Projet de Fin d\'Études',
      descAr: 'صمم مشروعك الخاص المتكامل (مجموعة أزياء، موقع ويب متكامل، أو خطة أمن صناعي) واعرضه أمام اللجنة المهنية.',
      descFr: 'Réalisez un projet complet autonome et présentez-le devant un jury d\'experts chevronnés.',
    },
    {
      titleAr: 'استلام الشهادة وبدء المشروع',
      titleFr: 'Remise du Diplôme & Lancement',
      descAr: 'احصل على شهادتك المعتمدة رسمياً، والتي تتيح لك التسجيل في سجل الحرفيين وإطلاق مشروعك الخاص.',
      descFr: 'Récupérez votre attestation agréée pour demander votre carte d\'artisan ou lancer votre entreprise.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 animate-fade-in">
      
      {/* 1. Official Credentials Hero */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-deep/10 text-brand-deep rounded-full font-mono text-xs font-bold uppercase tracking-wider">
          <Landmark className="w-4 h-4" />
          <span>{isAr ? 'اعتماد وزاري رسمي' : 'AGRÉMENT OFFICIEL DE L\'ÉTAT'}</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-charcoal">
          {isAr ? 'شهادات تفتح لك الأبواب وتضمن مستقبلك المهني' : 'Des certifications reconnues pour valoriser vos compétences'}
        </h1>
        <p className="font-sans text-xs sm:text-sm md:text-base text-charcoal/60 leading-relaxed">
          {isAr ? (
            'مدرسة رافا للتعليم والتكوين المهنيين مؤسسة معتمدة رسمياً برقم 014/25. لا نمنحك مجرد ورقة، بل نؤهلك عملياً ونمنحك سنداً قانونياً معترفاً به لدى كافة الإدارات ومؤسسات الدعم الوطنية (ANGEM / ANADE) لمباشرة عملك والتميز فيه.'
          ) : (
            'Rafa School est un établissement d\'enseignement agréé par l\'État algérien (Agrément N° 014/25). Nos attestations ouvrent des opportunités concrètes et sont éligibles aux dossiers d\'aide à l\'entrepreneuriat national.'
          )}
        </p>
      </section>

      {/* 2. Grid of Diplomas details */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card 1 */}
        <div className="p-6 sm:p-8 bg-brand-deep text-cream rounded-3xl space-y-6 shadow-lg relative overflow-hidden border border-brand-royal/20">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-sky/10 rounded-full blur-2xl"></div>
          
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 rounded-2xl bg-white/15 text-white flex items-center justify-center">
              <GraduationCap className="w-6 h-6" />
            </div>
            <span className="font-mono text-[10px] bg-brand-sky/20 text-brand-sky font-extrabold px-3 py-1 rounded-full uppercase tracking-widest">
              {isAr ? 'مسار طويل' : 'Cursus Certifiant'}
            </span>
          </div>

          <div className="space-y-2">
            <h3 className="font-display font-black text-xl sm:text-2xl text-white">
              {isAr ? 'شهادة التكوين المهني المعتمدة' : 'Attestation de Formation Agréée'}
            </h3>
            <p className="font-sans text-xs text-cream/70 leading-relaxed">
              {isAr ? 'تُمنح للطلاب المسجلين في دوراتنا الطويلة (3 أشهر فما فوق) بعد استيفاء الحضور وإنجاز مشروع التخرج بنجاح.' : 'Délivrée à l\'issue des cursus intensifs après contrôle continu et validation finale d\'un projet devant le jury de l\'école.'}
            </p>
          </div>

          <ul className="space-y-2.5 text-xs sm:text-sm border-t border-white/10 pt-4">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-brand-sky shrink-0" />
              <span>{isAr ? 'معترف بها لدى الغرفة الوطنية للصناعات التقليدية والحرف' : 'Éligible pour l\'obtention de la carte d\'artisan'}</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-brand-sky shrink-0" />
              <span>{isAr ? 'تؤهل لملفات الدعم والتمويل الحكومي لبدء المشاريع' : 'Valide pour les dossiers d\'aide de financement (ANGEM, ANADE)'}</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-brand-sky shrink-0" />
              <span>{isAr ? 'توثيق وتصديق رسمي من مديرية التكوين المهني' : 'Enregistrée officiellement auprès de la DFP'}</span>
            </li>
          </ul>
        </div>

        {/* Card 2 */}
        <div className="p-6 sm:p-8 bg-cream border border-brand-sky/20 rounded-3xl space-y-6 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-sky/5 rounded-full blur-2xl"></div>
          
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 rounded-2xl bg-brand-deep/10 text-brand-deep flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <span className="font-mono text-[10px] bg-brand-deep/10 text-brand-deep font-extrabold px-3 py-1 rounded-full uppercase tracking-widest">
              {isAr ? 'مسار مكثف' : 'Séminaire & Masterclass'}
            </span>
          </div>

          <div className="space-y-2">
            <h3 className="font-display font-black text-xl sm:text-2xl text-charcoal">
              {isAr ? 'شهادة تأهيل مهنية وبطاقة حرفية' : 'Certificat de Compétence Technique'}
            </h3>
            <p className="font-sans text-xs text-charcoal/60 leading-relaxed">
              {isAr ? 'تُمنح للمشاركين في الورشات التخصصية والندوات التطبيقية المكثفة التي تركز على مهارات عملية محددة وسريعة.' : 'Attribuée après des ateliers et bootcamps de perfectionnement ciblés sur des techniques professionnelles spécifiques.'}
            </p>
          </div>

          <ul className="space-y-2.5 text-xs sm:text-sm border-t border-sand pt-4">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-brand-deep shrink-0" />
              <span>{isAr ? 'تركز بالكامل على التطبيق الميداني الفوري لمهارة واحدة' : 'Focus à 100% sur des cas réels d\'application immédiate'}</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-brand-deep shrink-0" />
              <span>{isAr ? 'مثالية للمحترفين الراغبين في ترقية وتطوير مهاراتهم السابقة' : 'Parfait pour la mise à niveau rapide des salariés et indépendants'}</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-brand-deep shrink-0" />
              <span>{isAr ? 'توقيع معتمد من كبار الخبراء الممارسين ذوي الباع الطويل' : 'Signée par nos experts formateurs agréés de renom'}</span>
            </li>
          </ul>
        </div>
      </section>

      {/* 3. The Graduation Journey (Vertical Timeline) */}
      <section className="space-y-10">
        <div className="text-center space-y-2">
          <span className="font-mono text-xs font-bold text-brand-deep uppercase tracking-widest block">
            {isAr ? 'مسار النجاح الأكاديمي' : 'LE CHEMINEMENT VERS LE DIPLÔME'}
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-charcoal">
            {isAr ? 'كيف تبدو رحلتك معنا من التسجيل إلى الاحتراف؟' : 'Votre parcours en 4 étapes claires'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {steps.map((step, i) => (
            <div key={i} className="p-6 bg-cream border border-sand/60 rounded-2xl relative space-y-3 shadow-xs">
              <div className="w-8 h-8 rounded-full bg-brand-deep text-cream flex items-center justify-center font-mono font-bold text-xs shadow-md">
                0{i + 1}
              </div>
              <h4 className="font-display font-bold text-sm sm:text-base text-charcoal">
                {isAr ? step.titleAr : step.titleFr}
              </h4>
              <p className="font-sans text-xs text-charcoal/60 leading-relaxed">
                {isAr ? step.descAr : step.descFr}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Pricing / Cost transparency breakdown */}
      <section className="bg-sand/35 rounded-3xl p-8 sm:p-12 border border-sand">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="font-mono text-xs font-bold text-brand-deep uppercase tracking-widest block">
              {isAr ? 'تكاليف شفافة بدون رسوم خفية' : 'STRUCTURE TARIFAIRE TRANSPARENTE'}
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-charcoal">
              {isAr ? 'كم تبلغ تكلفة الاستثمار في مستقبلك؟' : 'Investir intelligemment dans votre carrière'}
            </h2>
            <p className="font-sans text-xs sm:text-sm text-charcoal/60">
              {isAr ? 'نقدم أفضل جودة تكوين وتجهيز كامل في الجزائر بأسعار مدروسة ومتاحة للجميع مع إمكانية الدفع على دفعات.' : 'Nos tarifs sont étudiés au plus juste pour garantir un accès maximal tout en maintenant des conditions d\'apprentissage premium.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {COURSES.map((course) => (
              <div 
                key={course.id}
                className="bg-cream p-6 rounded-2xl border border-sand shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow duration-300"
              >
                <div className="space-y-4">
                  <span className="font-mono text-[9px] font-bold text-brand-deep uppercase tracking-wider bg-brand-deep/5 px-2.5 py-1 rounded-full block w-fit">
                    {course.category.toUpperCase()}
                  </span>
                  
                  <h4 className="font-display font-bold text-xs sm:text-sm text-charcoal line-clamp-2 min-h-10">
                    {isAr ? course.titleAr : course.titleFr}
                  </h4>

                  <div className="pt-2 border-t border-sand/40">
                    <span className="font-display font-extrabold text-lg sm:text-xl text-brand-deep">
                      {course.price.toLocaleString()} {isAr ? course.currencyAr : course.currencyFr}
                    </span>
                    <span className="text-[10px] text-charcoal/40 block">
                      {isAr ? `المدة: ${course.durationAr}` : `Durée : ${course.durationFr}`}
                    </span>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => onSelectCourse(course.id)}
                    className="w-full py-2 bg-brand-deep hover:bg-brand-medium text-cream font-sans text-xs font-bold rounded-xl transition-all duration-300 cursor-pointer"
                  >
                    {isAr ? 'تفاصيل الدورة' : 'Voir le cursus'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Special Corporate and discount banner */}
          <div className="bg-brand-deep text-cream p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-brand-royal/20">
            <div className="space-y-1 text-center sm:text-left rtl:sm:text-right">
              <h4 className="font-display font-bold text-sm sm:text-base text-white">
                {isAr ? '٪15 خصم للتسجيل الجماعي ودفع مسبق' : '15% de réduction pour les inscriptions de groupe'}
              </h4>
              <p className="font-sans text-xs text-cream/70">
                {isAr ? 'هل أنتم مجموعة من الأصدقاء أو الطلبة؟ اتصلوا بنا للحصول على خصومات مميزة وتسهيلات دفع.' : 'Profitez de remises exclusives pour les groupes d\'amis, d\'étudiants ou les entreprises partenaires.'}
              </p>
            </div>
            <div className="shrink-0 flex items-center gap-1.5 bg-white/10 px-4 py-2 rounded-xl text-xs font-mono font-bold">
              <Percent className="w-4 h-4 text-brand-sky" />
              <span>{isAr ? 'تخفيض خاص' : 'CODE: GROUP15'}</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
