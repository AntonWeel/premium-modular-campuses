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
    capacity: '50 – 100 человек',
    area: 'от 1 200 м²',
    term: '45 дней',
    tagline: 'Компактное решение для небольших бригад и стартовых площадок.',
    image:
      'https://cdn.poehali.dev/projects/8307f028-03f1-4f3f-9486-4ee7a5ad6e3f/files/fb0d84a7-4af4-41d1-8f1e-35ad6c4077f1.jpg',
    features: ['Жилые модули 2–4 места', 'Столовая на 60 мест', 'Прачечная и сушилки', 'Дизельная электростанция'],
  },
  {
    key: 'M',
    name: 'Campus M',
    capacity: '100 – 250 человек',
    area: 'от 3 500 м²',
    term: '60 дней',
    tagline: 'Оптимальный формат для проектов среднего масштаба.',
    image:
      'https://cdn.poehali.dev/projects/8307f028-03f1-4f3f-9486-4ee7a5ad6e3f/files/04c04177-f064-4f95-b1a9-a5c3deaf5883.jpg',
    features: ['Комнаты 1–2 места', 'Столовая полного цикла', 'Медпункт и офис', 'Зона отдыха и спортзал'],
  },
  {
    key: 'L',
    name: 'Campus L',
    capacity: '250 – 500 человек',
    area: 'от 8 000 м²',
    term: '90 дней',
    tagline: 'Полноценный посёлок с социальной инфраструктурой.',
    image:
      'https://cdn.poehali.dev/projects/8307f028-03f1-4f3f-9486-4ee7a5ad6e3f/files/4eab287f-c72d-4972-b86a-03a61acb14c9.jpg',
    features: ['Одноместные номера', 'Спорткомплекс и сауна', 'Конференц-зал', 'Собственные очистные'],
  },
  {
    key: 'XL',
    name: 'Campus XL',
    capacity: '500 – 2000 человек',
    area: 'от 20 000 м²',
    term: 'от 120 дней',
    tagline: 'Город для мегапроектов: жильё, сервис, инженерия, безопасность.',
    image:
      'https://cdn.poehali.dev/projects/8307f028-03f1-4f3f-9486-4ee7a5ad6e3f/files/1238d11e-994e-410e-9cf7-bd28267df2e6.jpg',
    features: ['Кварталы по 250 мест', 'Стадион и магазины', 'Котельная и подстанция', 'Служба безопасности 24/7'],
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
      eyebrow="Выберите свой кампус"
      title={
        <>
          Гибкие решения
          <span className="block text-primary">под любой масштаб</span>
        </>
      }
      lead="От небольшого лагеря до города на две тысячи жителей. Масштабируется, комфортен и рассчитан на годы эксплуатации."
      headerRight={<GoldButton href="#contacts" ghost>Все решения</GoldButton>}
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
                <p className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">Площадь</p>
                <p className="mt-2 font-head text-xl font-bold text-primary">{campus.area}</p>
              </div>
              <div className="bg-card pl-6 pt-6">
                <p className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">Срок сдачи</p>
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