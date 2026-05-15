import { Facebook, Instagram, Mail, Sparkles, Twitter, Youtube } from "lucide-react";
import { scrollToSection } from "@/lib/scroll";

const LINKS = [
  { id: "home", label: "Home" },
  { id: "products", label: "Products" },
  { id: "reviews", label: "Reviews" },
  { id: "contact", label: "Contact" },
];

const SOCIAL = [
  { Icon: Instagram, href: "#", label: "Instagram" },
  { Icon: Facebook, href: "#", label: "Facebook" },
  { Icon: Twitter, href: "#", label: "Twitter" },
  { Icon: Youtube, href: "#", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="relative mt-10 gradient-footer text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4 md:px-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white/15 backdrop-blur">
              <Sparkles className="h-5 w-5" />
            </span>
            <span className="font-display text-2xl font-bold">ToySpark</span>
          </div>
          <p className="mt-4 max-w-md text-sm text-white/80">
            Magical, colorful and beautifully made toys for happy little girls.
            Crafted with love, designed to spark joy.
          </p>
          <div className="mt-5 flex gap-3">
            {SOCIAL.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/25"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg font-semibold">Quick links</h4>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            {LINKS.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => scrollToSection(l.id)}
                  className="transition-colors hover:text-white"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg font-semibold">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4" /> hello@toyspark.shop
            </li>
            <li>+1 (555) 010-2024</li>
            <li>123 Sparkle Lane, Toy Town</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/15">
        <p className="mx-auto max-w-7xl px-4 py-5 text-center text-xs text-white/70 md:px-8">
          © {new Date().getFullYear()} ToySpark. Made with 💖 for happy kids.
        </p>
      </div>
    </footer>
  );
}