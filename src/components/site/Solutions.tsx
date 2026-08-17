import { useState } from 'react';
import Section from './Section';
import Icon from '@/components/ui/icon';
import GoldButton from './GoldButton';
import { useReveal } from '@/hooks/use-reveal';

interface Campus {
  key: string;
  name: string;
  capacity: string;
  area: string;
  term: string;
  image: string;
  tagline: string;
  features: string[];
}

const CAMPUSES: Campus[] = [
  {
    key: 'S',
    name: 'Campus S',
    capacity: '50 – 100 people',
    area: 'from 1,200 sq m',
    term: '45 days',
    tagline: 'A compact solution for small crews and early-works sites.',
    image:
      'https://cdn.poehali.dev/projects/8307f028-03f1-4f3f-9486-4ee7a5ad6e3f/files/fb0d84a7-4af4-41d1-8f1e-35ad6c4077f1.jpg',
    features: ['2–4 bed sleeping modules', '60-seat canteen', 'Laundry and drying rooms', 'Diesel power station'],
  },
  {
    key: 'M',
    name: 'Campus M',
    capacity: '100 – 250 people',
    area: 'from 3,500 sq m',
    term: '60 days',
    tagline: 'The optimal format for mid-scale projects.',
    image:
      'https://cdn.poehali.dev/projects/8307f028-03f1-4f3f-9486-4ee7a5ad6e3f/files/04c04177-f064-4f95-b1a9-a5c3deaf5883.jpg',
    features: ['Single and twin rooms', 'Full-cycle catering', 'Medical point and office', 'Lounge and gym'],
  },
  {
    key: 'L',
    name: 'Campus L',
    capacity: '250 – 500 people',
    area: 'from 8,000 sq m',
    term: '90 days',
    tagline: 'A complete village with full social infrastructure.',
    image:
      'https://cdn.poehali.dev/projects/8307f028-03f1-4f3f-9486-4ee7a5ad6e3f/files/4eab287f-c72d-4972-b86a-03a61acb14c9.jpg',
    features: ['Single-occupancy rooms', 'Sports centre and sauna', 'Conference hall', 'On-site water treatment'],
  },
  {
    key: 'XL',
    name: 'Campus XL',
    capacity: '500 – 2,000 people',
    area: 'from 20,000 sq m',
    term: 'from 120 days',
    tagline: 'A township for megaprojects: housing, services, utilities, security.',
    image:
      'https://cdn.poehali.dev/projects/8307f028-03f1-4f3f-9486-4ee7a5ad6e3f/files/1238d11e-994e-410e-9cf7-bd28267df2e6.jpg',
    features: ['Districts of 250 beds', 'Stadium and retail', 'Boiler house and substation', '24/7 security service'],
  },
];

const Solutions = () => {
  const [active, setActive] = useState(2);
  const { ref, className } = useReveal<HTMLDivElement>();
  const campus = CAMPUSES[active];

  return (
    <Section
      id="solutions"
      className="bg-card"
      eyebrow="Choose your camp"
      title={
        <>
          Flexible solutions
          <span className="block text-primary">for any scale</span>
        </>
      }
      lead="From a small crew camp to a township of two thousand residents. Scalable, comfortable and built for years of operation."
      headerRight={<GoldButton href="#contacts" ghost>All solutions</GoldButton>}
    >
      <div ref={ref} className={className}>
        <div className="mb-10 flex flex-wrap gap-3">
          {CAMPUSES.map((c, i) => (
            <button
              key={c.key}
              type="button"
              onClick={() => setActive(i)}
              className={`rounded-sm border px-6 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.16em] transition-all duration-300 ${
                i === active
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border text-muted-foreground hover:border-primary hover:text-foreground'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        <div className="grid gap-px border border-border bg-border lg:grid-cols-[1.35fr_1fr]">
          <div className="relative min-h-[320px] overflow-hidden bg-background lg:min-h-[480px]">
            {CAMPUSES.map((c, i) => (
              <img
                key={c.key}
                src={c.image}
                alt={c.name}
                className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
                  i === active ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
                }`}
              />
            ))}
            <div className="veil-soft pointer-events-none absolute inset-0" />
            <div className="absolute bottom-0 left-0 p-8 lg:p-10">
              <p className="font-head text-3xl font-extrabold tracking-tight lg:text-[2.6rem]">
                {campus.name}
              </p>
              <p className="mt-2 text-sm uppercase tracking-[0.2em] text-primary">{campus.capacity}</p>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-8 bg-card p-8 lg:p-10">
            <div>
              <p className="text-lg leading-relaxed text-foreground">{campus.tagline}</p>
              <ul className="mt-8 space-y-4">
                {campus.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Icon name="Check" size={16} className="mt-0.5 flex-none text-primary" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-px border-t border-border bg-border pt-px">
              <div className="bg-card pt-6">
                <p className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">Floor area</p>
                <p className="mt-2 font-head text-xl font-bold text-primary">{campus.area}</p>
              </div>
              <div className="bg-card pl-6 pt-6">
                <p className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">Delivery</p>
                <p className="mt-2 font-head text-xl font-bold text-primary">{campus.term}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Solutions;