import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "motion/react";
import { toast } from "sonner";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useCart } from "@/context/cart-context";
import contactIllo from "@/assets/contact-illustration.png";

const schema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  phone: z.string().min(6, "Please enter a valid phone"),
  email: z.string().email("Please enter a valid email"),
  address: z.string().min(5, "Please enter your address"),
  message: z.string().min(5, "Please add a short message"),
});
type FormValues = z.infer<typeof schema>;

export function Contact() {
  const { items, subtotal, clear } = useCart();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    await new Promise((r) => setTimeout(r, 700));
    if (items.length > 0) {
      toast.success("Order placed! 🎉", {
        description: `Thanks ${data.name}! Total $${subtotal.toFixed(2)} — confirmation sent to ${data.email}.`,
      });
      clear();
    } else {
      toast.success("Message sent! 💌", {
        description: `Thanks ${data.name}, we'll be in touch soon.`,
      });
    }
    reset();
  };

  return (
    <section id="contact" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block rounded-full bg-brand-yellow/70 px-4 py-1 text-xs font-bold uppercase tracking-wider text-brand-orange">
              Place Your Order
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold md:text-5xl">
              Let's Make Some <span className="gradient-text">Magic</span>
            </h2>
            <p className="mt-3 text-foreground/70">
              Fill in your details to place an order or send us a message — we
              reply within 24 hours.
            </p>

            <div className="mt-8 hidden lg:block">
              <img
                src={contactIllo}
                alt="Contact illustration"
                className="mx-auto w-full max-w-md"
              />
            </div>

            <ul className="mt-8 space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-pink/50 text-brand-pink-deep">
                  <Phone className="h-4 w-4" />
                </span>
                +1 (555) 010-2024
              </li>
              <li className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-peach/60 text-brand-orange">
                  <Mail className="h-4 w-4" />
                </span>
                hello@toyspark.shop
              </li>
              <li className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-purple/50 text-foreground">
                  <MapPin className="h-4 w-4" />
                </span>
                123 Sparkle Lane, Toy Town
              </li>
            </ul>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl bg-white p-6 shadow-toy md:p-8"
          >
            {items.length > 0 && (
              <div className="mb-5 rounded-2xl bg-brand-pink/30 p-4 text-sm">
                <div className="flex items-center justify-between font-semibold">
                  <span>Order summary</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <p className="text-foreground/70">
                  {items.reduce((s, i) => s + i.quantity, 0)} item(s) in cart
                </p>
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Full name" error={errors.name?.message}>
                <Input placeholder="Jane Doe" {...register("name")} />
              </Field>
              <Field label="Phone" error={errors.phone?.message}>
                <Input placeholder="+1 555 000 0000" {...register("phone")} />
              </Field>
              <Field label="Email" error={errors.email?.message}>
                <Input type="email" placeholder="jane@email.com" {...register("email")} />
              </Field>
              <Field label="Address" error={errors.address?.message}>
                <Input placeholder="123 Main St, City" {...register("address")} />
              </Field>
            </div>
            <div className="mt-4">
              <Field label="Message" error={errors.message?.message}>
                <Textarea
                  rows={4}
                  placeholder="Any special instructions?"
                  {...register("message")}
                />
              </Field>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 w-full rounded-full bg-gradient-to-r from-brand-pink-deep to-brand-orange py-6 text-base text-white shadow-toy hover:opacity-95"
            >
              <Send className="mr-1 h-4 w-4" />
              {items.length > 0 ? "Submit Order" : "Send Message"}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-semibold">{label}</Label>
      {children}
      {error && <p className="text-xs text-brand-red">{error}</p>}
    </div>
  );
}