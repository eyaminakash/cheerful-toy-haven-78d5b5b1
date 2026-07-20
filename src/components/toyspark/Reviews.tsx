import { motion } from "motion/react";
import { Star, Quote, BadgeCheck } from "lucide-react";

const REVIEWS = [
  {
    name: "Sophia M.",
    role: "Mom of Lily, 5",
    location: "Dhaka",
    text: "My daughter absolutely adores her unicorn plush! The quality is amazing and shipping was super fast. ToySpark is now our go-to.",
  },
  {
    name: "Aisha K.",
    role: "Mom of Zara, 7",
    location: "Chattogram",
    text: "The princess doll became Zara's best friend overnight. Beautiful craftsmanship and such cheerful colors — exactly as pictured!",
  },
  {
    name: "Emma R.",
    role: "Mom of twins, 4",
    location: "Sylhet",
    text: "We ordered the kitchen set for the twins and they haven't stopped 'cooking' since. So happy with this magical little brand.",
  },
];

export function Reviews() {
  return (
    <section id="reviews" className="relative bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-start justify-between gap-8 border-b border-foreground/10 pb-10 md:flex-row md:items-end"
        >
          <div className="max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-foreground/50">
              Testimonials
            </span>
            <h2 className="mt-3 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-5xl">
              Trusted by thousands of parents
              <span className="text-foreground/40"> across Bangladesh.</span>
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-brand-orange text-brand-orange" />
                ))}
              </div>
              <p className="mt-1 text-sm text-foreground/60">
                <span className="font-semibold text-foreground">4.9 out of 5</span> · 2,400+ verified reviews
              </p>
            </div>
          </div>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/10 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <motion.article
              key={r.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative flex flex-col justify-between bg-white p-8 transition-colors hover:bg-muted/40 md:p-10"
            >
              <div>
                <Quote className="h-6 w-6 text-brand-pink-deep" />
                <div className="mt-4 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 fill-brand-orange text-brand-orange" />
                  ))}
                </div>
                <p className="mt-5 text-[15px] leading-relaxed text-foreground/80">
                  “{r.text}”
                </p>
              </div>
              <div className="mt-8 flex items-center gap-3 border-t border-foreground/10 pt-5">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-foreground text-sm font-semibold text-white">
                  {r.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-semibold text-foreground">{r.name}</h4>
                    <BadgeCheck className="h-4 w-4 text-brand-sky" />
                  </div>
                  <p className="text-xs text-foreground/55">
                    {r.role} · {r.location}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}