import { useState } from 'react';
import Section from './Section';
import Icon from '@/components/ui/icon';
import GoldButton from './GoldButton';
import { useReveal } from '@/hooks/use-reveal';

type Cell = 'unit' | 'core' | 'yard';

interface Concept {
  no: string;
  key: string;
  title: string;
  people: string;
  blocks: string;
  floors: string;
  modules: string;
  text: string;
  plan: { cols: number; rows: number; cells: Cell[] };
  features: { icon: string; label: string }[];
}

const grid = (cols: number, rows: number, fill: Cell = 'unit'): Cell[] =>
  Array.from({ length: cols * rows }, () => fill);

const uShape = (): Cell[] => {
  const cells = grid(7, 4, 'yard');
  for (let c = 0; c < 7; c += 1) cells[c] = 'unit';
  for (let r = 1; r < 4; r += 1) {
    cells[r * 7] = 'unit';
    cells[r * 7 + 6] = 'unit';
  }
  cells[3] = 'core';
  return cells;
};

const campus = (): Cell[] => {
  const cells = grid(8, 5, 'yard');
  const put = (c: number, r: number, v: Cell) => {
    cells[r * 8 + c] = v;
  };
  [0, 1, 6, 7].forEach((c) => [0, 1, 3, 4].forEach((r) => put(c, r, 'unit')));
  [3, 4].forEach((c) => [0, 4].forEach((r) => put(c, r, 'unit')));
  [3, 4].forEach((c) => put(c, 2, 'core'));
  return cells;
};

const dense = (): Cell[] => {
  const cells = grid(9, 4);
  [1, 4, 7].forEach((c) => [1, 2].forEach((r) => {
    cells[r * 9 + c] = 'core';
  }));
  return cells;
};

const CONCEPTS: Concept[] = [
  {
    no: '01',
    key: 'linear',
    title: 'Linear block',
    people: '50 – 100 people',
    blocks: '12 – 24 blocks',
    floors: '1 – 2 floors',
    modules: '12 modules per floor',
    text: 'A single straight line of modules along the access road. The fastest layout to erect and the cheapest to service — ideal for compact sites and short-term projects.',
    plan: { cols: 12, rows: 2, cells: grid(12, 2) },
    features: [
      { icon: 'Minimize2', label: 'Compact footprint' },
      { icon: 'Wallet', label: 'Cost effective' },
      { icon: 'MoveRight', label: 'Easy expansion' },
    ],
  },
  {
    no: '02',
    key: 'u-shape',
    title: 'U-shaped complex',
    people: '100 – 200 people',
    blocks: '24 – 48 blocks',
    floors: '2 floors',
    modules: '24 modules per floor',
    text: 'Three wings enclose a sheltered courtyard with the canteen at its head. Wind protection, a real social space and short walking distances between all functions.',
    plan: { cols: 7, rows: 4, cells: uShape() },
    features: [
      { icon: 'Trees', label: 'Private courtyard' },
      { icon: 'Users', label: 'Social space' },
      { icon: 'Sun', label: 'Natural light' },
    ],
  },
  {
    no: '03',
    key: 'campus',
    title: 'Multi-block campus',
    people: '200 – 500 people',
    blocks: '42 – 90 blocks',
    floors: '2 – 3 floors',
    modules: '42 modules master plan',
    text: 'Separate residential blocks around a central service core with canteen, gym and medical point. Zones can be phased in as the workforce grows.',
    plan: { cols: 8, rows: 5, cells: campus() },
    features: [
      { icon: 'Network', label: 'Scalable by needs' },
      { icon: 'Building2', label: 'Multi-functional' },
      { icon: 'LayoutGrid', label: 'Separate zones' },
    ],
  },
  {
    no: '04',
    key: 'high-density',
    title: 'High-density complex',
    people: '500+ people',
    blocks: '90 – 180 blocks',
    floors: '3 floors',
    modules: '60+ modules per floor',
    text: 'Maximum capacity per hectare: three storeys, internal corridors and vertical service cores. Built for long-term operations on constrained sites.',
    plan: { cols: 9, rows: 4, cells: dense() },
    features: [
      { icon: 'ArrowUpNarrowWide', label: 'Maximum capacity' },
      { icon: 'Ruler', label: 'Efficient layout' },
      { icon: 'Sparkles', label: 'Advanced facilities' },
    ],
  },
];

