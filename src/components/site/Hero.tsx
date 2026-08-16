import GoldButton from './GoldButton';

const STATS = [
  { value: '15+', label: 'лет опыта' },
  { value: '250 000+', label: 'м² поставлено' },
  { value: '500+', label: 'проектов' },
  { value: '25+', label: 'стран' },
  { value: '98%', label: 'довольных клиентов' },
];

const Hero = () => (
  <section id="top" className="relative min-h-[100svh] w-full overflow-hidden bg-[var(--hero-x-sky)]">
    <div className="absolute inset-0">
      <img
        src="https://cdn.poehali.dev/projects/8307f028-03f1-4f3f-9486-4ee7a5ad6e3f/files/71e469f9-464f-4d69-b40e-f1c9208bfaa2.jpg"
        alt="Модульный кампус на 500 мест в вечерних огнях"
        className="h-full w-full animate-hero-zoom object-cover object-[50%_42%]"
      />
    </div>
    <div className="hero-veil absolute inset-0" />

    <div className="relative mx-auto grid min-h-[100svh] w-full max-w-[1360px] grid-rows-[auto_1fr_auto] px-6 md:px-10 lg:px-16">
      <div className="h-[92px]" />

      <div className="max-w-[760px] self-center pb-10">
        <p className="eyebrow rise mb-7 [animation-delay:0.18s]">Проживание вахты и персонала</p>
        <h1 className="rise font-head text-[2.6rem] font-extrabold leading-[1.06] tracking-[-0.035em] [animation-delay:0.32s] sm:text-[3.4rem] lg:text-[4rem]">
          Кампус на&nbsp;500&nbsp;человек
          <span className="block text-primary">за 90 дней</span>
        </h1>
        <p className="rise mt-7 max-w-[500px] text-[1.05rem] leading-[1.55] text-muted-foreground [animation-delay:0.46s]">
          Модули собираем на&nbsp;заводе, привозим на&nbsp;площадку готовыми: комнаты, столовая,
          спортзал, инженерия. Вы&nbsp;открываете смену, а&nbsp;не&nbsp;стройку.
        </p>
        <div className="rise mt-9 flex flex-wrap items-center gap-6 [animation-delay:0.6s]">
          <GoldButton href="#contacts">Рассчитать кампус</GoldButton>
          <span className="text-[0.8rem] text-muted-foreground">
            Смета и&nbsp;план площадки — за&nbsp;3 рабочих дня
          </span>
        </div>
      </div>

      <div className="rise border-t border-border/70 [animation-delay:0.6s]">
        <div className="grid grid-cols-2 gap-x-6 gap-y-6 py-7 sm:grid-cols-3 lg:grid-cols-5">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="font-head text-[1.6rem] font-extrabold leading-none tracking-tight text-primary lg:text-[2rem]">
                {s.value}
              </p>
              <p className="mt-2 text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground">
                {s.label}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between border-t border-border/70 py-5 pb-7">
          <p className="text-[0.72rem] uppercase tracking-[0.22em] text-muted-foreground">
            Ямал · Кузбасс · Казахстан — <span className="text-foreground">работаем при −55&nbsp;°C</span>
          </p>
          <a
            href="#advantages"
            className="flex items-center gap-3 text-[0.68rem] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-primary"
          >
            <i className="block h-[26px] w-px animate-scroll-pulse bg-gradient-to-b from-transparent to-primary" />
            Листайте
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
