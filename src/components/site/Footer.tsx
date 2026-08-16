import Logo from './Logo';
import Icon from '@/components/ui/icon';

const COLUMNS = [
  {
    title: 'Решения',
    links: ['Campus S', 'Campus M', 'Campus L', 'Campus XL', 'Индивидуальный проект'],
  },
  {
    title: 'Компания',
    links: ['О нас', 'Команда', 'Ценности', 'Карьера', 'Новости'],
  },
  {
    title: 'Ресурсы',
    links: ['Брошюра', 'Кейсы', 'Вопросы и ответы', 'Сертификаты', 'Загрузки'],
  },
];

const Footer = () => (
  <footer className="border-t border-border bg-card">
    <div className="mx-auto w-full max-w-[1360px] px-6 py-16 md:px-10 lg:px-16">
      <div className="grid gap-12 lg:grid-cols-[1.3fr_repeat(3,1fr)]">
        <div>
          <Logo />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Премиальные модульные кампусы для строительства, добычи, промышленности и энергетики.
          </p>
          <div className="mt-7 flex gap-3">
            {['Linkedin', 'Youtube', 'Facebook', 'Instagram'].map((s) => (
              <a
                key={s}
                href="#top"
                aria-label={s}
                className="flex h-10 w-10 items-center justify-center rounded-sm border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Icon name={s} size={16} />
              </a>
            ))}
          </div>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="text-[0.65rem] uppercase tracking-[0.24em] text-primary">{col.title}</p>
            <ul className="mt-6 space-y-3">
              {col.links.map((l) => (
                <li key={l}>
                  <a
                    href="#top"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-14 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Living Campus. Все права защищены.
        </p>
        <div className="flex gap-6">
          <a href="#top" className="text-xs text-muted-foreground transition-colors hover:text-primary">
            Политика конфиденциальности
          </a>
          <a href="#top" className="text-xs text-muted-foreground transition-colors hover:text-primary">
            Условия использования
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
