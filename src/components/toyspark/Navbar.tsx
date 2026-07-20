import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Heart, Menu, Phone, Search, ShoppingBag, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/cart-context";
import { useSearch } from "@/context/search-context";
import { scrollToSection } from "@/lib/scroll";
import { cn } from "@/lib/utils";
import logo from "@/assets/mafi-toys-logo.png.asset.json";

const NAV = [
  { id: "home", label: "Home" },
  { id: "products", label: "Products" },
  { id: "reviews", label: "Reviews" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const { count, openCart } = useCart();
  const { query, setQuery } = useSearch();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setMobileOpen(false);
    scrollToSection(id);
  };

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    scrollToSection("products");
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/85 backdrop-blur-xl shadow-[0_8px_30px_-12px_rgba(236,72,153,0.25)]"
          : "bg-white/70 backdrop-blur-md",
      )}
    >
      {/* Top strip */}
      <div className="hidden bg-gradient-to-r from-brand-pink-deep via-brand-orange to-brand-red text-white md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-1.5 text-xs">
          <span className="flex items-center gap-2 font-medium">
            <Sparkles className="h-3.5 w-3.5" />
            Free delivery inside Dhaka on orders above ৳2000
          </span>
          <span className="flex items-center gap-4 font-medium">
            <a href="tel:01781984427" className="flex items-center gap-1.5 hover:text-white/80">
              <Phone className="h-3.5 w-3.5" /> 01781-984427
            </a>
            <span className="opacity-40">|</span>
            <button onClick={() => go("reviews")} className="hover:text-white/80">Reviews</button>
          </span>
        </div>
      </div>

      {/* Main bar */}
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 md:px-8">
        <button
          onClick={() => go("home")}
          className="flex shrink-0 items-center gap-2"
          aria-label="Mafi Toys home"
        >
          <img src={logo.url} alt="Mafi Toys" className="h-12 w-auto md:h-14" />
        </button>

        {/* Search — centered, prominent */}
        <form
          onSubmit={onSearchSubmit}
          className="hidden flex-1 md:flex"
          role="search"
        >
          <div className="group relative w-full max-w-xl mx-auto">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-pink-deep via-brand-orange to-brand-red opacity-70 blur-sm transition group-focus-within:opacity-100" />
            <div className="relative flex items-center rounded-full bg-white p-1 pl-5 shadow-md">
              <Search className="mr-2 h-4 w-4 text-brand-pink-deep" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for toys, brands, categories..."
                className="h-9 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
                aria-label="Search products"
              />
              <Button
                type="submit"
                size="sm"
                className="h-9 rounded-full bg-gradient-to-r from-brand-pink-deep to-brand-orange px-4 text-white shadow-none hover:opacity-90"
              >
                Search
              </Button>
            </div>
          </div>
        </form>

        <div className="flex shrink-0 items-center gap-2">
          <button
            aria-label="Wishlist"
            className="hidden h-11 w-11 place-items-center rounded-full text-foreground/70 transition hover:bg-brand-pink/40 hover:text-brand-pink-deep md:grid"
          >
            <Heart className="h-5 w-5" />
          </button>
          <Link
            to="/cart"
            aria-label={`View cart, ${count} items`}
            className="relative grid h-11 w-11 place-items-center rounded-full text-foreground transition hover:bg-brand-pink/40 hover:text-brand-pink-deep"
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-brand-red px-1 text-[11px] font-bold text-white ring-2 ring-white">
                {count}
              </span>
            )}
          </Link>
          <Button
            onClick={() => go("contact")}
            className="hidden rounded-full bg-gradient-to-r from-brand-pink-deep to-brand-orange px-5 text-white shadow-toy hover:opacity-95 md:inline-flex"
          >
            Buy Now
          </Button>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-full bg-brand-pink/40 text-brand-pink-deep md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Secondary nav */}
      <nav className="hidden border-t border-brand-pink/40 bg-white/60 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-1 px-6 py-2">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => go(n.id)}
              className="relative rounded-full px-4 py-1.5 text-sm font-semibold text-foreground/75 transition-colors hover:bg-brand-pink/40 hover:text-brand-pink-deep"
            >
              {n.label}
            </button>
          ))}
        </div>
      </nav>

      {mobileOpen && (
        <nav className="border-t border-border/50 bg-white/95 px-4 pb-4 pt-2 lg:hidden">
          <form onSubmit={onSearchSubmit} className="mb-2 md:hidden" role="search">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/50" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search toys..."
                className="w-full rounded-full border-brand-pink/60 bg-white pl-9"
                aria-label="Search products"
              />
            </div>
          </form>
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => go(n.id)}
              className="block w-full rounded-lg px-3 py-3 text-left font-semibold hover:bg-brand-pink/40"
            >
              {n.label}
            </button>
          ))}
          <Button
            onClick={() => go("contact")}
            className="mt-2 w-full rounded-full bg-gradient-to-r from-brand-pink-deep to-brand-orange text-white"
          >
            Buy Now
          </Button>
        </nav>
      )}
    </header>
  );
}