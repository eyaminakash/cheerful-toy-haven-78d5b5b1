import { motion } from "motion/react";
import { scrollToSection } from "@/lib/scroll";
import action from "@/assets/categories/action.jpg";
import animals from "@/assets/categories/animals.jpg";
import art from "@/assets/categories/art.jpg";
import baby from "@/assets/categories/baby.jpg";
import beach from "@/assets/categories/beach.jpg";
import building from "@/assets/categories/building.jpg";

const CATEGORIES = [
  { name: "Action Figures & Hero Toys", img: action, count: 11 },
  { name: "Animals & Nature-Inspired Toys", img: animals, count: 25 },
  { name: "Art & DIY Toys", img: art, count: 10 },
  { name: "Baby & Toddler Toys", img: baby, count: 17 },
  { name: "Beach & Water Toys", img: beach, count: 1 },
  { name: "Building & Construction Toys", img: building, count: 39 },
];

export function Categories() {
  return (
    <section className="bg-muted/30 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center font-heading text-3xl md:text-4xl"
        >
          Shop by Category
        </motion.h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-6">
          {CATEGORIES.map((c, i) => (
            <motion.button
              key={c.name}
              onClick={() => scrollToSection("products")}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="group text-center"
            >
              <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-shadow group-hover:shadow-lg">
                <img
                  src={c.img}
                  alt={c.name}
                  loading="lazy"
                  width={512}
                  height={512}
                  className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-3 text-sm font-semibold text-foreground md:text-base">
                {c.name}
              </h3>
              <p className="text-xs text-muted-foreground">{c.count} Products</p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}