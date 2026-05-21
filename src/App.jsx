import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Flame,
  AlertTriangle,
  Star,
  Bell,
  Lock,
  Gauge,
  Car,
  TrendingDown,
  ExternalLink,
} from 'lucide-react';

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Card({ className = '', children }) {
  return <div className={cn('border border-slate-200 bg-white shadow-sm', className)}>{children}</div>;
}

function CardContent({ className = '', children }) {
  return <div className={className}>{children}</div>;
}

function Button({ className = '', variant = 'default', asChild = false, children, ...props }) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-slate-400 disabled:pointer-events-none disabled:opacity-50';
  const variants = {
    default: 'bg-slate-950 text-white hover:bg-slate-800',
    outline: 'border border-slate-300 bg-white text-slate-900 hover:bg-slate-50',
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      className: cn(base, variants[variant], className, children.props.className),
      ...props,
    });
  }

  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}

function buildDemoListingUrl(carId) {
  return `#sludinajums-${carId}`;
}

function isListingLinkMatchingCar(car) {
  return car.listingUrl === buildDemoListingUrl(car.id);
}

const demoCars = [
  {
    id: 1,
    make: 'BMW',
    model: '320d',
    title: 'BMW 320d Touring',
    year: 2017,
    price: 9900,
    market: 12200,
    mileage: 186000,
    engine: '2.0D, automāts',
    location: 'Rīga',
    score: 87,
    badge: 'Lielisks darījums',
    risk: 'Vidējs',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1200&auto=format&fit=crop',
    listingImage: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1200&auto=format&fit=crop',
    reason: 'Cena ap 19% zem tirgus. Labs gads, populārs motors, TA norādīta.',
    warnings: ['Īss apraksts', 'Jāpārbauda VIN', 'Jāsalīdzina servisa vēsture'],
    listingText:
      'Pārdodu BMW 320d Touring labā tehniskā stāvoklī. Tikko veikta apkope, ekonomisks un dinamisks auto. Cena runājama pie apskates.',
    listingUrl: buildDemoListingUrl(1),
  },
  {
    id: 2,
    make: 'Audi',
    model: 'A4',
    title: 'Audi A4 Avant',
    year: 2016,
    price: 8700,
    market: 10900,
    mileage: 214000,
    engine: '2.0 TDI, automāts',
    location: 'Jelgava',
    score: 81,
    badge: 'Zem tirgus cenas',
    risk: 'Vidējs',
    image: 'https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?q=80&w=1200&auto=format&fit=crop',
    listingImage: 'https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?q=80&w=1200&auto=format&fit=crop',
    reason: 'Aptuveni 20% zem līdzīgu sludinājumu cenas. Pieņemams nobraukums šai klasei.',
    warnings: ['Pārdevējs nav norādījis VIN', 'Pārbaudīt kārbu', 'Apskatē meklēt rūsu'],
    listingText:
      'Audi A4 Avant ar automātisko kārbu. Auto ievests no Vācijas, ekonomisks un ietilpīgs. Iespējama maiņa.',
    listingUrl: buildDemoListingUrl(2),
  },
  {
    id: 3,
    make: 'Volvo',
    model: 'XC60',
    title: 'Volvo XC60',
    year: 2015,
    price: 11950,
    market: 12800,
    mileage: 241000,
    engine: 'D4, automāts',
    location: 'Liepāja',
    score: 68,
    badge: 'Normāla cena',
    risk: 'Zems',
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?q=80&w=1200&auto=format&fit=crop',
    listingImage: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?q=80&w=1200&auto=format&fit=crop',
    reason: 'Cena nedaudz zem tirgus, bet nobraukums augstāks. Nav slikts, bet nav arī izcils darījums.',
    warnings: ['Augsts nobraukums', 'Jāpārbauda DPF', 'Pārbaudīt pilnpiedziņu'],
    listingText: 'Volvo XC60 ar labu komplektāciju un pilnpiedziņu. Regulāri apkopts, salons tīrs. Pieejams uzreiz.',
    listingUrl: buildDemoListingUrl(3),
  },
  {
    id: 4,
    make: 'Mercedes-Benz',
    model: 'C220',
    title: 'Mercedes-Benz C220',
    year: 2018,
    price: 10500,
    market: 15600,
    mileage: 168000,
    engine: '2.2D, automāts',
    location: 'Daugavpils',
    score: 42,
    badge: 'Aizdomīgs',
    risk: 'Augsts',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1200&auto=format&fit=crop',
    listingImage: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1200&auto=format&fit=crop',
    reason: 'Cena ir pārāk zema pret tirgus vidējo. Šis var būt labs darījums, bet risks ir augsts.',
    warnings: ['Pārāk lēts', 'Steidzams pārdošanas teksts', 'Obligāti pārbaudīt VIN un vēsturi'],
    listingText: 'Steidzami pārdod Mercedes-Benz C220. Auto braucams, sīkāk pa telefonu. Cena pēdējā.',
    listingUrl: buildDemoListingUrl(4),
  },
];

