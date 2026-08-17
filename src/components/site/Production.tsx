import { useState } from 'react';
import Section from './Section';
import Icon from '@/components/ui/icon';
import GoldButton from './GoldButton';
import { useReveal } from '@/hooks/use-reveal';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const CARDS = [
  {
    title: 'Steel frame production',
    text: 'Robotic frame welding to a ±2 mm tolerance.',
    image:
      'https://cdn.poehali.dev/projects/8307f028-03f1-4f3f-9486-4ee7a5ad6e3f/files/c3d7112e-2958-44ab-acb6-d61fb7d13747.jpg',
  },
  {
    title: 'Sandwich panel line',
    text: 'In-house manufacturing of the building envelope.',
    image:
      'https://cdn.poehali.dev/projects/8307f028-03f1-4f3f-9486-4ee7a5ad6e3f/files/9beb8345-cb53-466c-99e0-4190f9b713bf.jpg',
  },
  {
    title: 'Quality control',
    text: '112 inspection points on every module.',
    image:
      'https://cdn.poehali.dev/projects/8307f028-03f1-4f3f-9486-4ee7a5ad6e3f/files/2b670682-7784-4494-8bee-03303e360164.jpg',
  },
  {
    title: 'On-site installation',
    text: 'Up to 12 modules per day with a single crew.',
    image:
      'https://cdn.poehali.dev/projects/8307f028-03f1-4f3f-9486-4ee7a5ad6e3f/files/3a7048c3-597c-43b2-a5e3-09435c35dced.jpg',
  },
];

const SPECS = [
  { value: '48,000 sq m', label: 'plant floor area' },
  { value: '3,500', label: 'modules per year' },
  { value: 'ISO 9001', label: 'quality system' },
  { value: 'EI 60', label: 'fire resistance rating' },
];

const Production = () => {
  const { ref, className } = useReveal<HTMLDivElement>();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <Section
      id="production"
      className="bg-card"
      eyebrow="Technology and production"
      title={
        <>
          Factory precision.
          <span className="block text-primary">Guaranteed quality.</span>
        </>
      }
      lead="Two full-cycle plants: from steel cutting to a finished module with furniture and utilities already inside."
      headerRight={<GoldButton href="#contacts" ghost>Book a plant tour</GoldButton>}
    >
      <div ref={ref} className={className}>
        <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((c, i) => (
            <button
              key={c.title}
              type="button"
              onClick={() => setOpen(i)}
              className="group relative aspect-[4/5] overflow-hidden bg-background text-left"
            >
              <img
                src={c.image}
                alt={c.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="veil-soft absolute inset-0" />
              <span className="absolute inset-x-0 bottom-0 p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/70 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon name="Play" size={16} />
                </span>
                <span className="mt-5 block font-head text-lg font-bold leading-tight">{c.title}</span>
                <span className="mt-2 block text-xs text-muted-foreground">{c.text}</span>
              </span>
            </button>
          ))}
        </div>

        <div className="mt-px grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {SPECS.map((s) => (
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

      <Dialog open={open !== null} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent className="max-w-4xl border-border bg-card p-0">
          {open !== null && (
            <div>
              <img src={CARDS[open].image} alt={CARDS[open].title} className="w-full object-cover" />
              <div className="p-8">
                <h3 className="font-head text-2xl font-extrabold tracking-tight">{CARDS[open].title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{CARDS[open].text}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Section>
  );
};

export default Production;