import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";
import { scrollToSection } from "@/lib/scroll";
import logo from "@/assets/mafi-toys-logo.png.asset.json";

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
          <div className="inline-flex items-center rounded-2xl bg-white/95 p-3 shadow-lg">
            <img src={logo.url} alt="Mafi Toys" className="h-16 w-auto" />
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
          <h4 className="font-display text-lg font-semibold">Contact Us</h4>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0" /> 01781-984427
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                Bashundhara City Shopping Mall. Level-1, Block-C, Shop-77,
                Dhaka, Bangladesh, 1229
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0" /> ismailsiam231@gmail.com
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/15">
        <p className="mx-auto max-w-7xl px-4 py-5 text-center text-xs text-white/70 md:px-8">
          © {new Date().getFullYear()} ToySpark. Made for happy kids. Design and Developed by{" "}
          <a
            href="https://digitalwebars.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-brand-yellow hover:underline"
          >
            Digital Webars
          </a>
        </p>
      </div>
    </footer>
  );
}