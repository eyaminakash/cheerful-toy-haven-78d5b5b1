import { useRef } from "react";
import { motion } from "motion/react";
import Autoplay from "embla-carousel-autoplay";
import { Sparkles, Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { scrollToSection } from "@/lib/scroll";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

const SLIDES = [hero1, hero2, hero3];

export function Hero() {
  const autoplay = useRef(Autoplay({ delay: 3500, stopOnInteraction: false }));

  return (
    <section
      id="home"
      className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24"
    >
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-brand-pink opacity-60 blur-3xl" />
      <div className="pointer-events-none absolute top-32 -right-24 h-96 w-96 rounded-full bg-brand-peach opacity-60 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-brand-purple opacity-40 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 md:grid-cols-2 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-sm font-semibold text-brand-pink-deep shadow-sm">
            <Sparkles className="h-4 w-4" /> New magical collection
          </span>
          <h1 className="mt-5 font-display text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
            Magical Toys For{" "}
            <span className="gradient-text">Happy Girls</span> ✨
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-foreground/70 md:mx-0 md:text-lg">
            Discover colorful, fun, and educational toys designed to bring joy
            and creativity to every little dreamer.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3 md:justify-start">
            <Button
              onClick={() => scrollToSection("products")}
              size="lg"
              className="rounded-full bg-gradient-to-r from-brand-pink-deep to-brand-orange px-7 text-white shadow-toy hover:opacity-95"
            >
              Shop Now
            </Button>
            <Button
              onClick={() => scrollToSection("products")}
              size="lg"
              variant="outline"
              className="rounded-full border-2 border-brand-pink-deep bg-white px-7 text-brand-pink-deep hover:bg-brand-pink/30"
            >
              Explore Collection
            </Button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 md:justify-start">
            <div>
              <div className="font-display text-2xl font-bold">10k+</div>
              <div className="text-xs text-foreground/60">Happy kids</div>
            </div>
            <div className="h-10 w-px bg-border" />
            <div>
              <div className="font-display text-2xl font-bold">200+</div>
              <div className="text-xs text-foreground/60">Toy designs</div>
            </div>
            <div className="h-10 w-px bg-border" />
            <div>
              <div className="font-display text-2xl font-bold">4.9★</div>
              <div className="text-xs text-foreground/60">Avg rating</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative"
        >
          <div className="absolute -top-6 -left-6 z-10 animate-float-slow">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-yellow shadow-toy">
              <Star className="h-6 w-6 text-brand-orange" />
            </div>
          </div>
          <div
            className="absolute -bottom-6 -right-4 z-10 animate-float-slow"
            style={{ animationDelay: "1.5s" }}
          >
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-pink-deep shadow-toy">
              <Heart className="h-6 w-6 text-white" />
            </div>
          </div>

          <Carousel
            plugins={[autoplay.current]}
            opts={{ loop: true }}
            className="overflow-hidden rounded-[2rem] shadow-toy"
          >
            <CarouselContent>
              {SLIDES.map((src, i) => (
                <CarouselItem key={i}>
                  <img
                    src={src}
                    alt={`Featured toy ${i + 1}`}
                    width={1024}
                    height={1024}
                    className="aspect-square w-full object-cover"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-3 bg-white/90 text-foreground" />
            <CarouselNext className="right-3 bg-white/90 text-foreground" />
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
}