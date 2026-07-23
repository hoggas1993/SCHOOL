import { Course, Instructor, Testimonial } from './types';

export const INSTRUCTORS: Instructor[] = [
  {
    id: 'rachid',
    nameAr: 'أ. رشيد بن يوسف',
    nameFr: 'Rachid Benyoussef',
    roleAr: 'كبير مصممي الأزياء ومستشار التفصيل والخياطة المعتمد',
    roleFr: 'Maître Couturier & Styliste de Mode Senior',
    bioAr: 'مصمم أزياء وخياط محترف ومصمم باترونات بخبرة تفوق 15 سنة. أشرف على تدريب المئات من الحرفيين ومصممي الموضة الصاعدين، ويركز على نقل اللمسات العملية الدقيقة التي تصنع الفارق في السوق الجزائري والعالمي.',
    bioFr: 'Créateur et modéliste chevronné avec plus de 15 ans de pratique professionnelle. Mentor et formateur d\'excellence, spécialisé dans la haute couture traditionnelle algérienne, le modélisme et la création de collections.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewsCount: 184,
    certificationsAr: [
      'شهادة الماستر المهني في تصميم الأزياء والباترون - معهد الموضة الدولي',
      'اعتماد رسمي لمدرب خبير من غرفة الصناعة التقليدية والحرف بالجزائر',
      'الميدالية الوطنية للإبداع والتميز الحرفي في اللباس التقليدي'
    ],
    certificationsFr: [
      'Master Professionnel en Stylisme & Modélisme - Académie de Mode',
      'Agrément Officiel de Formateur Expert de la Chambre de l\'Artisanat (CAM)',
      'Médaille Nationale d\'Excellence Artisanale et Haute Couture'
    ],
    linkedin: 'https://linkedin.com/in/rachid-benyoussef-styliste'
  },
  {
    id: 'samira',
    nameAr: 'أ. سميرة بوعزيز',
    nameFr: 'Samira Bouaziz',
    roleAr: 'أخصائية تصفيف وتجميل الشعر ومستشارة المظهر المعتمدة',
    roleFr: 'Spécialiste Coiffure, Coupe & Visagisme',
    bioAr: 'تتمتع بخبرة تزيد عن 10 سنوات في كبرى صالونات التجميل ومراكز التدريب المهني بالجزائر العاصمة. شغوفة بتعليم أحدث تقنيات تصفيف، قص، وتلوين الشعر كعلم وفن متكامل ومواكب لأحدث خطوط الموضة.',
    bioFr: 'Plus de 10 ans d\'expérience dans les salons de beauté réputés et les instituts de formation en coiffure. Experte en techniques de coupe géométrique, colorimétrie avancée et chignons artistiques.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewsCount: 126,
    certificationsAr: [
      'الدبلوم العالي في قص الشعر والصبغات المتقدمة - أكاديمية لوريال الفرنسية',
      'شهادة اعتماد خبيرة مظهر وصالونات التجميل الفاخرة',
      'رخصة ممارسة التدريب المهني في التجميل والعناية بالشعر'
    ],
    certificationsFr: [
      'Diplôme Supérieur en Colorimétrie & Visagisme - L\'Oréal Professionnel',
      'Certification Internationale Styliste & Hair Designer de Salon d\'Excellence',
      'Agrément de Formatrice Agréée en Coiffure, Esthétique et Stylisme Capillaire'
    ],
    linkedin: 'https://linkedin.com/in/samira-bouaziz-coiffure'
  },
  {
    id: 'mourad',
    nameAr: 'م. مراد حداد',
    nameFr: 'Mourad Haddad',
    roleAr: 'مهندس تكنولوجيا المعلومات ومستشار الأمن والسلامة والبيئة (HSE)',
    roleFr: 'Ingénieur IT & Expert Certifié en Sécurité Industrielle HSE',
    bioAr: 'مهندس متمكن ذو خلفية مزدوجة في تقنيات الإعلام الآلي والسلامة والبيئة في المنشآت الصناعية الكبرى. قام بالإشراف على برامج الحماية والوقاية وتأهيل الكوادر البشرية في عدة شركات ومشاريع بناء وطنية.',
    bioFr: 'Ingénieur de formation avec une vaste expertise en prévention des risques, audit de sécurité et informatique d\'entreprise. Formateur pédagogue dévoué à transmettre les compétences de terrain opérationnelles.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    rating: 5.0,
    reviewsCount: 210,
    certificationsAr: [
      'شهادة السلامة المهنية الدولية المعتمدة من مجلس النيبوش البريطاني (NEBOSH IGC)',
      'شهادة مهندس معتمد في أنظمة الصحة والوقاية الصناعية والأمن البيئي',
      'رخصة مدرب إسعافات أولية وإنقاذ وحرائق معتمد وطنياً ودولياً'
    ],
    certificationsFr: [
      'Certification Internationale NEBOSH IGC - Prévention & Risques Industriels',
      'Titre d\'Ingénieur Agréé en Systèmes de Management de la Sécurité HSE',
      'Instructeur Certifié de Secourisme Opérationnel et Sauvetage en Entreprise'
    ],
    linkedin: 'https://linkedin.com/in/mourad-haddad-hse'
  }
];

