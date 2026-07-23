import { useEffect } from 'react';
import { Course } from '../types';

interface SEOManagerProps {
  lang: 'ar' | 'fr';
  activeTab: string;
  selectedCourse: Course | null;
}

export default function SEOManager({ lang, activeTab, selectedCourse }: SEOManagerProps) {
  useEffect(() => {
    const isAr = lang === 'ar';

    // 1. Determine Title and Description based on active content
    let title = '';
    let description = '';
    let imageUrl = 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200'; // high quality school default image

    if (activeTab === 'home' && !selectedCourse) {
      title = isAr 
        ? "مدرسة رافا | معهد التكوين المهني المعتمد بالجزائر" 
        : "Rafa School | Institut de Formation Professionnelle Agréé en Algérie";
      description = isAr
        ? "مدرسة رافا للتكوين المهني المعتمد بالجزائر تقدم دورات وورش عمل احترافية وممتازة في الخياطة الحديثة، تطوير الويب، والأمن والسلامة المهنية (HSE) مع شهادات معتمدة."
        : "Rafa School, école de formation professionnelle agréée en Algérie. Découvrez nos formations certifiantes de haute qualité en couture moderne, développement web et HSE.";
    } else if (selectedCourse) {
      title = isAr
        ? `دورة ${selectedCourse.titleAr} | مدرسة رافا للتكوين`
        : `Formation ${selectedCourse.titleFr} | Rafa School`;
      description = isAr
        ? `${selectedCourse.descriptionAr} - سجل الآن في هذه الدورة التطبيقية الممتازة بمدرسة رافا للتكوين المهني.`
        : `${selectedCourse.descriptionFr} - Inscrivez-vous dès maintenant à cette formation pratique certifiante chez Rafa School.`;
      imageUrl = selectedCourse.bannerImage || selectedCourse.image;
    } else if (activeTab === 'courses') {
      title = isAr
        ? "دليل الدورات والتكوينات الاحترافية المعتمدة | مدرسة رافا"
        : "Catalogue des Formations Professionnelles Agréées | Rafa School";
      description = isAr
        ? "تصفح دليل دوراتنا الممتازة والمعتمدة: الخياطة الراقية وتصميم الأزياء، برمجة الويب الشاملة، والأمن والصحة والسلامة المهنية (HSE)."
        : "Explorez notre catalogue de formations certifiantes : couture de haute couture, développement d'applications web et mobiles, et hygiène, sécurité et environnement (HSE).";
    } else if (activeTab === 'contact') {
      title = isAr
        ? "اتصل بنا وموقع المدرسة الجغرافي | مدرسة رافا"
        : "Contactez-nous & Localisation de l'École | Rafa School";
      description = isAr
        ? "تواصل مع مدرسة رافا للتكوين المهني بالجزائر. ابحث عن موقعنا الجغرافي، أرقام الهاتف، البريد الإلكتروني، وقنوات التواصل الاجتماعي للالتحاق بمجموعاتنا الجديدة."
        : "Prenez contact avec l'institut Rafa School. Retrouvez notre adresse physique, numéro de téléphone, e-mail et réseaux sociaux pour vous inscrire.";
    } else if (activeTab === 'portal') {
      title = isAr
        ? "بوابة الطلاب ولوحة التقييم والملفات | مدرسة رافا"
        : "Espace Étudiant & Portail Académique | Rafa School";
      description = isAr
        ? "بوابة الطالب لمدرسة رافا. تتبع مستواك الأكاديمي، حمل ملفاتك الدراسية، واعرض شهادات الحضور الرقمية المعتمدة لتدريباتك."
        : "Accédez à votre espace étudiant Rafa School. Consultez vos notes, téléchargez vos supports de cours et générez vos attestations de présence numériques.";
    } else {
      title = isAr 
        ? "مدرسة رافا | معهد التكوين المهني" 
        : "Rafa School | Institut de Formation";
      description = isAr
        ? "بوابتك نحو التميز المهني واكتساب المهارات المطلوبة في سوق العمل."
        : "Votre passerelle vers l'excellence professionnelle et l'acquisition de compétences clés.";
    }

    // 2. Set dynamic title
    document.title = title;

    // Helper to create or update meta tags
    const updateMetaTag = (attributeName: string, attributeValue: string, content: string, contentAttrName: string = 'content') => {
      let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute(contentAttrName, content);
    };

    // 3. Update Meta Description
    updateMetaTag('name', 'description', description);

    // 4. Update Open Graph (OG) Tags for social sharing preview
    updateMetaTag('property', 'og:title', title);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:image', imageUrl);
    updateMetaTag('property', 'og:type', 'website');
    updateMetaTag('property', 'og:locale', isAr ? 'ar_DZ' : 'fr_FR');
    updateMetaTag('property', 'og:site_name', isAr ? 'مدرسة رافا للتكوين المهني' : 'Rafa School');

    // 5. Update Twitter Cards tags
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:title', title);
    updateMetaTag('name', 'twitter:description', description);
    updateMetaTag('name', 'twitter:image', imageUrl);

  }, [lang, activeTab, selectedCourse]);

  // Component renders absolutely nothing visually
  return null;
}
