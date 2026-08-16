interface LogoProps {
  className?: string;
}

const Logo = ({ className = '' }: LogoProps) => (
  <a href="#top" className={`flex items-center gap-3 text-foreground ${className}`}>
    <svg viewBox="0 0 34 38" fill="none" aria-hidden className="h-[38px] w-[34px] flex-none">
      <path
        d="M17 1.5 32.5 10v18L17 36.5 1.5 28V10L17 1.5Z"
        stroke="hsl(var(--primary))"
        strokeWidth="1.4"
      />
      <path
        d="M17 9.5 25.5 14.5v9.5L17 29l-8.5-5v-9.5L17 9.5Z"
        stroke="hsl(var(--primary))"
        strokeWidth="1"
        opacity=".55"
      />
      <path
        d="M17 9.5V29M8.5 14.5 25.5 24M25.5 14.5 8.5 24"
        stroke="hsl(var(--primary))"
        strokeWidth=".8"
        opacity=".35"
      />
    </svg>
    <span>
      <b className="block font-head text-[1.05rem] font-bold uppercase leading-none tracking-[0.14em]">
        Living Campus
      </b>
      <small className="mt-[5px] block text-[0.55rem] font-medium uppercase tracking-[0.3em] text-primary">
        Модульные кампусы
      </small>
    </span>
  </a>
);

export default Logo;
