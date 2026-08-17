import { useState } from 'react';
import Section from './Section';
import Icon from '@/components/ui/icon';
import { useReveal } from '@/hooks/use-reveal';

const REGIONS = [
  {
    name: 'Russia & the Arctic',
    projects: '260 projects',
    text: 'Yamal, Kuzbass, Yakutia, Norilsk. Rated to −55 °C and permafrost foundations.',
    pins: [
      { x: 58, y: 26 },
      { x: 66, y: 30 },
      { x: 74, y: 24 },
    ],
  },
  {
    name: 'Central Asia',
    projects: '95 projects',
    text: 'Kazakhstan, Uzbekistan, Mongolia. Mining and energy clusters.',
    pins: [
      { x: 64, y: 40 },
      { x: 68, y: 44 },
    ],
  },
  {
    name: 'Middle East',
    projects: '78 projects',
    text: 'UAE, Saudi Arabia, Oman. +50 °C heat, sand protection, full HVAC.',
    pins: [
      { x: 58, y: 50 },
      { x: 61, y: 54 },
    ],
  },
  {
    name: 'Africa & Latin America',
    projects: '67 projects',
    text: 'Guinea, Zambia, Chile, Peru. Off-grid camps far from any infrastructure.',
    pins: [
      { x: 50, y: 62 },
      { x: 28, y: 68 },
      { x: 30, y: 60 },
    ],
  },
];

const Geography = () => {
  const [active, setActive] = useState(0);
  const { ref, className } = useReveal<HTMLDivElement>();

  return (
    <Section
      id="geography"
      eyebrow="Global footprint"
      title={
        <>
          We build camps
          <span className="block text-primary">across four continents</span>
        </>
      }
      lead="25+ countries, local installation contractors and service teams close to your site."
    >
      <div ref={ref} className={`${className} grid gap-px border border-border bg-border lg:grid-cols-[1fr_1.2fr]`}>
        <div className="bg-card">
          {REGIONS.map((r, i) => (
            <button
              key={r.name}
              type="button"
              onMouseEnter={() => setActive(i)}
              onClick={() => setActive(i)}
              className={`block w-full border-b border-border px-8 py-7 text-left transition-colors duration-300 last:border-b-0 ${
                i === active ? 'bg-background' : 'hover:bg-background/50'
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <p className="font-head text-lg font-bold tracking-tight">{r.name}</p>
                <span className="text-[0.65rem] uppercase tracking-[0.16em] text-primary">
                  {r.projects}
                </span>
              </div>
              <p
                className={`overflow-hidden text-sm leading-relaxed text-muted-foreground transition-all duration-500 ${
                  i === active ? 'mt-3 max-h-24 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                {r.text}
              </p>
            </button>
          ))}
        </div>

        <div className="relative min-h-[340px] overflow-hidden bg-background p-8 lg:min-h-[460px]">
          <div
            className="absolute inset-0 opacity-[0.22]"
            style={{
              backgroundImage:
                'radial-gradient(hsl(var(--muted-foreground)) 1px, transparent 1px)',
              backgroundSize: '14px 14px',
            }}
          />
          {REGIONS.map((r, ri) =>
            r.pins.map((p, pi) => (
              <span
                key={`${ri}-${pi}`}
                className={`absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-500 ${
                  ri === active ? 'scale-125 bg-primary' : 'scale-90 bg-muted-foreground/40'
                }`}
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
              >
                {ri === active && (
                  <span className="absolute inset-0 animate-ping rounded-full bg-primary/60" />
                )}
              </span>
            )),
          )}
          <div className="absolute bottom-8 left-8 right-8 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-head text-4xl font-extrabold tracking-tight text-primary">25+</p>
              <p className="mt-2 text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground">
                countries served
              </p>
            </div>
            <a
              href="#contacts"
              className="flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-primary"
            >
              Check your location
              <Icon name="ArrowRight" size={14} />
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Geography;