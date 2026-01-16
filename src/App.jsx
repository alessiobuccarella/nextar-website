import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Check, Star, ArrowRight, ArrowDown, Sparkles, Target, Megaphone, TrendingUp, Video, Globe, Share2, BarChart3, Zap, Users } from 'lucide-react';

const NextarWebsite = () => {
  // STATO - Gestisce i dati dinamici del sito
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Contatori animati
  const [clientiCount, setClientiCount] = useState(0);
  const [impressioniCount, setImpressioniCount] = useState(0);
  const [roiCount, setRoiCount] = useState(0);
  const statsRef = useRef(null);
  const counterTimerRef = useRef(null);

  // Animazione contatori (bidirezionale come le altre animazioni)
  useEffect(() => {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Reset e avvia animazione
            if (counterTimerRef.current) {
              clearInterval(counterTimerRef.current);
            }

            setClientiCount(0);
            setImpressioniCount(0);
            setRoiCount(0);

            const duration = 3000; // 3 secondi
            const steps = 60;
            const interval = duration / steps;

            let currentStep = 0;

            counterTimerRef.current = setInterval(() => {
              currentStep++;
              const progress = currentStep / steps;
              // Easing per un effetto più naturale
              const easeProgress = 1 - Math.pow(1 - progress, 3);

              setClientiCount(Math.floor(easeProgress * 200));
              setImpressioniCount(Math.floor(easeProgress * 50));
              setRoiCount(Math.floor(easeProgress * 300));

              if (currentStep >= steps) {
                clearInterval(counterTimerRef.current);
                counterTimerRef.current = null;
                setClientiCount(200);
                setImpressioniCount(50);
                setRoiCount(300);
              }
            }, interval);
          } else {
            // Quando esce dalla viewport, ferma l'animazione e resetta
            if (counterTimerRef.current) {
              clearInterval(counterTimerRef.current);
              counterTimerRef.current = null;
            }
            setClientiCount(0);
            setImpressioniCount(0);
            setRoiCount(0);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      statsObserver.observe(statsRef.current);
    }

    return () => {
      statsObserver.disconnect();
      if (counterTimerRef.current) {
        clearInterval(counterTimerRef.current);
      }
    };
  }, []);

  // Intersection Observer per animazioni bidirezionali
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const isTitle = entry.target.hasAttribute('data-animate-title');
        const isBlock = entry.target.hasAttribute('data-animate-block');

        if (entry.isIntersecting) {
          if (isTitle) {
            entry.target.classList.add('title-visible');
            entry.target.classList.remove('title-hidden');
          } else if (isBlock) {
            entry.target.classList.add('block-visible');
            entry.target.classList.remove('block-hidden');
          } else {
            entry.target.classList.add('animate-visible');
            entry.target.classList.remove('animate-hidden');
          }
        } else {
          if (isTitle) {
            entry.target.classList.remove('title-visible');
            entry.target.classList.add('title-hidden');
          } else if (isBlock) {
            entry.target.classList.remove('block-visible');
            entry.target.classList.add('block-hidden');
          } else {
            entry.target.classList.remove('animate-visible');
            entry.target.classList.add('animate-hidden');
          }
        }
      });
    }, observerOptions);

    // Osserva elementi con data-animate
    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => {
      el.classList.add('animate-hidden');
      observer.observe(el);
    });

    // Osserva titoli con data-animate-title
    const titles = document.querySelectorAll('[data-animate-title]');
    titles.forEach((el) => {
      el.classList.add('title-hidden');
      observer.observe(el);
    });

    // Osserva blocchi con data-animate-block
    const blocks = document.querySelectorAll('[data-animate-block]');
    blocks.forEach((el) => {
      el.classList.add('block-hidden');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // EFFECT - Listener per lo scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // FUNZIONE - Scroll smooth verso sezioni
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      // Scroll animato personalizzato con durata configurabile
      const startPosition = window.pageYOffset;
      const distance = offsetPosition - startPosition;
      const duration = 1000; // 1 secondo (invece del default ~500ms)
      let startTime = null;

      const animation = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);

        // Easing function per uno scroll fluido
        const ease = progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        window.scrollTo(0, startPosition + distance * ease);

        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      };

      requestAnimationFrame(animation);
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-zinc-800 text-white">
      
      {/* HEADER - Navbar fissa in alto */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/50 backdrop-blur-lg shadow-xl shadow-orange-500/10' : 'bg-black/100 backdrop-blur-sm'}`}>
        <div className="w-full px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            
            {/* Logo cliccabile */}
            <div className="flex items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <img 
                src="/nextar-logo-no-bg.png" 
                alt="Nextar Logo" 
                className="h-8 lg:h-10 w-auto"
              />
            </div>

            {/* Menu Desktop */}
            <nav className="hidden lg:flex items-center space-x-8">
              <button onClick={() => scrollToSection('processo')} className="text-white hover:text-orange-400 transition-colors duration-200 font-medium text-base">
                Cosa Facciamo
              </button>
              <button onClick={() => scrollToSection('servizi')} className="text-white hover:text-orange-400 transition-colors duration-200 font-medium text-base">
                Metodo Nextar
              </button>
              <button onClick={() => scrollToSection('prezzi')} className="text-white hover:text-orange-400 transition-colors duration-200 font-medium text-base">
                Piani e Prezzi
              </button>
              <button onClick={() => scrollToSection('recensioni')} className="text-white hover:text-orange-400 transition-colors duration-200 font-medium text-base">
                Recensioni
              </button>
              <button onClick={() => scrollToSection('contatti')} className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-2.5 rounded-lg hover:shadow-lg transition-all duration-300 font-semibold text-base text-white hover:text-black">
                Contattaci
              </button>
            </nav>

            {/* Bottone Menu Mobile */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden text-white">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
          
          {/* Menu Mobile a tendina */}
          {isMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 space-y-3 p-4">
              <button onClick={() => scrollToSection('processo')} className="block w-full text-left text-white hover:text-orange-400 transition-colors py-2 font-medium">Cosa Facciamo</button>
              <button onClick={() => scrollToSection('servizi')} className="block w-full text-left text-white hover:text-orange-400 transition-colors py-2 font-medium">Metodo Nextar</button>
              <button onClick={() => scrollToSection('prezzi')} className="block w-full text-left text-white hover:text-orange-400 transition-colors py-2 font-medium">Piani e Prezzi</button>
              <button onClick={() => scrollToSection('recensioni')} className="block w-full text-left text-white hover:text-orange-400 transition-colors py-2 font-medium">Recensioni</button>
              <button onClick={() => scrollToSection('contatti')} className="w-full bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 rounded-lg font-semibold text-base text-white hover:text-black">Contattaci</button>
            </div>
          )}
        </div>
      </header>

      {/* HERO SECTION - Prima sezione principale */}
      <section id="home" className="pt-32 pb-20 px-6 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center">
            
            <div>
            <h1 className="text-5xl md:text-7xl lg:text-7xl font-semibold mb-5 leading-tight">
              <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                Nextar
              </span>
              <span className="text-white">
                {" "}- dove i brand crescono online
              </span>
            </h1>
            </div>

            {/* VIDEO SECTION - Placeholder per il tuo video */}
            <div className="max-w-4xl mx-auto mb-7">
              <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-orange-500/30 shadow-2xl">
                {/* Sostituisci questo div con il tuo video */}
                <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
                  <div className="text-center">
                    <Video className="w-20 h-20 mx-auto mb-4 text-orange-400" />
                    <p className="text-xl text-slate-300">Carica Video Qui</p>
                    <p className="text-sm text-slate-400 mt-2">Video di Alessandro e Carlo</p>
                  </div>
                </div>
                
                {/* ESEMPIO: Per YouTube 
                <iframe 
                  className="w-full h-full" 
                  src="https://www.youtube.com/embed/TUO_VIDEO_ID"
                  title="Video presentazione"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                */}
                
                {/* ESEMPIO: Per video locale
                <video 
                  className="w-full h-full object-cover" 
                  controls 
                  poster="/path/to/thumbnail.jpg"
                >
                  <source src="/path/to/video.mp4" type="video/mp4" />
                  Il tuo browser non supporta il tag video.
                </video>
                */}
              </div>
            </div>

            <p className="text-2xl md:text-2xl text-slate-300 mb-5 mx-auto">
              Comunichiamo aziende. Costruiamo crescita. Strategia, contenuti e performance. Da oltre 10 anni.
            </p>
            <p className="text-xl text-slate-300 max-w-3xl mb-7 mx-auto">
              Affianchiamo imprese e professionisti con piani di comunicazione completi:<br />
              strategia, produzione video, gestione social e campagne di crescita.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-7">
              <button onClick={() => scrollToSection('contatti')} className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 rounded-lg text-base font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2 w-auto">
                Richiedi Consulenza Gratuita <ArrowRight />
              </button>
              <button onClick={() => scrollToSection('prezzi')} className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 px-6 py-3 rounded-lg text-base font-semibold hover:bg-zinc-700/50 transition-all duration-300 w-auto">
                Piani e Prezzi
              </button>
            </div>

            {/* Grid Statistiche */}
            <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-4xl mx-auto">
              <div className="p-6 bg-zinc-800/30 backdrop-blur-sm rounded-2xl border border-zinc-700/50">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">{clientiCount}+</div>
                <div className="text-slate-400 mt-2 font-medium">Clienti Soddisfatti</div>
              </div>
              <div className="p-6 bg-zinc-800/30 backdrop-blur-sm rounded-2xl border border-zinc-700/50">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">{impressioniCount}M+</div>
                <div className="text-slate-400 mt-2 font-medium">Totale Impressioni</div>
              </div>
              <div className="p-6 bg-zinc-800/30 backdrop-blur-sm rounded-2xl border border-zinc-700/50">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">24/7</div>
                <div className="text-slate-400 mt-2 font-medium">Supporto Dedicato</div>
              </div>
              <div className="p-6 bg-zinc-800/30 backdrop-blur-sm rounded-2xl border border-zinc-700/50">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">{roiCount}%</div>
                <div className="text-slate-400 mt-2 font-medium">ROI Medio Clienti</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* COSA FACCIAMO - 4 aree di competenza */}
      <section id="processo" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-medium mb-6" data-animate-title>Cosa Facciamo</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto" data-animate>
              Dalla strategia alla produzione, gestiamo ogni aspetto della tua comunicazione digitale.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                number: "01",
                title: "Strategia & Comunicazione",
                description: "Piano di comunicazione, posizionamento, audit.",
                icon: <Megaphone />
              },
              {
                number: "02",
                title: "Social & Crescita",
                description: "Gestione profili, copy, community, performance.",
                icon: <Share2 />
              },
              {
                number: "03",
                title: "Video & Content",
                description: "Riprese, reel, storytelling, produzione completa.",
                icon: <Video />
              },
              {
                number: "04",
                title: "Sponsorship & Partnership",
                description: "Costruzione collaborazioni, brand deals, visibilità.",
                icon: <Users />
              }
            ].map((step, index) => (
              <div key={index} className="relative group" data-animate-block data-delay={index + 1}>
                <div className="bg-zinc-800/50 backdrop-blur-sm p-8 rounded-2xl border border-zinc-700 hover:border-orange-500/50 transition-all duration-300 h-full flex flex-col justify-between">
                  <div>
                    <div className="text-6xl font-bold text-orange-500/20 group-hover:text-orange-400 transition-colors duration-300 mb-4">{step.number}</div>
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                  </div>
                  <div>
                    <div className="border-t border-zinc-600 mb-4"></div>
                    <p className="text-slate-300">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVIZI - Grid di 6 servizi */}
      <section id="servizi" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-medium mb-6" data-animate-title>Metodo Nextar</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto" data-animate>
              Analizziamo il business, costruiamo la strategia, produciamo i contenuti, li distribuiamo alle persone giuste e ottimizziamo tutto sui risultati.
            </p>
          </div>

          <div className="grid md:grid-cols-4 lg:grid-cols-6 gap-8">
            {[
              {
                icon: <BarChart3 />,
                title: "Analisi",
                description: "Ogni progetto Nextar parte da un'analisi approfondita. Prima di parlare di contenuti o campagne, capiamo chi sei, dove sei oggi e cosa non sta funzionando. Analizziamo il tuo brand, il mercato in cui operi e il comportamento del tuo pubblico. Studiamo i competitor, i tuoi canali social, il funnel di acquisizione e i punti in cui stai perdendo opportunità e budget. L'obiettivo non è \"fare meglio sui social\", ma individuare le vere leve di crescita. Questa fase ci permette di eliminare ipotesi e lavorare su dati reali, trasformando la confusione iniziale in una direzione chiara.",
                output: "una diagnosi di comunicazione che evidenzia problemi, opportunità e priorità.",
                gradient: "from-orange-500 to-orange-600"
              },
              {
                icon: <Target />,
                title: "Strategia",
                description: "Una volta capito il contesto, costruiamo la strategia. Qui decidiamo cosa dire, a chi dirlo, come farlo e perché funziona. Definiamo il posizionamento del brand, i messaggi chiave da comunicare, il tone of voice e il piano editoriale più adatto agli obiettivi. Progettiamo il funnel di acquisizione, collegando contenuti, traffico e conversioni in modo coerente. La strategia è ciò che evita sprechi di tempo e contenuti casuali. Ogni scelta ha un motivo e ogni contenuto ha una funzione precisa.",
                output: "un piano di comunicazione strutturato, misurabile e orientato ai risultati.",
                gradient: "from-orange-600 to-amber-600"
              },
              {
                icon: <Video />,
                title: "Produzione",
                description: "La strategia prende forma attraverso i contenuti. In questa fase Nextar realizza tutto ciò che serve per comunicare in modo efficace e coerente. Produciamo video, reel, foto, copy e grafiche pensati per attirare l'attenzione, trasmettere valore e guidare l'utente all'azione. Ogni contenuto è progettato per il canale giusto e per il pubblico giusto, non per \"riempire il feed\". Qui qualità e strategia lavorano insieme: creatività senza improvvisazione.",
                output: "contenuti pronti per essere pubblicati e distribuiti.",
                gradient: "from-amber-500 to-orange-500"
              },
              {
                icon: <Share2 />,
                title: "Distribuzione",
                description: "È qui che nasce il vero valore. Distribuire non significa semplicemente pubblicare, ma far arrivare i contenuti alle persone giuste, nel momento giusto e con il giusto volume. Selezioniamo i canali più efficaci, definiamo il timing di pubblicazione, attiviamo campagne a pagamento quando serve, impostiamo strategie di retargeting e collaborazioni con pagine o creator rilevanti. Massimizziamo ogni contenuto riutilizzandolo su più piattaforme. Un contenuto visto da poche persone sbagliate non serve a nulla. Lo stesso contenuto, visto da migliaia di persone giuste, genera risultati.",
                output: "traffico qualificato, contatti e vendite.",
                gradient: "from-orange-500 to-red-500"
              },
              {
                icon: <TrendingUp />,
                title: "Ottimizzazione",
                description: "Nulla viene lasciato al caso. Monitoriamo costantemente i dati per capire cosa funziona davvero e cosa no. Analizziamo performance, costi, conversioni e comportamenti degli utenti. Individuiamo dove il budget è sprecato e dove, invece, sta generando valore. Sulla base dei dati ottimizziamo contenuti, copy, formati, targeting e investimenti. Il metodo Nextar non è statico: evolve continuamente per migliorare le performance nel tempo.",
                output: "crescita costante e miglioramento continuo dei risultati.",
                gradient: "from-orange-400 to-orange-600"
              }
            ].map((service, index) => (
              <div key={index} className={`group relative hover:z-20 md:col-span-2 ${index === 3 ? 'lg:col-start-2' : ''} ${index === 4 ? 'md:col-start-2 lg:col-start-auto' : ''}`} data-animate-block>
                <div className="bg-zinc-800/50 backdrop-blur-sm p-8 rounded-2xl border border-zinc-700 group-hover:opacity-0 group-hover:invisible transition-all duration-300 h-full relative">
                  <ArrowDown className="absolute top-4 right-4 text-orange-400 w-6 h-6" />
                  <div className={`w-20 h-20 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <div className="max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-zinc-700">
                    <p className="text-slate-300 leading-relaxed line-clamp-3 text-justify">{service.description}</p>
                  </div>
                </div>

                {/* Overlay espanso visibile solo all'hover */}
                <div className="absolute top-0 left-0 right-0 bg-zinc-800 backdrop-blur-sm p-8 rounded-2xl border border-orange-500/50 shadow-2xl shadow-orange-500/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
                  <div className={`w-20 h-20 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-orange-400">{service.title}</h3>
                  <div className="max-h-[70vh] overflow-y-auto hide-scrollbar">
                    <p className="text-slate-300 leading-relaxed text-justify">{service.description}</p>
                    <p className="text-slate-300 leading-relaxed text-justify mt-4">
                      <span className="font-bold">Output:</span> {service.output}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING - 3 piani tariffari */}
      <section id="prezzi" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-medium mb-6" data-animate-title>Piani e Prezzi</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto" data-animate>
              Scegli il piano che più fa al caso tuo. Nessun costo nascosto, massima trasparenza.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                name: "Nextar Core",
                price: "499",
                
                features: [
                  "Analisi approfondita del brand e del target",
                  "Strategia di comunicazione personalizzata",
                  "Campagne advertising (budget escluso)",
                  "Linee guida su contenuti, tone of voice e tematiche",
                ],
                popular: false
              },
              {
                name: "Nextar Pro",
                price: "1499",
                
                features: [
                  "Tutto di NEXTAR CORE",
                  "Gestione operativa dei social",
                  "Creazione e pubblicazione di 3 Reels a settimana",
                  "Adattamento contenuti ai trend di settore",
                  "Ottimizzazione copy e CTA",
                  "Monitoraggio performance e ottimizzazioni mensili",
                ],
                popular: true
              },
              {
                name: "Nextar Elite",
                price: "3499",
                
                features: [
                  "Tutto di NEXTAR CORE + PRO",
                  "Creazione e pubblicazione di 5 Reels in totale a settimana",
                  "Strategia di crescita avanzata multi-canale",
                  "Contenuti ad alto impatto (branding & conversion)",
                  "Analisi performance avanzata e report dedicati",
                  "Consulenza strategica continua",
                  "Supporto prioritario 24/7",
                ],
                popular: false
              }
            ].map((plan, index) => (
              <div key={index} data-animate-block data-delay={index + 1} className={`group relative bg-zinc-800/50 backdrop-blur-sm p-8 rounded-3xl border ${plan.popular ? 'border-orange-500 shadow-2xl shadow-orange-500/30 scale-105' : 'border-zinc-700 hover:scale-105'} transition-all duration-300`}>
                {plan.popular && (
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    PIÙ POPOLARE
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
        
                <div className="mb-4">
                  {plan.price !== "Custom" ? (
                    <>
                      <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">€{plan.price}</span>
                      <span className="text-slate-400 text-lg">/mese</span>
                    </>
                  ) : (
                    <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">Contattaci</span>
                  )}
                </div>
                <button onClick={() => scrollToSection('contatti')} className={`animate-pulse-button w-full py-3 rounded-lg font-semibold text-base mb-4 transition-all duration-300 ${plan.popular ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:shadow-xl transform hover:scale-105' : 'bg-zinc-700 hover:bg-zinc-600'}`}>
                  {plan.price !== "Custom" ? "Inizia Ora" : "Richiedi Preventivo"}
                </button>
                <ul className="space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="w-5 h-5 text-orange-400 mr-3 flex-shrink-0 mt-1" />
                      <span className="text-slate-300 text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RECENSIONI - Testimonial */}
      <section id="recensioni" className="py-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-medium mb-6" data-animate-title>Cosa Dicono i Nostri Clienti</h2>
            <div className="flex items-center justify-center gap-2 text-orange-400 text-xl" data-animate>
              <Star fill="currentColor" size={28} />
              <Star fill="currentColor" size={28} />
              <Star fill="currentColor" size={28} />
              <Star fill="currentColor" size={28} />
              <Star fill="currentColor" size={28} />
              <span className="text-slate-300 ml-3">(5.0 su 5 da 150+ recensioni)</span>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <style>{`
            @keyframes scrollTestimonials {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-4260px);
              }
            }
            .animate-testimonials {
              animation: scrollTestimonials 40s linear infinite;
            }
            .animate-testimonials:hover {
              animation-play-state: paused;
            }
          `}</style>
          
          <div className="flex gap-6 animate-testimonials" style={{ width: 'max-content' }}>
            {[...Array(3)].map((_, setIndex) => (
              <React.Fragment key={setIndex}>
                {[
                  {
                    text: "Nextar ha trasformato completamente la nostra presenza online. In 6 mesi abbiamo triplicato i follower e quintuplicato le conversioni. Il team è sempre disponibile e propositivo!",
                    author: "Sofia Romano",
                    role: "CEO, FashionLab",
                    rating: 5
                  },
                  {
                    text: "Professionalità, creatività e risultati concreti. Hanno capito perfettamente la nostra vision e l'hanno tradotta in una strategia vincente. I nostri social sono finalmente vivi!",
                    author: "Marco Ferretti",
                    role: "Founder, TechStart Italia",
                    rating: 5
                  },
                  {
                    text: "Il miglior investimento che abbiamo fatto quest'anno. Contenuti di qualità, campagne efficaci e un ROI che supera ogni aspettativa. Consigliatissimi!",
                    author: "Elena Bianchi",
                    role: "Marketing Director, GreenLife",
                    rating: 5
                  },
                  {
                    text: "Finalmente un'agenzia che mantiene le promesse! In soli 3 mesi abbiamo visto risultati tangibili. La comunicazione è sempre chiara e trasparente.",
                    author: "Luca Moretti",
                    role: "Owner, Ristorante Da Luca",
                    rating: 5
                  },
                  {
                    text: "Nextar ha rivoluzionato il nostro approccio al digital marketing. Le loro strategie innovative ci hanno permesso di raggiungere un pubblico completamente nuovo.",
                    author: "Giulia Santini",
                    role: "CMO, BeautyBox Italia",
                    rating: 5
                  },
                  {
                    text: "Team eccezionale, sempre aggiornato sulle ultime tendenze. I contenuti che creano sono originali e perfettamente in linea con il nostro brand.",
                    author: "Alessandro Conti",
                    role: "Founder, FitLife Academy",
                    rating: 5
                  },
                  {
                    text: "Collaboriamo da oltre un anno e i risultati parlano da soli: +400% di engagement e vendite raddoppiate. Non potremmo essere più soddisfatti!",
                    author: "Francesca De Luca",
                    role: "E-commerce Manager, ShopNow",
                    rating: 5
                  },
                  {
                    text: "Cercavamo un partner strategico, abbiamo trovato molto di più. Nextar è diventata un'estensione del nostro team marketing.",
                    author: "Roberto Mancini",
                    role: "CEO, InnovateTech",
                    rating: 5
                  },
                  {
                    text: "La loro capacità di analisi e ottimizzazione delle campagne è impressionante. Ogni euro investito viene massimizzato al meglio.",
                    author: "Chiara Lombardi",
                    role: "Head of Digital, MediaGroup",
                    rating: 5
                  },
                  {
                    text: "Creatività senza limiti e attenzione maniacale ai dettagli. Le nostre campagne social non sono mai state così efficaci!",
                    author: "Davide Russo",
                    role: "Brand Manager, LuxuryHome",
                    rating: 5
                  },
                ].map((testimonial, index) => (
                  <div 
                    key={`${setIndex}-${index}`} 
                    className="flex-shrink-0 w-[400px] bg-zinc-800 backdrop-blur-sm p-8 rounded-2xl border border-zinc-700 hover:border-orange-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/20 flex flex-col min-h-[320px]"
                  >
                    <div className="flex-grow">
                      <div className="flex gap-1 text-orange-400 mb-6">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} size={20} fill="currentColor" />
                        ))}
                      </div>
                      <p className="text-slate-300 italic leading-relaxed text-lg">"{testimonial.text}"</p>
                    </div>
                    <div className="flex items-center gap-4 mt-6 pt-6 border-t border-zinc-700">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                        {testimonial.author.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-lg">{testimonial.author}</div>
                        <div className="text-slate-400 text-sm">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINALE */}
      <section id="contatti" className="py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 p-12 md:p-16 rounded-3xl shadow-2xl" data-animate>
            <h2 className="text-4xl md:text-6xl font-medium mb-6">Pronto a Far Crescere il Tuo Brand?</h2>
            <p className="text-xl md:text-2xl mb-10 text-orange-100 max-w-3xl mx-auto">
              Richiedi una consulenza gratuita e scopri come possiamo trasformare la tua presenza digitale in risultati concreti.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-white text-orange-600 px-6 py-3 rounded-lg text-base font-bold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 w-auto">
                Richiedi Consulenza Gratuita <ArrowRight />
              </button>
              <button onClick={() => scrollToSection('prezzi')} className="bg-orange-700 border-2 border-white/20 px-6 py-3 rounded-lg text-base font-bold hover:bg-orange-800 transition-all duration-300 flex items-center justify-center gap-2 w-auto">
                Piani e Prezzi
              </button>
            </div>
            <p className="mt-8 text-orange-100">
              📧 xxxx@xxxx.xxx  •  📱 +xx xxx xxx xxxx
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black py-12 px-6 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <img
                src="/nextar-logo.png"
                alt="Nextar Logo"
                className="h-8 lg:h-10 w-auto"
              />
              </div>
              <p className="text-slate-400 mt-4 leading-relaxed md:max-w-[300px]">
                Agenzia di comunicazione digitale. Aiutiamo le aziende a crescere online con strategie su misura e contenuti di qualità.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-lg">Azienda</h4>
              <ul className="space-y-3 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Chi Siamo</a></li>
                <li><button onClick={() => scrollToSection('contatti')} className="hover:text-white transition-colors">Contatti</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-lg">Social</h4>
              <ul className="space-y-3 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-white transition-colors">TikTok</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-slate-400 text-sm">
              © 2016 Nextar. All rights reserved.
            </div>
            <div className="flex gap-6 text-slate-400 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NextarWebsite;