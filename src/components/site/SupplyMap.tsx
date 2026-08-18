import { useMemo, useState } from 'react';
import Section from './Section';
import Icon from '@/components/ui/icon';
import { useReveal } from '@/hooks/use-reveal';
import WorldMap, { MAP_W, MAP_H, px, py, leftPct, topPct } from './WorldMap';

type RegionKey = 'all' | 'cis' | 'asia' | 'mena' | 'africa' | 'latam';

interface Destination {
  country: string;
  region: Exclude<RegionKey, 'all'>;
  gateway: string;
  mode: string;
  lead: string;
  projects: number;
  status: 'Active hub' | 'Serviced';
  lon: number;
  lat: number;
}

const REGIONS: { key: RegionKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'cis', label: 'CIS & Arctic' },
  { key: 'asia', label: 'Central Asia' },
  { key: 'mena', label: 'Middle East' },
  { key: 'africa', label: 'Africa' },
  { key: 'latam', label: 'Latin America' },
];

const HUB = { lon: 65.5, lat: 57.2, label: 'Tyumen production hub' };

const DESTINATIONS: Destination[] = [
  {
    country: 'Russia',
    region: 'cis',
    gateway: 'Sabetta / Murmansk',
    mode: 'Sea + rail',
    lead: '18–24 days',
    projects: 214,
    status: 'Active hub',
    lon: 72.7,
    lat: 71.3,
  },
  {
    country: 'Belarus',
    region: 'cis',
    gateway: 'Brest / Minsk',
    mode: 'Road convoy',
    lead: '12–16 days',
    projects: 18,
    status: 'Serviced',
    lon: 27.6,
    lat: 53.9,
  },
  {
    country: 'Azerbaijan',
    region: 'cis',
    gateway: 'Baku / Alat',
    mode: 'Rail + sea',
    lead: '24–30 days',
    projects: 22,
    status: 'Serviced',
    lon: 49.9,
    lat: 40.4,
  },
  {
    country: 'Norway',
    region: 'cis',
    gateway: 'Kirkenes',
    mode: 'Sea',
    lead: '26–34 days',
    projects: 11,
    status: 'Serviced',
    lon: 30.0,
    lat: 69.7,
  },
  {
    country: 'Kazakhstan',
    region: 'asia',
    gateway: 'Aktau / Dostyk',
    mode: 'Rail + road convoy',
    lead: '21–28 days',
    projects: 54,
    status: 'Active hub',
    lon: 51.2,
    lat: 43.7,
  },
  {
    country: 'Uzbekistan',
    region: 'asia',
    gateway: 'Tashkent / Termez',
    mode: 'Rail',
    lead: '26–32 days',
    projects: 23,
    status: 'Serviced',
    lon: 69.3,
    lat: 41.3,
  },
  {
    country: 'Mongolia',
    region: 'asia',
    gateway: 'Zamyn-Üüd / Ulaanbaatar',
    mode: 'Rail + road convoy',
    lead: '30–38 days',
    projects: 12,
    status: 'Serviced',
    lon: 106.9,
    lat: 47.9,
  },
  {
    country: 'Kyrgyzstan',
    region: 'asia',
    gateway: 'Bishkek',
    mode: 'Road convoy',
    lead: '28–34 days',
    projects: 6,
    status: 'Serviced',
    lon: 74.6,
    lat: 42.9,
  },
  {
    country: 'UAE',
    region: 'mena',
    gateway: 'Jebel Ali',
    mode: 'Sea + heavy trucking',
    lead: '34–42 days',
    projects: 31,
    status: 'Active hub',
    lon: 55.0,
    lat: 25.0,
  },
  {
    country: 'Saudi Arabia',
    region: 'mena',
    gateway: 'Dammam / Jeddah',
    mode: 'Sea + heavy trucking',
    lead: '38–46 days',
    projects: 26,
    status: 'Active hub',
    lon: 46.7,
    lat: 24.7,
  },
  {
    country: 'Oman',
    region: 'mena',
    gateway: 'Duqm / Salalah',
    mode: 'Sea',
    lead: '40–48 days',
    projects: 12,
    status: 'Serviced',
    lon: 57.7,
    lat: 19.7,
  },
  {
    country: 'Iraq',
    region: 'mena',
    gateway: 'Umm Qasr',
    mode: 'Sea + road convoy',
    lead: '36–44 days',
    projects: 9,
    status: 'Serviced',
    lon: 47.8,
    lat: 30.5,
  },
  {
    country: 'Guinea',
    region: 'africa',
    gateway: 'Conakry',
    mode: 'Sea',
    lead: '46–58 days',
    projects: 21,
    status: 'Active hub',
    lon: -13.7,
    lat: 9.6,
  },
  {
    country: 'Zambia',
    region: 'africa',
    gateway: 'Dar es Salaam / Ndola',
    mode: 'Sea + rail',
    lead: '52–64 days',
    projects: 14,
    status: 'Serviced',
    lon: 28.3,
    lat: -13.1,
  },
  {
    country: 'DR Congo',
    region: 'africa',
    gateway: 'Matadi / Lubumbashi',
    mode: 'Sea + heavy trucking',
    lead: '54–66 days',
    projects: 8,
    status: 'Serviced',
    lon: 23.6,
    lat: -4.0,
  },
  {
    country: 'Chile',
    region: 'latam',
    gateway: 'San Antonio / Antofagasta',
    mode: 'Sea',
    lead: '48–60 days',
    projects: 17,
    status: 'Active hub',
    lon: -70.4,
    lat: -30.5,
  },
  {
    country: 'Peru',
    region: 'latam',
    gateway: 'Callao / Matarani',
    mode: 'Sea + heavy trucking',
    lead: '50–62 days',
    projects: 12,
    status: 'Serviced',
    lon: -77.1,
    lat: -12.0,
  },
  {
    country: 'Brazil',
    region: 'latam',
    gateway: 'Santos',
    mode: 'Air-assisted + sea',
    lead: '46–58 days',
    projects: 7,
    status: 'Serviced',
    lon: -46.3,
    lat: -23.9,
  },
];

