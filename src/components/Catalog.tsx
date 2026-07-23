import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, BookOpen, Clock, Layers, Star, ArrowRight, X, Heart } from 'lucide-react';
import { COURSES } from '../data';
import { Course } from '../types';
import { useToast } from './Toast';

interface CatalogProps {
  lang: 'ar' | 'fr';
  onSelectCourse: (course: Course) => void;
  courses?: Course[];
}

export default function Catalog({ lang, onSelectCourse, courses = COURSES }: CatalogProps) {
  const isAr = lang === 'ar';
  const { addToast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedDuration, setSelectedDuration] = useState<string>('all');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Wishlist local state initialized from localStorage
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('rafa-wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleWishlist = (courseId: string, courseTitleAr: string, courseTitleFr: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid navigating to course detail
    const isAlreadyWishlisted = wishlist.includes(courseId);
    let updatedWishlist: string[];
    
    if (isAlreadyWishlisted) {
      updatedWishlist = wishlist.filter(id => id !== courseId);
      addToast(
        `💔 تم إزالة دورة "${courseTitleAr}" من قائمة المفضلة`,
        `💔 Formation "${courseTitleFr}" retirée des favoris`,
        'info'
      );
    } else {
      updatedWishlist = [...wishlist, courseId];
      addToast(
        `⭐ تمت إضافة دورة "${courseTitleAr}" إلى قائمة المفضلة!`,
        `⭐ Formation "${courseTitleFr}" ajoutée aux favoris !`,
        'wishlist'
      );
    }
    
    setWishlist(updatedWishlist);
    localStorage.setItem('rafa-wishlist', JSON.stringify(updatedWishlist));
  };

  // Trigger loading state on initial mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Trigger brief loading on filter/search change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [selectedCategory, searchQuery, selectedDifficulty, selectedDuration]);

  const categories = [
    { id: 'all', labelAr: 'الكل', labelFr: 'Tous' },
    { id: 'crafts', labelAr: 'الحرف والأزياء والجمال', labelFr: 'Métiers, Mode & Beauté' },
    { id: 'tech', labelAr: 'التكنولوجيا والإعلام الآلي', labelFr: 'Tech & Informatique' },
    { id: 'hse', labelAr: 'الصحة والسلامة (HSE)', labelFr: 'Sécurité & HSE' },
  ];

  // Search & Filter computation
  const filteredCourses = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return courses.filter((course) => {
      const matchCategory = selectedCategory === 'all' || course.category === selectedCategory;
      if (!matchCategory) return false;

      // Difficulty level matching
      if (selectedDifficulty !== 'all') {
        const courseLevelFr = course.levelFr.toLowerCase();
        if (selectedDifficulty === 'beginner') {
          const match = courseLevelFr.includes('débutant') || courseLevelFr.includes('tous');
          if (!match) return false;
        } else if (selectedDifficulty === 'intermediate') {
          const match = courseLevelFr.includes('professionnel') || courseLevelFr.includes('tous') || courseLevelFr.includes('intermédiaire');
          if (!match) return false;
        } else if (selectedDifficulty === 'advanced') {
          const match = courseLevelFr.includes('professionnel') || courseLevelFr.includes('tous') || courseLevelFr.includes('avancé');
          if (!match) return false;
        }
      }

      // Duration matching
      if (selectedDuration !== 'all') {
        const durFr = course.durationFr.toLowerCase();
        if (selectedDuration === 'under_2') {
          const match = durFr.includes('1.5') || durFr.includes('1 mois') || durFr.includes('6 semaines');
          if (!match) return false;
        } else if (selectedDuration === '2_months') {
          const match = durFr.includes('2 mois') || durFr.includes('8 semaines');
          if (!match) return false;
        } else if (selectedDuration === '3_months') {
          const match = durFr.includes('3 mois') || durFr.includes('12 semaines');
          if (!match) return false;
        }
      }

      if (!query) return true;

      // Primary fields to search in (Title & Description)
      const title = (isAr ? course.titleAr : course.titleFr).toLowerCase();
      const desc = (isAr ? course.descriptionAr : course.descriptionFr).toLowerCase();
      const level = (isAr ? course.levelAr : course.levelFr).toLowerCase();

      // Category identifier and translated labels
      const categoryRaw = course.category.toLowerCase();
      const categoryLabel = (isAr 
        ? (course.category === 'crafts' ? 'الحرف والأزياء والجمال خياطة وتصميم' : course.category === 'tech' ? 'التكنولوجيا والإعلام الآلي برمجة تطوير' : 'الصحة والسلامة أمن صناعي')
        : (course.category === 'crafts' ? 'métiers mode beauté couture patronage' : course.category === 'tech' ? 'tech informatique programmation developpement' : 'sécurité hse protection prevention')
      ).toLowerCase();

      // Match course tags
      const tags = (isAr ? course.tagsAr : course.tagsFr).map(t => t.toLowerCase());
      const matchTags = tags.some(tag => tag.includes(query));

      // Match individual lesson/lecture titles
      const lessons = course.lessons.map(l => (isAr ? l.titleAr : l.titleFr).toLowerCase());
      const matchLessons = lessons.some(lesson => lesson.includes(query));

      return (
        title.includes(query) ||
        desc.includes(query) ||
        level.includes(query) ||
        categoryRaw.includes(query) ||
        categoryLabel.includes(query) ||
        matchTags ||
        matchLessons
      );
    });
  }, [selectedCategory, searchQuery, selectedDifficulty, selectedDuration, isAr]);

  return (
    <section className="py-16 bg-cream transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-charcoal mb-4">
            {isAr ? 'دليل الدورات والتكوينات المهنية' : 'Nos Cursus & Formations Professionnelles'}
          </h2>
          <p className="font-sans text-base text-charcoal/60 leading-relaxed">
            {isAr ? (
              'اختر مسارك التكويني، وتدرج من الصفر إلى الاحتراف بفضل برامجنا المعتمدة والمطابقة لمتطلبات سوق الشغل الحقيقي.'
            ) : (
              'Choisissez votre parcours de formation agréé et montez en compétences grâce à des cursus intensifs en phase avec le marché de l\'emploi.'
            )}
          </p>
        </div>

        {/* Filters and Search Bar Container */}
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-6 pb-6 border-b border-sand">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  id={`cat-filter-btn-${cat.id}`}
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-full font-sans text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                    isActive 
                      ? 'bg-charcoal text-cream shadow-md scale-102' 
                      : 'bg-sand text-charcoal/70 hover:bg-sand/85 hover:text-charcoal'
                  }`}
                >
                  {isAr ? cat.labelAr : cat.labelFr}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-80">
            <input
              id="courses-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isAr ? 'ابحث عن دورة...' : 'Rechercher un cours...'}
              aria-label={isAr ? 'ابحث عن الدورات والبرامج التكوينية المتاحة' : 'Rechercher des formations et des cours disponibles'}
              className="w-full pl-10 pr-10 py-3 bg-sand border border-sand/50 rounded-2xl font-sans text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all duration-300"
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-charcoal/40" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-charcoal/40 hover:text-charcoal transition-colors duration-200 cursor-pointer p-0.5 rounded-full hover:bg-black/5"
                aria-label={isAr ? 'مسح نص البحث' : 'Effacer la recherche'}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>

        {/* Advanced Filtering Panel */}
        <div className="w-full flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between mb-10 p-5 bg-sand/20 border border-sand/65 rounded-3xl animate-fade-in">
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center flex-grow">
            
            {/* Difficulty Dropdown */}
            <div className="flex-grow sm:max-w-xs">
              <label htmlFor="difficulty-filter" className="block text-[11px] font-mono font-black text-charcoal/45 uppercase mb-1.5 px-1">
                {isAr ? 'مستوى الصعوبة' : 'Niveau de Difficulté'}
              </label>
              <div className="relative">
                <select
                  id="difficulty-filter"
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full appearance-none ps-4 pe-10 py-2.5 bg-cream border border-sand-dark/15 focus:border-gold rounded-xl font-sans text-xs sm:text-sm text-charcoal focus:outline-none transition-all duration-300 cursor-pointer"
                >
                  <option value="all">{isAr ? 'كل المستويات' : 'Tous les niveaux'}</option>
                  <option value="beginner">{isAr ? 'مبتدئ' : 'Débutant'}</option>
                  <option value="intermediate">{isAr ? 'متوسط' : 'Intermédiaire'}</option>
                  <option value="advanced">{isAr ? 'متقدم' : 'Avancé'}</option>
                </select>
                <div className={`pointer-events-none absolute inset-y-0 flex items-center px-3.5 text-charcoal/50 ${isAr ? 'start-0' : 'end-0'}`}>
                  <Filter className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Duration Dropdown */}
            <div className="flex-grow sm:max-w-xs">
              <label htmlFor="duration-filter" className="block text-[11px] font-mono font-black text-charcoal/45 uppercase mb-1.5 px-1">
                {isAr ? 'مدة التكوين المقدرة' : 'Durée Estimée'}
              </label>
              <div className="relative">
                <select
                  id="duration-filter"
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                  className="w-full appearance-none ps-4 pe-10 py-2.5 bg-cream border border-sand-dark/15 focus:border-gold rounded-xl font-sans text-xs sm:text-sm text-charcoal focus:outline-none transition-all duration-300 cursor-pointer"
                >
                  <option value="all">{isAr ? 'كل المدد' : 'Toutes les durées'}</option>
                  <option value="under_2">{isAr ? 'أقل من شهرين' : 'Moins de 2 mois'}</option>
                  <option value="2_months">{isAr ? 'شهرين (8 أسابيع)' : '2 Mois (8 semaines)'}</option>
                  <option value="3_months">{isAr ? '3 أشهر (12 أسبوع)' : '3 Mois (12 semaines)'}</option>
                </select>
                <div className={`pointer-events-none absolute inset-y-0 flex items-center px-3.5 text-charcoal/50 ${isAr ? 'start-0' : 'end-0'}`}>
                  <Clock className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

          </div>

          {/* Reset Filters */}
          {(selectedDifficulty !== 'all' || selectedDuration !== 'all' || searchQuery !== '' || selectedCategory !== 'all') && (
            <button
              id="clear-all-filters-btn"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setSelectedDifficulty('all');
                setSelectedDuration('all');
              }}
              className="self-end md:self-center px-4 py-2.5 bg-charcoal/5 hover:bg-charcoal/10 text-charcoal/80 hover:text-charcoal border border-sand-dark/10 rounded-xl font-sans text-xs font-semibold flex items-center gap-1.5 transition-all duration-300 cursor-pointer whitespace-nowrap mt-4 md:mt-0"
            >
              <X className="w-3.5 h-3.5" />
              <span>{isAr ? 'إعادة ضبط التصفية' : 'Réinitialiser les filtres'}</span>
            </button>
          )}
        </div>

        {/* Courses Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div
                id={`course-card-skeleton-${index}`}
                key={`skeleton-${index}`}
                className="bg-sand/35 rounded-3xl border border-sand/60 overflow-hidden flex flex-col justify-between h-full animate-pulse p-5 space-y-4"
              >
                {/* Thumbnail / Header Area */}
                <div className="w-full aspect-video rounded-2xl bg-charcoal/10" />

                {/* Text Content */}
                <div className="flex flex-col flex-grow justify-between space-y-5">
                  <div className="space-y-3">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      <div className="w-12 h-4 bg-charcoal/10 rounded-md" />
                      <div className="w-16 h-4 bg-charcoal/10 rounded-md" />
                    </div>

                    {/* Title */}
                    <div className="w-3/4 h-5 bg-charcoal/10 rounded-md" />

                    {/* Brief description */}
                    <div className="space-y-2">
                      <div className="h-3.5 bg-charcoal/10 rounded w-full" />
                      <div className="h-3.5 bg-charcoal/10 rounded w-5/6" />
                      <div className="h-3.5 bg-charcoal/10 rounded w-2/3" />
                    </div>
                  </div>

                  {/* Metadata Footer */}
                  <div>
                    <div className="grid grid-cols-3 gap-2 border-t border-sand/60 pt-4 mb-4 text-center">
                      <div className="flex flex-col items-center">
                        <div className="w-4 h-4 bg-charcoal/10 rounded-full mb-1" />
                        <div className="w-8 h-2 bg-charcoal/15 rounded mb-1" />
                        <div className="w-12 h-3 bg-charcoal/10 rounded" />
                      </div>
                      <div className="flex flex-col items-center border-x border-sand/60">
                        <div className="w-4 h-4 bg-charcoal/10 rounded-full mb-1" />
                        <div className="w-8 h-2 bg-charcoal/15 rounded mb-1" />
                        <div className="w-8 h-3 bg-charcoal/10 rounded" />
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-4 h-4 bg-charcoal/10 rounded-full mb-1" />
                        <div className="w-8 h-2 bg-charcoal/15 rounded mb-1" />
                        <div className="w-14 h-3 bg-charcoal/10 rounded" />
                      </div>
                    </div>

                    {/* Details button CTA */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="w-1/2 h-3 bg-charcoal/10 rounded" />
                      <div className="w-4 h-4 bg-charcoal/10 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, idx) => {
              const isWishlisted = wishlist.includes(course.id);
              return (
                <div
                  id={`course-card-${course.id}`}
                  key={course.id}
                  onClick={() => onSelectCourse(course)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectCourse(course);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={isAr ? `تصفح تفاصيل دورة ${course.titleAr}` : `Consulter les détails de la formation ${course.titleFr}`}
                  className="group bg-sand/35 rounded-3xl border border-sand/60 overflow-hidden hover:bg-cream hover:border-gold/30 hover:shadow-xl focus:ring-2 focus:ring-gold/40 focus:outline-none transition-all duration-500 cursor-pointer flex flex-col justify-between h-full"
                >
                  
                  {/* Thumbnail / Header Area */}
                  <div className="relative p-5 pb-0 flex justify-center">
                    
                    {/* Visual mask: circle cropped visual design inspired by the mockups */}
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-inner bg-charcoal/10 group-hover:shadow-md transition-shadow duration-500">
                      <img 
                        src={course.image} 
                        alt={isAr ? course.titleAr : course.titleFr}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                      
                      {/* Price Badge on Thumbnail */}
                      <div className="absolute top-3 right-3 px-3 py-1.5 bg-cream/90 backdrop-blur-md rounded-xl font-mono text-xs font-bold text-charcoal shadow-sm border border-white/20">
                        {course.price} {isAr ? course.currencyAr : course.currencyFr}
                      </div>
 
                      {/* Wishlist Button */}
                      <button
                        id={`wishlist-btn-${course.id}`}
                        onClick={(e) => toggleWishlist(course.id, course.titleAr, course.titleFr, e)}
                        className="absolute top-3 left-3 z-20 p-2 bg-cream/90 backdrop-blur-md hover:bg-cream text-charcoal/70 hover:text-rose-500 rounded-xl transition-all duration-300 shadow-sm border border-white/20 group/heart cursor-pointer pointer-events-auto"
                        title={isAr ? 'إضافة إلى المفضلة' : 'Ajouter aux favoris'}
                        aria-label={isWishlisted 
                          ? (isAr ? `إزالة دورة ${course.titleAr} من مفضلتك` : `Retirer la formation ${course.titleFr} de vos favoris`) 
                          : (isAr ? `إضافة دورة ${course.titleAr} إلى مفضلتك` : `Ajouter la formation ${course.titleFr} à vos favoris`)
                        }
                      >
                        <Heart 
                          className={`w-4 h-4 transition-all duration-300 ${
                            isWishlisted 
                              ? 'fill-rose-500 text-rose-500 scale-110' 
                              : 'group-hover/heart:scale-110'
                          }`} 
                        />
                      </button>
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="p-6 flex flex-col flex-grow justify-between">
                    
                    <div>
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {(isAr ? course.tagsAr : course.tagsFr).slice(0, 2).map((tag, i) => (
                          <span 
                            key={i} 
                            className="px-2 py-0.5 font-mono text-[9px] font-bold uppercase rounded-md tracking-wider"
                            style={{ backgroundColor: `${course.accentColor}12`, color: course.accentColor }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Title */}
                      <h3 className="font-display font-bold text-lg text-charcoal mb-2 leading-snug group-hover:text-gold transition-colors duration-300">
                        {isAr ? course.titleAr : course.titleFr}
                      </h3>

                      {/* Brief description */}
                      <p className="font-sans text-xs sm:text-sm text-charcoal/60 mb-5 line-clamp-3 leading-relaxed">
                        {isAr ? course.descriptionAr : course.descriptionFr}
                      </p>
                    </div>

                    {/* Metadata Footer */}
                    <div>
                      <div className="grid grid-cols-3 gap-2 border-t border-sand/60 pt-4 mb-4 text-center">
                        <div className="flex flex-col items-center">
                          <Clock className="w-4 h-4 text-charcoal/40 mb-1" />
                          <span className="font-sans text-[10px] text-charcoal/50 leading-none">
                            {isAr ? 'المدة' : 'Durée'}
                          </span>
                          <span className="font-mono text-xs font-bold text-charcoal mt-1">
                            {isAr ? course.durationAr : course.durationFr}
                          </span>
                        </div>

                        <div className="flex flex-col items-center border-x border-sand/60">
                          <BookOpen className="w-4 h-4 text-charcoal/40 mb-1" />
                          <span className="font-sans text-[10px] text-charcoal/50 leading-none">
                            {isAr ? 'الدروس' : 'Cours'}
                          </span>
                          <span className="font-mono text-xs font-bold text-charcoal mt-1">
                            {course.lecturesCount}
                          </span>
                        </div>

                        <div className="flex flex-col items-center">
                          <Layers className="w-4 h-4 text-charcoal/40 mb-1" />
                          <span className="font-sans text-[10px] text-charcoal/50 leading-none">
                            {isAr ? 'المستوى' : 'Niveau'}
                          </span>
                          <span className="font-sans text-[10px] font-semibold text-charcoal mt-1 truncate max-w-full">
                            {isAr ? course.levelAr : course.levelFr}
                          </span>
                        </div>
                      </div>

                      {/* Details button CTA */}
                      <div className="flex items-center justify-between text-xs font-bold font-sans text-charcoal group-hover:text-gold transition-colors duration-300 pt-1">
                        <span>{isAr ? 'تصفح البرنامج التدريبي والأسعار' : 'Voir le programme détaillé'}</span>
                        <ArrowRight className={`w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300 ${isAr ? 'rotate-180 group-hover:-translate-x-1.5' : ''}`} />
                      </div>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          /* Empty Search State */
          <div className="text-center py-16 bg-sand/20 rounded-3xl border border-sand/40 max-w-lg mx-auto">
            <Filter className="w-10 h-10 text-charcoal/20 mx-auto mb-4" />
            <h3 className="font-display font-bold text-lg text-charcoal mb-1">
              {isAr ? 'لم نجد أي نتائج' : 'Aucun cours trouvé'}
            </h3>
            <p className="font-sans text-sm text-charcoal/50 mb-6">
              {isAr ? 'حاول تعديل شروط البحث أو الفئات المختارة.' : 'Essayez de modifier votre recherche ou la catégorie.'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedDifficulty('all');
                setSelectedDuration('all');
              }}
              className="px-6 py-2.5 bg-brand-deep hover:bg-brand-medium text-cream text-xs font-bold rounded-xl shadow-sm transition-all duration-300 cursor-pointer"
            >
              {isAr ? 'إعادة ضبط كل عوامل التصفية' : 'Réinitialiser les filtres'}
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
