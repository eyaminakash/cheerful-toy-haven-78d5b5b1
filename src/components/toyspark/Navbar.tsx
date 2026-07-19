import { useEffect, useState } from "react";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
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
        scrolled ? "glass-strong shadow-md" : "glass",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <button
          onClick={() => go("home")}
          className="flex items-center gap-2"
          aria-label="Mafi Toys home"
        >
          <img
            src={logo.url}
            alt="Mafi Toys"
            className="h-12 w-auto md:h-14"
          />
        </button>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => go(n.id)}
              className="text-sm font-semibold text-foreground/80 transition-colors hover:text-brand-pink-deep"
            >
              {n.label}
            </button>
          ))}
        </nav>

        <form
          onSubmit={onSearchSubmit}
          className="hidden flex-1 max-w-sm items-center md:flex mx-4"
          role="search"
        >
          <div className="relative w-full">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/50" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search toys..."
              className="w-full rounded-full border-brand-pink/60 bg-white/80 pl-9 pr-4 shadow-sm focus-visible:ring-brand-pink-deep"
              aria-label="Search products"
            />
          </div>
        </form>

        <div className="flex items-center gap-2">
          <button
            onClick={openCart}
            aria-label={`Open cart, ${count} items`}
            className="relative grid h-11 w-11 place-items-center rounded-full bg-white shadow-md transition-transform hover:scale-105"
          >
            <ShoppingBag className="h-5 w-5 text-foreground" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 grid h-5 min-w-5 place-items-center rounded-full bg-brand-red px-1 text-xs font-bold text-white">
                {count}
              </span>
            )}
          </button>
          <Button
            onClick={() => go("contact")}
            className="hidden rounded-full bg-gradient-to-r from-brand-pink-deep to-brand-orange px-5 text-white shadow-toy hover:opacity-95 lg:inline-flex"
          >
            Buy Now
          </Button>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-full bg-white shadow-md lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

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