export const COURSES: Course[] = [
  {
    id: 'couture-et-modelisme',
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
    detailsAr: 'تعتبر هذه الدورة التطبيقية بمثابة بوابتك الشاملة لتعلم مهنة الخياطة والتفصيل بالطرق الأكاديمية الصحيحة. سنبدأ بالتعرف على أدوات القياس وماكينات الخياطة وكيفية تشغيلها وصيانتها، ثم ننتقل فوراً لرسم الباترون الأساسي (المسطح) وتعديله، تليها تقنيات وضع الباترون على القماش وقصه وتجميعه لإنتاج فساتين، قمصان، وتنانير متقنة التفاصيل ومطابقة للمقاسات.',
    detailsFr: 'Une formation intensive de référence pour maîtriser la couture et le modélisme. De l\'enfilage de la machine à coudre jusqu\'à la réalisation de finitions minutieuses, ce cursus vous forme aux techniques de patronage plat, d\'ajustement de taille, de coupe de divers types de textiles et d\'assemblage de vêtements élégants (robes, chemises, vêtements traditionnels).',
    lessons: [
      {
        titleAr: 'مقدمة عن آلات الخياطة وأخذ المقاسات الأساسية للأجسام',
        titleFr: 'Prise en main des machines et techniques de prise de mesures',
        durationAr: '3 ساعات',
        durationFr: '3 heures'
      },
      {
        titleAr: 'رسم الباترون الأساسي الكلاسيكي العلوي والسفلي (Le Patron de Base)',
        titleFr: 'Tracé du patron de base du buste et de la jupe',
        durationAr: '4 ساعات',
        durationFr: '4 heures'
      },
      {
        titleAr: 'تعديلات الباترون لتناسب مختلف أشكال القوام والمنحنيات',
        titleFr: 'Transformation et gradation des patrons selon les morphologies',
        durationAr: '5 ساعات',
        durationFr: '5 heures'
      },
      {
        titleAr: 'دراسة الأقمشة وخاماتها وطريقة طيها وقصها الآمن دون هدر',
        titleFr: 'Technologie des textiles et méthodes de coupe sans gaspillage',
        durationAr: '6 ساعات',
        durationFr: '6 heures'
      },
      {
        titleAr: 'تقنيات التجميع السريع، السرفلة، وتجهيز الجيوب والياقات',
        titleFr: 'Techniques d\'assemblage, surjet, cols et poches',
        durationAr: '7 ساعات',
        durationFr: '7 heures'
      },
      {
        titleAr: 'المشروع التطبيقي النهائي: تفصيل خياطة فستان سهرة أو زي تقليدي متكامل',
        titleFr: 'Projet final : Confection complète d\'une robe de soirée ou d\'un habit traditionnel',
        durationAr: '11 ساعة',
        durationFr: '11 heures'
      }
    ]
  },
  {
    id: 'stylisme-et-design',
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
    detailsAr: 'تجمع هذه الدورة بين الحس الفني والمعرفة التجارية الضرورية للنجاح في عالم الأزياء والموضة. ستتعلم خلالها نسب جسم المانيكان وطريقة رسمه بوضعيات حركة مختلفة، وكيفية رسم وسقوط الملابس وثنياتها، بالإضافة لدراسة نظريات الألوان وتناسق الأقمشة، وطريقة بناء لوحة المزاج (Moodboard) لتطوير مجموعتك الفنية الأولى من الملابس وعرضها باحترافية.',
    detailsFr: 'Ce parcours artistique est conçu pour vous initier au processus de création des collections de mode. De l\'analyse des tendances à l\'apprentissage des techniques de dessin de silhouettes de mode, vous apprendrez à marier les couleurs et les textures des tissus. À l\'issue de cette formation, vous créerez votre propre cahier de tendances et dessinerez une collection cohérente et expressive.',
    lessons: [
      {
        titleAr: 'أساسيات ونسب رسم المانيكان الأكاديمي (الرأس، اليدين، والوضعيات التعبيرية)',
        titleFr: 'Proportions du mannequin de mode et dessin anatomique de base',
        durationAr: '4 ساعات',
        durationFr: '4 heures'
      },
      {
        titleAr: 'محاكاة الأقمشة المختلفة بالرسم (الحرير، الجينز، الصوف، والدانتيل)',
        titleFr: 'Rendu graphique des textures (soie, jean, laine et dentelle)',
        durationAr: '4 ساعات',
        durationFr: '4 heures'
      },
      {
        titleAr: 'دراسة وتطبيق نظرية عجلة الألوان للتنسيق الابتكاري للملابس',
        titleFr: 'Théorie de la colorimétrie et harmonie des teintes de collection',
        durationAr: '5 ساعات',
        durationFr: '5 heures'
      },
      {
        titleAr: 'تطوير لوحة الإلهام والمزاج ومفهوم المجموعة الفنية',
        titleFr: 'Création d\'un Moodboard, recherche d\'inspiration et concept',
        durationAr: '5 ساعات',
        durationFr: '5 heures'
      },
      {
        titleAr: 'رسم وتلوين المجموعة الكاملة وتصميم العروض التقديمية الفنية',
        titleFr: 'Dessin de la collection finale, mise en page et présentation portfolio',
        durationAr: '12 ساعة',
        durationFr: '12 heures'
      }
    ]
  },
  {
    id: 'coiffure-et-visagisme',
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
    detailsAr: 'برنامج تدريبي ممتع ومثالي لكل من ترغب في الانطلاق بقوة في قطاع مراكز التجميل وصالونات الشعر الفاخرة. سنغطي في هذه الدورة التطبيقية المركزة طرق غسيل الشعر والعناية الصحية به، تقنيات الاستشوار وتنعيم وتمويج الشعر (Curly/Waves)، مهارات القص الكلاسيكية والقصات المبتكرة لمختلف الأطوال، تسريحات السهرات العصرية والشعر المرفوع (Chignons)، بالإضافة لأساسيات علم الصبغات وتفتيح وتلوين خصلات الشعر بأمان وبدقة متناهية.',
    detailsFr: 'Devenez une professionnelle de la coiffure en étudiant les tendances du visagisme contemporain. Ce cours de terrain combine l\'apprentissage du brushing impeccable, du lissage et du bouclage, des techniques fondamentales de coupe (dégradés, carrés de précision), la création de chignons de mariée et de soirée élaborés, ainsi qu\'une introduction approfondie à la coloration et à la décoloration sécurisée.',
    lessons: [
      {
        titleAr: 'أساسيات صحة الشعر، الغسيل، والبروتوكول الصحي داخل الصالون',
        titleFr: 'Santé capillaire, shampoing et protocole d\'hygiène en salon',
        durationAr: '3 ساعات',
        durationFr: '3 heures'
      },
      {
        titleAr: 'تقنيات التجفيف بالهواء (Brushing) والتمويج بالحرارة (Waves/Wands)',
        titleFr: 'Techniques professionnelles de Brushing, lissage et bouclage',
        durationAr: '4 ساعات',
        durationFr: '4 heures'
      },
      {
        titleAr: 'مبادئ قصات الشعر الهندسية والتحكم في الزوايا لمختلف أطوال الشعر',
        titleFr: 'Géométrie de la coupe : angles, sections et structures classiques',
        durationAr: '5 ساعات',
        durationFr: '5 heures'
      },
      {
        titleAr: 'تصميم وبناء تسريحات الشعر المرفوع والشعر الطويل (Chignons)',
        titleFr: 'Création et mise en forme de chignons de soirée et mariages',
        durationAr: '5 ساعات',
        durationFr: '5 heures'
      },
      {
        titleAr: 'أساسيات الصبغة، سحب اللون، تلوين الخصلات، ومعادلة الألوان الحسابية',
        titleFr: 'Colorimétrie, décoloration, mèches et techniques d\'application',
        durationAr: '7 ساعات',
        durationFr: '7 heures'
      }
    ]
  },
  {
    id: 'creation-de-sites-web',
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
    detailsAr: 'اكتسب المهارة الرقمية الأكثر طلباً في سوق الشغل والعمل الحر. ستتعلم في هذا المسار التكنولوجي الشامل من الصفر كيفية بناء هيكلية المواقع الإلكترونية، تصميم وتنسيق المظهر الخارجي بإتقان وتوافقه مع كافة شاشات الأجهزة والهواتف الذكية، تم إضافة لمسات ديناميكية وتفاعلية ذكية باستخدام لغة البرمجة JavaScript لإنشاء نماذج ومؤثرات تحريك بصرية ممتعة.',
    detailsFr: 'Entrez de plain-pied dans l\'ingénierie web. Cette formation pratique et structurée vous guide de l\'écriture de vos premières balises à la publication de sites complets. Vous apprendrez à structurer avec HTML5, à mettre en forme avec élégance grâce aux outils CSS3 modernes (Flexbox, CSS Grid), et à programmer l\'interactivité de vos pages à l\'aide de scripts JavaScript dynamiques.',
    lessons: [
      {
        titleAr: 'تأسيس بيئة العمل وكتابة وتصميم هيكل صفحة الويب باستخدام HTML5',
        titleFr: 'Configuration de l\'éditeur de code et sémantique HTML5 de base',
        durationAr: '4 ساعات',
        durationFr: '4 heures'
      },
      {
        titleAr: 'تنسيق صفحات الويب وتصميم التخطيطات الحديثة باستعمال CSS3 Flexbox & Grid',
        titleFr: 'Mise en page, stylisation moderne et gestion des mises en page CSS3',
        durationAr: '5 ساعات',
        durationFr: '5 heures'
      },
      {
        titleAr: 'برمجة المواقع لتتلاءم تلقائياً مع الهواتف الذكية والأجهزة اللوحية (Responsive)',
        titleFr: 'Conception web réactive (Media Queries et adaptabilité mobile)',
        durationAr: '5 ساعات',
        durationFr: '5 heures'
      },
      {
        titleAr: 'مدخل إلى لغة البرمجة JavaScript (المتغيرات، الدوال، والتفاعلات الأساسية)',
        titleFr: 'Algorithmique de base et variables en JavaScript interactif',
        durationAr: '6 ساعات',
        durationFr: '6 heures'
      },
      {
        titleAr: 'التحكم في عناصر الصفحة (DOM) وتطوير نماذج تسجيل تفاعلية ومؤثرات حركية',
        titleFr: 'Manipulation du DOM, écouteurs d\'événements et animations interactives',
        durationAr: '6 ساعات',
        durationFr: '6 heures'
      },
      {
        titleAr: 'المشروع النهائي: بناء محفظة أعمال شخصية (Portfolio) أو متجر إلكتروني مبسط ونشره حياً على الإنترنت',
        titleFr: 'Projet final : Hébergement et déploiement en ligne d\'un projet de site pro',
        durationAr: '6 ساعات',
        durationFr: '6 heures'
      }
    ]
  },
  {
    id: 'informatique-et-bureautique',
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
    detailsAr: 'المسار التدريبي الأساسي والحيوي لكل موظف، إداري، أو طالب جامعي يرغب في تنظيم وإدارة عمله اليومي بكفاءة واحترافية. سنعلمك أسرار نظام التشغيل Windows وإدارة الملفات السحابية والفيزيائية بأمان، بالإضافة لكتابة وتنسيق التقارير الإدارية والمراسلات الرسمية على Microsoft Word، إجراء العمليات الحسابية وتصميم المخططات البيانية على Excel، وتصميم عروض بصرية جذابة على PowerPoint لتبهر بها زملاءك ومدراءك.',
    detailsFr: 'La formation essentielle indispensable pour s\'insérer avec succès dans le monde professionnel et administratif. Ce cours vous guide pas à pas dans l\'utilisation fluide de l\'environnement Windows, la rédaction administrative sur Word (courriers, rapports paginés), l\'automatisation de calculs et tableaux de bord financiers sur Excel, et la création de diaporamas PowerPoint clairs et percutants.',
    lessons: [
      {
        titleAr: 'أساسيات الكمبيوتر ونظام Windows، إدارة الملفات واستخدام لوحة التحكم',
        titleFr: 'Architecture du PC, système Windows, raccourcis et gestion des répertoires',
        durationAr: '3 ساعات',
        durationFr: '3 heures'
      },
      {
        titleAr: 'Microsoft Word: تحرير النصوص، الجداول، التنسيق المتقدم وإعداد التقارير الإدارية',
        titleFr: 'Microsoft Word : Mise en page, styles de titres, insertion de tableaux',
        durationAr: '4 ساعات',
        durationFr: '4 heures'
      },
      {
        titleAr: 'Microsoft Excel الأساسي: الخلايا، إدخال البيانات، العمليات الأربع والتنسيق الشرطي',
        titleFr: 'Microsoft Excel de base : Gestion des feuilles de calcul, formats de cellules',
        durationAr: '4 ساعات',
        durationFr: '4 heures'
      },
      {
        titleAr: 'Microsoft Excel المتقدم: الدوال الحسابية والشرطية الكبرى وتصميم الجداول والمخططات',
        titleFr: 'Excel Avancé : Formules logiques (SI, RECHERCHEV), graphiques et analyses',
        durationAr: '4 ساعات',
        durationFr: '4 heures'
      },
      {
        titleAr: 'Microsoft PowerPoint: تصميم الشرائح وتأثيرات الانتقال وإعداد العروض التقديمية',
        titleFr: 'PowerPoint : Diaporama pro, animations, transitions et présentation orale',
        durationAr: '3 ساعات',
        durationFr: '3 heures'
      }
    ]
  },
  {
    id: 'agent-hse',
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
    detailsAr: 'تعتبر شهادة وكيل الأمن والسلامة والبيئة (HSE) من أكثر الشهادات طلباً وقيمة في المصانع الكبرى، شركات النفط، ومواقع البناء والأشغال العمومية. يغطي هذا البرنامج التدريبي الأكاديمي القوانين المنظمة للوقاية والأمن، طرق تحديد المخاطر وتقييمها الميداني، صياغة خطط الإخلاء والنجدة، التعامل والوقاية من الحرائق، الإسعافات الأولية الأساسية المنقذة للحياة، وكيفية حماية بيئة العمل من التلوث الصناعي.',
    detailsFr: 'Une qualification de premier plan et obligatoire dans les secteurs de la construction, de l\'énergie et de l\'industrie. Ce cursus certifiant complet vous enseigne la législation en vigueur, la méthodologie d\'évaluation des risques professionnels (document unique), la rédaction des plans de prévention, l\'utilisation des EPI, les procédures d\'évacuation en cas d\'urgence, la lutte contre l\'incendie et les gestes de premiers secours d\'urgence.',
    lessons: [
      {
        titleAr: 'المفاهيم الأساسية للصحة والسلامة والبيئة والتشريعات والقوانين المعمول بها',
        titleFr: 'Concepts fondamentaux, législation et cadre réglementaire de la sécurité',
        durationAr: '5 ساعات',
        durationFr: '5 heures'
      },
      {
        titleAr: 'تحليل وتقييم المخاطر الميدانية وكتابة تقارير مراجعة وتفتيش السلامة',
        titleFr: 'Analyse et cartographie des risques professionnels et visites de sécurité',
        durationAr: '6 ساعات',
        durationFr: '6 heures'
      },
      {
        titleAr: 'معدات الوقاية الشخصية (EPI) وأجهزة رصد الغازات والمخاطر الكيميائية',
        titleFr: 'Équipements de protection collective et individuelle et risques chimiques',
        durationAr: '6 ساعات',
        durationFr: '6 heures'
      },
      {
        titleAr: 'الوقاية ومكافحة الحرائق: استخدام المطفآت، خراطيم المياه، والغازات الخاملة',
        titleFr: 'Sécurité incendie : Types de feux, utilisation des extincteurs et alarmes',
        durationAr: '7 ساعات',
        durationFr: '7 heures'
      },
      {
        titleAr: 'الإسعافات الأولية الأساسية، الإنعاش القلبي الرئوي، وإخلاء المصابين',
        titleFr: 'Secourisme au travail, massage cardiaque, brûlures et évacuations d\'urgence',
        durationAr: '10 ساعات',
        durationFr: '10 heures'
      },
      {
        titleAr: 'إدارة النفايات الصناعية وحماية البيئة المحيطة من التلوث',
        titleFr: 'Management environnemental, tri des déchets industriels et pollution',
        durationAr: '8 ساعات',
        durationFr: '8 heures'
      }
    ]
  },
  {
    id: 'photographie-professionnelle',
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
    detailsAr: 'دورة تطبيقية فريدة للمبدعين والهواة البصريين. ستتعلم فيها مثلث التعريض (فتحة العدسة، سرعة الغالق، والآيزو)، التكوين الفني وقواعد الإطار الذهبية، كيفية توجيه الموديل، أساسيات ومخططات الإضاءة داخل الأستوديو باستخدام الفلاشات والمصادر المستمرة، بالإضافة لمهارات معالجة الألوان وتصحيح العيوب باحترافية على Photoshop وLightroom لبناء محفظة أعمال (Portfolio) مبهرة للزبائن.',
    detailsFr: 'Découvrez l\'art et la technique de la prise de vue photographique pro. Ce cursus vous apprendra à régler manuellement votre boîtier reflex ou hybride (vitesse, ouverture, sensibilité ISO), à maîtriser la composition de l\'image (règle des tiers, perspectives), à mettre en scène un modèle et à modeler la lumière en studio de portrait ou de produit. Vous apprendrez enfin à sublimer vos fichiers RAW à l\'aide d\'outils d\'Adobe Lightroom & Photoshop.',
    lessons: [
      {
        titleAr: 'مبادئ تشغيل الكاميرات، فهم العدسات ومثلث التعريض بالكامل',
        titleFr: 'Fonctionnement du boîtier reflex/hybride, focales et triangle d\'exposition',
        durationAr: '3 ساعات',
        durationFr: '3 heures'
      },
      {
        titleAr: 'قواعد التكوين البصري والنسبة الذهبية وتأثير المسافات البؤرية',
        titleFr: 'Règles de composition de l\'image, perspective et profondeur de champ',
        durationAr: '3 ساعات',
        durationFr: '3 heures'
      },
      {
        titleAr: 'الإضاءة الطبيعية والاصطناعية: استخدام فلاشات الاستوديو والمشتتات الكبرى',
        titleFr: 'Lumière naturelle vs studio : modeleurs, flashs cobra et boîtes à lumière',
        durationAr: '4 ساعات',
        durationFr: '4 heures'
      },
      {
        titleAr: 'تصوير البورتريه، تصوير المنتجات التجاري وتوجيه الأشخاص',
        titleFr: 'Prise de vue portrait, packshot de produits et direction artistique',
        durationAr: '5 ساعات',
        durationFr: '5 heures'
      },
      {
        titleAr: 'تحرير الصور بالفوتوشوب واللايت روم: تصحيح الألوان، الفلترة وإزالة العيوب',
        titleFr: 'Post-production sur Lightroom et Photoshop : étalonnage et retouche beauté',
        durationAr: '5 ساعات',
        durationFr: '5 heures'
      }
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    authorAr: 'مريم بن ساسي',
    authorFr: 'Meriem Bensassi',
    roleAr: 'خريجة مسار الخياطة وتصميم الملابس - صاحبة مشروع "Meriem Couture"',
    roleFr: 'Diplômée Couture & Stylisme - Fondatrice de "Meriem Couture"',
    rating: 5,
    contentAr: 'بفضل التكوين التطبيقي والعملي في مدرسة رافا، تمكنت من تعلم تفصيل الباترونات والخياطة من الصفر تماماً تحت إشراف الأستاذ رشيد. اليوم، أملك ورشة خاصة بي وأقوم بتفصيل فساتين المناسبات والقفطان التقليدي لزبائن من مختلف ربوع الوطن.',
    contentFr: 'Grâce à la formation chez Rafa School, j\'ai appris le modélisme et la couture à partir de zéro avec l\'accompagnement de M. Rachid. Aujourd\'hui, j\'ai ouvert mon propre atelier et je réalise des tenues de soirée et des caftans d\'exception.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'
  },
  {
    id: 'test-2',
    authorAr: 'خالد بلعيد',
    authorFr: 'Khaled Belaid',
    roleAr: 'خريج مسار وكيل الأمن والسلامة HSE - يعمل الآن كمراقب سلامة بشركة مقاولات',
    roleFr: 'Diplômé Agent HSE - Actuellement Superviseur HSE dans le BTP',
    rating: 5,
    contentAr: 'تكوين مدرسة رافا المتميز منحني المعارف الميدانية والشهادة المعتمدة التي فتحت لي الأبواب فوراً في سوق الشغل بمجال الأشغال العمومية والوقاية من مخاطر العمل. الشرح كان تطبيقياً والمدربون حريصون على أدق التفاصيل الأمنية.',
    contentFr: 'Le cursus HSE de Rafa School m\'a permis d\'obtenir un diplôme reconnu par l\'État qui m\'a ouvert les portes de l\'emploi très rapidement. Les formateurs sont des professionnels du terrain qui maîtrisent parfaitement la sécurité industrielle.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80'
  }
];
