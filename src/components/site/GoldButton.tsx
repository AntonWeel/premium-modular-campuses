import { ReactNode } from 'react';
import Arrow from './Arrow';

interface GoldButtonProps {
  href?: string;
  children: ReactNode;
  small?: boolean;
  ghost?: boolean;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

const GoldButton = ({
  href,
  children,
  small,
  ghost,
  className = '',
  onClick,
  type = 'button',
}: GoldButtonProps) => {
  const base = `inline-flex items-center justify-center gap-3 rounded-sm font-semibold uppercase tracking-[0.14em] transition-all duration-300 hover:-translate-y-px ${
    small ? 'px-[18px] py-[11px] text-[0.7rem]' : 'px-[22px] py-[14px] text-[0.78rem]'
  } ${
    ghost
      ? 'border border-border bg-transparent text-foreground hover:border-primary hover:text-primary'
      : 'border border-primary bg-primary text-primary-foreground hover:bg-primary/85'
  } ${className}`;

  const content = (
    <>
      {children}
      <Arrow />
    </>
  );

  if (href) {
    return (
      <a href={href} className={base} onClick={onClick}>
        {content}
      </a>
    );
  }
  return (
    <button type={type} className={base} onClick={onClick}>
      {content}
    </button>
  );
};

export default GoldButton;
