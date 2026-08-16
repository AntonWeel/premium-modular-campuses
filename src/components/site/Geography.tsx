import { useState } from 'react';
import Section from './Section';
import Icon from '@/components/ui/icon';
import { useReveal } from '@/hooks/use-reveal';

const REGIONS = [
  {
    name: 'Россия и Арктика',
    projects: '260 проектов',
    text: 'Ямал, Кузбасс, Якутия, Норильск. Исполнение до −55 °C и вечная мерзлота.',
    pins: [
      { x: 58, y: 26 },
      { x: 66, y: 30 },
      { x: 74, y: 24 },
    ],
  },
  {
    name: 'Центральная Азия',
    projects: '95 проектов',
    text: 'Казахстан, Узбекистан, Монголия. Горнодобыча и энергетические кластеры.',
    pins: [
      { x: 64, y: 40 },
      { x: 68, y: 44 },
    ],
  },
  {
    name: 'Ближний Восток',
    projects: '78 проектов',
    text: 'ОАЭ, Саудовская Аравия, Оман. Жара +50 °C, песчаная защита, кондиционирование.',
    pins: [
      { x: 58, y: 50 },
      { x: 61, y: 54 },
    ],
  },
  {
    name: 'Африка и Латинская Америка',
    projects: '67 проектов',
    text: 'Гвинея, Замбия, Чили, Перу. Автономные кампусы вдали от инфраструктуры.',
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
      eyebrow="География присутствия"
      title={
        <>
          Строим кампусы
          <span className="block text-primary">на четырёх континентах</span>
        </>
      }
      lead="25+ стран, локальные подрядчики по монтажу и сервисные команды рядом с вашим объектом."
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
                стран поставки
              </p>
            </div>
            <a
              href="#contacts"
              className="flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-primary"
            >
              Проверить вашу локацию
              <Icon name="ArrowRight" size={14} />
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Geography;
