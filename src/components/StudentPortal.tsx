import React, { useState, useEffect } from 'react';
import { 
  User, 
  Key, 
  Calendar, 
  BookOpen, 
  Download, 
  Award, 
  LogOut, 
  CheckCircle, 
  Clock, 
  FileText, 
  ChevronRight, 
  RefreshCw, 
  BarChart2, 
  ShieldAlert, 
  TrendingUp, 
  Search, 
  PlusCircle, 
  GraduationCap, 
  Sliders, 
  CheckCircle2, 
  UserPlus,
  X,
  Printer
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useToast } from './Toast';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  Cell 
} from 'recharts';

interface StudentPortalProps {
  lang: 'ar' | 'fr';
}

interface MockStudent {
  id: string;
  nameAr: string;
  nameFr: string;
  courseAr: string;
  courseFr: string;
  idCard: string;
  startDate: string;
  attendanceRate: string;
  grades: { moduleAr: string; moduleFr: string; score: number; statusAr: string; statusFr: string }[];
  schedule: { dayAr: string; dayFr: string; time: string; subjectAr: string; subjectFr: string; roomAr: string; roomFr: string }[];
  resources: { nameAr: string; nameFr: string; size: string; type: string }[];
}

const MOCK_STUDENTS: Record<string, MockStudent> = {
  'RAFA-2026-01': {
    id: 'RAFA-2026-01',
    nameAr: 'لينا بن حمادي',
    nameFr: 'Lina Benhamadi',
    courseAr: 'دورة الخياطة وتفصيل الملابس المتقدمة',
    courseFr: 'Couture & Modélisme Professionnel',
    idCard: '06/25-8840',
    startDate: '12 Janvier 2026',
    attendanceRate: '95%',
    grades: [
      { moduleAr: 'أخذ المقاسات وضبط الزوايا', moduleFr: 'Mesures et Morphologie', score: 18, statusAr: 'ممتاز', statusFr: 'Excellent' },
      { moduleAr: 'رسم الباترون الكلاسيكي الأساسي', moduleFr: 'Patronage de Base', score: 17, statusAr: 'ممتاز', statusFr: 'Excellent' },
      { moduleAr: 'تقنيات قص القماش الآمن', moduleFr: 'Coupe et Assemblage', score: 15.5, statusAr: 'جيد جداً', statusFr: 'Très Bien' },
      { moduleAr: 'تشغيل وصيانة ماكينات الخياطة', moduleFr: 'Utilisation des Machines', score: 16, statusAr: 'جيد جداً', statusFr: 'Très Bien' },
    ],
    schedule: [
      { dayAr: 'الأحد', dayFr: 'Dimanche', time: '09:00 - 12:00', subjectAr: 'رسم الباترونات الفردية', subjectFr: 'Patronage Individualisé', roomAr: 'ورشة أزياء 1', roomFr: 'Atelier Mode 1' },
      { dayAr: 'الثلاثاء', dayFr: 'Mardi', time: '13:30 - 16:30', subjectAr: 'تطبيق عملي: تفصيل وخياطة', subjectFr: 'Pratique de Confection', roomAr: 'ورشة الماكينات الصناعية', roomFr: 'Atelier Machines' },
      { dayAr: 'الخميس', dayFr: 'Jeudi', time: '09:00 - 12:00', subjectAr: 'دراسة الخامات وتطريز حواف', subjectFr: 'Technologie Textile', roomAr: 'ورشة أزياء 1', roomFr: 'Atelier Mode 1' },
    ],
    resources: [
      { nameAr: 'دليل الباترون الكلاسيكي للفساتين (PDF)', nameFr: 'Guide de Patronage des Robes (PDF)', size: '4.2 MB', type: 'PDF' },
      { nameAr: 'قالب ورقة المقاسات القياسية المعتمدة', nameFr: 'Fiche de Mesures Standardisées', size: '1.1 MB', type: 'DOCX' },
      { nameAr: 'كتالوج الغرز والتطريز الجزائري التقليدي', nameFr: 'Catalogue des Broderies Traditionnelles', size: '8.5 MB', type: 'PDF' },
    ],
  },
  'RAFA-2026-02': {
    id: 'RAFA-2026-02',
    nameAr: 'ياسين بلقاسم',
    nameFr: 'Yacine Belkacem',
    courseAr: 'دورة إنشاء المواقع الإلكترونية وبرمجة الواجهات',
    courseFr: 'Création de Sites Web & Front-End',
    idCard: '06/25-4412',
    startDate: '15 Février 2026',
    attendanceRate: '98%',
    grades: [
      { moduleAr: 'هيكلة الويب HTML5 المتقدمة', moduleFr: 'Sémantique HTML5 & SEO', score: 19, statusAr: 'ممتاز', statusFr: 'Excellent' },
      { moduleAr: 'تنسيق الصفحات CSS3 Grid & Flexbox', moduleFr: 'Layouts Réactifs CSS3', score: 18.5, statusAr: 'ممتاز', statusFr: 'Excellent' },
      { moduleAr: 'أساسيات جافا سكريبت التفاعلية', moduleFr: 'Algorithmique JavaScript', score: 15, statusAr: 'جيد جداً', statusFr: 'Très Bien' },
      { moduleAr: 'استضافة المواقع وإعداد Git/GitHub', moduleFr: 'Hébergement et Git', score: 17, statusAr: 'ممتاز', statusFr: 'Excellent' },
    ],
    schedule: [
      { dayAr: 'الاثنين', dayFr: 'Lundi', time: '09:00 - 12:00', subjectAr: 'تطبيقات جافا سكريبت العملية', subjectFr: 'Ateliers JavaScript Avancés', roomAr: 'مختبر التقنية A', roomFr: 'Tech Lab A' },
      { dayAr: 'الأربعاء', dayFr: 'Mercredi', time: '13:30 - 16:30', subjectAr: 'بناء متجر إلكتروني متكامل', subjectFr: 'Projet E-commerce Réactif', roomAr: 'مختبر التقنية A', roomFr: 'Tech Lab A' },
    ],
    resources: [
      { nameAr: 'ملخص شفرات HTML5 & CSS3 السريعة', nameFr: 'Cheatsheet Complet HTML5 & CSS3', size: '2.4 MB', type: 'PDF' },
      { nameAr: 'أدلة تصميم واجهات المستخدم بالهاتف', nameFr: 'Guide Responsive Mobile-First UI', size: '3.1 MB', type: 'PDF' },
      { nameAr: 'قالب كود البدء السريع بنظام Tailwind', nameFr: 'Template Vite + Tailwind Starter', size: '1.5 MB', type: 'ZIP' },
    ],
  },
};

