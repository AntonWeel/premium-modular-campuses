import Section from './Section';
import Icon from '@/components/ui/icon';
import { useReveal } from '@/hooks/use-reveal';

const ITEMS = [
  {
    icon: 'Zap',
    title: 'На 70% быстрее',
    text: 'Завод и площадка работают параллельно — сроки сокращаются кратно.',
  },
  {
    icon: 'Factory',
    title: 'Заводское качество',
    text: 'Точная геометрия и контроль на каждом посту цеха, а не в поле.',
  },
  {
    icon: 'Globe',
    title: 'Доставка по миру',
    text: 'Автотранспорт, море, ж/д. 25+ стран и любая логистическая схема.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Огнестойкость',
    text: 'Негорючие материалы, сертификация по международным нормам.',
  },
  {
    icon: 'Leaf',
    title: 'Энергоэффективность',
    text: 'Контур до −55 °C, рекуперация, низкая стоимость эксплуатации.',
  },
  {
    icon: 'Boxes',
    title: 'Расширяемость',
    text: 'Кампус масштабируется и переезжает на новый объект без потерь.',
  },
];

const Advantages = () => {
  const { ref, className } = useReveal<HTMLDivElement>();

  return (
    <Section
      id="advantages"
      eyebrow="Почему Living Campus"
      title={
        <>
          Построено для результата.
          <span className="block text-primary">Спроектировано для людей.</span>
        </>
      }
      lead="Мы отвечаем за весь цикл: от расчёта посадки на площадке до сдачи заселённого кампуса под ключ."
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
