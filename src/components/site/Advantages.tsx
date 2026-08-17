import Section from './Section';
import Icon from '@/components/ui/icon';
import { useReveal } from '@/hooks/use-reveal';

const ITEMS = [
  {
    icon: 'Zap',
    title: '70% faster',
    text: 'Plant and site run in parallel, so programme time drops dramatically.',
  },
  {
    icon: 'Factory',
    title: 'Factory quality',
    text: 'Precise geometry and inspection at every station — in the shop, not in the field.',
  },
  {
    icon: 'Globe',
    title: 'Worldwide delivery',
    text: 'Road, sea and rail. 25+ countries and any logistics scheme you need.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Fire performance',
    text: 'Non-combustible materials certified to international standards.',
  },
  {
    icon: 'Leaf',
    title: 'Energy efficiency',
    text: 'Envelope rated to −55 °C, heat recovery and low running costs.',
  },
  {
    icon: 'Boxes',
    title: 'Scalable by design',
    text: 'The camp expands and relocates to the next site without losses.',
  },
];

const Advantages = () => {
  const { ref, className } = useReveal<HTMLDivElement>();

  return (
    <Section
      id="advantages"
      eyebrow="Why Living Campus"
      title={
        <>
          Built for performance.
          <span className="block text-primary">Designed for people.</span>
        </>
      }
      lead="We own the full cycle — from site layout studies to handing over a fully occupied turnkey camp."
    >
      <div ref={ref} className={`${className} grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3`}>
        {ITEMS.map((it, i) => (
          <article
            key={it.title}
            className="group relative bg-card p-8 transition-colors duration-300 hover:bg-background lg:p-10"
            style={{ transitionDelay: `${i * 40}ms` }}
          >
            <span className="absolute right-8 top-8 font-head text-[0.7rem] tracking-[0.2em] text-muted-foreground/50">
              0{i + 1}
            </span>
            <Icon
              name={it.icon}
              size={30}
              className="text-primary transition-transform duration-500 group-hover:-translate-y-1"
            />
            <h3 className="mt-7 font-head text-xl font-bold tracking-tight">{it.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{it.text}</p>
            <span className="mt-7 block h-px w-10 bg-primary transition-all duration-500 group-hover:w-20" />
          </article>
        ))}
      </div>
    </Section>
  );
};

export default Advantages;