export default function StudentPortal({ lang }: StudentPortalProps) {
  const isAr = lang === 'ar';
  const { addToast } = useToast();
  
  // High-level Portal Mode Switcher
  const [portalView, setPortalView] = useState<'student' | 'admin'>('student');

  // Certificate Viewer Modal state
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);

  // Reactive Student Database State
  const [students, setStudents] = useState<Record<string, MockStudent>>(MOCK_STUDENTS);

  // Search Query for Admin Student Directory
  const [searchQuery, setSearchQuery] = useState('');

  // Add Student Dialog/Form State
  const [showAddForm, setShowAddForm] = useState(false);
  const [newNameAr, setNewNameAr] = useState('');
  const [newNameFr, setNewNameFr] = useState('');
  const [newCourseType, setNewCourseType] = useState<'couture' | 'web' | 'hse'>('couture');
  const [newId, setNewId] = useState('');
  const [newAttendance, setNewAttendance] = useState('95');

  // Login State
  const [studentId, setStudentId] = useState<string>('');
  const [currentStudent, setCurrentStudent] = useState<MockStudent | null>(null);
  const [loginError, setLoginError] = useState<string>('');
  
  // Tab State: 'schedule', 'grades', 'downloads'
  const [portalTab, setPortalTab] = useState<'schedule' | 'grades' | 'downloads'>('schedule');

  // Loading state for improved perceived performance
  const [isPortalLoading, setIsPortalLoading] = useState<boolean>(true);

  // Automatically trigger a brief loading state when switching views, tabs, or logged-in users
  useEffect(() => {
    setIsPortalLoading(true);
    const timer = setTimeout(() => {
      setIsPortalLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [portalView, portalTab, currentStudent?.id]);

  // Handle Login submission
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = studentId.trim().toUpperCase();
    
    if (students[cleanId]) {
      setCurrentStudent(students[cleanId]);
      setLoginError('');
      setPortalTab('schedule');
    } else {
      setLoginError(
        isAr 
          ? 'عذراً، رقم الطالب غير مسجل في قاعدة البيانات. جرب كود التجربة الموضح أدناه.'
          : 'Désolé, cet identifiant n\'est pas reconnu. Essayez l\'un des identifiants de démonstration ci-dessous.'
      );
    }
  };

  const handleLogout = () => {
    setCurrentStudent(null);
    setStudentId('');
  };

  // Demo autofill
  const handleAutofill = (id: string) => {
    setStudentId(id);
    const cleanId = id.toUpperCase();
    if (students[cleanId]) {
      setCurrentStudent(students[cleanId]);
      setLoginError('');
      setPortalTab('schedule');
    }
  };

  // Computed dynamic stats for Admin View
  const studentList = Object.values(students) as MockStudent[];
  const totalStudentsCount = studentList.length;
  
  const avgAttendanceValue = parseFloat((
    studentList.reduce((acc, curr) => acc + parseFloat(curr.attendanceRate), 0) / totalStudentsCount
  ).toFixed(1));
  
  const allGradesList = studentList.flatMap(s => s.grades);
  const avgGradeValue = parseFloat((
    allGradesList.reduce((acc, curr) => acc + curr.score, 0) / allGradesList.length
  ).toFixed(1));

  // Category Distribution: Count students per course type
  const countCouture = studentList.filter(s => s.id.includes('RAFA-2026-01') || s.courseFr.toLowerCase().includes('couture')).length;
  const countWeb = studentList.filter(s => s.id.includes('RAFA-2026-02') || s.courseFr.toLowerCase().includes('sites web') || s.courseFr.toLowerCase().includes('front-end')).length;
  const countHse = studentList.filter(s => s.courseFr.toLowerCase().includes('hse') || s.courseFr.toLowerCase().includes('sécurité') || s.courseFr.toLowerCase().includes('prévention')).length;

  const dynamicCategoryData = [
    { nameAr: 'خياطة وتصميم باترون', nameFr: 'Couture & Patronage', students: countCouture || 1, fill: '#0A3EA6' },
    { nameAr: 'تطوير المواقع والبرمجة', nameFr: 'Développement Web', students: countWeb || 1, fill: '#307CBF' },
    { nameAr: 'الصحة والسلامة المهنية', nameFr: 'HSE & Sécurité', students: countHse || 1, fill: '#F43F5E' },
  ];

  // Dynamic modules progress tracker data
  const moduleStats: Record<string, { nameFr: string; nameAr: string; totalScore: number; count: number }> = {};
  studentList.forEach(student => {
    student.grades.forEach(g => {
      const key = g.moduleFr;
      if (!moduleStats[key]) {
        moduleStats[key] = {
          nameFr: g.moduleFr,
          nameAr: g.moduleAr,
          totalScore: 0,
          count: 0
        };
      }
      moduleStats[key].totalScore += g.score;
      moduleStats[key].count += 1;
    });
  });

  const dynamicModuleData = Object.values(moduleStats).map(m => ({
    name: isAr ? m.nameAr : m.nameFr,
    nameFr: m.nameFr,
    avgScore: parseFloat((m.totalScore / m.count).toFixed(1)),
    studentsCount: m.count,
  }));

  // Enrollment trend data (static baseline with dynamic adjustment)
  const ENROLLMENT_TRENDS_DATA = [
    { monthAr: 'جانفي', monthFr: 'Jan', enrollments: 45, completion: 82 },
    { monthAr: 'فيفري', monthFr: 'Fév', enrollments: 68, completion: 85 },
    { monthAr: 'مارس', monthFr: 'Mar', enrollments: 95, completion: 89 },
    { monthAr: 'أفريل', monthFr: 'Avr', enrollments: 120, completion: 91 },
    { monthAr: 'ماي', monthFr: 'Mai', enrollments: 160, completion: 93 },
    { monthAr: 'جوان', monthFr: 'Juin', enrollments: 210, completion: 94 },
    { monthAr: 'جويلية', monthFr: 'Juil', enrollments: 280 + (totalStudentsCount - 2) * 15, completion: 96 },
  ];

  // Custom high-fidelity tooltip for Recharts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 dark:bg-slate-900 border border-sand dark:border-slate-800 p-3.5 rounded-2xl shadow-xl backdrop-blur-md space-y-1 text-xs">
          <p className="font-display font-bold text-charcoal dark:text-cream border-b border-sand dark:border-slate-800 pb-1 mb-1.5">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="font-sans font-medium" style={{ color: entry.color || '#0A3EA6' }}>
              <span className="opacity-80">{entry.name}:</span> <span className="font-bold">{entry.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Handle addition of a new student
  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newId || !newNameFr || !newNameAr) {
      addToast(
        '⚠️ يرجى ملء جميع الحقول المطلوبة لتسجيل الطالب الجديد.',
        '⚠️ Veuillez remplir tous les champs obligatoires pour inscrire l\'étudiant.',
        'warning'
      );
      return;
    }
    const cleanId = newId.trim().toUpperCase();
    if (students[cleanId]) {
      addToast(
        '❌ رقم الطالب هذا مسجل بالفعل في النظام! يرجى استخدام رقم تسجيل فريد.',
        '❌ Cet identifiant étudiant existe déjà ! Veuillez attribuer un ID unique.',
        'error'
      );
      return;
    }

    let courseFr = '';
    let courseAr = '';
    let initialGrades: any[] = [];
    let initialSchedule: any[] = [];

    if (newCourseType === 'couture') {
      courseFr = 'Couture & Modélisme Professionnel';
      courseAr = 'دورة الخياطة وتفصيل الملابس المتقدمة';
      initialGrades = [
        { moduleAr: 'أخذ المقاسات وضبط الزوايا', moduleFr: 'Mesures et Morphologie', score: 14, statusAr: 'مقبول', statusFr: 'Passable' },
        { moduleAr: 'رسم الباترون الكلاسيكي الأساسي', moduleFr: 'Patronage de Base', score: 15, statusAr: 'جيد', statusFr: 'Bien' },
        { moduleAr: 'تقنيات قص القماش الآمن', moduleFr: 'Coupe et Assemblage', score: 12, statusAr: 'مقبول', statusFr: 'Passable' },
        { moduleAr: 'تشغيل وصيانة ماكينات الخياطة', moduleFr: 'Utilisation des Machines', score: 16, statusAr: 'جيد جداً', statusFr: 'Très Bien' },
      ];
      initialSchedule = [
        { dayAr: 'الأحد', dayFr: 'Dimanche', time: '09:00 - 12:00', subjectAr: 'رسم الباترونات الفردية', subjectFr: 'Patronage Individualisé', roomAr: 'ورشة أزياء 1', roomFr: 'Atelier Mode 1' }
      ];
    } else if (newCourseType === 'web') {
      courseFr = 'Création de Sites Web & Front-End';
      courseAr = 'دورة إنشاء المواقع الإلكترونية وبرمجة الواجهات';
      initialGrades = [
        { moduleAr: 'هيكلة الويب HTML5 المتقدمة', moduleFr: 'Sémantique HTML5 & SEO', score: 15, statusAr: 'جيد', statusFr: 'Bien' },
        { moduleAr: 'تنسيق الصفحات CSS3 Grid & Flexbox', moduleFr: 'Layouts Réactifs CSS3', score: 14, statusAr: 'جيد', statusFr: 'Bien' },
        { moduleAr: 'أساسيات جافا سكريبت التفاعلية', moduleFr: 'Algorithmique JavaScript', score: 13, statusAr: 'مقبول', statusFr: 'Passable' },
        { moduleAr: 'استضافة المواقع وإعداد Git/GitHub', moduleFr: 'Hébergement et Git', score: 15, statusAr: 'جيد', statusFr: 'Bien' },
      ];
      initialSchedule = [
        { dayAr: 'الاثنين', dayFr: 'Lundi', time: '09:00 - 12:00', subjectAr: 'تطبيقات جافا سكريبت العملية', subjectFr: 'Ateliers JavaScript Avancés', roomAr: 'مختبر التقنية A', roomFr: 'Tech Lab A' }
      ];
    } else {
      courseFr = "Prévention & HSE dans l'Industrie";
      courseAr = 'الوقاية والصحة والسلامة المهنية الصناعية';
      initialGrades = [
        { moduleAr: 'تقييم المخاطر والمخاطر المهنية', moduleFr: 'Risk Assessment & Hazards', score: 16, statusAr: 'جيد جداً', statusFr: 'Très Bien' },
        { moduleAr: 'تخطيط الاستجابة لحالات الطوارئ', moduleFr: 'Emergency Response Planning', score: 15, statusAr: 'جيد', statusFr: 'Bien' },
        { moduleAr: 'قوانين السلامة الصناعية والتشريعات', moduleFr: 'Industrial Safety Legislation', score: 14, statusAr: 'جيد', statusFr: 'Bien' },
        { moduleAr: 'بروتوكولات الإسعافات الأولية', moduleFr: 'First Aid Protocols', score: 17, statusAr: 'ممتاز', statusFr: 'Excellent' },
      ];
      initialSchedule = [
        { dayAr: 'الأربعاء', dayFr: 'Mercredi', time: '09:00 - 12:00', subjectAr: 'التدريب العملي للإسعافات', subjectFr: 'Secourisme Pratique', roomAr: 'قاعة الصحة والسلامة', roomFr: 'Salle HSE' }
      ];
    }

    const newStudentObj: MockStudent = {
      id: cleanId,
      nameAr: newNameAr,
      nameFr: newNameFr,
      courseAr,
      courseFr,
      idCard: `06/25-${Math.floor(1000 + Math.random() * 9000)}`,
      startDate: '19 Juillet 2026',
      attendanceRate: `${newAttendance}%`,
      grades: initialGrades,
      schedule: initialSchedule,
      resources: [
        { nameAr: 'حقيبة المادة التدريبية المعتمدة (PDF)', nameFr: 'Manuel de Cours Officiel (PDF)', size: '3.5 MB', type: 'PDF' }
      ],
    };

    setStudents(prev => ({
      ...prev,
      [cleanId]: newStudentObj
    }));

    // Reset Form
    setNewId('');
    setNewNameFr('');
    setNewNameAr('');
    setNewAttendance('95');
    setShowAddForm(false);
  };

  // Handle grade edits
  const handleUpdateGrade = (studentId: string, moduleFr: string, newScore: number) => {
    const clampedScore = Math.max(0, Math.min(20, newScore));
    
    setStudents(prev => {
      const student = prev[studentId];
      if (!student) return prev;
      
      const updatedGrades = student.grades.map(g => {
        if (g.moduleFr === moduleFr) {
          let statusAr = 'مقبول';
          let statusFr = 'Passable';
          if (clampedScore >= 18) {
            statusAr = 'ممتاز';
            statusFr = 'Excellent';
          } else if (clampedScore >= 16) {
            statusAr = 'جيد جداً';
            statusFr = 'Très Bien';
          } else if (clampedScore >= 14) {
            statusAr = 'جيد';
            statusFr = 'Bien';
          } else if (clampedScore < 10) {
            statusAr = 'ضعيف';
            statusFr = 'Insuffisant';
          }
          
          return {
            ...g,
            score: clampedScore,
            statusAr,
            statusFr
          };
        }
        return g;
      });
      
      const updatedStudent = {
        ...student,
        grades: updatedGrades
      };

      // Also sync currentStudent state if logged in
      if (currentStudent && currentStudent.id === studentId) {
        setCurrentStudent(updatedStudent);
      }

      return {
        ...prev,
        [studentId]: updatedStudent
      };
    });
  };

  // Student list filter
  const filteredStudents = studentList.filter(s => {
    const query = searchQuery.toLowerCase();
    return (
      s.id.toLowerCase().includes(query) ||
      s.nameFr.toLowerCase().includes(query) ||
      s.nameAr.includes(query)
    );
  });

  // Keep track of which student row is expanded in Admin Directory
  const [expandedStudentId, setExpandedStudentId] = useState<string | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      
      {/* 1. Portal Intro Header */}
      <div className="text-center mb-6 space-y-2">
        <span className="font-mono text-xs font-bold text-brand-deep uppercase tracking-widest block">
          {isAr ? 'البوابة الرقمية الأكاديمية مدرسة رافا' : 'PORTAIL ACADÉMIQUE RAFA SCHOOL'}
        </span>
        <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-charcoal">
          {isAr ? 'فضاء متابعة التكوين، جدول التوقيت والموارد' : 'Suivez votre progression en temps réel'}
        </h1>
        <p className="font-sans text-xs sm:text-sm text-charcoal/60 max-w-xl mx-auto">
          {isAr ? 'منصة مخصصة لطلاب مدرسة رافا ومتابعي الإدارة للاطلاع على كشوف النقاط، الموارد الرقمية والإحصائيات الأكاديمية الدقيقة.' : 'Un espace privé sécurisé destiné à nos apprenants et à notre administration pour piloter les parcours d\'apprentissage.'}
        </p>
      </div>

      {/* 2. Top Navigation Tabs: Student view vs Administrative dashboard */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex p-1 bg-sand/40 border border-sand/60 rounded-2xl">
          <button
            onClick={() => setPortalView('student')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
              portalView === 'student'
                ? 'bg-brand-deep text-cream shadow-sm'
                : 'text-charcoal/60 hover:text-charcoal'
            }`}
          >
            <User className="w-4 h-4" />
            <span>{isAr ? 'بوابة حساب الطالب' : 'Espace Étudiant'}</span>
          </button>
          <button
            onClick={() => setPortalView('admin')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
              portalView === 'admin'
                ? 'bg-brand-deep text-cream shadow-sm'
                : 'text-charcoal/60 hover:text-charcoal'
            }`}
          >
            <BarChart2 className="w-4 h-4" />
            <span>{isAr ? 'بوابة لوحة الإدارة والإحصائيات' : 'Espace Administration'}</span>
          </button>
        </div>
      </div>

      {/* STUDENT VIEW */}
      {portalView === 'student' && (
        <>
          {!currentStudent ? (
            <div className="max-w-md mx-auto bg-white border border-sand rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-brand-deep/10 text-brand-deep rounded-full flex items-center justify-center mx-auto">
                  <User className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-base sm:text-lg text-charcoal">
                  {isAr ? 'تسجيل الدخول إلى حسابك' : 'Connexion à l\'Espace Étudiant'}
                </h3>
                <p className="font-sans text-xs text-charcoal/50">
                  {isAr ? 'أدخل رقم الطالب الخاص بك المسلم لك عند التسجيل' : 'Veuillez saisir l\'ID étudiant imprimé sur votre carte d\'inscription.'}
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="student-id-input" className="font-sans text-xs font-medium text-charcoal/70 block">
                    {isAr ? 'رقم الطالب (Student ID)' : 'Identifiant Étudiant'}
                  </label>
                  <div className="relative">
                    <input
                      id="student-id-input"
                      type="text"
                      required
                      placeholder="EX: RAFA-2026-01"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-sand border border-sand-dark/15 rounded-xl font-mono text-sm text-charcoal focus:outline-none focus:border-brand-deep placeholder:text-charcoal/30 text-center"
                    />
                    <Key className="w-4 h-4 text-charcoal/40 absolute left-3.5 top-3.5" />
                  </div>
                </div>

                {loginError && (
                  <div className="p-3 bg-red-50 text-red-700 rounded-xl text-xs flex gap-2 items-start">
                    <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                    <p>{loginError}</p>
                  </div>
                )}

                <button
                  id="portal-login-submit"
                  type="submit"
                  className="w-full py-3 bg-brand-deep hover:bg-brand-medium text-white font-sans text-sm font-semibold rounded-xl transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
                >
                  {isAr ? 'دخول للمنصة الرقمية' : 'Accéder au tableau de bord'}
                </button>
              </form>

              {/* DEMO ACCOUNTS HELPER BOX */}
              <div className="p-4 bg-brand-sky/5 border border-brand-sky/15 rounded-2xl space-y-3">
                <h4 className="font-display font-bold text-xs text-brand-deep flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-brand-sky" />
                  <span>{isAr ? 'حسابات تجريبية للمعاينة السريعة' : 'Comptes de démonstration interactifs'}</span>
                </h4>
                <p className="font-sans text-[11px] text-charcoal/60">
                  {isAr ? 'لقد قمنا بإعداد حسابات طالب وهمية مسبقاً لتتمكن من تجربة المنصة ومزاياها التفاعلية مباشرة:' : 'Testez instantanément les fonctionnalités clés de l\'espace en cliquant sur l\'un de ces profils de simulation :'}
                </p>
                <div className="flex flex-col gap-2 pt-1">
                  {Object.keys(students).slice(0, 2).map((sid) => (
                    <button
                      key={sid}
                      type="button"
                      onClick={() => handleAutofill(sid)}
                      className="w-full p-2.5 bg-cream hover:bg-brand-sky/10 border border-sand hover:border-brand-sky/40 rounded-xl text-left rtl:text-right font-sans text-[11px] text-charcoal flex justify-between items-center transition-colors cursor-pointer"
                    >
                      <span><strong>{isAr ? students[sid].nameAr : students[sid].nameFr}</strong> ({isAr ? students[sid].courseAr.split(' ')[1] : students[sid].courseFr.split('&')[0]})</span>
                      <span className="font-mono text-brand-deep text-[10px] font-bold">{sid}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* LOGGED IN PORTAL VIEW */
            <div className="bg-white border border-sand rounded-3xl shadow-sm overflow-hidden flex flex-col md:flex-row">
              
              {/* SIDEBAR USER INFO PANEL */}
              <div className="md:w-80 bg-sand/15 border-b md:border-b-0 md:border-r border-sand/60 p-6 flex flex-col justify-between space-y-6 rtl:border-r-0 rtl:border-l">
                <div className="space-y-6">
                  {/* Profile Avatar */}
                  <div className="text-center md:text-left rtl:md:text-right space-y-3">
                    <div className="w-16 h-16 bg-brand-deep text-cream rounded-full flex items-center justify-center mx-auto md:mx-0 font-display font-black text-xl shadow-md">
                      {currentStudent.nameFr.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-display font-extrabold text-base text-charcoal leading-none">
                        {isAr ? currentStudent.nameAr : currentStudent.nameFr}
                      </h3>
                      <span className="font-mono text-[10px] text-brand-deep font-bold mt-1.5 block">
                        {isAr ? `رقم التسجيل: ${currentStudent.id}` : `ID: ${currentStudent.id}`}
                      </span>
                    </div>
                  </div>

                  {/* Course Info Cards */}
                  <div className="space-y-2 pt-4 border-t border-sand/60 text-xs font-sans">
                    <div className="p-3 bg-cream rounded-xl border border-sand/55">
                      <span className="text-charcoal/40 block text-[10px] uppercase font-bold">{isAr ? 'الدورة التدريبية' : 'FORMATION'}</span>
                      <span className="font-display font-bold text-charcoal mt-0.5 block">
                        {isAr ? currentStudent.courseAr : currentStudent.courseFr}
                      </span>
                    </div>

                    <div className="p-3 bg-cream rounded-xl border border-sand/55 flex justify-between items-center">
                      <div>
                        <span className="text-charcoal/40 block text-[10px] uppercase font-bold">{isAr ? 'تاريخ البداية' : 'DÉBUT DE SESSION'}</span>
                        <span className="font-semibold text-charcoal mt-0.5 block">{currentStudent.startDate}</span>
                      </div>
                      <div className="text-right rtl:text-left">
                        <span className="text-charcoal/40 block text-[10px] uppercase font-bold">{isAr ? 'نسبة الحضور' : 'ASSIDUITÉ'}</span>
                        <span className="font-semibold text-emerald-600 mt-0.5 block">{currentStudent.attendanceRate}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Logout button */}
                <button
                  onClick={handleLogout}
                  className="w-full py-2.5 bg-red-50 hover:bg-red-100 text-red-700 font-sans text-xs font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer border border-red-200/50"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{isAr ? 'تسجيل الخروج' : 'Se Déconnecter'}</span>
                </button>
              </div>

              {/* MAIN WORKSPACE TABS */}
              <div className="flex-grow p-6 sm:p-8 space-y-6">
                
                {/* Horizontal Tabs Menu */}
                <div className="flex border-b border-sand pb-2 gap-2">
                  <button
                    onClick={() => setPortalTab('schedule')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      portalTab === 'schedule'
                        ? 'bg-brand-deep text-cream'
                        : 'text-charcoal/60 hover:bg-sand/40'
                    }`}
                  >
                    <Calendar className="w-4 h-4" />
                    <span>{isAr ? 'جدول الحصص والتوقيت' : 'Mon Emploi du Temps'}</span>
                  </button>

                  <button
                    onClick={() => setPortalTab('grades')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      portalTab === 'grades'
                        ? 'bg-brand-deep text-cream'
                        : 'text-charcoal/60 hover:bg-sand/40'
                    }`}
                  >
                    <Award className="w-4 h-4" />
                    <span>{isAr ? 'النتائج وكشف النقاط' : 'Notes & Évaluations'}</span>
                  </button>

                  <button
                    onClick={() => setPortalTab('downloads')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      portalTab === 'downloads'
                        ? 'bg-brand-deep text-cream'
                        : 'text-charcoal/60 hover:bg-sand/40'
                    }`}
                  >
                    <Download className="w-4 h-4" />
                    <span>{isAr ? 'حقيبة الموارد والملفات' : 'Supports & Documents'}</span>
                  </button>
                </div>

                {/* TAB CONTENTS WITH SKELETON LOADING STATE */}
                {isPortalLoading ? (
                  <div className="space-y-6 animate-pulse" id="portal-workspace-skeleton">
                    {portalTab === 'schedule' && (
                      <div className="space-y-4">
                        {/* Header title skeleton */}
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-5 h-5 bg-charcoal/10 rounded-full" />
                          <div className="w-48 h-5 bg-charcoal/10 rounded-md" />
                        </div>
                        {/* Schedule rows skeleton */}
                        <div className="divide-y divide-sand/50 border border-sand rounded-2xl overflow-hidden bg-white/40">
                          {[...Array(3)].map((_, i) => (
                            <div key={i} className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                              <div className="flex items-center gap-3 w-full">
                                <div className="w-16 h-7 bg-charcoal/10 rounded-lg shrink-0" />
                                <div className="space-y-1.5 flex-1">
                                  <div className="w-36 h-4 bg-charcoal/10 rounded" />
                                  <div className="w-20 h-3 bg-charcoal/10 rounded" />
                                </div>
                              </div>
                              <div className="w-24 h-6 bg-charcoal/10 rounded-full shrink-0" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {portalTab === 'grades' && (
                      <div className="space-y-6">
                        {/* Header title skeleton */}
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-5 h-5 bg-charcoal/10 rounded-full" />
                          <div className="w-48 h-5 bg-charcoal/10 rounded-md" />
                        </div>
                        {/* Grid of grade cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[...Array(4)].map((_, i) => (
                            <div key={i} className="p-4 bg-white/60 border border-sand rounded-2xl space-y-4">
                              <div className="flex justify-between items-center">
                                <div className="w-1/2 h-4 bg-charcoal/10 rounded" />
                                <div className="w-12 h-4 bg-charcoal/10 rounded" />
                              </div>
                              <div className="w-full bg-sand rounded-full h-2">
                                <div className="bg-charcoal/10 h-2 rounded-full w-2/3" />
                              </div>
                              <div className="flex justify-between">
                                <div className="w-24 h-3 bg-charcoal/10 rounded" />
                                <div className="w-12 h-3 bg-charcoal/10 rounded" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {portalTab === 'downloads' && (
                      <div className="space-y-4">
                        {/* Header title skeleton */}
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-5 h-5 bg-charcoal/10 rounded-full" />
                          <div className="w-48 h-5 bg-charcoal/10 rounded-md" />
                        </div>
                        {/* File lists */}
                        <div className="grid grid-cols-1 gap-3">
                          {[...Array(3)].map((_, i) => (
                            <div key={i} className="p-3.5 bg-white/40 border border-sand rounded-2xl flex items-center justify-between gap-4">
                              <div className="flex items-center gap-3 w-full">
                                <div className="w-10 h-10 rounded-xl bg-charcoal/10 shrink-0" />
                                <div className="space-y-1.5 flex-grow">
                                  <div className="w-44 h-4 bg-charcoal/10 rounded" />
                                  <div className="w-20 h-3 bg-charcoal/10 rounded" />
                                </div>
                              </div>
                              <div className="w-8 h-8 bg-charcoal/10 rounded-xl shrink-0" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    {/* TAB CONTENT: SCHEDULE */}
                    {portalTab === 'schedule' && (
                      <div className="space-y-4 animate-fade-in">
                        <div className="flex items-center gap-2 mb-2 text-brand-deep">
                          <Clock className="w-5 h-5" />
                          <h4 className="font-display font-extrabold text-sm sm:text-base">
                            {isAr ? 'توقيت الحصص الأسبوعية المباشرة' : 'Planning hebdomadaire des ateliers'}
                          </h4>
                        </div>

                        <div className="divide-y divide-sand/50 border border-sand rounded-2xl overflow-hidden bg-white/40">
                          {currentStudent.schedule.map((session, index) => (
                            <div key={index} className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                              <div className="flex items-center gap-3">
                                <div className="w-16 py-1 bg-brand-deep/5 border border-brand-deep/10 text-brand-deep font-display font-black rounded-lg text-center text-xs">
                                  {isAr ? session.dayAr : session.dayFr}
                                </div>
                                <div>
                                  <span className="font-display font-bold text-xs sm:text-sm text-charcoal">
                                    {isAr ? session.subjectAr : session.subjectFr}
                                  </span>
                                  <span className="text-[10px] text-charcoal/40 block mt-0.5">
                                    {isAr ? `القاعة: ${session.roomAr}` : `Salle : ${session.roomFr}`}
                                  </span>
                                </div>
                              </div>
                              <div className="font-mono text-xs text-brand-deep font-bold bg-brand-sky/5 border border-brand-sky/15 px-3 py-1 rounded-full">
                                {session.time}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* TAB CONTENT: GRADES & PROGRESS */}
                    {portalTab === 'grades' && (
                      <div className="space-y-6 animate-fade-in">
                        <div className="flex items-center gap-2 mb-2 text-brand-deep">
                          <BarChart2 className="w-5 h-5" />
                          <h4 className="font-display font-extrabold text-sm sm:text-base">
                            {isAr ? 'تقييم كفاءات الوحدات الدراسية' : 'Relevé d\'évaluation continue'}
                          </h4>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {currentStudent.grades.map((grade, index) => (
                            <div key={index} className="p-4 bg-white/60 border border-sand rounded-2xl space-y-3">
                              <div className="flex justify-between items-start">
                                <span className="font-display font-bold text-xs sm:text-sm text-charcoal">
                                  {isAr ? grade.moduleAr : grade.moduleFr}
                                </span>
                                <span className="font-mono text-xs font-bold text-brand-deep">
                                  {grade.score} / 20
                                </span>
                              </div>
                              
                              {/* Rating bar */}
                              <div className="w-full bg-sand rounded-full h-2">
                                <div 
                                  className="bg-brand-deep h-2 rounded-full transition-all duration-500"
                                  style={{ width: `${(grade.score / 20) * 100}%` }}
                                ></div>
                              </div>

                              <div className="flex justify-between text-[10px] text-charcoal/40">
                                <span>{isAr ? 'علامة النجاح: 10/20' : 'Seuil de validation : 10/20'}</span>
                                <span className="text-emerald-600 font-bold">{isAr ? grade.statusAr : grade.statusFr}</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Printable Certificate Preview */}
                        <div className="p-5 bg-brand-deep text-cream rounded-2xl border border-brand-royal/20 flex flex-col sm:flex-row justify-between items-center gap-4">
                          <div className="space-y-1 text-center sm:text-left rtl:sm:text-right">
                            <span className="font-display font-bold text-xs sm:text-sm block">
                              {isAr ? '🎓 كرت إثبات التسجيل وشهادة الحضور الرقمية' : '🎓 Certificat de Présence & Attestation Numérique'}
                            </span>
                            <p className="font-sans text-[11px] text-cream/70">
                              {isAr ? 'لقد أكملت وحدات التكوين بنسبة تفوق 80٪. يمكنك تنزيل شهادة الحضور الأولية مباشرة.' : 'Votre niveau d\'assiduité vous donne droit au téléchargement de votre attestation provisoire.'}
                            </p>
                          </div>
                          <button 
                            onClick={() => {
                              setIsCertificateOpen(true);
                              addToast(
                                '📜 تم توليد وثيقة إثبات الحضور والشهادة بنجاح! يمكنك الآن معاينتها وطباعتها.',
                                '📜 Certificat de présence généré avec succès ! Vous pouvez maintenant le visualiser et l\'imprimer.',
                                'success'
                              );
                            }}
                            className="shrink-0 px-4.5 py-2 bg-brand-sky hover:bg-brand-sky/95 text-white font-sans text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer"
                          >
                            {isAr ? 'عرض الشهادة الرقمية' : 'Consulter le Certificat'}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* TAB CONTENT: DOWNLOADS */}
                    {portalTab === 'downloads' && (
                      <div className="space-y-4 animate-fade-in">
                        <div className="flex items-center gap-2 mb-2 text-brand-deep">
                          <Download className="w-5 h-5" />
                          <h4 className="font-display font-extrabold text-sm sm:text-base">
                            {isAr ? 'مكتبة الموارد الرقمية المجانية لحقيبتك' : 'Fichiers pédagogiques et modèles de travail'}
                          </h4>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                          {currentStudent.resources.map((file, index) => (
                            <div key={index} className="p-3.5 bg-white/40 hover:bg-white/70 border border-sand hover:border-brand-sky/30 rounded-2xl flex items-center justify-between transition-all gap-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-brand-deep/5 text-brand-deep flex items-center justify-center shrink-0">
                                  <FileText className="w-5 h-5" />
                                </div>
                                <div>
                                  <span className="font-display font-bold text-xs sm:text-sm text-charcoal block">
                                    {isAr ? file.nameAr : file.nameFr}
                                  </span>
                                  <span className="font-sans text-[10px] text-charcoal/40 mt-0.5 block">
                                    {file.size} &bull; {file.type}
                                  </span>
                                </div>
                              </div>
                              
                              <button 
                                onClick={() => addToast(
                                  `📥 تم بدء تحميل الملف الدراسي "${file.nameAr}" في جهازك!`,
                                  `📥 Téléchargement du document "${file.nameFr}" démarré !`,
                                  'success'
                                )}
                                className="p-2 bg-brand-deep hover:bg-brand-medium text-cream rounded-xl transition-colors cursor-pointer"
                                title={isAr ? 'تحميل الملف' : 'Télécharger'}
                              >
                                <Download className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}

              </div>

            </div>
          )}
        </>
      )}

      {/* ADMIN VIEW WITH RECHARTS VISUALIZATION */}
      {portalView === 'admin' && isPortalLoading && (
        <div className="space-y-8 animate-pulse text-charcoal" id="admin-workspace-skeleton">
          {/* Pulsing Admin Header */}
          <div className="p-6 bg-charcoal/10 rounded-3xl h-36 w-full" />

          {/* Pulsing KPI cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="p-5 bg-sand/35 border border-sand rounded-2xl flex items-center gap-4 h-24">
                <div className="w-12 h-12 rounded-xl bg-charcoal/10 shrink-0 animate-pulse" />
                <div className="space-y-2 flex-grow">
                  <div className="w-12 h-3 bg-charcoal/10 rounded" />
                  <div className="w-16 h-5 bg-charcoal/10 rounded" />
                  <div className="w-10 h-3 bg-charcoal/10 rounded" />
                </div>
              </div>
            ))}
          </div>

          {/* Pulsing Visual Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 bg-sand/35 border border-sand p-6 rounded-3xl h-[400px] flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-1/3 h-5 bg-charcoal/10 rounded" />
                <div className="w-1/2 h-3.5 bg-charcoal/10 rounded" />
              </div>
              <div className="w-full h-64 bg-charcoal/5 rounded-2xl animate-pulse" />
            </div>
            <div className="lg:col-span-5 bg-sand/35 border border-sand p-6 rounded-3xl h-[400px] flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-1/3 h-5 bg-charcoal/10 rounded" />
                <div className="w-1/2 h-3.5 bg-charcoal/10 rounded" />
              </div>
              <div className="w-full h-64 bg-charcoal/5 rounded-2xl animate-pulse" />
            </div>
          </div>

          {/* Pulsing Directory List */}
          <div className="space-y-3">
            <div className="w-48 h-6 bg-charcoal/10 rounded mb-2" />
            <div className="w-full h-10 bg-charcoal/10 rounded-xl" />
            {[...Array(2)].map((_, i) => (
              <div key={i} className="p-4 bg-sand/20 border border-sand rounded-2xl h-16 w-full" />
            ))}
          </div>
        </div>
      )}

      {/* ADMIN VIEW WITH RECHARTS VISUALIZATION - REAL CONTENT */}
      {portalView === 'admin' && !isPortalLoading && (
        <div className="space-y-8 animate-fade-in text-charcoal">
          
          {/* Admin Header Section */}
          <div className="p-6 bg-brand-deep text-cream rounded-3xl shadow-md border border-brand-royal/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-1">
              <span className="font-mono text-[10px] bg-brand-sky px-2.5 py-1 rounded-full font-bold uppercase tracking-widest text-white inline-block">
                {isAr ? 'نظام المراقبة الإدارية' : 'CONSOLE DE PILOTAGE ACADÉMIQUE'}
              </span>
              <h2 className="font-display font-extrabold text-xl sm:text-2xl text-white">
                {isAr ? 'لوحة قياس وتحليل الأداء الدراسي' : 'Tableau de Bord Analytique'}
              </h2>
              <p className="text-xs text-cream/70 max-w-xl">
                {isAr ? 'أدوات تفاعلية مدمجة لمراقبة نمو أعداد الطلاب المسجلين وقياس نسب حضورهم وكفاءاتهم في الوحدات التعليمية في الوقت الفعلي.' : 'Visualisez en temps réel l\'évolution des inscriptions, la répartition des effectifs et l\'acquisition des compétences.'}
              </p>
            </div>
            
            <button
              onClick={() => {
                setStudents(MOCK_STUDENTS);
                setSearchQuery('');
                setExpandedStudentId(null);
                addToast(
                  '🔄 تم إعادة ضبط قاعدة البيانات التجريبية بنجاح إلى قيمها الافتراضية!',
                  '🔄 La base de données de démonstration a été réinitialisée avec succès !',
                  'info'
                );
              }}
              className="px-4 py-2 bg-cream hover:bg-sand text-charcoal font-sans text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-sm cursor-pointer shrink-0"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{isAr ? 'إعادة التعيين' : 'Réinitialiser la Démo'}</span>
            </button>
          </div>

          {/* KPI Cards deck */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            
            <div className="p-5 bg-white border border-sand rounded-2xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-deep/5 text-brand-deep flex items-center justify-center shrink-0">
                <User className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-charcoal/40 block leading-tight">{isAr ? 'إجمالي الطلاب' : 'ÉTUDIANTS'}</span>
                <span className="text-xl sm:text-2xl font-display font-black text-charcoal block mt-0.5 leading-none">{totalStudentsCount}</span>
                <span className="text-[10px] text-emerald-600 font-semibold block mt-1">
                  {isAr ? 'طالب نشط' : 'profils actifs'}
                </span>
              </div>
            </div>

            <div className="p-5 bg-white border border-sand rounded-2xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-charcoal/40 block leading-tight">{isAr ? 'معدل الحضور' : 'ASSIDUITÉ'}</span>
                <span className="text-xl sm:text-2xl font-display font-black text-charcoal block mt-0.5 leading-none">{avgAttendanceValue}%</span>
                <span className="text-[10px] text-charcoal/40 block mt-1">
                  {isAr ? 'مستقر ومتناسق' : 'en temps réel'}
                </span>
              </div>
            </div>

            <div className="p-5 bg-white border border-sand rounded-2xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-sky/5 text-brand-sky flex items-center justify-center shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-charcoal/40 block leading-tight">{isAr ? 'متوسط النقاط' : 'MOYENNE GENERALE'}</span>
                <span className="text-xl sm:text-2xl font-display font-black text-charcoal block mt-0.5 leading-none">{avgGradeValue} /20</span>
                <span className="text-[10px] text-amber-600 font-semibold block mt-1">
                  {avgGradeValue >= 15 ? (isAr ? 'جيد جداً' : 'Excellent niveau') : (isAr ? 'مرضٍ ومتزن' : 'Niveau satisfaisant')}
                </span>
              </div>
            </div>

            <div className="p-5 bg-white border border-sand rounded-2xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center shrink-0">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-charcoal/40 block leading-tight">{isAr ? 'نمو التسجيلات' : 'CROISSANCE'}</span>
                <span className="text-xl sm:text-2xl font-display font-black text-charcoal block mt-0.5 leading-none">+12.4%</span>
                <span className="text-[10px] text-emerald-600 font-semibold block mt-1">
                  {isAr ? 'معدل قياسي' : 'taux de rétention'}
                </span>
              </div>
            </div>

          </div>

          {/* VISUAL CHARTS GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Chart 1: Enrollment growth (Area chart) */}
            <div className="lg:col-span-7 bg-white border border-sand p-5 sm:p-6 rounded-3xl space-y-4">
              <div className="flex justify-between items-start border-b border-sand/40 pb-3">
                <div className="space-y-0.5">
                  <h4 className="font-display font-black text-sm sm:text-base text-charcoal">
                    {isAr ? '📈 اتجاه نمو التسجيلات التراكمية (2026)' : 'Evolution des Inscriptions Globales (2026)'}
                  </h4>
                  <p className="font-sans text-[11px] text-charcoal/50">
                    {isAr ? 'يعرض عدد الطلاب المسجلين تدريجياً عبر شهور السنة الحالية.' : 'Suivi du flux cumulé d\'étudiants admis par mois.'}
                  </p>
                </div>
                <span className="font-mono text-xs bg-brand-deep/5 text-brand-deep px-2 py-1 rounded-lg font-bold">
                  {isAr ? 'تراكمي' : 'Cumulé'}
                </span>
              </div>

              <div className="h-72 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={ENROLLMENT_TRENDS_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorEnrollments" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0A3EA6" stopOpacity={0.25}/>
                        <stop offset="95%" stopColor="#0A3EA6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(156, 163, 175, 0.12)" />
                    <XAxis dataKey={isAr ? 'monthAr' : 'monthFr'} tick={{ fontSize: 10, fill: 'var(--color-charcoal)', opacity: 0.7 }} />
                    <YAxis tick={{ fontSize: 10, fill: 'var(--color-charcoal)', opacity: 0.7 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="enrollments" stroke="#0A3EA6" strokeWidth={3} fillOpacity={1} fill="url(#colorEnrollments)" name={isAr ? 'الطلاب المقيدين' : 'Inscriptions'} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: Domain distribution (Bar chart) */}
            <div className="lg:col-span-5 bg-white border border-sand p-5 sm:p-6 rounded-3xl space-y-4">
              <div className="flex justify-between items-start border-b border-sand/40 pb-3">
                <div className="space-y-0.5">
                  <h4 className="font-display font-black text-sm sm:text-base text-charcoal">
                    {isAr ? '📊 توزيع الطلاب حسب التخصصات' : 'Répartition des Effectifs par Domaine'}
                  </h4>
                  <p className="font-sans text-[11px] text-charcoal/50">
                    {isAr ? 'الأعداد النشطة المسجلة حالياً في الأقسام الدراسية المختلفة.' : 'Nombre d\'étudiants répartis par pôle de formation.'}
                  </p>
                </div>
              </div>

              <div className="h-72 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dynamicCategoryData} margin={{ top: 15, right: 10, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(156, 163, 175, 0.12)" />
                    <XAxis dataKey={isAr ? 'nameAr' : 'nameFr'} tick={{ fontSize: 9, fill: 'var(--color-charcoal)', opacity: 0.7 }} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 10, fill: 'var(--color-charcoal)', opacity: 0.7 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="students" radius={[10, 10, 0, 0]} name={isAr ? 'طالب نشط' : 'Effectif'} maxBarSize={45}>
                      {dynamicCategoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 3: Class average performance per module (Line Chart) */}
            <div className="lg:col-span-12 bg-white border border-sand p-5 sm:p-6 rounded-3xl space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-sand/40 pb-4">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-brand-sky" />
                    <h4 className="font-display font-black text-sm sm:text-base text-charcoal">
                      {isAr ? '🎯 متوسط نتائج تقييم الكفاءات حسب الوحدات التعليمية' : 'Suivi des Résultats Académiques Moyens par Module'}
                    </h4>
                  </div>
                  <p className="font-sans text-[11px] text-charcoal/50">
                    {isAr ? 'يقيس متوسط أداء جميع الطلاب في كل وحدة. قم بتغيير درجات الطلاب أدناه لتحديث هذا الرسم البياني تلقائياً.' : 'Moyennes de classe calculées de manière réactive sur l\'ensemble des modules d\'apprentissage.'}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-[10px] text-charcoal/50 font-bold">
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-brand-sky"></span> {isAr ? 'المستوى المتوسط' : 'Moyenne de classe'}</span>
                </div>
              </div>

              <div className="h-72 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dynamicModuleData} margin={{ top: 15, right: 15, left: -15, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(156, 163, 175, 0.12)" />
                    <XAxis dataKey="name" tick={{ fontSize: 9, fill: 'var(--color-charcoal)', opacity: 0.7 }} />
                    <YAxis domain={[0, 20]} ticks={[0, 5, 10, 15, 20]} tick={{ fontSize: 10, fill: 'var(--color-charcoal)', opacity: 0.7 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="avgScore" stroke="#307CBF" strokeWidth={3} dot={{ r: 5, strokeWidth: 2, fill: '#FFFFFF' }} activeDot={{ r: 8 }} name={isAr ? 'متوسط النقاط (/20)' : 'Note Moyenne (/20)'} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* DYNAMIC REGISTERED STUDENTS MANAGEMENT DIRECTORY */}
          <div className="bg-white border border-sand rounded-3xl overflow-hidden shadow-sm space-y-6 p-6 sm:p-8">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sand/40 pb-5">
              <div className="space-y-1">
                <h4 className="font-display font-black text-sm sm:text-base text-charcoal">
                  {isAr ? '👥 دليل إدارة ملفات ومستويات الطلاب' : 'Registre Général des Étudiants et Édition Directe'}
                </h4>
                <p className="font-sans text-[11px] text-charcoal/50">
                  {isAr ? 'ابحث عن الطلاب، اضغط لمعاينة وتعديل نقاط كفاءاتهم لمشاهدة المخططات البيانية تتفاعل فوراً.' : 'Consultez les fiches étudiants et modifiez leurs notes par curseurs pour recalculer la moyenne générale.'}
                </p>
              </div>

              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="px-4 py-2.5 bg-brand-deep hover:bg-brand-medium text-white font-sans text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>{isAr ? 'تسجيل طالب جديد' : 'Inscrire un Nouvel Étudiant'}</span>
              </button>
            </div>

            {/* ADD STUDENT INLINE FORM */}
            {showAddForm && (
              <form onSubmit={handleAddStudent} className="p-5 bg-sand/30 border border-sand rounded-2xl space-y-4 animate-fade-in text-xs">
                <div className="flex items-center gap-2 border-b border-sand/60 pb-2 mb-2">
                  <UserPlus className="w-4.5 h-4.5 text-brand-deep" />
                  <span className="font-display font-bold text-charcoal">{isAr ? 'نموذج تسجيل سريع في قاعدة البيانات للتدريب' : 'Formulaire de simulation d\'inscription rapide'}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="font-sans font-medium text-charcoal/70 block">{isAr ? 'رقم التسجيل الفريد (ID)' : 'Identifiant Unique (ID)'}</label>
                    <input 
                      type="text" 
                      required
                      placeholder="EX: RAFA-2026-03" 
                      value={newId}
                      onChange={e => setNewId(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-sand rounded-xl text-xs focus:outline-none focus:border-brand-deep font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-sans font-medium text-charcoal/70 block">{isAr ? 'الاسم بالفرنسية' : 'Nom complet en français'}</label>
                    <input 
                      type="text" 
                      required
                      placeholder="EX: Sarah Mahfoudi" 
                      value={newNameFr}
                      onChange={e => setNewNameFr(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-sand rounded-xl text-xs focus:outline-none focus:border-brand-deep"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-sans font-medium text-charcoal/70 block">{isAr ? 'الاسم بالعربية' : 'Nom complet en arabe'}</label>
                    <input 
                      type="text" 
                      required
                      placeholder="مثال: سارة محفوضي" 
                      value={newNameAr}
                      onChange={e => setNewNameAr(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-sand rounded-xl text-xs focus:outline-none focus:border-brand-deep"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-sans font-medium text-charcoal/70 block">{isAr ? 'المسار التكويني' : 'Parcours de formation'}</label>
                    <select
                      value={newCourseType}
                      onChange={e => setNewCourseType(e.target.value as any)}
                      className="w-full px-3 py-2 bg-white border border-sand rounded-xl text-xs focus:outline-none focus:border-brand-deep"
                    >
                      <option value="couture">{isAr ? 'خياطة وتصميم فساتين' : 'Couture & Patronage'}</option>
                      <option value="web">{isAr ? 'برمجة واجهات الويب' : 'Développement Web'}</option>
                      <option value="hse">{isAr ? 'الصحة والسلامة المهنية' : 'HSE & Prevention'}</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-sans font-medium text-charcoal/70 block">{isAr ? 'نسبة الحضور المبدئية (٪)' : 'Assiduité de départ (%)'}</label>
                    <input 
                      type="number" 
                      min="50" 
                      max="100" 
                      value={newAttendance}
                      onChange={e => setNewAttendance(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-sand rounded-xl text-xs focus:outline-none focus:border-brand-deep"
                    />
                  </div>

                  <div className="flex items-end gap-2 pt-2 md:pt-0">
                    <button 
                      type="submit"
                      className="flex-grow py-2 bg-brand-deep hover:bg-brand-medium text-white font-sans font-bold rounded-xl transition-colors cursor-pointer"
                    >
                      {isAr ? 'حفظ وإدراج' : 'Valider l\'inscription'}
                    </button>
                    <button 
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="px-3 py-2 bg-sand hover:bg-sand/85 text-charcoal font-sans font-bold rounded-xl transition-colors cursor-pointer"
                    >
                      {isAr ? 'إلغاء' : 'Annuler'}
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* SEARCH DIRECTORY FILTER */}
            <div className="relative">
              <input
                type="text"
                placeholder={isAr ? 'ابحث بالاسم أو رقم التسجيل للأكاديمي...' : 'Filtrer par nom ou ID étudiant...'}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-sand/30 border border-sand rounded-xl text-xs text-charcoal focus:outline-none focus:border-brand-deep"
              />
              <Search className="w-4 h-4 text-charcoal/40 absolute left-3.5 top-3.5" />
            </div>

            {/* STUDENT RECORDS LIST */}
            <div className="space-y-3">
              {filteredStudents.length === 0 ? (
                <div className="p-8 text-center text-charcoal/40 text-xs font-medium">
                  {isAr ? 'لا توجد نتائج مطابقة لبحثك الحالي.' : 'Aucun résultat ne correspond à votre recherche.'}
                </div>
              ) : (
                filteredStudents.map((student) => {
                  const isExpanded = expandedStudentId === student.id;
                  const studentAvg = (student.grades.reduce((a, b) => a + b.score, 0) / student.grades.length).toFixed(1);
                  
                  return (
                    <div 
                      key={student.id} 
                      className={`border border-sand rounded-2xl overflow-hidden transition-all duration-300 ${
                        isExpanded ? 'ring-2 ring-brand-deep/10 shadow-sm bg-sand/5' : 'bg-white hover:border-brand-sky/40'
                      }`}
                    >
                      {/* Accordion Row Header */}
                      <div 
                        onClick={() => setExpandedStudentId(isExpanded ? null : student.id)}
                        className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 cursor-pointer select-none"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-brand-deep text-cream flex items-center justify-center font-display font-bold text-sm">
                            {student.nameFr.charAt(0)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-display font-bold text-xs sm:text-sm text-charcoal">
                                {isAr ? student.nameAr : student.nameFr}
                              </span>
                              <span className="font-mono text-[9px] bg-brand-deep/5 text-brand-deep font-bold px-1.5 py-0.5 rounded">
                                {student.id}
                              </span>
                            </div>
                            <span className="text-[10px] text-charcoal/50 block mt-0.5">
                              {isAr ? student.courseAr : student.courseFr}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-xs font-sans self-end sm:self-auto">
                          <div className="text-right rtl:text-left">
                            <span className="text-charcoal/40 text-[9px] block uppercase font-bold">{isAr ? 'الحضور' : 'ASSIDUITÉ'}</span>
                            <span className="font-semibold text-emerald-600 mt-0.5 block">{student.attendanceRate}</span>
                          </div>
                          <div className="text-right rtl:text-left border-l border-sand/80 pl-4 rtl:border-l-0 rtl:border-r rtl:pl-0 rtl:pr-4">
                            <span className="text-charcoal/40 text-[9px] block uppercase font-bold">{isAr ? 'متوسط النقاط' : 'NOTE MOY.'}</span>
                            <span className="font-mono font-bold text-brand-deep mt-0.5 block">{studentAvg} /20</span>
                          </div>
                          <ChevronRight className={`w-4 h-4 text-charcoal/40 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
                        </div>
                      </div>

                      {/* Accordion Row Details: Dynamic Grade Editing Sliders */}
                      {isExpanded && (
                        <div className="px-6 pb-6 pt-2 border-t border-sand/40 bg-white/40 space-y-4 animate-fade-in text-xs">
                          <div className="flex items-center gap-2 text-brand-deep font-display font-bold border-b border-sand/40 pb-2">
                            <Sliders className="w-4 h-4" />
                            <span>{isAr ? '🔧 لوحة ضبط علامات الوحدات والتقييم الفوري' : '🔧 Édition Dynamique des Évaluations'}</span>
                          </div>
                          
                          <p className="text-[10px] text-charcoal/50">
                            {isAr ? 'قم بتحريك مؤشر العلامة لكل مادة دراسية. سيتم إعادة حساب المتوسط وتحديث الرسم البياني التفاعلي في الأعلى فورياً.' : 'Ajustez les réglettes de score de l\'étudiant pour réévaluer dynamiquement sa progression sur les graphiques interactifs.'}
                          </p>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {student.grades.map((grade, gIdx) => (
                              <div key={gIdx} className="p-3 bg-cream/70 border border-sand rounded-xl space-y-2">
                                <div className="flex justify-between items-center text-charcoal">
                                  <span className="font-sans font-bold text-[11px]">
                                    {isAr ? grade.moduleAr : grade.moduleFr}
                                  </span>
                                  <span className="font-mono font-bold text-brand-deep bg-white px-2 py-0.5 rounded-lg border border-sand">
                                    {grade.score} / 20
                                  </span>
                                </div>

                                <div className="flex items-center gap-3">
                                  <input 
                                    type="range"
                                    min="0"
                                    max="20"
                                    step="0.5"
                                    value={grade.score}
                                    onChange={(e) => handleUpdateGrade(student.id, grade.moduleFr, parseFloat(e.target.value))}
                                    className="flex-grow accent-brand-deep cursor-pointer h-1 bg-sand rounded-lg"
                                  />
                                  <span className="text-[9px] font-bold text-emerald-600 w-16 text-right rtl:text-left">
                                    {isAr ? grade.statusAr : grade.statusFr}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    </div>
                  );
                })
              )}
            </div>

          </div>

        </div>
      )}

      {/* Dynamic Digital Certificate Modal */}
      <AnimatePresence>
        {isCertificateOpen && currentStudent && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl bg-cream border-8 border-gold/40 rounded-3xl shadow-2xl p-6 sm:p-10 text-charcoal overflow-hidden"
              id="certificate-print-area"
            >
              {/* Decorative Frame */}
              <div className="absolute inset-2 border-2 border-gold/30 rounded-2xl pointer-events-none" />
              <div className="absolute inset-4 border border-gold/10 rounded-xl pointer-events-none" />
              
              {/* Corner Ornaments */}
              <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-gold/60" />
              <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-gold/60" />
              <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-gold/60" />
              <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-gold/60" />

              {/* Close Button */}
              <button
                onClick={() => setIsCertificateOpen(false)}
                className="absolute top-8 right-8 p-2 rounded-full bg-sand hover:bg-charcoal text-charcoal hover:text-cream transition-all duration-300 cursor-pointer pointer-events-auto"
                title={isAr ? 'إغلاق' : 'Fermer'}
              >
                <X className="w-5 h-5" />
              </button>

              {/* Certificate Content */}
              <div className="flex flex-col items-center text-center space-y-6 pt-4">
                
                {/* Header */}
                <div className="flex justify-between items-center w-full px-6 sm:px-12 border-b border-sand pb-4">
                  <div className="text-left">
                    <p className="font-display font-black text-sm tracking-wide text-gold">RAFA SCHOOL</p>
                    <p className="font-sans text-[10px] text-charcoal/50 leading-tight">Professional Training Institute</p>
                  </div>
                  
                  {/* Seal */}
                  <div className="w-14 h-14 bg-gold/10 border-2 border-gold rounded-full flex items-center justify-center font-display font-bold text-[10px] text-gold tracking-tight shadow-inner">
                    SEAL
                  </div>

                  <div className="text-right">
                    <p className="font-display font-black text-sm text-gold">مدرسة رافا</p>
                    <p className="font-sans text-[10px] text-charcoal/50 leading-tight">معهد التكوين المهني المعتمد</p>
                  </div>
                </div>

                {/* Subtitle */}
                <div className="space-y-1">
                  <p className="font-sans text-[11px] font-bold text-gold tracking-widest uppercase">
                    Agrément N° 014/25 &bull; Ministère de la Formation Professionnelle
                  </p>
                  <p className="font-display font-black text-2xl sm:text-3xl text-charcoal tracking-wide mt-2">
                    {isAr ? 'شهادة إثبات حضور وتكوين متميز' : 'ATTESTATION DE SUIVI DE FORMATION'}
                  </p>
                </div>

                {/* Body Text */}
                <div className="space-y-4 max-w-2xl px-4 sm:px-10 mt-2">
                  <p className="font-sans text-xs sm:text-sm text-charcoal/60 leading-relaxed">
                    {isAr ? 'يشهد معهد رافا للتكوين المهني المعتمد بالجزائر بأن الطالب(ة):' : 'Le Directeur de l\'Établissement Agréé Rafa School atteste que l\'étudiant(e) :'}
                  </p>
                  
                  <p className="font-display font-black text-xl sm:text-2xl text-gold border-b-2 border-gold/20 pb-1 max-w-md mx-auto">
                    {currentStudent.nameFr} &mdash; {currentStudent.nameAr}
                  </p>

                  <p className="font-sans text-xs sm:text-sm text-charcoal/60 leading-relaxed">
                    {isAr ? 'قد تابع(ت) بنجاح واجتاز(ت) بتميز الوحدات التدريبية المخصصة لبرنامج:' : 'a complété avec succès l\'ensemble des modules académiques et pratiques requis de la formation :'}
                  </p>

                  <p className="font-display font-bold text-base sm:text-lg text-charcoal px-4 py-2 bg-sand rounded-xl border border-sand/60">
                    {isAr ? currentStudent.courseAr : currentStudent.courseFr}
                  </p>

                  <p className="font-sans text-xs text-charcoal/60 leading-relaxed">
                    {isAr 
                      ? `بمعدل تقييمي قدره ${(currentStudent.grades.reduce((a,c) => a+c.score, 0) / currentStudent.grades.length).toFixed(1)} من 20، ونسبة حضور وانضباط استثنائية بلغت ${currentStudent.attendanceRate}.`
                      : `Avec une moyenne générale de ${(currentStudent.grades.reduce((a,c) => a+c.score, 0) / currentStudent.grades.length).toFixed(1)}/20 et un taux d'assiduité remarquable de ${currentStudent.attendanceRate}.`
                    }
                  </p>
                </div>

                {/* Footer Signatures */}
                <div className="grid grid-cols-2 gap-8 w-full px-12 pt-6 border-t border-sand">
                  <div className="text-left text-xs font-sans space-y-1">
                    <p className="text-charcoal/40 font-bold uppercase text-[9px] tracking-wider">Date d'édition</p>
                    <p className="font-bold text-charcoal">{currentStudent.startDate}</p>
                    <div className="pt-4 h-12 w-28 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100/30 to-transparent flex items-center justify-center font-mono text-[9px] text-charcoal/30">
                      [Signature Numérique]
                    </div>
                  </div>
                  
                  <div className="text-right text-xs font-sans space-y-1">
                    <p className="text-charcoal/40 font-bold uppercase text-[9px] tracking-wider">Le Directeur de l'école</p>
                    <p className="font-bold text-charcoal">M. Charef Eddine</p>
                    <div className="pt-4 h-12 w-28 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/10 to-transparent flex items-center justify-center font-mono text-[9px] text-gold/30">
                      [Sceau de l'Agrément]
                    </div>
                  </div>
                </div>

                {/* Print Controls */}
                <div className="flex gap-4 pt-4 shrink-0 no-print">
                  <button
                    onClick={() => {
                      window.print();
                    }}
                    className="px-5 py-2.5 bg-gold hover:bg-charcoal text-cream hover:text-cream rounded-xl font-sans text-xs font-black tracking-wider uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-sm"
                  >
                    <Printer className="w-4 h-4" />
                    <span>{isAr ? 'طباعة / حفظ PDF' : 'Imprimer / Enregistrer'}</span>
                  </button>
                  <button
                    onClick={() => setIsCertificateOpen(false)}
                    className="px-5 py-2.5 bg-sand hover:bg-red-500 hover:text-cream text-charcoal rounded-xl font-sans text-xs font-bold transition-all duration-300 cursor-pointer"
                  >
                    {isAr ? 'إغلاق المعاينة' : 'Fermer la vue'}
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