const SUMMARY = [
  { value: '25+', label: 'countries served' },
  { value: '4', label: 'continents' },
  { value: '6', label: 'shipping hubs' },
  { value: '38 days', label: 'average lead time' },
];

const SupplyMap = () => {
  const [region, setRegion] = useState<RegionKey>('all');
  const [hover, setHover] = useState<string | null>(null);
  const { ref, className } = useReveal<HTMLDivElement>();

  const list = useMemo(
    () => DESTINATIONS.filter((d) => region === 'all' || d.region === region),
    [region],
  );

  const hubX = px(HUB.lon);
  const hubY = py(HUB.lat);

  return (
    <Section
      id="supply"
      className="bg-card"
      eyebrow="Supply map by country"
      title={
        <>
          Every route
          <span className="block text-primary">already mapped</span>
        </>
      }
      lead="Entry points, transport modes and lead times we have already run. Pick a region to see how modules reach your site."
    >
      <div ref={ref} className={className}>
        <div className="mb-10 flex flex-wrap gap-2">
          {REGIONS.map((r) => (
            <button
              key={r.key}
              type="button"
              onClick={() => setRegion(r.key)}
              className={`rounded-full border px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] transition-all duration-300 sm:px-5 ${
                r.key === region
                  ? 'border-primary text-primary'
                  : 'border-border text-muted-foreground hover:border-primary/60 hover:text-foreground'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        <div className="grid gap-5">
          <div className="dune-field relative overflow-hidden rounded-[2rem] border border-white/[0.08]">
            <div className="relative w-full pt-[42%]">
              <div className="absolute inset-0">
                <div
                  className="absolute inset-0 opacity-[0.14]"
                  style={{
                    backgroundImage:
                      'radial-gradient(hsl(var(--muted-foreground)) 1px, transparent 1px)',
                    backgroundSize: '16px 16px',
                  }}
                />

                <WorldMap className="absolute inset-0 h-full w-full" />

                <svg
                  viewBox={`0 0 ${MAP_W} ${MAP_H}`}
                  preserveAspectRatio="none"
                  aria-hidden
                  className="absolute inset-0 h-full w-full"
                >
                  {list.map((d) => {
                    const dx = px(d.lon);
                    const dy = py(d.lat);
                    return (
                      <path
                        key={d.country}
                        d={`M ${hubX} ${hubY} Q ${(hubX + dx) / 2} ${
                          Math.min(hubY, dy) - 45
                        } ${dx} ${dy}`}
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="1"
                        strokeOpacity={hover === null || hover === d.country ? 0.5 : 0.15}
                        vectorEffect="non-scaling-stroke"
                        className="route-line transition-[stroke-opacity] duration-300"
                      />
                    );
                  })}
                </svg>

                <span
                  className="absolute z-20 flex h-4 w-4 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary bg-background"
                  style={{ left: `${leftPct(HUB.lon)}%`, top: `${topPct(HUB.lat)}%` }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                </span>

                {list.map((d) => (
                  <button
                    key={d.country}
                    type="button"
                    onMouseEnter={() => setHover(d.country)}
                    onMouseLeave={() => setHover(null)}
                    onFocus={() => setHover(d.country)}
                    onBlur={() => setHover(null)}
                    aria-label={`${d.country} — ${d.gateway}`}
                    className={`absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-300 hover:scale-150 focus:outline-none ${
                      hover === d.country ? 'z-30' : 'z-10'
                    }`}
                    style={{
                      left: `${leftPct(d.lon)}%`,
                      top: `${topPct(d.lat)}%`,
                      backgroundColor:
                        d.status === 'Active hub'
                          ? 'hsl(var(--primary))'
                          : 'hsl(var(--muted-foreground))',
                    }}
                  >
                    {d.status === 'Active hub' && (
                      <span className="absolute inset-0 animate-ping rounded-full bg-primary/60" />
                    )}
                    <span
                      className={`pointer-events-none absolute bottom-[160%] left-1/2 w-max max-w-[200px] -translate-x-1/2 whitespace-nowrap rounded-2xl border border-border bg-card px-3 py-2 text-left transition-opacity duration-300 ${
                        hover === d.country ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <span className="block font-head text-xs font-bold tracking-tight text-foreground">
                        {d.country}
                      </span>
                      <span className="mt-1 block text-[0.6rem] uppercase tracking-[0.14em] text-primary">
                        {d.lead}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border/70 px-6 py-4 md:px-8">
              <span className="flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground">
                <i className="block h-2 w-2 rounded-full bg-primary" />
                Active hub
              </span>
              <span className="flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground">
                <i className="block h-2 w-2 rounded-full bg-muted-foreground" />
                Serviced
              </span>
              <span className="flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground">
                <Icon name="Factory" size={12} className="text-primary" />
                {HUB.label}
              </span>
            </div>
          </div>

          <div className="sand-panel overflow-hidden">
            <div className="hidden grid-cols-[1.1fr_1.4fr_0.9fr_0.7fr] gap-4 border-b border-border/70 px-8 py-4 text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground md:grid">
              <span>Country</span>
              <span>Gateway</span>
              <span>Mode</span>
              <span className="text-right">Lead time</span>
            </div>

            <div className="max-h-[420px] overflow-y-auto">
              {list.map((d) => (
                <div
                  key={d.country}
                  onMouseEnter={() => setHover(d.country)}
                  onMouseLeave={() => setHover(null)}
                  className={`border-b border-border/60 px-8 py-5 transition-colors duration-300 last:border-b-0 md:grid md:grid-cols-[1.1fr_1.4fr_0.9fr_0.7fr] md:items-center md:gap-4 ${
                    hover === d.country ? 'bg-background/70' : ''
                  }`}
                >
                  <div>
                    <p className="font-head text-base font-bold tracking-tight">{d.country}</p>
                    <p
                      className={`mt-1 text-[0.6rem] uppercase tracking-[0.16em] ${
                        d.status === 'Active hub' ? 'text-primary' : 'text-muted-foreground'
                      }`}
                    >
                      {d.status} · {d.projects} projects
                    </p>
                  </div>
                  <p className="mt-3 text-sm text-foreground md:mt-0">{d.gateway}</p>
                  <p className="mt-1 text-xs text-muted-foreground md:mt-0">{d.mode}</p>
                  <p className="mt-3 font-head text-sm font-bold text-primary md:mt-0 md:text-right">
                    {d.lead}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SUMMARY.map((s) => (
            <div key={s.label} className="sand-panel p-8">
              <p className="font-head text-2xl font-extrabold tracking-tight text-primary lg:text-3xl">
                {s.value}
              </p>
              <p className="mt-2 text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default SupplyMap;