import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Instagram, Facebook, Compass, Award, Navigation, Clock, Train, Car } from 'lucide-react';

interface ContactMapProps {
  lang: 'ar' | 'fr';
}

export default function ContactMap({ lang }: ContactMapProps) {
  const isAr = lang === 'ar';

  // State for transit calculator
  const [startPoint, setStartPoint] = useState<string>('');
  const [routeInfo, setRouteInfo] = useState<{
    distance: string;
    drivingTime: string;
    tramTime: string;
  } | null>(null);

  const calculateRoute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!startPoint.trim()) return;

    // Simulated local Algiers routes for true-to-life interaction
    const search = startPoint.toLowerCase();
    if (search.includes('dar el beida') || search.includes('الدار البيضاء')) {
      setRouteInfo({ distance: '4.2 km', drivingTime: '8 min', tramTime: '12 min' });
    } else if (search.includes('rouiba') || search.includes('رويبة')) {
      setRouteInfo({ distance: '8.5 km', drivingTime: '15 min', tramTime: '20 min' });
    } else if (search.includes('bordj el kiffan') || search.includes('برج الكيفان')) {
      setRouteInfo({ distance: '5.1 km', drivingTime: '10 min', tramTime: '14 min' });
    } else if (search.includes('boushaki') || search.includes('بوسحاقي')) {
      setRouteInfo({ distance: '0.3 km', drivingTime: '1 min', tramTime: '3 min' });
    } else {
      // General default route
      setRouteInfo({ distance: '3.0 km', drivingTime: '7 min', tramTime: '11 min' });
    }
  };

  const socialLinks = [
    { labelAr: 'إنستغرام', labelFr: 'Instagram', handle: '@rafaschool25', color: 'hover:text-pink-500' },
    { labelAr: 'فيسبوك', labelFr: 'Facebook', handle: 'Rafa School', color: 'hover:text-blue-500' },
    { labelAr: 'تيك توك', labelFr: 'TikTok', handle: '@rafaschool.tok', color: 'hover:text-emerald-400' },
  ];

  return (
    <section id="contact" className="py-20 bg-charcoal text-cream relative overflow-hidden transition-all duration-300">
      
      {/* Visual background lights */}
      <div className="absolute top-1/4 left-10 w-[300px] h-[300px] bg-gold/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 right-10 w-[250px] h-[250px] bg-purple-accent/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left / Top Side: Contact forms and Skew typography */}
          <div className="lg:col-span-6 space-y-12">
            
            <div>
              <span className="font-mono text-[10px] font-bold text-gold uppercase tracking-widest block mb-2">
                {isAr ? 'تواصل معنا الآن' : 'DISCUTONS ENSEMBLE'}
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-cream">
                {isAr ? 'دعنا نبني تحفتك القادمة' : 'Façonnons vos projets'}
              </h2>
              <p className="font-sans text-xs sm:text-sm text-cream/60 leading-relaxed mt-4 max-w-lg">
                {isAr ? (
                  'هل لديك استفسار عن التكوينات المتاحة، شروط التسجيل، أو ترغب في زيارة مقرنا في باب الزوار بالجزائر؟ فريق الإرشاد متاح للرد عليكم.'
                ) : (
                  'Que ce soit pour une question sur les cursus, les inscriptions ou simplement pour planifier une visite à notre école de Bab Ezzouar.'
                )}
              </p>
            </div>

            {/* Skew Typography Social Links */}
            <div className="space-y-4">
              <h3 className="font-mono text-xs font-bold text-gold uppercase tracking-wider">
                {isAr ? 'تابعنا على شبكاتنا الاجتماعية' : 'SUIVEZ NOTRE QUOTIDIEN'}
              </h3>
              
              <div className="flex flex-col gap-3">
                {socialLinks.map((social, i) => (
                  <a
                    id={`social-link-${i}`}
                    key={i}
                    href="#social"
                    className={`group flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all duration-500 transform hover:-skew-x-6 cursor-pointer`}
                  >
                    <span className="font-display font-bold text-base sm:text-lg text-cream transition-transform duration-300 group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5">
                      {isAr ? social.labelAr : social.labelFr}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-cream/40 group-hover:text-gold transition-colors duration-300">
                        {social.handle}
                      </span>
                      {social.labelFr === 'Facebook' ? (
                        <Facebook className={`w-4 h-4 text-cream/30 ${social.color} transition-colors duration-300`} />
                      ) : (
                        <Instagram className={`w-4 h-4 text-cream/30 ${social.color} transition-colors duration-300`} />
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Float Cards Detail Contacts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Card 1: WhatsApp / Phone */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-gold/20 transition-all duration-300">
                <div className="w-9 h-9 rounded-xl bg-gold/10 flex items-center justify-center text-gold mb-3">
                  <Phone className="w-4 h-4" />
                </div>
                <h4 className="font-display font-bold text-xs text-cream mb-1">
                  {isAr ? 'الاتصال المباشر وواتساب' : 'Téléphone & WhatsApp'}
                </h4>
                <p className="font-mono text-xs text-cream/80 leading-relaxed">0542581226<br />0773976998</p>
                <p className="font-mono text-[10px] text-cream/40 mt-1">{isAr ? 'الأحد - الخميس | 08:30 - 17:30' : 'Dim - Jeu | 08h30 - 17h30'}</p>
              </div>

              {/* Card 2: Email */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-gold/20 transition-all duration-300">
                <div className="w-9 h-9 rounded-xl bg-gold/10 flex items-center justify-center text-gold mb-3">
                  <Mail className="w-4 h-4" />
                </div>
                <h4 className="font-display font-bold text-xs text-cream mb-1">
                  {isAr ? 'البريد الإلكتروني للمدرسة' : 'Email de l\'École'}
                </h4>
                <p className="font-mono text-xs text-cream/80">Rafaschool25@gmail.com</p>
                <p className="font-mono text-[10px] text-cream/40 mt-1">{isAr ? 'نرد خلال 4 ساعات كحد أقصى' : 'Réponse garantie sous 4 heures'}</p>
              </div>
            </div>

          </div>

          {/* Right Side: Cyberpunk Dark Map with Transit Calculator */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Grayscale Cyberpunk Map indicator */}
            <div className="relative h-80 rounded-3xl overflow-hidden bg-zinc-900 border border-white/10 shadow-2xl flex flex-col justify-between p-6">
              
              {/* Custom Grayscale Map Graphic representation */}
              <div className="absolute inset-0 opacity-20 -z-0">
                {/* Decorative Map Vector Paths */}
                <svg className="w-full h-full text-white" viewBox="0 0 400 300" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M10,40 L380,40 M10,120 L380,120 M10,220 L380,220 M120,10 L120,290 M260,10 L260,290" strokeDasharray="3,3" />
                  <path d="M40,20 Q180,80 320,30 T390,140" strokeWidth="3" />
                  <path d="M20,280 C120,240 220,180 380,260" strokeWidth="2.5" />
                  <circle cx="180" cy="110" r="40" stroke="currentColor" strokeWidth="1" strokeDasharray="5,2" />
                  <circle cx="180" cy="110" r="10" fill="currentColor" className="animate-ping" />
                </svg>
              </div>

              {/* Map Floating HUD */}
              <div className="z-10 flex items-start justify-between w-full">
                <div className="px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-xl border border-white/10 flex items-center gap-1.5">
                  <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono text-[10px] tracking-wide text-cream/80">
                    {isAr ? 'الجزائر، باب الزوار' : 'Alger, Bab Ezzouar'}
                  </span>
                </div>

                <div className="p-1.5 bg-black/60 backdrop-blur-md rounded-xl border border-white/10">
                  <Compass className="w-4 h-4 text-gold animate-spin-slow" />
                </div>
              </div>

              {/* Central Map Marker Point */}
              <div className="z-10 absolute left-[45%] top-[35%] flex flex-col items-center">
                <div className="px-3 py-2 bg-gold text-cream font-display font-bold text-[10px] tracking-tight rounded-xl shadow-lg border border-gold/40 flex items-center gap-1">
                  <Award className="w-3 h-3 text-cream" />
                  <span>{isAr ? 'مدرسة رافا' : 'Rafa School'}</span>
                </div>
                <div className="w-2.5 h-2.5 bg-gold rounded-full ring-4 ring-white/10 mt-1 animate-pulse" />
              </div>

              {/* Bottom address overlay */}
              <div className="z-10 w-full p-4 bg-black/75 backdrop-blur-md rounded-2xl border border-white/10">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-display font-bold text-xs text-cream leading-tight">
                      {isAr ? 'مدرسة رافا' : 'Rafa School'}
                    </h4>
                    <p className="font-sans text-[11px] text-cream/60 mt-1 leading-snug">
                      {isAr ? 'حي بوسحاقي، باب الزوار - الجزائر (مقابل خط الترامواي ومحطة القطار)' : 'Cité Boushaki, Bab Ezzouar - Alger (En face du tramway et de la gare)'}
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Interactive Route / Transit Calculator */}
            <div className="bg-white/5 border border-white/5 rounded-3xl p-6">
              <h3 className="font-display font-bold text-sm text-cream mb-2 flex items-center gap-2">
                <Navigation className="w-4 h-4 text-gold" />
                <span>{isAr ? 'احسب زمن وصولك للمدرسة' : 'Calculez votre itinéraire'}</span>
              </h3>
              <p className="font-sans text-xs text-cream/50 mb-4 leading-relaxed">
                {isAr ? (
                  'أدخل حي إقامتك بالجزائر (مثال: الدار البيضاء، رويبة، برج الكيفان) لمعرفة المسافة والوقت بالترامواي أو السيارة.'
                ) : (
                  'Indiquez votre quartier à Alger (ex: Dar El Beïda, Rouïba, Bordj El Kiffan) pour estimer vos temps de trajet.'
                )}
              </p>

              <form onSubmit={calculateRoute} className="flex gap-2 mb-4">
                <input
                  id="transit-start-input"
                  type="text"
                  value={startPoint}
                  onChange={(e) => setStartPoint(e.target.value)}
                  placeholder={isAr ? 'مثال: الدار البيضاء...' : 'Ex: Dar El Beïda'}
                  className="flex-grow px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl font-sans text-xs text-cream focus:outline-none focus:border-gold transition-colors duration-300"
                />
                <button
                  id="transit-calc-btn"
                  type="submit"
                  className="px-4 py-2.5 bg-gold hover:bg-gold-hover text-cream rounded-xl font-sans text-xs font-bold transition-all duration-300 cursor-pointer shrink-0"
                >
                  {isAr ? 'احسب المسافة' : 'Calculer'}
                </button>
              </form>

              {routeInfo && (
                <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/5 text-center animate-fade-in">
                  
                  <div className="p-3 bg-black/30 rounded-xl border border-white/5">
                    <Compass className="w-4 h-4 text-gold mx-auto mb-1.5" />
                    <span className="font-sans text-[10px] text-cream/40 block leading-none">
                      {isAr ? 'المسافة' : 'Distance'}
                    </span>
                    <span className="font-mono text-xs font-bold text-cream mt-1 inline-block">
                      {routeInfo.distance}
                    </span>
                  </div>

                  <div className="p-3 bg-black/30 rounded-xl border border-white/5">
                    <Train className="w-4 h-4 text-gold mx-auto mb-1.5" />
                    <span className="font-sans text-[10px] text-cream/40 block leading-none">
                      {isAr ? 'بالترامواي' : 'Tramway'}
                    </span>
                    <span className="font-mono text-xs font-bold text-cream mt-1 inline-block">
                      {routeInfo.drivingTime}
                    </span>
                  </div>

                  <div className="p-3 bg-black/30 rounded-xl border border-white/5">
                    <Car className="w-4 h-4 text-gold mx-auto mb-1.5" />
                    <span className="font-sans text-[10px] text-cream/40 block leading-none">
                      {isAr ? 'بالسيارة' : 'Voiture'}
                    </span>
                    <span className="font-mono text-xs font-bold text-cream mt-1 inline-block">
                      {routeInfo.tramTime}
                    </span>
                  </div>

                </div>
              )}

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
