import { useState } from 'react';
import Section from './Section';
import Icon from '@/components/ui/icon';
import { useReveal } from '@/hooks/use-reveal';

const STEPS = [
  { icon: 'PencilRuler', title: 'Инжиниринг и проект', term: '7–14 дней', text: 'Посадка на площадку, планировки, спецификации, смета и график поставки.' },
  { icon: 'Frame', title: 'Стальной каркас', term: '10 дней', text: 'Сварка рам на роботизированной линии, антикоррозийная обработка.' },
  { icon: 'Layers', title: 'Сэндвич-панели', term: '7 дней', text: 'Ограждающий контур для эксплуатации при температурах до −55 °C.' },
  { icon: 'Paintbrush', title: 'Отделка интерьера', term: '14 дней', text: 'Мебель, сантехника, электрика, вентиляция — всё внутри модуля на заводе.' },
  { icon: 'ClipboardCheck', title: 'Контроль качества', term: '3 дня', text: 'Тесты герметичности, электрики, пожарной безопасности, приёмка заказчиком.' },
  { icon: 'Package', title: 'Упаковка и отгрузка', term: '5 дней', text: 'Транспортные рамы, защита, документы и таможенное оформление.' },
  { icon: 'Truck', title: 'Монтаж на объекте', term: '15–30 дней', text: 'Фундаменты, кран, стыковка модулей, подключение инженерных сетей.' },
  { icon: 'KeyRound', title: 'Кампус готов', term: '—', text: 'Пусконаладка, обучение персонала, гарантия и сервисное сопровождение.' },
];

const Process = () => {
  const [active, setActive] = useState(0);
  const { ref, className } = useReveal<HTMLDivElement>();

  return (
    <Section
      id="process"
      eyebrow="От завода до площадки"
      title={
        <>
          Полный цикл
          <span className="block text-primary">за 8 шагов</span>
        </>
      }
      lead="Каждый этап зафиксирован в графике. Вы видите статус модулей онлайн — от раскроя стали до заселения."
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
              Шаг {String(active + 1).padStart(2, '0')}
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
