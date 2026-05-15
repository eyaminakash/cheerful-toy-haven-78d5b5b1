import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";

const REVIEWS = [
  {
    name: "Sophia M.",
    role: "Mom of Lily, 5",
    color: "bg-brand-pink",
    text: "My daughter absolutely adores her unicorn plush! The quality is amazing and shipping was super fast. ToySpark is now our go-to.",
  },
  {
    name: "Aisha K.",
    role: "Mom of Zara, 7",
    color: "bg-brand-peach",
    text: "The princess doll became Zara's best friend overnight. Beautiful craftsmanship and such cheerful colors — exactly as pictured!",
  },
  {
    name: "Emma R.",
    role: "Mom of twins, 4",
    color: "bg-brand-purple",
    text: "We ordered the kitchen set for the twins and they haven't stopped 'cooking' since. So happy with this magical little brand.",
  },
];

export function Reviews() {
  return (
    <section id="reviews" className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 -z-10 gradient-hero opacity-30" />
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-block rounded-full bg-white/80 px-4 py-1 text-xs font-bold uppercase tracking-wider text-brand-pink-deep">
            Loved By Families
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold md:text-5xl">
            What Parents <span className="gradient-text">Say</span> ❤️
          </h2>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <motion.article
              key={r.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="relative rounded-3xl bg-white p-7 shadow-md transition-shadow hover:shadow-toy"
            >
              <Quote className="absolute right-6 top-6 h-8 w-8 text-brand-pink/70" />
              <div className="flex items-center gap-3">
                <div
                  className={`grid h-14 w-14 place-items-center rounded-full ${r.color} font-display text-xl font-bold text-white shadow-md`}
                >
                  {r.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold">{r.name}</h4>
                  <p className="text-xs text-foreground/60">{r.role}</p>
                </div>
              </div>
              <div className="mt-4 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} className="h-4 w-4 fill-brand-orange text-brand-orange" />
                ))}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-foreground/80">"{r.text}"</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}