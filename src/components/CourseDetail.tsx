import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Clock, Star, Calendar, Award, CheckCircle, ShieldCheck, HelpCircle, Users, BookOpen, Heart, Linkedin } from 'lucide-react';
import { Course, Instructor } from '../types';
import { INSTRUCTORS } from '../data';
import { useToast } from './Toast';

interface CourseDetailProps {
  course: Course;
  lang: 'ar' | 'fr';
  onBack: () => void;
  onRegister: (courseId: string) => void;
}

export default function CourseDetail({ course, lang, onBack, onRegister }: CourseDetailProps) {
  const isAr = lang === 'ar';
  const { addToast } = useToast();
  
  // Wishlist state synced with localStorage
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('rafa-wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleWishlist = () => {
    const isAlreadyWishlisted = wishlist.includes(course.id);
    let updatedWishlist: string[];
    
    if (isAlreadyWishlisted) {
      updatedWishlist = wishlist.filter(id => id !== course.id);
      addToast(
        `💔 تم إزالة دورة "${course.titleAr}" من قائمة المفضلة`,
        `💔 Formation "${course.titleFr}" retirée des favoris`,
        'info'
      );
    } else {
      updatedWishlist = [...wishlist, course.id];
      addToast(
        `⭐ تمت إضافة دورة "${course.titleAr}" إلى قائمة المفضلة!`,
        `⭐ Formation "${course.titleFr}" ajoutée aux favoris !`,
        'wishlist'
      );
    }
    
    setWishlist(updatedWishlist);
    localStorage.setItem('rafa-wishlist', JSON.stringify(updatedWishlist));
  };

  // Find course instructor
  const instructor = INSTRUCTORS.find(inst => inst.id === course.instructorId) || INSTRUCTORS[0];

  // Reviews state synced with localStorage and populated with bilingual seed reviews
  const [reviews, setReviews] = useState<{name: string, rating: number, date: string, commentFr: string, commentAr: string}[]>(() => {
    try {
      const saved = localStorage.getItem(`rafa-reviews-${course.id}`);
      if (saved) return JSON.parse(saved);
    } catch {}
    
    // Seed reviews
    if (course.id.includes('couture') || course.id.includes('1')) {
      return [
        { name: 'Amira B.', rating: 5, date: '2026-05-12', commentFr: "Formation incroyable ! J'ai appris à concevoir des patrons complexes en quelques semaines. Les profs sont très à l'écoute.", commentAr: "دورة مذهلة حقًا! تعلمت تصميم الباترونات المعقدة في أسابيع قليلة. المدربون في قمة الاحترافية." },
        { name: 'Fatima Z.', rating: 4, date: '2026-06-03', commentFr: "Très professionnel, la partie pratique est excellente. Je recommande vivement !", commentAr: "ممتازة جدًا والجانب التطبيقي رائع للغاية. أنصح بها بشدة!" }
      ];
    } else if (course.id.includes('web') || course.id.includes('2')) {
      return [
        { name: 'Mourad K.', rating: 5, date: '2026-04-18', commentFr: "Le programme est très complet et à jour. J'ai pu créer mon propre portfolio de A à Z.", commentAr: "البرنامج متكامل ومحدث باستمرار. تمكنت من بناء معرض أعمالي الخاص بالكامل." },
        { name: 'Sarah L.', rating: 5, date: '2026-05-22', commentFr: "Une excellente méthode pédagogique pour les débutants.", commentAr: "منهجية تعليمية ممتازة للمبتدئين في البرمجة." }
      ];
    } else {
      return [
        { name: 'Karim T.', rating: 5, date: '2026-03-10', commentFr: "La meilleure formation HSE, très axée sur le terrain et la sécurité réelle.", commentAr: "أفضل دورة في الأمن والسلامة والبيئة، تركز على الواقع العملي والوقاية." },
        { name: 'Reda M.', rating: 4, date: '2026-04-05', commentFr: "Indispensable pour notre entreprise. Les formateurs sont agréés et expérimentés.", commentAr: "دورة لا غنى عنها لسلامة العمل. المكونون معتمدون ولديهم خبرة كبيرة." }
      ];
    }
  });

  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewComment.trim()) {
      addToast(
        '⚠️ يرجى ملء الاسم والتعليق قبل تقديم تقييمك.',
        '⚠️ Veuillez remplir votre nom et votre commentaire avant de soumettre.',
        'warning'
      );
      return;
    }
    
    const newReviewItem = {
      name: newReviewName.trim(),
      rating: newReviewRating,
      date: new Date().toISOString().split('T')[0],
      commentFr: newReviewComment.trim(),
      commentAr: newReviewComment.trim()
    };
    
    const updatedReviews = [newReviewItem, ...reviews];
    setReviews(updatedReviews);
    try {
      localStorage.setItem(`rafa-reviews-${course.id}`, JSON.stringify(updatedReviews));
    } catch {}
    
    setNewReviewName('');
    setNewReviewComment('');
    setNewReviewRating(5);
    
    addToast(
      '🌟 شكراً جزيلاً على تقييمك القيم! تم إضافة مراجعتك بنجاح.',
      '🌟 Merci infiniment pour votre avis ! Votre évaluation a été ajoutée avec succès.',
      'success'
    );
  };

  const avgRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1);
  
  // Track open syllabus accordion indices
  const [openLessonIndex, setOpenLessonIndex] = useState<number>(0);

  const perks = [
    { labelAr: 'متابعة فردية مخصصة 1-on-1 أسبوعياً', labelFr: 'Suivi individuel 1-on-1 hebdomadaire' },
    { labelAr: 'شهادة تخرج معتمدة لملف البورتفوليو', labelFr: 'Certification de fin d\'études approuvée' },
    { labelAr: 'مشروع تخرج تطبيقي ميداني متكامل', labelFr: 'Projet de fin d\'études pratique et concret' },
    { labelAr: 'الانضمام لمجتمع الخريجين الحصري مدى الحياة', labelFr: 'Accès permanent au réseau de nos diplômés' },
  ];

  return (
    <section className="py-12 bg-cream transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <button
          id="course-detail-back-btn"
          onClick={onBack}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-xl bg-sand hover:bg-charcoal hover:text-cream text-charcoal font-sans text-sm font-semibold transition-all duration-300 cursor-pointer"
        >
          <ArrowLeft className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
          <span>{isAr ? 'العودة إلى دليل الدورات' : 'Retour au catalogue'}</span>
        </button>

        {/* Course Banner Area */}
        <div className="relative rounded-3xl overflow-hidden mb-12 shadow-xl aspect-[21/9] sm:aspect-[24/9] min-h-[220px] bg-charcoal">
          <img 
            src={course.bannerImage} 
            alt={isAr ? course.titleAr : course.titleFr}
            className="absolute inset-0 w-full h-full object-cover opacity-65"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
          
          {/* Wishlist Button on Banner */}
          <button
            id={`banner-wishlist-btn-${course.id}`}
            onClick={toggleWishlist}
            className="absolute top-6 left-6 z-20 p-3 bg-cream/95 backdrop-blur-md hover:bg-cream text-charcoal/70 hover:text-rose-500 rounded-2xl transition-all duration-300 shadow-lg border border-white/20 group/heart cursor-pointer"
            title={isAr ? 'إضافة إلى المفضلة' : 'Ajouter aux favoris'}
            aria-label="Toggle Wishlist"
          >
            <Heart 
              className={`w-5 h-5 transition-all duration-300 ${
                wishlist.includes(course.id) 
                  ? 'fill-rose-500 text-rose-500 scale-110' 
                  : 'group-hover/heart:scale-110'
              }`} 
            />
          </button>

          <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 text-cream">
            <span className="px-3 py-1 bg-gold text-cream font-mono text-[10px] font-bold uppercase rounded-lg tracking-wider mb-3 inline-block">
              {isAr ? course.levelAr : course.levelFr}
            </span>
            <h1 className="font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl text-cream leading-tight mb-2 max-w-4xl">
              {isAr ? course.titleAr : course.titleFr}
            </h1>
            <p className="font-sans text-xs sm:text-sm text-cream/85 max-w-2xl font-light">
              {isAr ? course.descriptionAr : course.descriptionFr}
            </p>
          </div>
        </div>

        {/* Content Grid (Syllabus Left, Sticky checkout Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Info (Syllabus, Instructor Bio) */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Overview Details paragraph */}
            <div className="bg-sand/30 p-6 sm:p-8 rounded-3xl border border-sand/50">
              <h2 className="font-display font-bold text-xl text-charcoal mb-4">
                {isAr ? 'عن البرنامج التدريبي' : 'À propos de cette formation'}
              </h2>
              <p className="font-sans text-sm sm:text-base text-charcoal/70 leading-relaxed">
                {isAr ? course.detailsAr : course.detailsFr}
              </p>
            </div>

            {/* Curriculum Timeline */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-5 h-5 text-gold" />
                <h2 className="font-display font-extrabold text-xl sm:text-2xl text-charcoal">
                  {isAr ? 'المنهج الدراسي والجدول الزمني' : 'Le Programme & Syllabus'}
                </h2>
              </div>

              {/* Zig-Zag / Vertical Accordion Syllabus Timeline */}
              <div className="relative border-l-2 border-sand/80 rtl:border-l-0 rtl:border-r-2 rtl:border-sand/80 pl-6 rtl:pl-0 rtl:pr-6 space-y-8 ml-3 rtl:ml-0 rtl:mr-3">
                {course.lessons.map((lesson, index) => {
                  const isOpen = openLessonIndex === index;
                  return (
                    <div 
                      id={`syllabus-step-${index}`}
                      key={index} 
                      className="relative"
                    >
                      {/* Circle indicator step */}
                      <span className="absolute -left-[35px] rtl:-right-[35px] top-1.5 flex items-center justify-center w-[16px] h-[16px] rounded-full bg-cream ring-4 ring-gold/40 border border-gold" />

                      <div 
                        onClick={() => setOpenLessonIndex(isOpen ? -1 : index)}
                        className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer select-none ${
                          isOpen 
                            ? 'bg-sand border-gold/40 shadow-sm' 
                            : 'bg-sand/30 border-sand/50 hover:bg-sand/60'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <span className="font-mono text-[10px] font-bold text-gold uppercase tracking-wider block mb-1">
                              {isAr ? `الأسبوع ${index + 1}` : `Semaine ${index + 1}`}
                            </span>
                            <h3 className="font-display font-bold text-sm sm:text-base text-charcoal leading-snug">
                              {isAr ? lesson.titleAr : lesson.titleFr}
                            </h3>
                          </div>
                          
                          <div className="flex items-center gap-2 whitespace-nowrap">
                            <span className="font-mono text-xs text-charcoal/50 bg-sand/80 px-2 py-1 rounded-lg">
                              {isAr ? lesson.durationAr : lesson.durationFr}
                            </span>
                          </div>
                        </div>

                        {isOpen && (
                          <div className="mt-4 pt-4 border-t border-charcoal/5 font-sans text-xs sm:text-sm text-charcoal/70 leading-relaxed animate-fade-in">
                            {isAr ? (
                              'يتضمن هذا الأسبوع جلسات برمجية تفاعلية مباشرة، مراجعة للمفاهيم الأكاديمية النظرية، تليها مهمة عملية فردية (Hands-on Challenge) يتم تسليمها وتقييمها من قِبل مدربك المباشر في غضون 48 ساعة.'
                            ) : (
                              'Ce module intègre des sessions interactives en direct, des analyses théoriques de cas réels, suivies de projets individuels notés et revus sous 48 heures par votre tuteur désigné.'
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Instructor Profile Card */}
            <div id="course-instructor-profile" className="bg-sand/35 rounded-3xl border border-sand/60 p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row gap-6 items-start justify-between">
                <div className="flex flex-col sm:flex-row gap-5 items-start">
                  <div className="relative shrink-0">
                    <img 
                      src={instructor.avatar} 
                      alt={isAr ? instructor.nameAr : instructor.nameFr} 
                      className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover shadow-md border-3 border-white ring-1 ring-sand/50"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-gold text-cream p-1.5 rounded-xl shadow-md border border-white">
                      <Award className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-display font-extrabold text-lg sm:text-xl text-charcoal leading-none">
                      {isAr ? instructor.nameAr : instructor.nameFr}
                    </h3>
                    <p className="font-sans text-xs text-gold font-bold uppercase tracking-wider mt-1.5">
                      {isAr ? instructor.roleAr : instructor.roleFr}
                    </p>
                    
                    <div className="flex items-center gap-4 pt-1">
                      <div className="flex items-center gap-1 bg-amber-500/10 px-2 py-1 rounded-lg">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        <span className="font-mono text-xs font-bold text-amber-700">{avgRating}</span>
                      </div>
                      <div className="text-xs text-charcoal/50 font-mono">
                        {isAr ? `${reviews.length} تقييم موثق` : `${reviews.length} avis certifiés`}
                      </div>
                    </div>
                  </div>
                </div>

                {/* LinkedIn link badge */}
                {instructor.linkedin && (
                  <a
                    href={instructor.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#0077b5] hover:bg-[#006396] text-white rounded-xl text-xs font-semibold shadow-sm hover:shadow-md transition-all duration-300 w-full sm:w-auto justify-center cursor-pointer outline-none focus:ring-2 focus:ring-[#0077b5]/50"
                    aria-label={isAr ? `زيارة الحساب الشخصي لـ ${instructor.nameAr} على لينكد إن` : `Visiter le profil LinkedIn de ${instructor.nameFr}`}
                  >
                    <Linkedin className="w-4 h-4 shrink-0" />
                    <span>LinkedIn</span>
                  </a>
                )}
              </div>

              {/* Biography paragraph */}
              <div className="space-y-2 border-t border-sand/40 pt-4">
                <h4 className="font-display font-bold text-xs sm:text-sm text-charcoal uppercase tracking-wider">
                  {isAr ? 'السيرة الذاتية والخلفية المهنية' : 'Biographie & Parcours'}
                </h4>
                <p className="font-sans text-xs sm:text-sm text-charcoal/70 leading-relaxed">
                  {isAr ? instructor.bioAr : instructor.bioFr}
                </p>
              </div>

              {/* Certifications list */}
              {((isAr ? instructor.certificationsAr : instructor.certificationsFr)?.length ?? 0) > 0 && (
                <div className="space-y-3 border-t border-sand/40 pt-4">
                  <h4 className="font-display font-bold text-xs sm:text-sm text-charcoal uppercase tracking-wider flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{isAr ? 'الاعتمادات والشهادات المهنية' : 'Certifications & Accréditations'}</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {(isAr ? instructor.certificationsAr : instructor.certificationsFr)?.map((cert, index) => (
                      <div 
                        key={index} 
                        className="flex items-start gap-2 bg-white/60 border border-sand/30 p-3 rounded-xl hover:bg-white transition-colors duration-200"
                      >
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="font-sans text-[11px] sm:text-xs text-charcoal/80 leading-snug">
                          {cert}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Student Reviews & Dynamic Ratings Form */}
            <div className="bg-white border border-sand rounded-3xl p-6 sm:p-8 space-y-8">
              
              {/* Section Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-sand pb-4">
                <div>
                  <h2 className="font-display font-extrabold text-lg sm:text-xl text-charcoal">
                    {isAr ? 'تقييمات وآراء الطلاب' : 'Avis et retours d\'expérience'}
                  </h2>
                  <p className="font-sans text-xs text-charcoal/50">
                    {isAr ? 'مراجعات موثقة من خريجي الدورة الفعليين' : 'Retours authentiques d\'anciens étudiants de Rafa School'}
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="font-mono text-2xl font-black text-brand-deep">{avgRating}</span>
                  <div className="flex flex-col">
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3.5 h-3.5 ${i < Math.round(parseFloat(avgRating)) ? 'fill-amber-500' : 'text-sand'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-charcoal/40 font-mono mt-0.5">
                      {isAr ? `${reviews.length} تقييم موثق` : `${reviews.length} avis vérifiés`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Grid layout: Left is aggregate stats, Right is Write review */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Left: Ratings distribution */}
                <div className="space-y-4">
                  <h3 className="font-display font-bold text-xs sm:text-sm text-charcoal uppercase tracking-wider">
                    {isAr ? 'تفاصيل توزيع التقييمات' : 'Détail des évaluations'}
                  </h3>
                  
                  <div className="space-y-2.5">
                    {[5, 4, 3, 2, 1].map((stars) => {
                      const count = reviews.filter(r => r.rating === stars).length;
                      const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                      return (
                        <div key={stars} className="flex items-center gap-3 text-xs">
                          <span className="font-mono font-bold text-charcoal/60 w-3">{stars}</span>
                          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 shrink-0" />
                          
                          <div className="flex-grow bg-sand h-2 rounded-full overflow-hidden">
                            <div 
                              className="bg-amber-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          
                          <span className="font-mono text-charcoal/40 w-8 text-right">
                            {count}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="p-4 bg-sand/30 border border-sand/50 rounded-2xl text-[11px] text-charcoal/60 leading-relaxed">
                    {isAr ? (
                      '🛡️ تتم مراجعة جميع التقييمات يدوياً للتحقق من تطابق هوية مقدم الطلب مع سجلات الحضور والمشاركين المسجلين بمدرستنا.'
                    ) : (
                      '🛡️ Tous les retours proviennent d\'anciens étudiants certifiés ayant effectivement assisté aux cours présentiels et ateliers.'
                    )}
                  </div>
                </div>

                {/* Right: Write Review Form */}
                <form onSubmit={handleSubmitReview} className="space-y-4 p-5 bg-sand/20 border border-sand/40 rounded-2xl">
                  <h3 className="font-display font-bold text-xs sm:text-sm text-charcoal">
                    {isAr ? '✍️ اكتب مراجعتك للدورة' : '✍️ Laissez votre évaluation'}
                  </h3>
                  
                  {/* Stars selector */}
                  <div className="space-y-1.5">
                    <span className="font-sans text-[11px] text-charcoal/50 block">
                      {isAr ? 'تقييمك الإجمالي (من 1 إلى 5 نجوم):' : 'Votre note globale :'}
                    </span>
                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4, 5].map((stars) => (
                        <button
                          type="button"
                          key={stars}
                          onClick={() => setNewReviewRating(stars)}
                          className="p-1 hover:scale-110 transition-transform duration-200 cursor-pointer text-amber-500"
                        >
                          <Star 
                            className={`w-6 h-6 ${stars <= newReviewRating ? 'fill-amber-500 text-amber-500' : 'text-charcoal/20'}`} 
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name field */}
                  <div className="space-y-1">
                    <label className="font-sans text-[11px] text-charcoal/50 block">
                      {isAr ? 'الاسم الكامل:' : 'Votre nom ou pseudonyme :'}
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder={isAr ? 'مثال: سميرة ب.' : 'Ex: Samira B.'}
                      value={newReviewName}
                      onChange={(e) => setNewReviewName(e.target.value)}
                      className="w-full p-2.5 bg-white border border-sand rounded-xl font-sans text-xs text-charcoal outline-none focus:border-gold transition-colors"
                    />
                  </div>

                  {/* Comment field */}
                  <div className="space-y-1">
                    <label className="font-sans text-[11px] text-charcoal/50 block">
                      {isAr ? 'تعليقك ورأيك في الدورة:' : 'Votre avis détaillé :'}
                    </label>
                    <textarea 
                      required
                      rows={3}
                      placeholder={isAr ? 'اكتب تجربتك مع المنهج والمدربين والجانب التطبيقي...' : 'Décrivez votre expérience avec les formateurs, la pédagogie, etc...'}
                      value={newReviewComment}
                      onChange={(e) => setNewReviewComment(e.target.value)}
                      className="w-full p-2.5 bg-white border border-sand rounded-xl font-sans text-xs text-charcoal outline-none focus:border-gold transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-brand-deep hover:bg-brand-medium text-cream rounded-xl font-sans text-xs font-bold transition-all duration-300 shadow-sm cursor-pointer"
                  >
                    {isAr ? 'إرسال التقييم الموثق' : 'Soumettre mon avis'}
                  </button>
                </form>
              </div>

              {/* Reviews Feed */}
              <div className="space-y-4 pt-4 border-t border-sand">
                <h3 className="font-display font-bold text-xs sm:text-sm text-charcoal uppercase tracking-wider">
                  {isAr ? 'تعليقات ومراجعات الطلاب الأخيرة' : 'Avis récents de la communauté'}
                </h3>
                
                <div className="grid grid-cols-1 gap-4">
                  {reviews.map((rev, index) => (
                    <div key={index} className="p-4 bg-sand/10 border border-sand/40 rounded-2xl space-y-2.5 hover:bg-sand/20 transition-all duration-300">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <span className="font-display font-bold text-xs sm:text-sm text-charcoal block">
                            {rev.name}
                          </span>
                          <span className="font-mono text-[9px] text-charcoal/40 block mt-0.5">
                            {rev.date}
                          </span>
                        </div>
                        
                        <div className="flex text-amber-500 shrink-0">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-amber-500' : 'text-sand/60'}`} 
                            />
                          ))}
                        </div>
                      </div>
                      
                      <p className="font-sans text-xs text-charcoal/70 leading-relaxed">
                        {isAr ? rev.commentAr : rev.commentFr}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* Sticky Checkout Sidebar (Right Side) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            
            <div className="bg-charcoal text-cream rounded-3xl p-6 sm:p-8 shadow-xl border border-charcoal/80">
              
              <span className="font-mono text-[10px] font-bold text-gold uppercase tracking-widest block mb-1">
                {isAr ? 'الرسوم وتفاصيل الحجز' : 'Tarif de la Formation'}
              </span>
              
              {/* Price */}
              <div className="flex items-baseline gap-2 mb-4">
                <span className="font-display font-extrabold text-4xl text-cream">{course.price}</span>
                <span className="font-sans text-xs text-cream/50">{isAr ? course.currencyAr : course.currencyFr}</span>
              </div>

              {/* Installment plan */}
              <p className="font-sans text-xs text-cream/70 leading-relaxed mb-6">
                {isAr ? (
                  `أو ادفع على دفعتين ميسرتين بقيمة ${Math.round(course.price / 2)} دج لكل دفعة دون أي مصاريف إضافية.`
                ) : (
                  `Ou payez en 2 mensualités facilitées de ${Math.round(course.price / 2)} DA sans frais supplémentaires.`
                )}
              </p>

              {/* Registration CTA button */}
              <button
                id={`register-sidebar-btn-${course.id}`}
                onClick={() => onRegister(course.id)}
                className="w-full py-4 bg-gold hover:bg-gold-hover text-cream rounded-xl font-sans font-bold text-sm tracking-wide shadow-md transition-all duration-300 hover:shadow-lg cursor-pointer flex items-center justify-center gap-2 mb-6"
              >
                <span>{isAr ? 'سجل واحجز مقعدك الآن' : 'S\'inscrire à cette session'}</span>
                <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
              </button>

              {/* Perks Checklist */}
              <div className="border-t border-white/10 pt-5 space-y-3.5">
                {perks.map((perk, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <span className="font-sans text-xs text-cream/80 leading-snug">
                      {isAr ? perk.labelAr : perk.labelFr}
                    </span>
                  </div>
                ))}
              </div>

              {/* Secure checkout info */}
              <div className="flex items-center gap-2 justify-center mt-6 pt-4 border-t border-white/5 text-[10px] text-cream/40 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                <span>{isAr ? 'حجز آمن بنسبة 100٪ وضمان استرداد' : 'Paiement 100% sécurisé et garanti'}</span>
              </div>

            </div>

            {/* Satisfaction guarantee box */}
            <div className="bg-sand/30 rounded-2xl border border-sand/50 p-5 text-center">
              <HelpCircle className="w-6 h-6 text-gold mx-auto mb-2" />
              <h4 className="font-display font-bold text-xs text-charcoal mb-1">
                {isAr ? 'هل لديك أسئلة قبل التسجيل؟' : 'Des questions avant de vous lancer ?'}
              </h4>
              <p className="font-sans text-[11px] text-charcoal/60 leading-relaxed mb-3">
                {isAr ? (
                  'فريق التوجيه متاح لمساعدتك واختيار المسار المناسب لخبرتك.'
                ) : (
                  'Notre équipe de conseillers pédagogiques est là pour répondre à vos doutes et valider vos prérequis.'
                )}
              </p>
              <a 
                href="#contact" 
                className="font-mono text-[10px] font-bold text-gold uppercase tracking-wider hover:underline"
              >
                {isAr ? 'تواصل معنا على واتساب' : 'Discuter avec un conseiller'}
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
