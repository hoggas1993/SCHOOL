import React, { useState } from 'react';
import { Mail, User, Sparkles, Send, Check } from 'lucide-react';
import { useToast } from './Toast';

interface NewsletterProps {
  lang: 'ar' | 'fr';
}

export default function Newsletter({ lang }: NewsletterProps) {
  const isAr = lang === 'ar';
  const { addToast } = useToast();
  
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !email.includes('@')) return;

    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      addToast(
        `🎉 شكراً لتسجيلك يا ${name}! سنبقيك على اطلاع بكل جديد.`,
        `🎉 Merci pour votre inscription, ${name} ! Nous vous tiendrons informé.`,
        'success'
      );
      setName('');
      setEmail('');
    }, 1200);
  };

  return (
    <section 
      id="newsletter-section" 
      className="py-16 bg-cream border-t border-sand relative overflow-hidden transition-all duration-300"
    >
      {/* Decorative ambient backgrounds */}
      <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-gold/5 blur-3xl pointer-events-none" />
      <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-brand-sky/5 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-sand/35 hover:bg-sand/45 border border-sand/70 rounded-3xl p-8 sm:p-12 text-center transition-all duration-300 shadow-sm">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-gold/10 text-gold rounded-full mb-6">
            <Sparkles className="w-4 h-4 fill-current animate-pulse" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider">
              {isAr ? 'مجتمع مدرسة رافا المتنامي' : 'LA COMMUNAUTÉ RAFA SCHOOL'}
            </span>
          </div>

          {/* Heading and subtext */}
          <h2 className="font-display font-black text-2xl sm:text-3xl text-charcoal tracking-tight mb-4 max-w-xl mx-auto leading-tight">
            {isAr ? 'انضم إلى مجتمعنا الإبداعي والمهني' : 'Rejoignez notre communauté créative'}
          </h2>
          <p className="font-sans text-xs sm:text-sm text-charcoal/65 leading-relaxed max-w-xl mx-auto mb-8">
            {isAr ? (
              'احصل أولاً على العروض الحصرية والدروس البرمجية المجانية، بالإضافة إلى إعلانات معسكراتنا الصيفية وورش العمل التطبيقية الحية.'
            ) : (
              'Soyez parmi les premiers à recevoir nos guides de design, tutoriels exclusifs et les annonces de nos nouveaux bootcamps pratiques.'
            )}
          </p>

          {status === 'success' ? (
            <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl max-w-md mx-auto space-y-3 animate-fade-in">
              <div className="w-12 h-12 rounded-full bg-emerald-500 text-cream flex items-center justify-center mx-auto shadow-sm">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <h3 className="font-display font-bold text-sm sm:text-base text-charcoal">
                {isAr ? 'تم الاشتراك بنجاح!' : 'Inscription réussie !'}
              </h3>
              <p className="font-sans text-xs text-charcoal/70 leading-relaxed">
                {isAr ? (
                  'شكراً لتسجيلك. لقد أضفناك بنجاح إلى قائمتنا البريدية الخاصة لتلقي كل جديد ومميز قريباً.'
                ) : (
                  'Merci pour votre intérêt ! Vous recevrez bientôt nos meilleures opportunités et contenus éducatifs directement.'
                )}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Full Name Input */}
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-charcoal/45">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    id="newsletter-name-input"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={isAr ? 'الاسم الكامل...' : 'Votre nom complet...'}
                    className="w-full ps-10 pe-4 py-3 bg-cream border border-sand-dark/15 focus:border-gold rounded-2xl font-sans text-xs text-charcoal focus:outline-none transition-all duration-300 placeholder:text-charcoal/40"
                    disabled={status === 'loading'}
                  />
                </div>

                {/* Email Input */}
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-charcoal/45">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    id="newsletter-email-input"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={isAr ? 'البريد الإلكتروني...' : 'Votre e-mail...'}
                    className="w-full ps-10 pe-4 py-3 bg-cream border border-sand-dark/15 focus:border-gold rounded-2xl font-sans text-xs text-charcoal focus:outline-none transition-all duration-300 placeholder:text-charcoal/40"
                    disabled={status === 'loading'}
                  />
                </div>

              </div>

              {/* Submit Button */}
              <button
                id="newsletter-submit-btn"
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3 bg-charcoal hover:bg-gold hover:text-cream text-cream font-sans text-xs font-black tracking-wider uppercase rounded-2xl transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 shadow-sm"
              >
                {status === 'loading' ? (
                  <div className="w-5 h-5 border-2 border-cream border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>{isAr ? 'انضم إلى النشرة البريدية' : "S'abonner à la Newsletter"}</span>
                    <Send className={`w-3.5 h-3.5 ${isAr ? 'rotate-180' : ''}`} />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Social Proof / Community metrics */}
          <div className="mt-8 pt-6 border-t border-sand/50 max-w-md mx-auto">
            <p className="font-mono text-[10px] sm:text-xs text-charcoal/40 uppercase tracking-wider">
              {isAr ? 'انضم إلى أكثر من 2,500 طالب وخريج مسجلين بالفعل.' : 'Rejoignez plus de 2 500 étudiants et diplômés déjà inscrits.'}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
