import React, { useState } from 'react';
import { ChevronDown, HelpCircle, BookOpen, Award, Clock } from 'lucide-react';

interface FaqSectionProps {
  lang: 'ar' | 'fr';
}

interface FaqItem {
  id: string;
  category: 'enrollment' | 'certification' | 'schedule';
  questionAr: string;
  questionFr: string;
  answerAr: string;
  answerFr: string;
}

export default function FaqSection({ lang }: FaqSectionProps) {
  const isAr = lang === 'ar';
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openId, setOpenId] = useState<string | null>('faq-1'); // Keep first open by default

  const categories = [
    { id: 'all', labelAr: 'الكل', labelFr: 'Tous' },
    { id: 'enrollment', labelAr: 'التسجيل والرسوم', labelFr: 'Inscriptions & Tarifs' },
    { id: 'certification', labelAr: 'الشهادات والاعتماد', labelFr: 'Diplômes & Agréments' },
    { id: 'schedule', labelAr: 'الأوقات والبرامج', labelFr: 'Horaires & Programmes' },
  ];

  const faqItems: FaqItem[] = [
    {
      id: 'faq-1',
      category: 'certification',
      questionAr: 'هل شهادات مدرسة رافا معتمدة ومعترف بها من قبل الدولة الجزائرية؟',
      questionFr: 'Les diplômes et certificats de Rafa School sont-ils agréés par l\'État algérien ?',
      answerAr: 'نعم، مدرسة رافا هي مؤسسة تكوينية خاصة معتمدة رسمياً من قبل وزارة التكوين والتعليم المهنيين تحت رقم الاعتماد الوزاري 014/25. جميع شهاداتنا مؤهلة ومعترف بها قانونياً، وتسمح لخريجينا بالحصول على بطاقة حرفي، بطاقة مقاول ذاتي، أو الاندماج المباشر في سوق الشغل والشركات الوطنية والمحلية.',
      answerFr: 'Oui, Rafa School est un établissement de formation professionnelle privé agréé par le Ministère de la Formation et de l\'Enseignement Professionnels sous le numéro d\'agrément 014/25. Les diplômes et certificats qualifiants délivrés sont officiellement reconnus et permettent à nos diplômés d\'intégrer le marché de l\'emploi, de postuler dans des entreprises ou d\'obtenir une carte d\'artisan / auto-entrepreneur pour lancer leur propre activité.'
    },
    {
      id: 'faq-2',
      category: 'enrollment',
      questionAr: 'كيف يمكنني التسجيل في دورات المدرسة وما هي الملفات المطلوبة؟',
      questionFr: 'Comment puis-je m\'inscrire aux formations et quels sont les documents requis ?',
      answerAr: 'يمكنك البدء بحجز مقعدك إلكترونياً عبر الضغط على زر "سجل الآن" وملء الاستمارة. لتأكيد تسجيلك النهائي في مقر المدرسة بباب الزوار، يُرجى تقديم الملف التالي: نسخة من بطاقة التعريف الوطنية، شهادة ميلاد، صورتان شمسيتان، ودفع الشطر الأول من حقوق التكوين.',
      answerFr: 'Vous pouvez pré-réserver votre place en ligne en cliquant sur le bouton "S\'inscrire" et en remplissant le formulaire. Pour valider définitivement votre inscription administrative dans nos locaux de Bab Ezzouar, vous devez fournir : une copie de votre pièce d\'identité (CNI), un extrait de naissance, deux photos d\'identité et le règlement de la première tranche des frais.'
    },
    {
      id: 'faq-3',
      category: 'schedule',
      questionAr: 'ما هي أوقات الدراسة المتاحة؟ هل هناك خيارات للموظفين والطلبة؟',
      questionFr: 'Quels sont les horaires des cours ? Existe-t-il des formules adaptées aux salariés ?',
      answerAr: 'نوفر مرونة كاملة لتناسب جميع الالتزامات الشخصية والمهنية عبر ثلاثة خيارات: الفوج الصباحي (08:30 - 12:30)، الفوج المسائي (13:30 - 17:30)، وفوج نهاية الأسبوع الخاص (الجمعة والسبت) الموجه خصيصاً للعمال، الموظفين، والطلبة الجامعيين.',
      answerFr: 'Nous proposons une flexibilité maximale avec trois créneaux au choix pour s\'adapter à votre rythme : la session du Matin (08h30 - 12h30), la session de l\'Après-midi (13h30 - 17h30), ou notre formule spéciale Week-end (Vendredi et Samedi) idéalement conçue pour les salariés et étudiants.'
    },
    {
      id: 'faq-4',
      category: 'enrollment',
      questionAr: 'هل من الممكن دفع تكاليف التكوين بالتقسيط؟',
      questionFr: 'Est-il possible d\'échelonner le paiement des frais de scolarité ?',
      answerAr: 'نعم بالتأكيد. لتخفيف العبء المالي على طلابنا، يتيح نظام الدفع لدينا تسديد التكاليف على دفعتين ميسرتين: 50٪ كدفعة أولى عند التسجيل لتأكيد الحجز، والـ 50٪ المتبقية يتم دفعها في منتصف فترة التكوين (دون أي رسوم أو تكاليف إضافية).',
      answerFr: 'Oui, tout à fait. Afin de faciliter l\'accès à nos formations, nous vous permettons de régler vos frais en deux mensualités facilitées : 50% à l\'inscription pour réserver votre place, et les 50% restants au milieu de la formation, sans aucun frais supplémentaire.'
    },
    {
      id: 'faq-5',
      category: 'schedule',
      questionAr: 'هل أحتاج إلى خبرة سابقة أو مستوى دراسي معين للالتحاق بدوراتكم؟',
      questionFr: 'Faut-il avoir des connaissances préalables ou un diplôme pour s\'inscrire ?',
      answerAr: 'لا، جميع دوراتنا وبرامجنا التكوينية مصممة لتأخذ بيدك من مستوى الصفر تماماً. يقوم أساتذتنا المعتمدون بشرح المفاهيم بطرق مبسطة وتطبيقية حية، لنتدرج معك خطوة بخطوة حتى تصل إلى مستوى الاحتراف التقني واليدوي الكامل.',
      answerFr: 'Non, aucun prérequis technique n\'est demandé. Toutes nos formations sont pensées pour les débutants absolus. Nos instructeurs expérimentés reprennent les bases de manière très pédagogique et vous accompagnent pas à pas vers un niveau de qualification opérationnel.'
    },
    {
      id: 'faq-6',
      category: 'certification',
      questionAr: 'ما هي طبيعة المشاريع والتطبيقات خلال فترة التكوين؟',
      questionFr: 'Quel type de projets pratiques réalise-t-on durant la formation ?',
      answerAr: 'مناهج مدرسة رافا تركز بنسبة تفوق 90٪ على الجانب التطبيقي والميداني. ستقوم في ورشة الخياطة بتفصيل وخياطة قطع ملابس كاملة وحقيقية، وفي دورة برمجة المواقع الإلكترونية ستقوم ببناء مواقع ويب تفاعلية حية، وفي دورة الأمن والسلامة HSE ستقوم بمحاكاة لخطط الإخلاء والإنقاذ، مما يمنحك محفظة أعمال (Portfolio) غنية قبل التخرج.',
      answerFr: 'Le modèle d\'apprentissage de Rafa School est orienté à plus de 90% vers la pratique. En couture, vous confectionnez des vêtements réels de A à Z. En programmation web, vous déployez de vrais sites web interactifs. En sécurité HSE, vous effectuez des simulations d\'évacuation et de premiers secours. Vous terminez ainsi votre formation avec un portfolio de projets concrets.'
    }
  ];

  const filteredFaqs = activeCategory === 'all' 
    ? faqItems 
    : faqItems.filter(item => item.category === activeCategory);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq-section" className="py-16 bg-cream border-t border-sand/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="font-mono text-[10px] font-bold text-gold uppercase tracking-widest block mb-2">
            {isAr ? 'الأسئلة الشائعة والمساعدة' : 'FAQ & CENTRE D\'AIDE'}
          </span>
          <h2 className="font-display font-extrabold text-3xl text-charcoal mb-4">
            {isAr ? 'لديك أسئلة؟ نحن هنا للإجابة عليها' : 'Questions Fréquentes'}
          </h2>
          <p className="font-sans text-sm sm:text-base text-charcoal/60 max-w-2xl mx-auto leading-relaxed">
            {isAr ? (
              'جمعنا لك هنا أهم الاستفسارات حول شروط التسجيل، الشهادات المعتمدة، نظام الدفع الميسر، وتوقيت الدورات في مدرسة رافا.'
            ) : (
              'Retrouvez les réponses aux questions les plus posées concernant les inscriptions, l\'éligibilité, les agréments d\'État et l\'organisation de nos cours.'
            )}
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              id={`faq-cat-tab-${cat.id}`}
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                // Keep the first filtered item open or close all
                const matching = faqItems.find(f => cat.id === 'all' || f.category === cat.id);
                setOpenId(matching ? matching.id : null);
              }}
              className={`px-4 py-2.5 rounded-full font-sans text-xs font-semibold transition-all duration-300 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-charcoal text-cream shadow-sm'
                  : 'bg-sand/30 text-charcoal/70 hover:bg-sand/60 border border-sand/20'
              }`}
            >
              {isAr ? cat.labelAr : cat.labelFr}
            </button>
          ))}
        </div>

        {/* Accordion FAQ List */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              
              // Get category icon
              let CategoryIcon = HelpCircle;
              if (faq.category === 'certification') CategoryIcon = Award;
              if (faq.category === 'schedule') CategoryIcon = Clock;
              if (faq.category === 'enrollment') CategoryIcon = BookOpen;

              return (
                <div
                  id={`faq-accordion-item-${faq.id}`}
                  key={faq.id}
                  className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                    isOpen 
                      ? 'bg-cream border-gold shadow-sm ring-1 ring-gold/20' 
                      : 'bg-sand/10 hover:bg-sand/25 border-sand/40'
                  }`}
                >
                  {/* Accordion Trigger Header */}
                  <button
                    id={`faq-accordion-trigger-${faq.id}`}
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between p-5 text-left transition-colors duration-300 focus:outline-none cursor-pointer"
                    dir={isAr ? 'rtl' : 'ltr'}
                  >
                    <div className="flex items-center gap-3 text-right">
                      <div className={`p-2 rounded-xl shrink-0 transition-colors duration-300 ${
                        isOpen ? 'bg-gold/10 text-gold' : 'bg-charcoal/5 text-charcoal/40'
                      }`}>
                        <CategoryIcon className="w-4 h-4" />
                      </div>
                      <span className={`font-display font-bold text-sm sm:text-base text-charcoal leading-snug ${isAr ? 'text-right' : 'text-left'}`}>
                        {isAr ? faq.questionAr : faq.questionFr}
                      </span>
                    </div>
                    
                    <div className={`p-1.5 rounded-lg border transition-all duration-300 ml-2 shrink-0 ${
                      isOpen 
                        ? 'border-gold bg-gold/5 text-gold rotate-180' 
                        : 'border-sand/60 text-charcoal/30'
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Accordion Smooth Height Transition Content */}
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div 
                        className="px-5 pb-5 pt-1 font-sans text-xs sm:text-sm text-charcoal/70 leading-relaxed border-t border-sand/30"
                        dir={isAr ? 'rtl' : 'ltr'}
                      >
                        <p className={isAr ? 'text-right' : 'text-left'}>
                          {isAr ? faq.answerAr : faq.answerFr}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8 text-charcoal/40 font-sans text-sm">
              {isAr ? 'لا توجد أسئلة تطابق الفئة المحددة.' : 'Aucune question disponible pour cette catégorie.'}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
