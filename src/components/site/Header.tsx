import { useEffect, useState } from 'react';
import Logo from './Logo';
import GoldButton from './GoldButton';
import Icon from '@/components/ui/icon';

const NAV = [
  { label: 'Solutions', href: '#solutions' },
  { label: 'Advantages', href: '#advantages' },
  { label: 'Production', href: '#production' },
  { label: 'Process', href: '#process' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Supply', href: '#supply' },
  { label: 'Contacts', href: '#contacts' },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'border-b border-border bg-background/92 backdrop-blur-md'
            : 'border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex w-full max-w-[1360px] items-center justify-between gap-10 px-6 py-5 md:px-10 lg:px-16">
          <Logo />

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="border-b border-transparent py-1.5 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-muted-foreground transition-colors duration-300 hover:border-primary hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
            <GoldButton href="#contacts" small>
              Request a quote
            </GoldButton>
          </nav>

          <button
            type="button"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-sm border border-border text-foreground transition-colors hover:border-primary hover:text-primary lg:hidden"
          >
            <Icon name={open ? 'X' : 'Menu'} size={20} />
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-background transition-all duration-300 lg:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <nav className="flex h-full flex-col justify-center gap-2 px-8">
          {NAV.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-border py-4 font-head text-2xl font-bold tracking-tight text-foreground transition-colors hover:text-primary"
              style={{ transitionDelay: `${i * 30}ms` }}
            >
              {item.label}
            </a>
          ))}
          <GoldButton href="#contacts" className="mt-8 self-start" onClick={() => setOpen(false)}>
            Request a quote
          </GoldButton>
        </nav>
      </div>
    </>
  );
};

export default Header;