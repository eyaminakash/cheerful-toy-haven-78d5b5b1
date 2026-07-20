import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import slide1 from "@/assets/slider/s1.png";
import slide2 from "@/assets/slider/s2.png";
import slide3 from "@/assets/slider/s3.jpg";
import slide5 from "@/assets/slider/s5.png";
import slide6 from "@/assets/slider/s6.jpg";
import slide7 from "@/assets/slider/s7.png";

const SLIDES = [slide1, slide2, slide3, slide5, slide6, slide7];

export function Hero() {
  const autoplay = useRef(Autoplay({ delay: 4000, stopOnInteraction: false }));

  return (
    <section id="home" className="relative w-full pt-24 md:pt-28">
      <Carousel
        plugins={[autoplay.current]}
        opts={{ loop: true }}
        className="w-full"
      >
        <CarouselContent>
          {SLIDES.map((src, i) => (
            <CarouselItem key={i}>
              <img
                src={src}
                alt={`Banner ${i + 1}`}
                className="h-[60vh] w-full object-cover md:h-[85vh]"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 h-12 w-12 bg-white/80 text-foreground shadow-md hover:bg-white md:left-6 md:h-14 md:w-14" />
        <CarouselNext className="right-4 h-12 w-12 bg-white/80 text-foreground shadow-md hover:bg-white md:right-6 md:h-14 md:w-14" />
      </Carousel>
    </section>
  );
}