function getListingText(car) {
  return car.listingText;
}

function scoreClass(score) {
  if (score >= 80) return 'bg-emerald-100 text-emerald-700 border-emerald-200';
  if (score >= 65) return 'bg-amber-100 text-amber-700 border-amber-200';
  return 'bg-red-100 text-red-700 border-red-200';
}

function riskClass(risk) {
  if (risk === 'Zems') return 'text-emerald-700 bg-emerald-50';
  if (risk === 'Vidējs') return 'text-amber-700 bg-amber-50';
  return 'text-red-700 bg-red-50';
}

export default function DealSniperDemoApp() {
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(demoCars[0]);
  const [showCriteriaDetails, setShowCriteriaDetails] = useState(false);

  const filteredCars = useMemo(() => {
    return [...demoCars].sort((a, b) => b.score - a.score);
  }, []);

  const handleScan = () => {
    setLoading(true);
    setScanned(false);
    setTimeout(() => {
      setLoading(false);
      setScanned(true);
      setSelected(filteredCars[0] || null);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-slate-950 p-4 text-white md:p-8">
      <div className="mx-auto max-w-6xl space-y-4">
        <div className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-white/10 p-2 shadow-lg">
              <Gauge className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight md:text-2xl">DealSniper</h1>
              <p className="text-xs text-slate-400">AI auto deal finder</p>
            </div>
          </div>
          <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 md:flex">
            <Bell className="h-4 w-4" /> Jaunu dealu paziņojumi
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
          <Card className="rounded-3xl border-0 bg-white text-slate-950 shadow-xl">
            <CardContent className="space-y-5 p-5">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
                  <Car className="h-4 w-4" /> Demo MVP
                </div>
                <h2 className="mt-3 text-2xl font-bold leading-tight">AI atrod labākos auto dealus sekundēs.</h2>
                <p className="mt-2 text-sm text-slate-500">Viens klikšķis → labākie sludinājumi.</p>
              </div>

              <Button onClick={handleScan} className="w-full rounded-2xl bg-slate-950 py-6 text-base font-semibold shadow-lg hover:bg-slate-800">
                {loading ? (
                  'Skenēju tirgu...'
                ) : (
                  <>
                    <Search className="mr-2 h-5 w-5" /> ATRAST DEALUS
                  </>
                )}
              </Button>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <button onClick={() => setShowCriteriaDetails(!showCriteriaDetails)} className="w-full text-left">
                  <div className="flex items-center justify-between gap-2 text-sm font-semibold text-slate-700">
                    <div className="flex items-center gap-2">
                      <Gauge className="h-4 w-4" /> Kā AI nosaka labāko darījumu?
                    </div>
                    <div className="text-xs text-slate-500">{showCriteriaDetails ? 'Paslēpt' : 'Detalizācija'}</div>
                  </div>
                </button>

                <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-600">
                  <div className="rounded-xl bg-white p-2">✓ Cena pret tirgu</div>
                  <div className="rounded-xl bg-white p-2">✓ Nobraukums</div>
                  <div className="rounded-xl bg-white p-2">✓ Pārdevēja risks</div>
                  <div className="rounded-xl bg-white p-2">✓ Sludinājuma kvalitāte</div>
                </div>

                {showCriteriaDetails && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-3 space-y-2 overflow-hidden">
                    <div className="rounded-xl bg-white p-3 text-xs text-slate-600">
                      <span className="font-semibold text-slate-800">Cena pret tirgu:</span> AI salīdzina līdzīgus auto pēc gada, motora un komplektācijas.
                    </div>
                    <div className="rounded-xl bg-white p-3 text-xs text-slate-600">
                      <span className="font-semibold text-slate-800">Nobraukums:</span> Zemāks nobraukums un regulāras apkopes uzlabo novērtējumu.
                    </div>
                    <div className="rounded-xl bg-white p-3 text-xs text-slate-600">
                      <span className="font-semibold text-slate-800">Pārdevēja risks:</span> AI meklē aizdomīgas pazīmes, piemēram, pārāk zemu cenu vai nepilnīgu informāciju.
                    </div>
                    <div className="rounded-xl bg-white p-3 text-xs text-slate-600">
                      <span className="font-semibold text-slate-800">Sludinājuma kvalitāte:</span> Tiek vērtētas bildes, apraksts, VIN un tehniskā informācija.
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-2xl bg-slate-100 p-4">
                  <div className="text-2xl font-bold">128</div>
                  <div className="text-xs text-slate-500">sludinājumi</div>
                </div>
                <div className="rounded-2xl bg-slate-100 p-4">
                  <div className="text-2xl font-bold">4</div>
                  <div className="text-xs text-slate-500">deali</div>
                </div>
                <div className="rounded-2xl bg-slate-100 p-4">
                  <div className="text-2xl font-bold">AI</div>
                  <div className="text-xs text-slate-500">labākie darījumi</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {!scanned && !loading && (
              <Card className="rounded-3xl border-white/10 bg-white/5 text-white backdrop-blur">
                <CardContent className="p-6 text-center">
                  <Flame className="mx-auto h-10 w-10 text-orange-300" />
                  <h3 className="mt-3 text-xl font-bold">Spied pogu, lai redzētu demo rezultātus</h3>
                  <p className="mt-2 text-slate-300">Šajā demo dati ir simulēti. Reālajā MVP tie nāktu no sludinājumu skenera un cenu salīdzināšanas modeļa.</p>
                  <p className="mt-3 text-sm text-slate-400">Katram demo auto ir savs unikāls sludinājuma ID, un saite tiek pārbaudīta pret konkrēto sludinājumu.</p>
                </CardContent>
              </Card>
            )}

            {loading && (
              <Card className="rounded-3xl border-white/10 bg-white/5 text-white backdrop-blur">
                <CardContent className="p-8">
                  <div className="space-y-4">
                    <div className="h-4 w-2/3 animate-pulse rounded-full bg-white/20" />
                    <div className="h-28 animate-pulse rounded-3xl bg-white/10" />
                    <div className="h-28 animate-pulse rounded-3xl bg-white/10" />
                  </div>
                </CardContent>
              </Card>
            )}

            {scanned && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="grid items-start gap-4 xl:grid-cols-[340px_1fr]">
                <div className="space-y-3">
                  {filteredCars.length === 0 && (
                    <div className="rounded-3xl border border-white/10 bg-white/10 p-6 text-white">
                      <h3 className="text-lg font-bold">Demo darījumi nav atrasti</h3>
                      <p className="mt-2 text-sm text-slate-300">Pamēģini vēlreiz pēc jauna skenējuma.</p>
                    </div>
                  )}

                  {filteredCars.map((car) => (
                    <button
                      key={car.id}
                      onClick={() => setSelected(car)}
                      className={cn(
                        'w-full rounded-3xl border p-3 text-left transition',
                        selected?.id === car.id
                          ? 'border-white bg-white text-slate-950'
                          : 'border-white/10 bg-white/10 text-white hover:bg-white/15'
                      )}
                    >
                      <div className="flex gap-4">
                        <img src={car.image} alt={car.title} className="h-20 w-24 rounded-2xl object-cover" />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="font-bold">{car.title}</h3>
                              <p className={selected?.id === car.id ? 'text-slate-500' : 'text-slate-300'}>
                                {car.year} • {car.mileage.toLocaleString('lv-LV')} km
                              </p>
                            </div>
                            <span className={cn('rounded-full border px-3 py-1 text-sm font-bold', scoreClass(car.score))}>{car.score}</span>
                          </div>
                          <div className="mt-3 flex items-center justify-between">
                            <div>
                              <div className="text-sm font-semibold">Darījuma kvalitāte</div>
                              <div className={selected?.id === car.id ? 'text-xs text-slate-500' : 'text-xs text-slate-300'}>
                                AI novērtējums pēc cenas, nobraukuma un riskiem
                              </div>
                            </div>
                            <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700">{car.badge}</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {selected && (
                  <Card className="sticky top-4 overflow-hidden rounded-3xl border-0 bg-white text-slate-950 shadow-xl">
                    <img src={selected.image} alt={selected.title} className="h-44 w-full object-cover" />
                    <CardContent className="space-y-4 p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h2 className="text-2xl font-bold">{selected.title}</h2>
                          <p className="text-slate-500">{selected.year} • {selected.engine} • {selected.location}</p>
                        </div>
                        <div className={cn('rounded-2xl border px-4 py-3 text-center font-bold', scoreClass(selected.score))}>
                          <div className="text-3xl">{selected.score}</div>
                          <div className="text-xs">Novērtējums</div>
                        </div>
                      </div>

                      <div className="rounded-2xl bg-slate-100 p-4">
                        <div className="text-sm text-slate-500">AI novērtējums</div>
                        <div className="mt-2 flex items-center justify-between gap-3">
                          <div>
                            <div className="text-2xl font-bold">{selected.score}/100</div>
                            <div className="text-sm text-slate-500">Darījuma kvalitāte</div>
                          </div>
                          <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-bold text-emerald-700">{selected.badge}</span>
                        </div>
                      </div>

                      <div className="rounded-2xl bg-emerald-50 p-4 text-emerald-800">
                        <div className="flex items-center gap-2 font-bold">
                          <TrendingDown className="h-5 w-5" /> AI secinājums
                        </div>
                        <p className="mt-2 text-sm">{selected.reason}</p>
                      </div>

                      <div>
                        <div className="flex items-center justify-between">
                          <h4 className="flex items-center gap-2 font-bold">
                            <AlertTriangle className="h-5 w-5" /> Riska pārbaudes
                          </h4>
                          <span className={cn('rounded-full px-3 py-1 text-xs font-bold', riskClass(selected.risk))}>{selected.risk} risks</span>
                        </div>
                        <ul className="mt-3 space-y-2">
                          {selected.warnings.map((warning) => (
                            <li key={warning} className="rounded-xl bg-slate-100 px-3 py-2 text-sm text-slate-700">
                              • {warning}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div id={`sludinajums-${selected.id}`} className="space-y-3 rounded-2xl bg-slate-100 p-4">
                        <img src={selected.listingImage} alt="Sludinājuma bilde" className="h-52 w-full rounded-2xl object-cover" />
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <div className="font-bold">Sludinājuma teksts</div>
                            <div
                              className={cn(
                                'mt-1 inline-flex rounded-full px-2 py-1 text-xs font-bold',
                                isListingLinkMatchingCar(selected) ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                              )}
                            >
                              {isListingLinkMatchingCar(selected) ? 'Saite sakrīt ar konkrēto sludinājumu' : 'Saite nesakrīt — jāpārbauda'}
                            </div>
                          </div>
                          <a href={selected.listingUrl} className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:underline">
                            Atvērt konkrēto sludinājumu <ExternalLink className="h-4 w-4" />
                          </a>
                        </div>
                        <p className="text-sm leading-relaxed text-slate-700">{getListingText(selected)}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <Button asChild className="rounded-2xl bg-slate-950 hover:bg-slate-800">
                          <a href={selected.listingUrl}>
                            <ExternalLink className="mr-2 h-4 w-4" /> Atvērt sludinājumu
                          </a>
                        </Button>
                        <Button variant="outline" className="rounded-2xl">
                          <Star className="mr-2 h-4 w-4" /> Saglabāt
                        </Button>
                      </div>

                      <div className="rounded-2xl border border-dashed border-slate-300 p-4">
                        <div className="flex items-center gap-2 font-bold">
                          <Lock className="h-4 w-4" /> Premium alert
                        </div>
                        <p className="mt-1 text-sm text-slate-500">Saņem paziņojumu, kad parādās auto ar novērtējumu virs 80 un zemu risku.</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
