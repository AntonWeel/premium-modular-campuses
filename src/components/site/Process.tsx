import { useState } from 'react';
import Section from './Section';
import Icon from '@/components/ui/icon';
import { useReveal } from '@/hooks/use-reveal';

const STEPS = [
  { icon: 'PencilRuler', title: 'Engineering', term: '7–14 days', text: 'Site layout, floor plans, specifications, budget and the delivery schedule.' },
  { icon: 'Frame', title: 'Steel frame', term: '10 days', text: 'Robotic frame welding followed by anti-corrosion treatment.' },
  { icon: 'Layers', title: 'Sandwich panels', term: '7 days', text: 'A building envelope rated for operation down to −55 °C.' },
  { icon: 'Paintbrush', title: 'Interior fit-out', term: '14 days', text: 'Furniture, plumbing, wiring and HVAC — all installed inside the module at the plant.' },
  { icon: 'ClipboardCheck', title: 'Quality control', term: '3 days', text: 'Air-tightness, electrical and fire safety testing, plus client acceptance.' },
  { icon: 'Package', title: 'Packing & shipment', term: '5 days', text: 'Transport frames, protection, documentation and customs clearance.' },
  { icon: 'Truck', title: 'Site installation', term: '15–30 days', text: 'Foundations, crane work, module coupling and utility connections.' },
  { icon: 'KeyRound', title: 'Camp ready', term: '—', text: 'Commissioning, staff training, warranty and ongoing service support.' },
];

const Process = () => {
  const [active, setActive] = useState(0);
  const { ref, className } = useReveal<HTMLDivElement>();

  return (
    <Section
      id="process"
      eyebrow="From plant to site"
      title={
        <>
          The full cycle
          <span className="block text-primary">in 8 steps</span>
        </>
      }
      lead="Every stage is locked into the schedule. You track module status online — from steel cutting to move-in."
    >
      <div ref={ref} className={className}>
        <div className="relative mb-12 hidden md:block">
          <span className="absolute left-0 right-0 top-[26px] h-px bg-border" />
          <div className="relative grid grid-cols-8 gap-2">
            {STEPS.map((s, i) => (
              <button
                key={s.title}
                type="button"
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className="group flex flex-col items-center text-center"
              >
                <span
                  className={`flex h-[52px] w-[52px] items-center justify-center rounded-sm border transition-all duration-300 ${
                    i === active
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-card text-primary group-hover:border-primary'
                  }`}
                >
                  <Icon name={s.icon} size={22} />
                </span>
                <span
                  className={`mt-4 text-[0.65rem] uppercase leading-tight tracking-[0.12em] transition-colors ${
                    i === active ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  {s.title}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="hidden border border-border bg-card p-8 md:block lg:p-12">
          <div className="flex flex-wrap items-baseline gap-6">
            <p className="font-head text-[0.75rem] uppercase tracking-[0.3em] text-primary">
              Step {String(active + 1).padStart(2, '0')}
            </p>
            <h3 className="font-head text-3xl font-extrabold tracking-tight">{STEPS[active].title}</h3>
            <span className="rounded-sm border border-border px-3 py-1 text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">
              {STEPS[active].term}
            </span>
          </div>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {STEPS[active].text}
          </p>
        </div>

        <div className="space-y-px bg-border md:hidden">
          {STEPS.map((s, i) => (
            <div key={s.title} className="bg-card p-6">
              <div className="flex items-center gap-4">
                <Icon name={s.icon} size={22} className="flex-none text-primary" />
                <h3 className="font-head text-lg font-bold">{s.title}</h3>
                <span className="ml-auto text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">
                  {s.term}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              <span className="sr-only">{i}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Process;