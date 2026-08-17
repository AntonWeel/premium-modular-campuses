import { FormEvent, useState } from 'react';
import Icon from '@/components/ui/icon';
import GoldButton from './GoldButton';
import { useReveal } from '@/hooks/use-reveal';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface FormState {
  name: string;
  company: string;
  email: string;
  country: string;
  size: string;
  people: string;
  message: string;
}

const EMPTY: FormState = {
  name: '',
  company: '',
  email: '',
  country: '',
  size: '',
  people: '',
  message: '',
};

const Contacts = () => {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [sent, setSent] = useState(false);
  const { ref, className } = useReveal<HTMLDivElement>();
  const { toast } = useToast();

  const set = (key: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = () => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (form.name.trim().length < 2) next.name = 'Enter your name';
    if (form.company.trim().length < 2) next.company = 'Enter your company';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email)) next.email = 'Check your e-mail';
    if (form.country.trim().length < 2) next.country = 'Enter the country';
    if (!form.size) next.size = 'Select a size';
    if (!form.people) next.people = 'Select headcount';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast({
        title: 'Check the form',
        description: 'Complete the required fields and we will come back with a quote.',
      });
      return;
    }
    setSent(true);
    toast({
      title: 'Request received',
      description: 'An engineer will contact you within one business day.',
    });
  };

  const fieldCls = (key: keyof FormState) =>
    `h-12 rounded-sm border bg-background/70 px-4 text-sm placeholder:text-muted-foreground/70 focus-visible:ring-primary ${
      errors[key] ? 'border-destructive' : 'border-border'
    }`;

  return (
    <section id="contacts" className="relative scroll-mt-24 overflow-hidden py-20 md:py-28">
      <img
        src="https://cdn.poehali.dev/projects/8307f028-03f1-4f3f-9486-4ee7a5ad6e3f/files/71e469f9-464f-4d69-b40e-f1c9208bfaa2.jpg"
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="hero-veil absolute inset-0" />

      <div ref={ref} className={`${className} relative mx-auto w-full max-w-[1360px] px-6 md:px-10 lg:px-16`}>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <p className="eyebrow mb-6">Contacts</p>
            <h2 className="font-head text-[2rem] font-extrabold leading-[1.06] tracking-[-0.035em] md:text-[2.75rem]">
              Ready to build
              <span className="block text-primary">your Living Campus?</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
              Tell us about the project — we deliver a concept, budget and site layout in 3 working days.
            </p>

            <div className="mt-10 space-y-5">
              {[
                { icon: 'Mail', text: 'info@livingcampus.com', href: 'mailto:info@livingcampus.com' },
                { icon: 'Phone', text: '+971 4 123 4567', href: 'tel:+97141234567' },
                { icon: 'MapPin', text: 'Dubai, UAE · Astana · Tyumen' },
              ].map((c) => (
                <div key={c.text} className="flex items-center gap-4">
                  <span className="flex h-11 w-11 flex-none items-center justify-center rounded-sm border border-border bg-card/60 text-primary">
                    <Icon name={c.icon} size={18} />
                  </span>
                  {c.href ? (
                    <a href={c.href} className="text-sm text-foreground transition-colors hover:text-primary">
                      {c.text}
                    </a>
                  ) : (
                    <span className="text-sm text-foreground">{c.text}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="border border-border bg-card/85 p-8 backdrop-blur-sm lg:p-10">
            {sent ? (
              <div className="flex min-h-[420px] flex-col items-start justify-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-primary text-primary">
                  <Icon name="Check" size={26} />
                </span>
                <h3 className="mt-7 font-head text-2xl font-extrabold tracking-tight">
                  Request sent
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  Thank you, {form.name}. A Living Campus engineer will contact you within one
                  business day and prepare a quote for your project in {form.country}.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setForm(EMPTY);
                    setSent(false);
                  }}
                  className="mt-8 text-[0.7rem] uppercase tracking-[0.18em] text-primary underline-offset-4 hover:underline"
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Input
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => set('name', e.target.value)}
                      className={fieldCls('name')}
                    />
                    {errors.name && <p className="mt-1.5 text-xs text-destructive">{errors.name}</p>}
                  </div>
                  <div>
                    <Input
                      placeholder="Company"
                      value={form.company}
                      onChange={(e) => set('company', e.target.value)}
                      className={fieldCls('company')}
                    />
                    {errors.company && (
                      <p className="mt-1.5 text-xs text-destructive">{errors.company}</p>
                    )}
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="E-mail"
                      value={form.email}
                      onChange={(e) => set('email', e.target.value)}
                      className={fieldCls('email')}
                    />
                    {errors.email && <p className="mt-1.5 text-xs text-destructive">{errors.email}</p>}
                  </div>
                  <div>
                    <Input
                      placeholder="Project country"
                      value={form.country}
                      onChange={(e) => set('country', e.target.value)}
                      className={fieldCls('country')}
                    />
                    {errors.country && (
                      <p className="mt-1.5 text-xs text-destructive">{errors.country}</p>
                    )}
                  </div>
                  <div>
                    <Select value={form.size} onValueChange={(v) => set('size', v)}>
                      <SelectTrigger className={fieldCls('size')}>
                        <SelectValue placeholder="Project size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="S">Campus S — 50–100</SelectItem>
                        <SelectItem value="M">Campus M — 100–250</SelectItem>
                        <SelectItem value="L">Campus L — 250–500</SelectItem>
                        <SelectItem value="XL">Campus XL — 500–2000</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.size && <p className="mt-1.5 text-xs text-destructive">{errors.size}</p>}
                  </div>
                  <div>
                    <Select value={form.people} onValueChange={(v) => set('people', v)}>
                      <SelectTrigger className={fieldCls('people')}>
                        <SelectValue placeholder="Number of residents" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="50-100">50–100 people</SelectItem>
                        <SelectItem value="100-250">100–250 people</SelectItem>
                        <SelectItem value="250-500">250–500 people</SelectItem>
                        <SelectItem value="500-2000">500–2,000 people</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.people && (
                      <p className="mt-1.5 text-xs text-destructive">{errors.people}</p>
                    )}
                  </div>
                </div>

                <Textarea
                  placeholder="Tell us about the project: industry, timeline, site"
                  value={form.message}
                  onChange={(e) => set('message', e.target.value)}
                  className="min-h-[120px] rounded-sm border-border bg-background/70 px-4 py-3 text-sm placeholder:text-muted-foreground/70 focus-visible:ring-primary"
                />

                <div className="flex flex-wrap items-center gap-5 pt-2">
                  <GoldButton type="submit">Request a quote</GoldButton>
                  <span className="text-xs text-muted-foreground">
                    Reply within 3 working days. We never share your data with third parties.
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;