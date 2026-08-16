import Section from './Section';
import Icon from '@/components/ui/icon';
import { useReveal } from '@/hooks/use-reveal';

const CHAIN = [
  { icon: 'Factory', title: 'Изготовлено', text: 'На нашем заводе' },
  { icon: 'Package', title: 'Упаковано', text: 'В транспортные рамы' },
  { icon: 'Truck', title: 'Доставлено', text: 'До порта или ж/д' },
  { icon: 'Ship', title: 'Отправлено', text: 'По всему миру' },
  { icon: 'Crane', title: 'Смонтировано', text: 'На площадке', fallback: 'Building2' },
  { icon: 'Home', title: 'Заселено', text: 'Готово к вахте' },
];

const SHOTS = [
  {
    src: 'https://cdn.poehali.dev/projects/8307f028-03f1-4f3f-9486-4ee7a5ad6e3f/files/83f9790e-a5c9-4c01-86b1-a8f5b12fc77f.jpg',
    alt: 'Перевозка модулей автотранспортом',
  },
  {
    src: 'https://cdn.poehali.dev/projects/8307f028-03f1-4f3f-9486-4ee7a5ad6e3f/files/a9818d88-c76e-4490-976a-91636a9633ad.jpg',
    alt: 'Отгрузка в морском порту',
  },
  {
    src: 'https://cdn.poehali.dev/projects/8307f028-03f1-4f3f-9486-4ee7a5ad6e3f/files/3a7048c3-597c-43b2-a5e3-09435c35dced.jpg',
    alt: 'Монтаж модуля краном',
  },
  {
    src: 'https://cdn.poehali.dev/projects/8307f028-03f1-4f3f-9486-4ee7a5ad6e3f/files/4eab287f-c72d-4972-b86a-03a61acb14c9.jpg',
    alt: 'Готовый кампус',
  },
];

const Logistics = () => {
  const { ref, className } = useReveal<HTMLDivElement>();

  return (
    <Section
      id="logistics"
      eyebrow="Глобальная логистика"
      title={
        <>
          Доставляем всюду.
          <span className="block text-primary">Работаем локально.</span>
        </>
      }
      lead="Собственный отдел ВЭД, таможенное сопровождение и страхование груза. Модуль едет в контейнерном габарите — по любым дорогам."
    >
      <div ref={ref} className={className}>
        <div className="relative grid gap-8 border border-border bg-card p-8 sm:grid-cols-3 lg:grid-cols-6 lg:p-10">
          {CHAIN.map((c, i) => (
            <div key={c.title} className="relative">
              <Icon name={c.icon} fallback={c.fallback ?? 'CircleAlert'} size={26} className="text-primary" />
              <p className="mt-4 font-head text-sm font-bold uppercase tracking-[0.12em]">{c.title}</p>
              <p className="mt-1.5 text-xs text-muted-foreground">{c.text}</p>
              {i < CHAIN.length - 1 && (
                <span className="absolute right-[-1rem] top-3 hidden h-px w-8 bg-border lg:block" />
              )}
            </div>
          ))}
        </div>

        <div className="mt-px grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {SHOTS.map((s) => (
            <div key={s.src} className="group relative aspect-[4/3] overflow-hidden bg-background">
              <img
                src={s.src}
                alt={s.alt}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="veil-soft absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="absolute bottom-5 left-5 translate-y-2 text-xs uppercase tracking-[0.16em] text-foreground opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                {s.alt}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Logistics;
