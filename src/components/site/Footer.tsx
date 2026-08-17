import Logo from './Logo';
import Icon from '@/components/ui/icon';

interface FooterLink {
  label: string;
  href: string;
}

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: 'Solutions',
    links: [
      { label: 'Campus S', href: '#solutions' },
      { label: 'Campus M', href: '#solutions' },
      { label: 'Campus L', href: '#solutions' },
      { label: 'Campus XL', href: '#solutions' },
      { label: 'Bespoke project', href: '#contacts' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About us', href: '#advantages' },
      { label: 'Team', href: '#top' },
      { label: 'Values', href: '#top' },
      { label: 'Careers', href: '#top' },
      { label: 'News', href: '#top' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Brochure', href: '#top' },
      { label: 'Case studies', href: '#gallery' },
      { label: 'Supply map', href: '#supply' },
      { label: 'Certificates', href: '#top' },
      { label: 'Downloads', href: '#top' },
    ],
  },
];

const Footer = () => (
  <footer className="dune-field border-t border-border bg-card">
    <div className="mx-auto w-full max-w-[1360px] px-6 py-16 md:px-10 lg:px-16">
      <div className="grid gap-12 lg:grid-cols-[1.3fr_repeat(3,1fr)]">
        <div>
          <Logo />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Premium modular camps for construction, mining, industry and energy projects.
          </p>
          <div className="mt-7 flex gap-3">
            {['Linkedin', 'Youtube', 'Facebook', 'Instagram'].map((s) => (
              <a
                key={s}
                href="#top"
                aria-label={s}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
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
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-14 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Living Campus. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a href="#top" className="text-xs text-muted-foreground transition-colors hover:text-primary">
            Privacy Policy
          </a>
          <a href="#top" className="text-xs text-muted-foreground transition-colors hover:text-primary">
            Terms of Use
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;