const PlanDiagram = ({ plan }: { plan: Concept['plan'] }) => (
  <div
    className="grid w-full gap-[3px]"
    style={{ gridTemplateColumns: `repeat(${plan.cols}, minmax(0, 1fr))` }}
  >
    {plan.cells.map((cell, i) => (
      <span
        key={i}
        className={`aspect-square rounded-[3px] transition-colors duration-500 ${
          cell === 'unit'
            ? 'bg-primary/70'
            : cell === 'core'
              ? 'bg-primary'
              : 'bg-foreground/[0.06]'
        }`}
      />
    ))}
  </div>
);

const ModularConcepts = () => {
  const [active, setActive] = useState(0);
  const { ref, className } = useReveal<HTMLDivElement>();
  const c = CONCEPTS[active];

  return (
    <Section
      id="concepts"
      className="bg-card"
      eyebrow="Multiple layouts. One system."
      title={
        <>
          Modular accommodation
          <span className="block text-primary">concepts</span>
        </>
      }
      lead="The same certified module builds four different camps. Choose the configuration that fits your site, headcount and project length."
      headerRight={<GoldButton href="#contacts" ghost>Discuss a layout</GoldButton>}
    >
      <div ref={ref} className={className}>
        <div className="mb-8 flex flex-wrap gap-3">
          {CONCEPTS.map((item, i) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setActive(i)}
              className={`rounded-full border px-5 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.16em] transition-all duration-300 ${
                i === active
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border text-muted-foreground hover:border-primary hover:text-foreground'
              }`}
            >
              <span className="mr-2 opacity-60">{item.no}</span>
              {item.title}
            </button>
          ))}
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.15fr_1fr]">
          <div className="dune-field flex flex-col justify-between rounded-[2rem] border border-border bg-background p-8 lg:p-10">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="font-head text-[0.7rem] uppercase tracking-[0.3em] text-primary">
                  Layout {c.no}
                </p>
                <h3 className="mt-3 font-head text-2xl font-extrabold tracking-tight lg:text-3xl">
                  {c.title}
                </h3>
              </div>
              <span className="rounded-full border border-primary/60 px-4 py-2 text-[0.65rem] uppercase tracking-[0.16em] text-primary">
                {c.people}
              </span>
            </div>

            <div className="my-10">
              <PlanDiagram plan={c.plan} />
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
                <span className="flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground">
                  <i className="block h-2 w-2 rounded-[2px] bg-primary/70" />
                  Living module
                </span>
                <span className="flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground">
                  <i className="block h-2 w-2 rounded-[2px] bg-primary" />
                  Service core
                </span>
                <span className="flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground">
                  <i className="block h-2 w-2 rounded-[2px] bg-foreground/20" />
                  Open yard
                </span>
              </div>
            </div>

            <p className="text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground">
              {c.modules}
            </p>
          </div>

          <div className="sand-panel flex flex-col justify-between gap-8 p-8 lg:p-10">
            <div>
              <p className="text-base leading-relaxed text-foreground">{c.text}</p>
              <ul className="mt-8 space-y-4">
                {c.features.map((f) => (
                  <li key={f.label} className="flex items-center gap-4">
                    <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-border bg-background/60 text-primary">
                      <Icon name={f.icon} fallback="CircleAlert" size={17} />
                    </span>
                    <span className="text-sm text-muted-foreground">{f.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-border/70">
              <div className="pt-6">
                <p className="text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground">
                  Blocks
                </p>
                <p className="mt-2 font-head text-xl font-bold text-primary">{c.blocks}</p>
              </div>
              <div className="pl-6 pt-6">
                <p className="text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground">
                  Height
                </p>
                <p className="mt-2 font-head text-xl font-bold text-primary">{c.floors}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ModularConcepts;
