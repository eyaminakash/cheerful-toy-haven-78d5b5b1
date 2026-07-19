import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/context/cart-context";
import { SearchProvider } from "@/context/search-context";
import { Navbar } from "@/components/toyspark/Navbar";
import { Hero } from "@/components/toyspark/Hero";
import { Products } from "@/components/toyspark/Products";
import { Reviews } from "@/components/toyspark/Reviews";
import { Contact } from "@/components/toyspark/Contact";
import { Footer } from "@/components/toyspark/Footer";
import { CartDrawer } from "@/components/toyspark/CartDrawer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <CartProvider>
      <SearchProvider>
      <div className="min-h-screen bg-background font-body text-foreground">
        <Navbar />
        <main>
          <Hero />
          <Products />
          <Reviews />
          <Contact />
        </main>
        <Footer />
        <CartDrawer />
        <Toaster richColors position="top-right" />
      </div>
      </SearchProvider>
    </CartProvider>
  );
}
