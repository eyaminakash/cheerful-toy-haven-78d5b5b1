import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowLeft, Minus, Plus, ShoppingBag, Sparkles, Trash2, Truck, ShieldCheck, Gift,
  Banknote, CheckCircle2, Download, Home, Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useCart, type CartItem } from "@/context/cart-context";
import { Navbar } from "@/components/toyspark/Navbar";
import { Footer } from "@/components/toyspark/Footer";
import logo from "@/assets/mafi-toys-logo.png.asset.json";
import { toast } from "sonner";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Mafi Toys" },
      { name: "description", content: "Review the magical toys in your cart before checkout." },
      { property: "og:title", content: "Your Cart — Mafi Toys" },
      { property: "og:description", content: "Review the magical toys in your cart before checkout." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, subtotal, updateQty, removeItem, clear } = useCart();
  const shipping = subtotal > 0 && subtotal < 100 ? 8 : 0;
  const total = subtotal + shipping;
  const [order, setOrder] = useState<PlacedOrder | null>(null);

  if (order) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-brand-pink/30 via-background to-background font-body text-foreground">
        <Navbar />
        <main className="pt-28 pb-20 md:pt-36">
          <ThankYou order={order} />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-pink/30 via-background to-background font-body text-foreground">
      <Navbar />

      <main className="pt-28 pb-20 md:pt-36">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8 flex flex-wrap items-end justify-between gap-4"
          >
            <div>
              <Link
                to="/"
                className="mb-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-pink-deep hover:underline"
              >
                <ArrowLeft className="h-4 w-4" /> Continue shopping
              </Link>
              <h1 className="font-display text-4xl font-bold md:text-5xl">
                Your Shopping <span className="text-brand-pink-deep">Cart</span>
              </h1>
              <p className="mt-2 text-foreground/70">
                {items.length === 0
                  ? "Nothing here yet — let’s find some magic."
                  : `${items.length} item${items.length > 1 ? "s" : ""} ready for checkout.`}
              </p>
            </div>
            {items.length > 0 && (
              <button
                onClick={clear}
                className="text-sm font-semibold text-foreground/60 hover:text-brand-red"
              >
                Clear cart
              </button>
            )}
          </motion.div>

          {items.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
              {/* Items */}
              <ul className="space-y-4">
                <AnimatePresence initial={false}>
                  {items.map((item, i) => (
                    <motion.li
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ duration: 0.3, delay: i * 0.04 }}
                      className="flex flex-col gap-4 rounded-3xl bg-white p-4 shadow-md ring-1 ring-brand-pink/40 sm:flex-row sm:items-center md:p-5"
                    >
                      <div className="relative h-32 w-full flex-none overflow-hidden rounded-2xl bg-brand-pink/30 sm:h-28 sm:w-28">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="flex flex-1 flex-col gap-2">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-display text-lg font-semibold leading-tight">
                              {item.name}
                            </h3>
                            <p className="mt-0.5 line-clamp-1 text-sm text-foreground/60">
                              {item.description}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            aria-label={`Remove ${item.name}`}
                            className="grid h-9 w-9 place-items-center rounded-full text-foreground/50 transition hover:bg-brand-red/10 hover:text-brand-red"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="mt-1 flex items-center justify-between">
                          <div className="flex items-center gap-1 rounded-full border-2 border-brand-pink/60 bg-white p-1">
                            <button
                              onClick={() => updateQty(item.id, item.quantity - 1)}
                              className="grid h-8 w-8 place-items-center rounded-full text-brand-pink-deep transition hover:bg-brand-pink/40"
                              aria-label="Decrease"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-7 text-center text-sm font-bold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQty(item.id, item.quantity + 1)}
                              className="grid h-8 w-8 place-items-center rounded-full text-brand-pink-deep transition hover:bg-brand-pink/40"
                              aria-label="Increase"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-foreground/50">
                              ${item.price.toFixed(2)} each
                            </div>
                            <div className="font-display text-xl font-bold text-brand-pink-deep">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </AnimatePresence>

                {/* Perks */}
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <Perk
                    icon={Truck}
                    title="Free Delivery"
                    sub="Inside Dhaka over $100"
                    tone="pink"
                  />
                  <Perk
                    icon={ShieldCheck}
                    title="100% Authentic"
                    sub="Genuine toys, guaranteed"
                    tone="orange"
                  />
                  <Perk
                    icon={Gift}
                    title="Free Gift Wrap"
                    sub="On every order"
                    tone="red"
                  />
                </div>
              </ul>

              {/* Summary */}
              <motion.aside
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="lg:sticky lg:top-32 lg:self-start"
              >
                <div className="overflow-hidden rounded-3xl bg-white shadow-toy ring-1 ring-brand-pink/40">
                  <div className="bg-gradient-to-r from-brand-pink-deep via-brand-orange to-brand-red p-5 text-white">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      <span className="text-xs font-semibold uppercase tracking-wider">
                        Order Summary
                      </span>
                    </div>
                    <p className="mt-1 font-display text-xl font-bold">
                      {items.reduce((s, i) => s + i.quantity, 0)} magical items
                    </p>
                  </div>

                  <div className="space-y-3 p-5">
                    <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
                    <Row
                      label="Shipping"
                      value={shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                      accent={shipping === 0}
                    />
                    <div className="my-2 border-t border-dashed border-brand-pink/60" />
                    <div className="flex items-baseline justify-between">
                      <span className="font-semibold">Total</span>
                      <span className="font-display text-3xl font-bold text-brand-pink-deep">
                        ${total.toFixed(2)}
                      </span>
                    </div>

                    <Button
                      onClick={() => document.getElementById("checkout")?.scrollIntoView({ behavior: "smooth" })}
                      className="mt-2 w-full rounded-full bg-gradient-to-r from-brand-pink-deep to-brand-orange py-6 text-base font-semibold text-white shadow-toy hover:opacity-95"
                    >
                      Proceed to Checkout
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full rounded-full border-2 border-brand-pink-deep text-brand-pink-deep hover:bg-brand-pink/30"
                    >
                      <Link to="/">Keep Shopping</Link>
                    </Button>
                  </div>
                </div>
              </motion.aside>
            </div>
          )}

          {items.length > 0 && (
            <CheckoutForm
              items={items}
              subtotal={subtotal}
              shipping={shipping}
              total={total}
              onPlaced={(o) => {
                setOrder(o);
                clear();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-foreground/70">{label}</span>
      <span className={accent ? "font-bold text-brand-orange" : "font-semibold"}>{value}</span>
    </div>
  );
}

function Perk({
  icon: Icon,
  title,
  sub,
  tone,
}: {
  icon: typeof Truck;
  title: string;
  sub: string;
  tone: "pink" | "orange" | "red";
}) {
  const tones = {
    pink: {
      grad: "from-brand-pink/60 to-white",
      ring: "ring-brand-pink/50",
      icon: "from-brand-pink-deep to-brand-red text-white",
      glow: "bg-brand-pink/50",
    },
    orange: {
      grad: "from-brand-peach/70 to-white",
      ring: "ring-brand-orange/40",
      icon: "from-brand-orange to-brand-red text-white",
      glow: "bg-brand-orange/40",
    },
    red: {
      grad: "from-brand-yellow/60 to-white",
      ring: "ring-brand-red/30",
      icon: "from-brand-red to-brand-pink-deep text-white",
      glow: "bg-brand-red/30",
    },
  }[tone];

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${tones.grad} p-4 ring-1 ${tones.ring} shadow-sm hover:shadow-toy`}
    >
      <div className={`pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full ${tones.glow} blur-2xl transition-opacity group-hover:opacity-80`} />
      <div className="relative flex items-center gap-3">
        <div className={`grid h-11 w-11 flex-none place-items-center rounded-2xl bg-gradient-to-br ${tones.icon} shadow-md`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <div className="font-display text-sm font-bold text-foreground">{title}</div>
          <div className="text-xs text-foreground/60">{sub}</div>
        </div>
      </div>
    </motion.div>
  );
}

function EmptyCart() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="mx-auto grid max-w-xl place-items-center rounded-3xl bg-white p-10 text-center shadow-md ring-1 ring-brand-pink/40 md:p-14"
    >
      <div className="relative mb-6">
        <div className="absolute inset-0 animate-pulse rounded-full bg-brand-pink/40 blur-2xl" />
        <div className="relative grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-brand-pink-deep to-brand-orange text-white shadow-toy">
          <ShoppingBag className="h-10 w-10" />
        </div>
      </div>
      <h2 className="font-display text-2xl font-bold md:text-3xl">Your cart is empty</h2>
      <p className="mt-2 max-w-sm text-foreground/70">
        Looks like you haven’t picked any toys yet. Let’s find something magical!
      </p>
      <Button
        asChild
        className="mt-6 rounded-full bg-gradient-to-r from-brand-pink-deep to-brand-orange px-8 py-6 text-base font-semibold text-white shadow-toy hover:opacity-95"
      >
        <Link to="/">Start Shopping</Link>
      </Button>
    </motion.div>
  );
}

// ============ Checkout + Thank you + Invoice ============

type PlacedOrder = {
  invoiceNo: string;
  date: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  note?: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
};

const checkoutSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  phone: z.string().min(6, "Please enter a valid phone"),
  email: z.string().email("Please enter a valid email"),
  address: z.string().min(5, "Please enter your address"),
  note: z.string().optional(),
});
type CheckoutValues = z.infer<typeof checkoutSchema>;

function CheckoutForm({
  items,
  subtotal,
  shipping,
  total,
  onPlaced,
}: {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  onPlaced: (o: PlacedOrder) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutValues>({ resolver: zodResolver(checkoutSchema) });

  const onSubmit = async (data: CheckoutValues) => {
    await new Promise((r) => setTimeout(r, 600));
    const invoiceNo = `MAFI-${Date.now().toString().slice(-8)}`;
    const order: PlacedOrder = {
      invoiceNo,
      date: new Date().toLocaleString(),
      ...data,
      items,
      subtotal,
      shipping,
      total,
    };
    toast.success("Order placed!", { description: `Invoice ${invoiceNo}` });
    onPlaced(order);
  };

  return (
    <motion.section
      id="checkout"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className="mt-14 rounded-[2rem] bg-gradient-to-br from-brand-pink-deep/60 via-brand-orange/50 to-brand-purple/50 p-[1.5px] shadow-[0_30px_80px_-30px_rgba(236,72,153,0.35)]"
    >
      <div className="grid overflow-hidden rounded-[calc(2rem-1.5px)] bg-white/95 backdrop-blur-xl lg:grid-cols-5">
        <aside className="relative overflow-hidden bg-gradient-to-br from-brand-pink-deep via-brand-orange to-brand-red p-8 text-white lg:col-span-2 lg:p-10">
          <div className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-white/15 blur-2xl" />
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest ring-1 ring-white/30">
            <Sparkles className="h-3 w-3" /> Checkout
          </span>
          <h3 className="mt-4 font-display text-3xl font-bold md:text-4xl">Cash on Delivery</h3>
          <p className="mt-2 text-sm text-white/85">
            Pay in cash when your order arrives at your doorstep — no cards, no hassle.
          </p>

          <div className="mt-8 rounded-2xl bg-white/15 p-5 ring-1 ring-white/25 backdrop-blur">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/25">
                <Banknote className="h-5 w-5" />
              </span>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-white/70">
                  Payment Method
                </div>
                <div className="font-bold">Cash on Delivery (COD)</div>
              </div>
            </div>
            <ul className="mt-4 space-y-2 text-xs text-white/85">
              <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5" /> Pay when you receive</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5" /> Inspect before paying</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5" /> Free delivery over $100</li>
            </ul>
          </div>

          <div className="mt-8 rounded-2xl bg-white/10 p-4 text-sm ring-1 ring-white/20">
            <div className="flex justify-between"><span className="text-white/80">Subtotal</span><span className="font-semibold">${subtotal.toFixed(2)}</span></div>
            <div className="mt-1 flex justify-between"><span className="text-white/80">Shipping</span><span className="font-semibold">{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span></div>
            <div className="mt-3 flex items-baseline justify-between border-t border-white/20 pt-3">
              <span className="font-bold">Total</span>
              <span className="font-display text-2xl font-bold">${total.toFixed(2)}</span>
            </div>
          </div>
        </aside>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 lg:col-span-3 lg:p-10">
          <h3 className="font-display text-2xl font-bold">Delivery details</h3>
          <p className="mt-1 text-sm text-foreground/60">We'll call to confirm before dispatch.</p>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <FieldC label="Full name" error={errors.name?.message}>
              <Input placeholder="Jane Doe" {...register("name")} className="h-12 rounded-xl border-brand-pink/40 bg-white/70" />
            </FieldC>
            <FieldC label="Phone" error={errors.phone?.message}>
              <Input placeholder="+880 1XXX XXX XXX" {...register("phone")} className="h-12 rounded-xl border-brand-pink/40 bg-white/70" />
            </FieldC>
            <FieldC label="Email" error={errors.email?.message}>
              <Input type="email" placeholder="jane@email.com" {...register("email")} className="h-12 rounded-xl border-brand-pink/40 bg-white/70" />
            </FieldC>
            <FieldC label="Address" error={errors.address?.message}>
              <Input placeholder="House, Road, City" {...register("address")} className="h-12 rounded-xl border-brand-pink/40 bg-white/70" />
            </FieldC>
          </div>
          <div className="mt-5">
            <FieldC label="Order note (optional)" error={errors.note?.message}>
              <Textarea rows={3} placeholder="Any special instructions?" {...register("note")} className="rounded-xl border-brand-pink/40 bg-white/70" />
            </FieldC>
          </div>

          <label className="mt-5 flex cursor-not-allowed items-center gap-3 rounded-2xl border-2 border-brand-pink-deep/70 bg-brand-pink/10 p-4">
            <input type="radio" checked readOnly className="h-4 w-4 accent-brand-pink-deep" />
            <Banknote className="h-5 w-5 text-brand-pink-deep" />
            <div>
              <div className="font-bold">Cash on Delivery</div>
              <div className="text-xs text-foreground/60">Only payment method available</div>
            </div>
          </label>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 h-14 w-full rounded-full bg-gradient-to-r from-brand-pink-deep via-brand-orange to-brand-red text-base font-bold text-white shadow-toy hover:brightness-105"
          >
            {isSubmitting ? "Placing order…" : `Place Order · $${total.toFixed(2)}`}
          </Button>
          <p className="mt-3 text-center text-xs text-foreground/60">
            By placing this order you agree to our friendly terms. 💕
          </p>
        </form>
      </div>
    </motion.section>
  );
}

function FieldC({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-semibold">{label}</Label>
      {children}
      {error && <p className="text-xs text-brand-red">{error}</p>}
    </div>
  );
}

async function downloadInvoicePDF(order: PlacedOrder) {
  const { jsPDF } = await import("jspdf");
  const autoTableMod = await import("jspdf-autotable");
  const autoTable = (autoTableMod as unknown as { default: (doc: unknown, opts: unknown) => void }).default;

  const doc = new jsPDF();
  // Header band
  doc.setFillColor(236, 72, 153);
  doc.rect(0, 0, 210, 30, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("MAFI TOYS", 14, 18);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Every Children's First Choice", 14, 24);

  doc.setTextColor(30, 30, 30);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("INVOICE", 160, 18);

  // Meta
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(60, 60, 60);
  doc.text(`Invoice #: ${order.invoiceNo}`, 14, 40);
  doc.text(`Date: ${order.date}`, 14, 46);
  doc.text(`Payment: Cash on Delivery`, 14, 52);

  doc.setFont("helvetica", "bold");
  doc.text("Billed To:", 130, 40);
  doc.setFont("helvetica", "normal");
  doc.text(order.name, 130, 46);
  doc.text(order.phone, 130, 52);
  doc.text(order.email, 130, 58);
  const addrLines = doc.splitTextToSize(order.address, 65) as string[];
  doc.text(addrLines, 130, 64);

  autoTable(doc, {
    startY: 85,
    head: [["#", "Item", "Qty", "Price", "Total"]],
    body: order.items.map((it, i) => [
      String(i + 1),
      it.name,
      String(it.quantity),
      `$${it.price.toFixed(2)}`,
      `$${(it.price * it.quantity).toFixed(2)}`,
    ]),
    headStyles: { fillColor: [236, 72, 153], textColor: 255, fontStyle: "bold" },
    styles: { fontSize: 10, cellPadding: 3 },
    columnStyles: { 0: { cellWidth: 12 }, 2: { halign: "center" }, 3: { halign: "right" }, 4: { halign: "right" } },
  });

  const finalY = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 10;
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("Subtotal:", 140, finalY);
  doc.text(`$${order.subtotal.toFixed(2)}`, 195, finalY, { align: "right" });
  doc.text("Shipping:", 140, finalY + 6);
  doc.text(order.shipping === 0 ? "FREE" : `$${order.shipping.toFixed(2)}`, 195, finalY + 6, { align: "right" });
  doc.setDrawColor(236, 72, 153);
  doc.line(140, finalY + 10, 195, finalY + 10);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("TOTAL:", 140, finalY + 17);
  doc.text(`$${order.total.toFixed(2)}`, 195, finalY + 17, { align: "right" });

  // Footer
  doc.setFont("helvetica", "italic");
  doc.setFontSize(10);
  doc.setTextColor(120, 120, 120);
  doc.text("Thank you for shopping with Mafi Toys!", 14, 280);
  doc.text("Bashundhara City, Level-1, Block-C, Shop-77, Dhaka · 01781-984427", 14, 286);

  doc.save(`${order.invoiceNo}.pdf`);
}

function ThankYou({ order }: { order: PlacedOrder }) {
  return (
    <div className="mx-auto max-w-4xl px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="overflow-hidden rounded-[2rem] bg-white shadow-toy ring-1 ring-brand-pink/40"
      >
        {/* Hero */}
        <div className="relative overflow-hidden bg-gradient-to-br from-brand-pink-deep via-brand-orange to-brand-red p-10 text-center text-white">
          <div className="pointer-events-none absolute -top-20 -left-20 h-64 w-64 rounded-full bg-white/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-white/15 blur-3xl" />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
            className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-white text-brand-pink-deep shadow-xl"
          >
            <CheckCircle2 className="h-10 w-10" />
          </motion.div>
          <h1 className="mt-5 font-display text-4xl font-bold md:text-5xl">Thank You{order.name ? `, ${order.name.split(" ")[0]}` : ""}!</h1>
          <p className="mt-3 text-white/90 md:text-lg">
            Your order has been placed successfully. We'll call you shortly to confirm.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm ring-1 ring-white/30 backdrop-blur">
            <Package className="h-4 w-4" />
            Invoice <span className="font-bold">{order.invoiceNo}</span>
          </div>
        </div>

        {/* Invoice body */}
        <div className="p-8 md:p-10">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-dashed border-brand-pink/40 pb-6">
            <div className="flex items-center gap-3">
              <img src={logo.url} alt="Mafi Toys" className="h-14 w-auto" />
              <div>
                <div className="font-display text-xl font-bold">Mafi Toys</div>
                <p className="text-xs text-foreground/60">Bashundhara City, Level-1, Block-C, Shop-77</p>
                <p className="text-xs text-foreground/60">Dhaka, Bangladesh · 01781-984427</p>
              </div>
            </div>
            <div className="text-right text-sm">
              <div className="text-xs uppercase tracking-widest text-foreground/50">Payment</div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-pink/20 px-3 py-1 font-semibold text-brand-pink-deep">
                <Banknote className="h-4 w-4" /> Cash on Delivery
              </div>
              <div className="mt-2 text-xs text-foreground/60">{order.date}</div>
            </div>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-foreground/50">Billed To</div>
              <p className="mt-1 font-semibold">{order.name}</p>
              <p className="text-sm text-foreground/70">{order.phone}</p>
              <p className="text-sm text-foreground/70">{order.email}</p>
              <p className="mt-1 text-sm text-foreground/70">{order.address}</p>
            </div>
            {order.note && (
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-foreground/50">Note</div>
                <p className="mt-1 text-sm text-foreground/70">{order.note}</p>
              </div>
            )}
          </div>

          {/* Items */}
          <div className="mt-8 overflow-hidden rounded-2xl ring-1 ring-brand-pink/30">
            <table className="w-full text-left text-sm">
              <thead className="bg-brand-pink/20 text-xs uppercase tracking-wider text-foreground/70">
                <tr>
                  <th className="px-4 py-3">Item</th>
                  <th className="px-4 py-3 text-center">Qty</th>
                  <th className="px-4 py-3 text-right">Price</th>
                  <th className="px-4 py-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((it) => (
                  <tr key={it.id} className="border-t border-brand-pink/20">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={it.image} alt={it.name} className="h-10 w-10 rounded-lg object-cover" />
                        <span className="font-semibold">{it.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">{it.quantity}</td>
                    <td className="px-4 py-3 text-right">${it.price.toFixed(2)}</td>
                    <td className="px-4 py-3 text-right font-semibold">${(it.price * it.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="mt-6 ml-auto w-full max-w-sm space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-foreground/70">Subtotal</span><span className="font-semibold">${order.subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-foreground/70">Shipping</span><span className="font-semibold">{order.shipping === 0 ? "FREE" : `$${order.shipping.toFixed(2)}`}</span></div>
            <div className="my-2 border-t border-dashed border-brand-pink/60" />
            <div className="flex items-baseline justify-between">
              <span className="font-bold">Total</span>
              <span className="font-display text-3xl font-bold text-brand-pink-deep">${order.total.toFixed(2)}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              onClick={() => downloadInvoicePDF(order)}
              className="flex-1 rounded-full bg-gradient-to-r from-brand-pink-deep via-brand-orange to-brand-red py-6 text-base font-bold text-white shadow-toy hover:brightness-105"
            >
              <Download className="mr-2 h-4 w-4" /> Download Invoice (PDF)
            </Button>
            <Button asChild variant="outline" className="flex-1 rounded-full border-2 border-brand-pink-deep py-6 text-base font-semibold text-brand-pink-deep hover:bg-brand-pink/20">
              <Link to="/"><Home className="mr-2 h-4 w-4" /> Back to Home</Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}