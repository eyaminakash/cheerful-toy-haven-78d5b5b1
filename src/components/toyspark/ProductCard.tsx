import { motion } from "motion/react";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCart, type Product } from "@/context/cart-context";
import { scrollToSection } from "@/lib/scroll";

export function ProductCard({ product }: { product: Product }) {
  const { addItem, openCart } = useCart();

  const handleAdd = () => {
    addItem(product);
    toast.success(`${product.name} added to cart`, {
      description: `$${product.price.toFixed(2)}`,
    });
    openCart();
  };

  const handleBuyNow = () => {
    addItem(product);
    toast.success("Added! Heading to checkout…");
    scrollToSection("contact");
  };

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
      className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-md transition-shadow hover:shadow-toy"
    >
      <button
        onClick={openCart}
        className="relative aspect-square overflow-hidden bg-brand-pink/30"
        aria-label={`View ${product.name}`}
      >
        <img
          src={product.image}
          alt={product.name}
          width={768}
          height={768}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </button>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < product.rating ? "fill-brand-orange text-brand-orange" : "text-muted"}`}
            />
          ))}
        </div>
        <h3 className="font-display text-xl font-semibold">{product.name}</h3>
        <p className="text-sm text-foreground/70">{product.description}</p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="font-display text-2xl font-bold text-brand-pink-deep">
            ${product.price.toFixed(2)}
          </span>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button
            onClick={handleAdd}
            className="flex-1 rounded-full bg-foreground text-white hover:bg-foreground/90"
          >
            Add to Cart
          </Button>
          <Button
            onClick={handleBuyNow}
            variant="outline"
            className="flex-1 rounded-full border-2 border-brand-pink-deep text-brand-pink-deep hover:bg-brand-pink/30"
          >
            Buy Now
          </Button>
        </div>
      </div>
    </motion.article>
  );
}