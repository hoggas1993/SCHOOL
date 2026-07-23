import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, X, Send, Sparkles, MessageSquare, ArrowRight, ArrowLeft } from 'lucide-react';

interface AIChatbotProps {
  lang: 'ar' | 'fr';
}

interface Message {
  id: string;
  sender: 'bot' | 'user';
  textFr: string;
  textAr: string;
  timestamp: Date;
}

export default function AIChatbot({ lang }: AIChatbotProps) {
  const isAr = lang === 'ar';
  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial greeting messages
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      textFr: "Bonjour ! Je suis l'assistant virtuel de Rafa School. Comment puis-je vous aider aujourd'hui ? Choisissez une question fréquente ou écrivez votre message.",
      textAr: "مرحباً بك! أنا المساعد الافتراضي لمدرسة رافا للتكوين المهني. كيف يمكنني مساعدتك اليوم؟ يمكنك اختيار أحد الأسئلة الشائعة أو كتابة استفسارك هنا.",
      timestamp: new Date()
    }
  ]);

  // Scroll to bottom whenever messages or typing state changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Bilingual Knowledge Base for instant replies
  const faqReplies = [
    {
      keywords: ['inscription', 'admissions', 's\'inscrire', 'comment', 'سجل', 'تسجيل', 'كيفاش', 'شروط'],
      replyFr: "📝 **Comment s'inscrire à Rafa School :**\n\n1. **Conditions :** Nos formations sont ouvertes à tous sans prérequis de niveau académique.\n2. **Dossier requis :** Une copie de votre pièce d'identité nationale, 2 photos d'identité et les frais d'inscription.\n3. **Facilités :** Nous acceptons le paiement par tranches (facilités de paiement) pour toutes nos formations !\n\nSouhaitez-vous recevoir le formulaire d'inscription en ligne ?",
      replyAr: "📝 **كيفية التسجيل في مدرسة رافا:**\n\n1. **الشروط:** دوراتنا مفتوحة للجميع ولا تشترط مستوى دراسي معين للبدء.\n2. **الملف المطلوب:** نسخة من بطاقة التعريف الوطنية، صورتين شمسيتين، ورسوم التسجيل.\n3. **التسهيلات:** نحن ندعم الدفع بالتقسيط المريح لجميع دوراتنا التدريبية لتسهيل مساركم المهني!\n\nهل ترغب في فتح استمارة التسجيل الفوري الآن؟"
    },
    {
      keywords: ['couture', 'خياطة', 'تفصيل', 'مودرن', 'طرز'],
      replyFr: "🪡 **Formation Couture Moderne & Modélisme :**\n\n* **Durée :** Formations accélérées de 3 mois à 6 mois (cours de semaine ou de weekend).\n* **Contenu :** Maîtrise des machines, prise de mesures, patronage, coupe, assemblage et finitions professionnelles pour haute couture.\n* **Avantage :** 100% pratique en atelier équipé de machines industrielles.\n* **Diplôme :** Attestation de qualification agréée facilitant l'accès au crédit d'aide de l'État.",
      replyAr: "🪡 **دورة الخياطة العصرية وتصميم الأزياء:**\n\n* **المدة:** دورات سريعة ومكثفة من 3 إلى 6 أشهر (حصص خلال أيام الأسبوع أو في نهاية الأسبوع).\n* **المحتوى:** تمكين كامل من الماكينات، أخذ القياسات، رسم الباترونات، القص، الخياطة الاحترافية لملابس النساء والأطفال.\n* **الميزة:** تطبيق عملي 100% في ورشة مجهزة بالكامل بالآلات الصناعية الحديثة.\n* **الشهادة:** شهادة تأهيلية معتمدة تمكنكم من فتح مشروعكم الخاص والاستفادة من آليات الدعم."
    },
    {
      keywords: ['web', 'برمجة', 'ويب', 'تطوير', 'برمجيات', 'dev', 'informatique'],
      replyFr: "💻 **Formation Full-Stack Web Developer :**\n\n* **Durée :** 4 mois intensifs.\n* **Technologies enseignées :** HTML5, CSS3, Tailwind, JavaScript, React.js, Node.js, Express et bases de données SQL/NoSQL.\n* **Pratique :** Développement de projets réels et d'un portfolio complet pour postuler en entreprise ou travailler en Freelance.\n* **Prérequis :** Maîtrise de base de l'ordinateur, aucune expérience préalable en programmation requise !",
      replyAr: "💻 **دورة مطور الويب الشامل (Full-Stack):**\n\n* **المدة:** 4 أشهر مكثفة.\n* **التقنيات المدرجة:** HTML5, CSS3, Tailwind, JavaScript, React.js, Node.js, Express وقواعد البيانات.\n* **الجانب التطبيقي:** تطوير مشاريع حقيقية وبناء معرض أعمال متكامل للتقدم للشركات أو العمل الحر (Freelance).\n* **المتطلبات:** مهارات أساسية في استخدام الحاسوب، ولا تشترط أي خبرة سابقة في البرمجة!"
    },
    {
      keywords: ['hse', 'أمن', 'سلامة', 'بيئة', 'securite', 'hygiene'],
      replyFr: "🛡️ **Formations HSE (Hygiène, Sécurité, Environnement) :**\n\n* **Niveaux disponibles :** Agent HSE, Inspecteur HSE, et Superviseur HSE.\n* **Public :** Étudiants, professionnels en reconversion, ou personnel d'entreprise.\n* **Avantages :** Conforme aux normes réglementaires internationales et algériennes. Animé par des experts agréés du domaine.\n* **Débouchés :** Secteur pétrolier, chantiers de construction, usines, télécoms, etc.",
      replyAr: "🛡️ **دورات الأمن، السلامة والصحة المهنية (HSE):**\n\n* **المستويات المتاحة:** عون HSE، مفتش HSE، ومشرف HSE.\n* **الفئات المستهدفة:** الطلاب، المهنيون الراغبون في تغيير مسارهم، أو عمال المؤسسات.\n* **المزايا:** مطابقة تماماً للقوانين الجزائرية والمعايير الدولية. يؤطرها خبراء معتمدون.\n* **فرص العمل:** قطاعات المحروقات، شركات المقاولات، المصانع، الاتصالات، وغيرها."
    },
    {
      keywords: ['diplome', 'certificat', 'agrement', 'معتمد', 'شهادة', 'دبلوم'],
      replyFr: "📜 **Agrément & Diplômes de l'école :**\n\n* Rafa School est un institut de formation professionnelle **agréé par l'État** (Ministère de la Formation et de l'Enseignement Professionnels).\n* À la fin de chaque cursus, vous passez une évaluation et obtenez une **Attestation de qualification professionnelle** officielle reconnue par l'État et le secteur privé, idéale pour vos CV et projets d'entrepreneuriat.",
      replyAr: "📜 **الاعتماد والشهادات لمدرسة رافا:**\n\n* مدرسة رافا هي معهد تكوين مهني **معتمد مرخص من طرف الدولة** (وزارة التكوين والتعليم المهنيين).\n* في نهاية كل برنامج تدريبي، تجتازون تقييماً تطبيقياً وتحصلون على **شهادة تأهيل مهني رسمية** معترف بها لدى مصالح الدولة والقطاع الخاص، وهي مثالية لتعزيز سيرتكم الذاتية أو الحصول على قروض دعم المشاريع."
    },
    {
      keywords: ['adresse', 'contact', 'telephone', 'lieu', 'عنوان', 'هاتف', 'مكان', 'تلفون', 'وين'],
      replyFr: "📍 **Contact & Localisation de Rafa School :**\n\n* **Adresse :** Bir El Djir, Oran (Algérie).\n* **Téléphone :** \n  - Service Inscriptions : `+213 542 58 12 26` \n  - Administration : `+213 773 97 69 98` \n* **Horaires :** Ouvert du Samedi au Jeudi de 08:30 à 17:00.\n\nVous êtes les bienvenus pour visiter nos locaux !",
      replyAr: "📍 **الاتصال والعنوان لمدرسة رافا:**\n\n* **العنوان:** بئر الجير، وهران (الجزائر).\n* **الهاتف:** \n  - خدمة التسجيلات: `0542 58 12 26` \n  - الإدارة العامة: `0773 97 69 98` \n* **أوقات العمل:** مفتوح من السبت إلى الخميس من 08:30 صباحاً إلى 05:00 مساءً.\n\nمرحباً بكم لزيارتنا ومعاينة ورشاتنا وقاعاتنا التكوينية!"
    }
  ];

  // Helper to trigger simulated typing response
  const triggerBotResponse = (userText: string) => {
    setIsTyping(true);

    setTimeout(() => {
      const cleanText = userText.toLowerCase().trim();
      let matchedReply = null;

      // Scan through keywords
      for (const faq of faqReplies) {
        if (faq.keywords.some(keyword => cleanText.includes(keyword))) {
          matchedReply = faq;
          break;
        }
      }

      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        timestamp: new Date(),
        textFr: matchedReply 
          ? matchedReply.replyFr 
          : "💡 Je ne suis pas sûr de bien comprendre. Je vous invite à me poser des questions sur : nos formations (**Couture, Développement Web, HSE**), nos **tarifs/inscriptions**, nos **diplômes** ou notre **adresse/contact**.",
        textAr: matchedReply
          ? matchedReply.replyAr
          : "💡 لست متأكداً من فهم استفسارك تماماً. تفضل بسؤالي حول: دوراتنا (**الخياطة، البرمجة، HSE**)، **الأسعار والتسجيل**، **الشهادات المعتمدة** أو **عنوان المدرسة وهاتفنا**."
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000); // 1-second dynamic response delay
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      textFr: inputText.trim(),
      textAr: inputText.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const textToMatch = inputText;
    setInputText('');
    triggerBotResponse(textToMatch);
  };

  // Quick action options
  const quickActions = [
    { labelFr: '📝 Inscriptions', labelAr: '📝 شروط التسجيل', trigger: 'inscription' },
    { labelFr: '🪡 Couture Moderne', labelAr: '🪡 دورة الخياطة', trigger: 'couture' },
    { labelFr: '💻 Dev Web Web', labelAr: '💻 دورة البرمجة', trigger: 'web' },
    { labelFr: '🛡️ HSE Sécurité', labelAr: '🛡️ الأمن والسلامة HSE', trigger: 'hse' },
    { labelFr: '📜 Diplômes Agréés', labelAr: '📜 الاعتماد والشهادة', trigger: 'diplome' },
    { labelFr: '📍 Adresse & Localisation', labelAr: '📍 العنوان والاتصال', trigger: 'adresse' },
  ];

  const handleQuickAction = (trigger: string) => {
    // Add fake user message representing the action
    const actionLabel = quickActions.find(qa => qa.trigger === trigger);
    const label = actionLabel ? (isAr ? actionLabel.labelAr : actionLabel.labelFr) : trigger;
    
    const userMsg: Message = {
      id: `user-action-${Date.now()}`,
      sender: 'user',
      textFr: label,
      textAr: label,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    triggerBotResponse(trigger);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-3 font-sans">
      
      {/* AI Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="w-[320px] sm:w-[380px] h-[500px] bg-white rounded-3xl shadow-2xl border border-sand/60 overflow-hidden text-charcoal flex flex-col justify-between"
            style={{ direction: isAr ? 'rtl' : 'ltr' }}
          >
            {/* Elegant Header */}
            <div className="bg-gradient-to-br from-[#0A3EA6] to-brand-sky p-4 text-white relative flex-shrink-0">
              <div className="absolute top-0 left-0 w-20 h-20 bg-white/5 rounded-full blur-lg"></div>
              
              <button
                onClick={() => setIsOpen(false)}
                className={`absolute top-4 p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer ${
                  isAr ? 'left-4' : 'right-4'
                }`}
                aria-label={isAr ? "إغلاق نافذة مساعد الذكاء الاصطناعي" : "Fermer l'assistant virtuel intelligent de Rafa School"}
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-cream/10 border border-white/20 flex items-center justify-center text-gold shrink-0">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-black text-xs sm:text-sm tracking-wide text-white flex items-center gap-1.5">
                    {isAr ? 'مساعد رافا الافتراضي' : 'Assistant IA Rafa'}
                    <Sparkles className="w-3 h-3 text-gold fill-gold" />
                  </h4>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-[9px] text-white/70">
                      {isAr ? 'يجيبك فورا وبذكاء' : 'Réponse instantanée'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Scrolling Chat Content Area */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-sand/5">
              
              {/* Message History */}
              {messages.map((msg) => {
                const isBot = msg.sender === 'bot';
                return (
                  <div
                    key={msg.id}
                    className={`flex ${isBot ? 'justify-start' : 'justify-end'} items-end gap-1.5`}
                  >
                    {isBot && (
                      <div className="w-6 h-6 rounded-full bg-brand-deep flex items-center justify-center text-white shrink-0 text-[10px]">
                        <Bot className="w-3.5 h-3.5" />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs shadow-xs leading-relaxed ${
                        isBot
                          ? 'bg-white border border-sand text-charcoal rounded-bl-none font-sans'
                          : 'bg-brand-deep text-cream rounded-br-none'
                      }`}
                    >
                      {/* Process simple bold and list symbols for beautiful UI representation */}
                      <p className="whitespace-pre-line">
                        {isAr ? msg.textAr : msg.textFr}
                      </p>
                      
                      <span className="block text-[8px] mt-1 text-charcoal/30 text-right">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Real-time Typing simulator */}
              {isTyping && (
                <div className="flex justify-start items-end gap-1.5">
                  <div className="w-6 h-6 rounded-full bg-brand-deep flex items-center justify-center text-white shrink-0">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="bg-white border border-sand rounded-2xl rounded-bl-none px-4 py-3 flex gap-1">
                    <span className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick action buttons row (Horizontal scrollable) */}
            <div className="px-4 py-2 bg-white border-y border-sand/40 flex gap-2 overflow-x-auto scrollbar-none flex-shrink-0">
              {quickActions.map((qa, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickAction(qa.trigger)}
                  className="shrink-0 px-2.5 py-1.5 bg-sand/30 hover:bg-gold hover:text-white border border-sand text-charcoal/80 text-[10px] font-bold rounded-lg transition-all duration-300 cursor-pointer"
                >
                  {isAr ? qa.labelAr : qa.labelFr}
                </button>
              ))}
            </div>

            {/* Text Input Footer Form */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 bg-white border-t border-sand/50 flex gap-2 items-center flex-shrink-0"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={isAr ? 'اكتب رسالتك للمساعد الافتراضي...' : 'Posez votre question...'}
                aria-label={isAr ? 'رسالتك لمساعد الذكاء الاصطناعي' : 'Votre message pour l\'assistant virtuel'}
                className="flex-grow p-2.5 bg-sand/15 border border-sand rounded-xl font-sans text-xs text-charcoal outline-none focus:border-gold transition-colors"
              />
              <button
                type="submit"
                className="p-2.5 bg-brand-deep hover:bg-brand-medium text-cream rounded-xl transition-colors cursor-pointer"
                title={isAr ? 'إرسال' : 'Envoyer'}
                aria-label={isAr ? 'إرسال الرسالة للمساعد الذكي' : 'Envoyer le message à l\'assistant intelligent'}
              >
                {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </form>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Redesigned interactive robot chat assistant button */}
      <div className="flex items-center gap-3">
        {/* Main triggering FAB Robot */}
        <motion.button
          id="ai-chatbot-fab-btn"
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          animate={isOpen ? { y: 0 } : { y: [0, -5, 0] }}
          transition={isOpen ? {} : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.06, y: -2 }}
          whileTap={{ scale: 0.94 }}
          className="relative focus:outline-none cursor-pointer group shrink-0"
          aria-label={isAr ? "مساعد الذكاء الاصطناعي الافتراضي لمدرسة رافا" : "Assistant virtuel intelligent IA de Rafa School"}
        >
          {/* Subtle outer radiating aura */}
          {!isOpen && (
            <span className="absolute -inset-1.5 rounded-[22px] bg-gold/15 animate-pulse -z-10 blur-sm"></span>
          )}

          {/* THE ROBOT HEAD STRUCTURE */}
          <div className="relative flex flex-col items-center">
            
            {/* 1. Antenna */}
            <div className="flex flex-col items-center -mb-0.5 z-10">
              {/* Pulsating Glowing Antenna LED Bulb */}
              <div className={`w-2.5 h-2.5 rounded-full shadow-lg transition-colors duration-300 ${
                isOpen 
                  ? 'bg-rose-500 shadow-rose-500/50 animate-pulse' 
                  : 'bg-gold shadow-gold/50 animate-pulse'
              }`} />
              {/* Antenna Metal Rod */}
              <div className="w-1 h-2 bg-charcoal/40 border border-sand/40 rounded-t-full" />
            </div>

            {/* 2. Main Head & Face Container */}
            <div className={`w-[58px] h-[50px] rounded-[20px] p-1.5 flex items-center justify-center relative transition-all duration-300 shadow-xl ${
              isOpen 
                ? 'bg-charcoal border-2 border-sand/40' 
                : 'bg-gradient-to-b from-brand-deep via-brand-medium to-charcoal border-2 border-gold/50 hover:border-gold shadow-[0_4px_20px_rgba(212,175,55,0.2)]'
            }`}>
              
              {/* Side Ears / Headphone structures */}
              <div className="absolute -left-1.5 top-[35%] w-1.5 h-4.5 bg-charcoal/90 rounded-l-md border border-sand/30" />
              <div className="absolute -right-1.5 top-[35%] w-1.5 h-4.5 bg-charcoal/90 rounded-r-md border border-sand/30" />

              {/* High-tech Face Screen */}
              <div className="w-full h-full bg-slate-950/90 rounded-xl p-1 flex flex-col justify-center items-center shadow-inner relative overflow-hidden">
                
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    // Close 'X' Screen State
                    <motion.div
                      key="screen-close"
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.6 }}
                      className="flex items-center justify-center text-rose-400 drop-shadow-[0_0_4px_rgba(239,68,68,0.7)]"
                    >
                      <X className="w-5 h-5 font-bold" />
                    </motion.div>
                  ) : (
                    // Friendly Robot Expression State (Eyes & Smile)
                    <motion.div
                      key="screen-bot"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center space-y-1 w-full"
                    >
                      {/* Two Glowing Eyes */}
                      <div className="flex items-center justify-center gap-1.5">
                        {/* Left Eye */}
                        <motion.div 
                          animate={{ scaleY: [1, 1, 0.1, 1] }}
                          transition={{ duration: 4, repeat: Infinity, times: [0, 0.94, 0.96, 1] }}
                          className="w-2.5 h-3 bg-gold rounded-full shadow-[0_0_8px_#d4af37]"
                        />
                        {/* Right Eye */}
                        <motion.div 
                          animate={{ scaleY: [1, 1, 0.1, 1] }}
                          transition={{ duration: 4, repeat: Infinity, times: [0, 0.94, 0.96, 1] }}
                          className="w-2.5 h-3 bg-gold rounded-full shadow-[0_0_8px_#d4af37]"
                        />
                      </div>

                      {/* Small Curve Smile */}
                      <div className="w-4 h-1 bg-gold/80 rounded-b-full shadow-[0_0_3px_#d4af37]" />
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>

          </div>

          {/* Red Notification Counter Dot */}
          {!isOpen && (
            <span className="absolute top-1 right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-rose-500"></span>
            </span>
          )}
        </motion.button>

        {/* Floating Tooltip Label */}
        <AnimatePresence>
          {hovered && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: -12, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -12, scale: 0.95 }}
              className="bg-white px-3.5 py-2 rounded-2xl shadow-xl border border-sand/60 text-xs font-bold text-charcoal flex items-center gap-1.5 hidden sm:flex whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold animate-spin-slow shrink-0" />
              <span>
                {isAr ? 'مرحباً! أنا رفيقك الذكي، اضغط للتحدث معي' : 'Bonjour ! Je suis votre assistant virtuel'}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
