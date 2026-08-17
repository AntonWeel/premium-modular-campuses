import { useMemo, useState } from 'react';
import Section from './Section';
import Icon from '@/components/ui/icon';
import { useReveal } from '@/hooks/use-reveal';

type RegionKey = 'all' | 'cis' | 'asia' | 'mena' | 'africa' | 'latam';

interface Destination {
  country: string;
  region: Exclude<RegionKey, 'all'>;
  gateway: string;
  mode: string;
  lead: string;
  projects: number;
  status: 'Active hub' | 'Serviced';
  x: number;
  y: number;
}

const REGIONS: { key: RegionKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'cis', label: 'CIS & Arctic' },
  { key: 'asia', label: 'Central Asia' },
  { key: 'mena', label: 'Middle East' },
  { key: 'africa', label: 'Africa' },
  { key: 'latam', label: 'Latin America' },
];

const HUB = { x: 60, y: 27, label: 'Tyumen production hub' };

const DESTINATIONS: Destination[] = [
  {
    country: 'Russia',
    region: 'cis',
    gateway: 'Sabetta / Murmansk',
    mode: 'Sea + rail',
    lead: '18–24 days',
    projects: 214,
    status: 'Active hub',
    x: 57,
    y: 24,
  },
  {
    country: 'Belarus',
    region: 'cis',
    gateway: 'Brest / Minsk',
    mode: 'Road convoy',
    lead: '12–16 days',
    projects: 18,
    status: 'Serviced',
    x: 51,
    y: 31,
  },
  {
    country: 'Azerbaijan',
    region: 'cis',
    gateway: 'Baku / Alat',
    mode: 'Rail + sea',
    lead: '24–30 days',
    projects: 22,
    status: 'Serviced',
    x: 56,
    y: 41,
  },
  {
    country: 'Norway',
    region: 'cis',
    gateway: 'Kirkenes',
    mode: 'Sea',
    lead: '26–34 days',
    projects: 11,
    status: 'Serviced',
    x: 48,
    y: 22,
  },
  {
    country: 'Kazakhstan',
    region: 'asia',
    gateway: 'Aktau / Dostyk',
    mode: 'Rail + road convoy',
    lead: '21–28 days',
    projects: 54,
    status: 'Active hub',
    x: 64,
    y: 39,
  },
  {
    country: 'Uzbekistan',
    region: 'asia',
    gateway: 'Tashkent / Termez',
    mode: 'Rail',
    lead: '26–32 days',
    projects: 23,
    status: 'Serviced',
    x: 62,
    y: 45,
  },
  {
    country: 'Mongolia',
    region: 'asia',
    gateway: 'Zamyn-Üüd / Ulaanbaatar',
    mode: 'Rail + road convoy',
    lead: '30–38 days',
    projects: 12,
    status: 'Serviced',
    x: 74,
    y: 37,
  },
  {
    country: 'Kyrgyzstan',
    region: 'asia',
    gateway: 'Bishkek',
    mode: 'Road convoy',
    lead: '28–34 days',
    projects: 6,
    status: 'Serviced',
    x: 68,
    y: 43,
  },
  {
    country: 'UAE',
    region: 'mena',
    gateway: 'Jebel Ali',
    mode: 'Sea + heavy trucking',
    lead: '34–42 days',
    projects: 31,
    status: 'Active hub',
    x: 61,
    y: 52,
  },
  {
    country: 'Saudi Arabia',
    region: 'mena',
    gateway: 'Dammam / Jeddah',
    mode: 'Sea + heavy trucking',
    lead: '38–46 days',
    projects: 26,
    status: 'Active hub',
    x: 57,
    y: 53,
  },
  {
    country: 'Oman',
    region: 'mena',
    gateway: 'Duqm / Salalah',
    mode: 'Sea',
    lead: '40–48 days',
    projects: 12,
    status: 'Serviced',
    x: 63,
    y: 57,
  },
  {
    country: 'Iraq',
    region: 'mena',
    gateway: 'Umm Qasr',
    mode: 'Sea + road convoy',
    lead: '36–44 days',
    projects: 9,
    status: 'Serviced',
    x: 56,
    y: 47,
  },
  {
    country: 'Guinea',
    region: 'africa',
    gateway: 'Conakry',
    mode: 'Sea',
    lead: '46–58 days',
    projects: 21,
    status: 'Active hub',
    x: 43,
    y: 60,
  },
  {
    country: 'Zambia',
    region: 'africa',
    gateway: 'Dar es Salaam / Ndola',
    mode: 'Sea + rail',
    lead: '52–64 days',
    projects: 14,
    status: 'Serviced',
    x: 54,
    y: 69,
  },
  {
    country: 'DR Congo',
    region: 'africa',
    gateway: 'Matadi / Lubumbashi',
    mode: 'Sea + heavy trucking',
    lead: '54–66 days',
    projects: 8,
    status: 'Serviced',
    x: 49,
    y: 65,
  },
  {
    country: 'Chile',
    region: 'latam',
    gateway: 'San Antonio / Antofagasta',
    mode: 'Sea',
    lead: '48–60 days',
    projects: 17,
    status: 'Active hub',
    x: 29,
    y: 73,
  },
  {
    country: 'Peru',
    region: 'latam',
    gateway: 'Callao / Matarani',
    mode: 'Sea + heavy trucking',
    lead: '50–62 days',
    projects: 12,
    status: 'Serviced',
    x: 27,
    y: 66,
  },
  {
    country: 'Brazil',
    region: 'latam',
    gateway: 'Santos',
    mode: 'Air-assisted + sea',
    lead: '46–58 days',
    projects: 7,
    status: 'Serviced',
    x: 34,
    y: 70,
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
              className={`rounded-sm border px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] transition-all duration-300 sm:px-5 ${
                r.key === region
                  ? 'border-primary text-primary'
                  : 'border-border text-muted-foreground hover:border-primary/60 hover:text-foreground'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        <div className="grid gap-px border border-border bg-border lg:grid-cols-[1.15fr_1fr]">
          <div className="relative min-h-[320px] overflow-hidden bg-background p-8 lg:min-h-[520px]">
            <div
              className="absolute inset-0 opacity-[0.22]"
              style={{
                backgroundImage:
                  'radial-gradient(hsl(var(--muted-foreground)) 1px, transparent 1px)',
                backgroundSize: '14px 14px',
              }}
            />

            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden
              className="absolute inset-0 h-full w-full"
            >
              {list.map((d) => (
                <path
                  key={d.country}
                  d={`M ${HUB.x} ${HUB.y} Q ${(HUB.x + d.x) / 2} ${
                    Math.min(HUB.y, d.y) - 6
                  } ${d.x} ${d.y}`}
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="1"
                  strokeOpacity={hover === null || hover === d.country ? 0.55 : 0.18}
                  vectorEffect="non-scaling-stroke"
                  className="route-line transition-[stroke-opacity] duration-300"
                />
              ))}
            </svg>

            <span
              className="absolute z-10 flex h-4 w-4 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary bg-background"
              style={{ left: `${HUB.x}%`, top: `${HUB.y}%` }}
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
                className="absolute z-10 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-300 hover:scale-150 focus:outline-none"
                style={{
                  left: `${d.x}%`,
                  top: `${d.y}%`,
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
                  className={`pointer-events-none absolute bottom-[150%] left-1/2 w-max max-w-[180px] -translate-x-1/2 whitespace-nowrap rounded-sm border border-border bg-card px-3 py-2 text-left transition-opacity duration-300 ${
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

            <div className="absolute bottom-8 left-8 right-8 flex flex-wrap items-center gap-x-6 gap-y-2">
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

          <div className="bg-card">
            <div className="hidden grid-cols-[1.1fr_1.4fr_0.7fr] gap-4 border-b border-border px-8 py-4 text-[0.6rem] uppercase tracking-[0.18em] text-muted-foreground md:grid">
              <span>Country</span>
              <span>Gateway &amp; mode</span>
              <span className="text-right">Lead time</span>
            </div>

            <div className="max-h-[460px] overflow-y-auto">
              {list.map((d) => (
                <div
                  key={d.country}
                  onMouseEnter={() => setHover(d.country)}
                  onMouseLeave={() => setHover(null)}
                  className={`border-b border-border px-8 py-5 transition-colors duration-300 last:border-b-0 md:grid md:grid-cols-[1.1fr_1.4fr_0.7fr] md:items-center md:gap-4 ${
                    hover === d.country ? 'bg-background' : ''
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
                  <div className="mt-3 md:mt-0">
                    <p className="text-sm text-foreground">{d.gateway}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{d.mode}</p>
                  </div>
                  <p className="mt-3 font-head text-sm font-bold text-primary md:mt-0 md:text-right">
                    {d.lead}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-px grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {SUMMARY.map((s) => (
            <div key={s.label} className="bg-background p-8">
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
