import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function PageHero({
  index,
  kicker,
  title,
  description,
  breadcrumb,
}: {
  index: string;
  kicker: string;
  title: React.ReactNode;
  description?: string;
  breadcrumb?: { href: string; label: string }[];
}) {
  return (
    <section className="grain relative overflow-hidden border-b border-ink/12 bg-wine text-paper">
      <div
        className="pointer-events-none absolute -right-24 top-0 h-full w-[46%] opacity-[0.16]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 40%, hsl(var(--claret)) 0%, transparent 62%)",
        }}
      />
      <div className="relative mx-auto max-w-[1680px] px-5 pb-16 pt-14 md:px-10 md:pb-24 md:pt-20">
        {breadcrumb ? (
          <nav className="mb-10 flex flex-wrap items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.2em] text-paper/45">
            {breadcrumb.map((crumb, i) => (
              <span key={crumb.href} className="flex items-center gap-1.5">
                {i > 0 ? (
                  <ChevronRight
                    className="h-3 w-3 text-paper/30"
                    strokeWidth={1.4}
                  />
                ) : null}
                <Link href={crumb.href} className="hover:text-blush">
                  {crumb.label}
                </Link>
              </span>
            ))}
          </nav>
        ) : null}

        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-4">
              <span className="font-mono text-[10px] tracking-[0.24em] text-blush">
                {index}
              </span>
              <span className="h-px w-12 bg-blush/60" />
              <span className="font-mono text-[9.5px] uppercase tracking-[0.24em] text-paper/55">
                {kicker}
              </span>
            </div>
            <h1 className="display-lg mt-6 text-paper">{title}</h1>
          </div>
          {description ? (
            <div className="lg:col-span-4">
              <p className="max-w-[42ch] text-[14.5px] leading-relaxed text-paper/60">
                {description}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
