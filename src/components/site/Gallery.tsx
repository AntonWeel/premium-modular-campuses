import { useState } from 'react';
import Section from './Section';
import Icon from '@/components/ui/icon';
import { useReveal } from '@/hooks/use-reveal';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const CATEGORIES = ['Все', 'Жильё', 'Питание', 'Спорт', 'Отдых'] as const;

const ITEMS = [
  {
    cat: 'Жильё',
    title: 'Комнаты для проживания',
    text: 'Одно- и двухместные номера с санузлом, рабочим столом и хранением.',
    src: 'https://cdn.poehali.dev/projects/8307f028-03f1-4f3f-9486-4ee7a5ad6e3f/files/f6950d53-f781-4013-ae1a-7ab9c93a5963.jpg',
  },
  {
    cat: 'Питание',
    title: 'Столовая и кухня',
    text: 'Полный цикл питания: заготовка, линия раздачи, зал на 250 мест.',
    src: 'https://cdn.poehali.dev/projects/8307f028-03f1-4f3f-9486-4ee7a5ad6e3f/files/147a1ca1-47a6-450c-b9b5-79f93e919370.jpg',
  },
  {
    cat: 'Спорт',
    title: 'Фитнес-центр',
    text: 'Тренажёрный зал, кардиозона, раздевалки и душевые.',
    src: 'https://cdn.poehali.dev/projects/8307f028-03f1-4f3f-9486-4ee7a5ad6e3f/files/cbe81260-ed4e-4d64-abdf-5ed98b00b242.jpg',
  },
  {
    cat: 'Отдых',
    title: 'Зоны отдыха',
    text: 'Лаунж, бильярд, кинозал и переговорные для смены после вахты.',
    src: 'https://cdn.poehali.dev/projects/8307f028-03f1-4f3f-9486-4ee7a5ad6e3f/files/f3521d27-968e-48ac-8f0e-2bd02baba55e.jpg',
  },
  {
    cat: 'Жильё',
    title: 'Кампус на 500 мест',
    text: 'Кварталы, освещение, благоустройство и спортивное ядро.',
    src: 'https://cdn.poehali.dev/projects/8307f028-03f1-4f3f-9486-4ee7a5ad6e3f/files/71e469f9-464f-4d69-b40e-f1c9208bfaa2.jpg',
  },
  {
    cat: 'Спорт',
    title: 'Открытые площадки',
    text: 'Футбольное поле, воркаут и прогулочные маршруты внутри кампуса.',
    src: 'https://cdn.poehali.dev/projects/8307f028-03f1-4f3f-9486-4ee7a5ad6e3f/files/1238d11e-994e-410e-9cf7-bd28267df2e6.jpg',
  },
];

const Gallery = () => {
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>('Все');
  const [open, setOpen] = useState<number | null>(null);
  const { ref, className } = useReveal<HTMLDivElement>();

  const list = ITEMS.filter((i) => cat === 'Все' || i.cat === cat);

  return (
    <Section
      id="gallery"
      className="bg-card"
      eyebrow="Галерея пространств"
      title={
        <>
          Пространства,
          <span className="block text-primary">в которых хочется жить</span>
        </>
      }
      lead="Комфорт удерживает людей на объекте. Мы проектируем кампус как место жизни, а не как времянку."
      headerRight={
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              className={`rounded-sm border px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] transition-all duration-300 ${
                c === cat
                  ? 'border-primary text-primary'
                  : 'border-border text-muted-foreground hover:border-primary/60 hover:text-foreground'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      }
    >
      <div ref={ref} className={`${className} grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3`}>
        {list.map((item) => (
          <button
            key={item.title + item.src}
            type="button"
            onClick={() => setOpen(ITEMS.indexOf(item))}
            className="group relative aspect-[4/3] overflow-hidden bg-background text-left"
          >
            <img
              src={item.src}
              alt={item.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span className="veil-soft absolute inset-0" />
            <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
              <span>
                <span className="block text-[0.62rem] uppercase tracking-[0.24em] text-primary">
                  {item.cat}
                </span>
                <span className="mt-2 block font-head text-lg font-bold leading-tight">
                  {item.title}
                </span>
              </span>
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-primary/70 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon name="ArrowUpRight" size={16} />
              </span>
            </span>
          </button>
        ))}
      </div>

      <Dialog open={open !== null} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent className="max-w-4xl border-border bg-card p-0">
          {open !== null && (
            <div>
              <img src={ITEMS[open].src} alt={ITEMS[open].title} className="w-full object-cover" />
              <div className="p-8">
                <p className="text-[0.62rem] uppercase tracking-[0.24em] text-primary">
                  {ITEMS[open].cat}
                </p>
                <h3 className="mt-3 font-head text-2xl font-extrabold tracking-tight">
                  {ITEMS[open].title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">{ITEMS[open].text}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Section>
  );
};

export default Gallery;
