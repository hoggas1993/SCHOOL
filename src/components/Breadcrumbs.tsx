import React from 'react';
import { ChevronRight, ChevronLeft, Home, BookOpen } from 'lucide-react';
import { Course } from '../types';

interface BreadcrumbsProps {
  lang: 'ar' | 'fr';
  activeTab: string;
  selectedCourse: Course | null;
  onNavigate: (tab: string) => void;
  onBackToCatalog?: () => void;
}

export default function Breadcrumbs({ lang, activeTab, selectedCourse, onNavigate, onBackToCatalog }: BreadcrumbsProps) {
  const isAr = lang === 'ar';

  // Render breadcrumbs only for the catalog and course detail views
  if (activeTab !== 'courses') {
    return null;
  }

  return (
    <nav 
      aria-label={isAr ? "مسار التنقل" : "Fil d'Ariane"}
      className="bg-sand/35 py-3.5 px-4 sm:px-6 lg:px-8 border-b border-sand/40 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto flex items-center flex-wrap gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-sans text-charcoal/60">
        
        {/* Link back to Home */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-1 hover:text-gold hover:underline transition-all duration-200 font-semibold cursor-pointer outline-none focus:ring-2 focus:ring-gold/40 rounded-md p-1"
          aria-label={isAr ? "الذهاب إلى الصفحة الرئيسية" : "Aller à la page d'accueil"}
        >
          <Home className="w-3.5 h-3.5 text-gold shrink-0" />
          <span>{isAr ? 'الرئيسية' : 'Accueil'}</span>
        </button>

        {/* RTL/LTR adaptive Chevron separator */}
        {isAr ? (
          <ChevronLeft className="w-3.5 h-3.5 text-charcoal/30 shrink-0" />
        ) : (
          <ChevronRight className="w-3.5 h-3.5 text-charcoal/30 shrink-0" />
        )}

        {/* Link back to or Active state of Catalog */}
        {selectedCourse ? (
          <button
            onClick={() => {
              if (onBackToCatalog) {
                onBackToCatalog();
              } else {
                onNavigate('courses');
              }
            }}
            className="flex items-center gap-1 hover:text-gold hover:underline transition-all duration-200 font-semibold cursor-pointer outline-none focus:ring-2 focus:ring-gold/40 rounded-md p-1"
            aria-label={isAr ? "الذهاب إلى دليل الدورات والتكوينات" : "Retourner au catalogue des formations"}
          >
            <BookOpen className="w-3.5 h-3.5 text-gold shrink-0" />
            <span>{isAr ? 'دليل الدورات' : 'Catalogue'}</span>
          </button>
        ) : (
          <span 
            className="font-extrabold text-charcoal flex items-center gap-1 px-1 py-0.5 rounded-md" 
            aria-current="page"
          >
            <BookOpen className="w-3.5 h-3.5 text-charcoal/55 shrink-0" />
            <span>{isAr ? 'دليل الدورات' : 'Catalogue'}</span>
          </span>
        )}

        {/* Active state for Course Details if a course is selected */}
        {selectedCourse && (
          <>
            {isAr ? (
              <ChevronLeft className="w-3.5 h-3.5 text-charcoal/30 shrink-0" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5 text-charcoal/30 shrink-0" />
            )}
            
            <span 
              className="font-extrabold text-charcoal truncate max-w-[150px] sm:max-w-[320px] px-1 py-0.5 rounded-md" 
              aria-current="page"
              title={isAr ? selectedCourse.titleAr : selectedCourse.titleFr}
            >
              {isAr ? selectedCourse.titleAr : selectedCourse.titleFr}
            </span>
          </>
        )}
      </div>
    </nav>
  );
}
