import { ReactNode } from 'react';
import { useReveal } from '@/hooks/use-reveal';

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  lead?: ReactNode;
  children: ReactNode;
  className?: string;
  headerRight?: ReactNode;
}

const Section = ({
  id,
  eyebrow,
  title,
  lead,
  children,
  className = '',
  headerRight,
}: SectionProps) => {
  const { ref, className: revealCls } = useReveal<HTMLDivElement>();

  return (
    <section id={id} className={`scroll-mt-24 py-20 md:py-28 ${className}`}>
      <div className="mx-auto w-full max-w-[1360px] px-6 md:px-10 lg:px-16">
        {(eyebrow || title) && (
          <div
            ref={ref}
            className={`${revealCls} mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between`}
          >
            <div className="max-w-2xl">
              {eyebrow && <p className="eyebrow mb-6">{eyebrow}</p>}
              {title && (
                <h2 className="font-head text-[2rem] font-extrabold leading-[1.06] tracking-[-0.035em] md:text-[2.75rem] lg:text-[3.25rem]">
                  {title}
                </h2>
              )}
              {lead && (
                <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
                  {lead}
                </p>
              )}
            </div>
            {headerRight}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

export default Section;
