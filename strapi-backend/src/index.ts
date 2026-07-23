export default {
  register() {},

  async bootstrap({ strapi }: { strapi: any }) {
    // 1. Grant public API permissions automatically
    try {
      const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
        where: { type: 'public' },
      });

      if (publicRole) {
        const actions = [
          'api::course.course.find',
          'api::course.course.findOne',
          'api::testimonial.testimonial.find',
          'api::testimonial.testimonial.findOne',
          'api::registration.registration.create',
        ];

        for (const action of actions) {
          const existing = await strapi.db.query('plugin::users-permissions.permission').findOne({
            where: { action, role: publicRole.id },
          });

          if (!existing) {
            await strapi.db.query('plugin::users-permissions.permission').create({
              data: { action, role: publicRole.id },
            });
          }
        }
        console.log('[Strapi Bootstrap] Public API permissions auto-enabled.');
      }
    } catch (err: any) {
      console.warn('[Strapi Bootstrap] Permission config note:', err.message);
    }

    // 2. Auto-seed initial courses if collection is empty
    try {
      const courses = [
        {
          slug: 'couture-et-modelisme',
          titleAr: 'دورة الخياطة وتفصيل الملابس المتقدمة',
          titleFr: 'Formation Couture & Modélisme Professionnel',
          descriptionAr: 'تعلمي أخذ المقاسات الصحيحة، رسم الباترونات المسطحة، قص الأقمشة باحترافية، وتشغيل ماكينة الخياطة لتنفيذ وتصميم ملابس كاملة متقنة.',
          descriptionFr: 'Maîtrisez la prise de mesures, le tracé de patronages de base, la coupe technique des tissus et l\'utilisation des machines industrielles pour assembler des vêtements sur mesure.',
          category: 'crafts',
          durationAr: '3 أشهر (12 أسبوع)',
          durationFr: '3 Mois (12 Semaines)',
          price: 18000,
          currencyAr: 'دج',
          currencyFr: 'DA',
          instructorId: 'rachid',
          image: 'https://images.unsplash.com/photo-1528570188406-29a49160046a?w=800&auto=format&fit=crop&q=80',
          bannerImage: 'https://images.unsplash.com/photo-1524230572899-a752b3835840?w=1600&auto=format&fit=crop&q=80',
          lecturesCount: 36,
          levelAr: 'مبتدئ إلى محترف',
          levelFr: 'Débutant à Professionnel',
          tagsAr: ['خياطة', 'تفصيل وباترون', 'أقمشة', 'حرف تقليدية'],
          tagsFr: ['Couture', 'Patronage', 'Coupe de tissu', 'Artisanat'],
          accentColor: '#8b5cf6',
          detailsAr: 'تعتبر هذه الدورة التطبيقية بمثابة بوابتك الشاملة لتعلم مهنة الخياطة والتفصيل بالطرق الأكاديمية الصحيحة.',
          detailsFr: 'Une formation intensive de référence pour maîtriser la couture et le modélisme.'
        },
        {
          slug: 'stylisme-et-design',
          titleAr: 'دورة تصميم الملابس والأزياء (Stylisme)',
          titleFr: 'Formation Design de Mode & Stylisme',
          descriptionAr: 'اكتشف عالم الموضة الإبداعي. تعلم أساسيات رسم المانيكان، تنسيق الألوان، واختيار الأقمشة وتصميم لوحة الإلهام لمجموعتك الأولى من الأزياء.',
          descriptionFr: 'Découvrez l\'univers de la haute couture. Apprenez le croquis de silhouettes, l\'harmonie des couleurs, la sélection des textiles et la création de votre première collection.',
          category: 'crafts',
          durationAr: '3 أشهر (12 أسبوع)',
          durationFr: '3 Mois (12 Semaines)',
          price: 24000,
          currencyAr: 'دج',
          currencyFr: 'DA',
          instructorId: 'rachid',
          image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&auto=format&fit=crop&q=80',
          bannerImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1600&auto=format&fit=crop&q=80',
          lecturesCount: 30,
          levelAr: 'مبتدئ إلى محترف',
          levelFr: 'Débutant à Professionnel',
          tagsAr: ['تصميم أزياء', 'رسم وتلوين', 'تنسيق أقمشة', 'مجموعات ملابس'],
          tagsFr: ['Stylisme', 'Croquis de mode', 'Textile Design', 'Collections'],
          accentColor: '#ec4899',
          detailsAr: 'تجمع هذه الدورة بين الحس الفني والمعرفة التجارية الضرورية للنجاح في عالم الأزياء والموضة.',
          detailsFr: 'Ce parcours artistique est conçu pour vous initier au processus de création des collections de mode.'
        },
        {
          slug: 'coiffure-et-visagisme',
          titleAr: 'دورة قص وتسريح وتصفيف الشعر الاحترافية',
          titleFr: 'Formation Coiffure, Coupe & Visagisme',
          descriptionAr: 'احترفي فن تصفيف الشعر والقصات الحديثة. دراسة ملامح الوجه واختيار التسريحات الساحرة للمناسبات وحساب درجات صبغة الشعر بدقة.',
          descriptionFr: 'Formez-vous aux techniques modernes de coupe, de coiffage et de coloration. Apprenez à analyser la morphologie du visage pour sublimer chaque coiffure.',
          category: 'crafts',
          durationAr: 'شهرين (8 أسابيع)',
          durationFr: '2 Mois (8 Semaines)',
          price: 16000,
          currencyAr: 'دج',
          currencyFr: 'DA',
          instructorId: 'samira',
          image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop&q=80',
          bannerImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1600&auto=format&fit=crop&q=80',
          lecturesCount: 24,
          levelAr: 'جميع المستويات',
          levelFr: 'Tous Niveaux',
          tagsAr: ['قص شعر', 'تصفيف وتسريح', 'صبغات وتلوين', 'مكياج ومظهر'],
          tagsFr: ['Coupe de cheveux', 'Brushing & Styling', 'Colorimétrie', 'Chignons'],
          accentColor: '#f59e0b',
          detailsAr: 'برنامج تدريبي ممتع ومثالي لكل من ترغب في الانطلاق بقوة في قطاع مراكز التجميل وصالونات الشعر الفاخرة.',
          detailsFr: 'Devenez une professionnelle de la coiffure en étudiant les tendances du visagisme contemporain.'
        },
        {
          slug: 'creation-de-sites-web',
          titleAr: 'دورة إنشاء المواقع الإلكترونية وبرمجة الواجهات',
          titleFr: 'Formation Création de Sites Web & Front-End',
          descriptionAr: 'برمج واجهات الويب التفاعلية الخاصة بك. تعلم لغات HTML5, CSS3, JavaScript وتصميم صفحات سريعة متوافقة مع شاشات الهواتف.',
          descriptionFr: 'Concevez vos propres sites internet interactifs. Apprenez HTML5, CSS3 et JavaScript pour créer des interfaces modernes et adaptées aux mobiles.',
          category: 'tech',
          durationAr: '3 أشهر (12 أسبوع)',
          durationFr: '3 Mois (12 Semaines)',
          price: 22000,
          currencyAr: 'دج',
          currencyFr: 'DA',
          instructorId: 'mourad',
          image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80',
          bannerImage: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1600&auto=format&fit=crop&q=80',
          lecturesCount: 32,
          levelAr: 'مبتدئ إلى محترف',
          levelFr: 'Débutant à Professionnel',
          tagsAr: ['برمجة الويب', 'HTML5 & CSS3', 'جافا سكريبت', 'تصميم متجاوب'],
          tagsFr: ['Développement Web', 'HTML & CSS', 'JavaScript', 'Responsive Design'],
          accentColor: '#10b981',
          detailsAr: 'اكتسب المهارة الرقمية الأكثر طلباً في سوق الشغل والعمل الحر.',
          detailsFr: 'Entrez de plain-pied dans l\'ingénierie web. Cette formation pratique et structurée vous guide.'
        },
        {
          slug: 'informatique-et-bureautique',
          titleAr: 'دورة الإعلام الآلي والتحكم في برامج المكتبية (Office)',
          titleFr: 'Formation Informatique & Bureautique',
          descriptionAr: 'تحكم في جهاز الكمبيوتر ونظام Windows. تعلّم إتقان برامج الأوفيس (Word, Excel, PowerPoint) وإدارة ملفاتك بكفاءة عالية في بيئة العمل.',
          descriptionFr: 'Prenez le contrôle de l\'outil informatique. Maîtrisez Windows et la suite Office (Word pour les rapports, Excel pour les calculs, PowerPoint pour vos présentations).',
          category: 'tech',
          durationAr: '1.5 شهر (6 أسابيع)',
          durationFr: '1.5 Mois (6 Semaines)',
          price: 12000,
          currencyAr: 'دج',
          currencyFr: 'DA',
          instructorId: 'mourad',
          image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
          bannerImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1600&auto=format&fit=crop&q=80',
          lecturesCount: 18,
          levelAr: 'مبتدئ',
          levelFr: 'Débutant',
          tagsAr: ['إعلام آلي', 'مايكروسوفت وورد', 'جداول إكسل', 'عروض تقديمية'],
          tagsFr: ['Bureautique', 'Microsoft Word', 'Excel Pratique', 'Presentations'],
          accentColor: '#1d4ed8',
          detailsAr: 'المسار التدريبي الأساسي والحيوي لكل موظف، إداري، أو طالب جامعي يرغب في تنظيم وإدارة عمله اليومي بكفاءة واحترافية.',
          detailsFr: 'La formation essentielle indispensable pour s\'insérer avec succès dans le monde professionnel et administratif.'
        },
        {
          slug: 'agent-hse',
          titleAr: 'دورة وكيل الصحة والسلامة والبيئة (HSE Agent)',
          titleFr: 'Formation Agent de Sécurité et Environnement (HSE)',
          descriptionAr: 'تكوين تطبيقي معتمد. تعلم قوانين الوقاية الصناعية، تقييم وإدارة المخاطر المهنية في الورش والمواقع، والتصرف السليم في حالات الطوارئ.',
          descriptionFr: 'Formation réglementaire indispensable. Apprenez les normes de prévention industrielle, la cartographie des risques et les techniques d\'intervention d\'urgence.',
          category: 'hse',
          durationAr: '3 أشهر (12 أسبوع)',
          durationFr: '3 Mois (12 Semaines)',
          price: 20000,
          currencyAr: 'دج',
          currencyFr: 'DA',
          instructorId: 'mourad',
          image: 'https://images.unsplash.com/photo-1508847154043-be12a3b4d69e?w=800&auto=format&fit=crop&q=80',
          bannerImage: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?w=1600&auto=format&fit=crop&q=80',
          lecturesCount: 42,
          levelAr: 'مبتدئ إلى محترف',
          levelFr: 'Débutant à Professionnel',
          tagsAr: ['أمن صناعي', 'سلامة وصحة مهنية', 'إدارة مخاطر', 'إسعافات أولية'],
          tagsFr: ['Sécurité Industrielle', 'Normes HSE', 'Gestion des risques', 'Secourisme'],
          accentColor: '#ef4444',
          detailsAr: 'تعتبر شهادة وكيل الأمن والسلامة والبيئة (HSE) من أكثر الشهادات طلباً وقيمة في المصانع الكبرى، شركات النفط، ومواقع البناء.',
          detailsFr: 'Une qualification de premier plan et obligatoire dans les secteurs de la construction, de l\'énergie et de l\'industrie.'
        },
        {
          slug: 'photographie-professionnelle',
          titleAr: 'دورة التصوير الفوتوغرافي الاحترافي وتعديل الصور',
          titleFr: 'Formation Photographie Professionnelle',
          descriptionAr: 'احترف التصوير الرقمي، التحكم اليدوي الكلي في الكاميرا، تقنيات الإضاءة في الاستوديو، وتعديل وتصحيح الصور ببرنامجي Photoshop وLightroom.',
          descriptionFr: 'Maîtrisez la photographie numérique, l\'exposition manuelle, les éclairages de studio et la retouche d\'images sous Photoshop et Lightroom.',
          category: 'crafts',
          durationAr: 'شهرين (8 أسابيع)',
          durationFr: '2 Mois (8 Semaines)',
          price: 15000,
          currencyAr: 'دج',
          currencyFr: 'DA',
          instructorId: 'samira',
          image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80',
          bannerImage: 'https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?w=1600&auto=format&fit=crop&q=80',
          lecturesCount: 20,
          levelAr: 'مبتدئ إلى محترف',
          levelFr: 'Débutant à Professionnel',
          tagsAr: ['تصوير رقمي', 'استوديو وإضاءة', 'أدوب لايت روم', 'تعديل بورتريه'],
          tagsFr: ['Photographie', 'Éclairage Studio', 'Adobe Lightroom', 'Retouche'],
          accentColor: '#3b82f6',
          detailsAr: 'دورة تطبيقية فريدة للمبدعين والهواة البصريين. ستتعلم فيها مثلث التعريض (فتحة العدسة، سرعة الغالق، والآيزو).',
          detailsFr: 'Découvrez l\'art et la technique de la prise de vue photographique pro.'
        }
      ];

      let count = 0;
      if (strapi.documents) {
        const existing = await strapi.documents('api::course.course').findMany({ status: 'draft' });
        const existingPub = await strapi.documents('api::course.course').findMany({ status: 'published' });
        count = existing.length + existingPub.length;
      } else {
        count = await strapi.db.query('api::course.course').count();
      }

      if (count === 0) {
        console.log('[Strapi Bootstrap] Seeding initial courses via Document Service...');
        for (const courseData of courses) {
          if (strapi.documents) {
            await strapi.documents('api::course.course').create({
              data: courseData,
              status: 'published',
            });
          } else {
            await strapi.db.query('api::course.course').create({
              data: {
                ...courseData,
                publishedAt: new Date(),
              },
            });
          }
        }
        console.log('[Strapi Bootstrap] 7 Courses seeded successfully!');
      }
    } catch (err: any) {
      console.warn('[Strapi Bootstrap] Course seed error:', err.message);
    }

    // 3. Auto-seed initial testimonials if collection is empty
    try {
      const testimonials = [
        {
          authorAr: 'مريم بن ساسي',
          authorFr: 'Meriem Bensassi',
          roleAr: 'خريجة مسار الخياطة وتصميم الملابس - صاحبة مشروع "Meriem Couture"',
          roleFr: 'Diplômée Couture & Stylisme - Fondatrice de "Meriem Couture"',
          rating: 5,
          contentAr: 'بفضل التكوين التطبيقي والعملي في مدرسة رافا، تمكنت من تعلم تفصيل الباترونات والخياطة من الصفر تماماً تحت إشراف الأستاذ رشيد.',
          contentFr: 'Grâce à la formation chez Rafa School, j\'ai appris le modélisme et la couture à partir de zéro avec l\'accompagnement de M. Rachid.',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'
        },
        {
          authorAr: 'خالد بلعيد',
          authorFr: 'Khaled Belaid',
          roleAr: 'خريج مسار وكيل الأمن والسلامة HSE - يعمل الآن كمراقب سلامة بشركة مقاولات',
          roleFr: 'Diplômé Agent HSE - Actuellement Superviseur HSE dans le BTP',
          rating: 5,
          contentAr: 'تكوين مدرسة رافا المتميز منحني المعارف الميدانية والشهادة المعتمدة التي فتحت لي الأبواب فوراً في سوق الشغل.',
          contentFr: 'Le cursus HSE de Rafa School m\'a permis d\'obtenir un diplôme reconnu par l\'État qui m\'a ouvert les portes de l\'emploi très rapidement.',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80'
        }
      ];

      let countT = 0;
      if (strapi.documents) {
        const existing = await strapi.documents('api::testimonial.testimonial').findMany({ status: 'draft' });
        const existingPub = await strapi.documents('api::testimonial.testimonial').findMany({ status: 'published' });
        countT = existing.length + existingPub.length;
      } else {
        countT = await strapi.db.query('api::testimonial.testimonial').count();
      }

      if (countT === 0) {
        console.log('[Strapi Bootstrap] Seeding initial testimonials via Document Service...');
        for (const tData of testimonials) {
          if (strapi.documents) {
            await strapi.documents('api::testimonial.testimonial').create({
              data: tData,
              status: 'published',
            });
          } else {
            await strapi.db.query('api::testimonial.testimonial').create({
              data: {
                ...tData,
                publishedAt: new Date(),
              },
            });
          }
        }
        console.log('[Strapi Bootstrap] Testimonials seeded successfully!');
      }
    } catch (err: any) {
      console.warn('[Strapi Bootstrap] Testimonials seed error:', err.message);
    }
  },
};
