import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Heart, Mail, Menu, Phone, Search, ShoppingBag, Sparkles, X } from "lucide-react";
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
          ? "bg-white/90 backdrop-blur-xl shadow-[0_10px_40px_-15px_rgba(236,72,153,0.35)]"
          : "bg-white/75 backdrop-blur-md",
      )}
    >
      {/* Top announcement strip */}
      <div className="hidden bg-gradient-to-r from-brand-pink-deep via-brand-orange to-brand-red text-white md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs">
          <span className="flex items-center gap-2 font-medium tracking-wide">
            <Sparkles className="h-3.5 w-3.5 animate-pulse" />
            Free delivery inside Dhaka on orders above ৳2000
          </span>
          <span className="flex items-center gap-5 font-medium">
            <a href="tel:01781984427" className="flex items-center gap-1.5 transition hover:text-white/80">
              <Phone className="h-3.5 w-3.5" /> 01781-984427
            </a>
            <span className="opacity-40">•</span>
            <a href="mailto:ismailsiam231@gmail.com" className="flex items-center gap-1.5 transition hover:text-white/80">
              <Mail className="h-3.5 w-3.5" /> ismailsiam231@gmail.com
            </a>
          </span>
        </div>
      </div>

      {/* Main bar */}
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 md:px-8 md:py-4">
        {/* Logo */}
        <button
          onClick={() => go("home")}
          className="flex shrink-0 items-center gap-2 transition-transform hover:scale-105"
          aria-label="Mafi Toys home"
        >
          <img src={logo.url} alt="Mafi Toys" className="h-12 w-auto md:h-16" />
        </button>

        {/* Nav pills */}
        <nav className="mx-2 hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => go(n.id)}
              className="group relative rounded-full px-4 py-2 text-sm font-bold text-foreground/80 transition-colors hover:text-brand-pink-deep"
            >
              {n.label}
              <span className="absolute inset-x-4 -bottom-0.5 h-0.5 origin-center scale-x-0 rounded-full bg-gradient-to-r from-brand-pink-deep to-brand-orange transition-transform duration-300 group-hover:scale-x-100" />
            </button>
          ))}
        </nav>

        {/* Search */}
        <form
          onSubmit={onSearchSubmit}
          className="hidden flex-1 md:flex"
          role="search"
        >
          <div className="group relative w-full max-w-lg mx-auto">
            <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-brand-pink-deep via-brand-orange to-brand-red opacity-60 blur-md transition duration-300 group-focus-within:opacity-100 group-hover:opacity-90" />
            <div className="relative flex items-center rounded-full bg-white p-1 pl-5 shadow-lg ring-1 ring-brand-pink/40">
              <Search className="mr-2 h-4 w-4 text-brand-pink-deep" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search magical toys..."
                className="h-9 border-0 bg-transparent px-0 text-sm shadow-none focus-visible:ring-0"
                aria-label="Search products"
              />
              <Button
                type="submit"
                size="sm"
                className="h-9 rounded-full bg-gradient-to-r from-brand-pink-deep via-brand-orange to-brand-red px-5 text-white shadow-md hover:shadow-lg hover:opacity-95"
              >
                <Search className="h-4 w-4 md:hidden" />
                <span className="hidden md:inline">Search</span>
              </Button>
            </div>
          </div>
        </form>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-1.5 md:gap-2">
          <button
            aria-label="Wishlist"
            className="hidden h-11 w-11 place-items-center rounded-full ring-1 ring-brand-pink/40 bg-white text-brand-pink-deep shadow-sm transition hover:scale-105 hover:bg-brand-pink/30 md:grid"
          >
            <Heart className="h-5 w-5" />
          </button>
          <Link
            to="/cart"
            aria-label={`View cart, ${count} items`}
            className="relative grid h-11 w-11 place-items-center rounded-full ring-1 ring-brand-pink/40 bg-white text-brand-pink-deep shadow-sm transition hover:scale-105 hover:bg-brand-pink/30"
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <motion.span
                key={count}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
                className="absolute -top-1 -right-1 grid h-5 min-w-5 place-items-center rounded-full bg-gradient-to-br from-brand-red to-brand-orange px-1 text-[11px] font-bold text-white shadow-md ring-2 ring-white"
              >
                {count}
              </motion.span>
            )}
          </Link>
          <Button
            onClick={() => go("contact")}
            className="hidden rounded-full bg-gradient-to-r from-brand-pink-deep via-brand-orange to-brand-red px-5 text-white shadow-toy transition hover:shadow-lg hover:brightness-105 md:inline-flex"
          >
            <Sparkles className="mr-1.5 h-4 w-4" /> Buy Now
          </Button>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-brand-pink-deep to-brand-orange text-white shadow-md lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="h-0.5 w-full bg-gradient-to-r from-brand-pink-deep via-brand-orange to-brand-red opacity-70" />

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