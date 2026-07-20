import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "motion/react";
import { toast } from "sonner";
import { ArrowRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useCart } from "@/context/cart-context";

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
        description: `Thanks ${data.name}! Total ৳${subtotal.toFixed(2)} — confirmation sent to ${data.email}.`,
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
    <section id="contact" className="relative border-t border-foreground/10 bg-background py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 md:px-10 lg:grid-cols-12 lg:gap-20">
        {/* Left column — editorial header + contact list */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-5"
        >
          <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground/50">
            Contact · 01
          </div>
          <h2 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl">
            Let's talk about<br />
            <span className="italic text-brand-pink-deep">your next order.</span>
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-foreground/65">
            Questions, custom orders, or bulk requests — drop us a line and we'll reply within 24 hours.
          </p>

          <div className="mt-10 divide-y divide-foreground/10 border-y border-foreground/10">
            <ContactRow
              icon={<Phone className="h-4 w-4" />}
              label="Call us"
              value="01781-984427"
              href="tel:01781984427"
            />
            <ContactRow
              icon={<Mail className="h-4 w-4" />}
              label="Email"
              value="ismailsiam231@gmail.com"
              href="mailto:ismailsiam231@gmail.com"
            />
            <ContactRow
              icon={<MapPin className="h-4 w-4" />}
              label="Visit"
              value="Bashundhara City Mall, Level-1, Block-C, Shop-77, Dhaka 1229"
            />
            <ContactRow
              icon={<Clock className="h-4 w-4" />}
              label="Hours"
              value="Sat – Thu · 10:00 AM – 10:00 PM"
            />
          </div>
        </motion.div>

        {/* Right column — form */}
        <motion.form
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onSubmit={handleSubmit(onSubmit)}
          className="lg:col-span-7"
        >
          {items.length > 0 && (
            <div className="mb-8 flex items-center justify-between border-b border-foreground/10 pb-4">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground/50">
                  Order summary
                </div>
                <p className="mt-1 text-sm text-foreground/70">
                  {items.reduce((s, i) => s + i.quantity, 0)} item(s) in cart
                </p>
              </div>
              <div className="font-display text-3xl font-bold tracking-tight">
                ৳{subtotal.toFixed(2)}
              </div>
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            <Field label="Full name" error={errors.name?.message}>
              <Input placeholder="Jane Doe" {...register("name")} className="h-12 rounded-none border-0 border-b border-foreground/20 bg-transparent px-0 shadow-none focus-visible:border-brand-pink-deep focus-visible:ring-0" />
            </Field>
            <Field label="Phone" error={errors.phone?.message}>
              <Input placeholder="+880 1XXX XXX XXX" {...register("phone")} className="h-12 rounded-none border-0 border-b border-foreground/20 bg-transparent px-0 shadow-none focus-visible:border-brand-pink-deep focus-visible:ring-0" />
            </Field>
            <Field label="Email" error={errors.email?.message}>
              <Input type="email" placeholder="jane@email.com" {...register("email")} className="h-12 rounded-none border-0 border-b border-foreground/20 bg-transparent px-0 shadow-none focus-visible:border-brand-pink-deep focus-visible:ring-0" />
            </Field>
            <Field label="Address" error={errors.address?.message}>
              <Input placeholder="123 Main St, City" {...register("address")} className="h-12 rounded-none border-0 border-b border-foreground/20 bg-transparent px-0 shadow-none focus-visible:border-brand-pink-deep focus-visible:ring-0" />
            </Field>
          </div>
          <div className="mt-6">
            <Field label="Message" error={errors.message?.message}>
              <Textarea
                rows={4}
                placeholder="Any special instructions?"
                {...register("message")}
                className="resize-none rounded-none border-0 border-b border-foreground/20 bg-transparent px-0 shadow-none focus-visible:border-brand-pink-deep focus-visible:ring-0"
              />
            </Field>
          </div>

          <div className="mt-10 flex flex-col-reverse items-start justify-between gap-4 sm:flex-row sm:items-center">
            <p className="text-xs text-foreground/50">
              We'll never share your info. Reply within 24h.
            </p>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="group h-12 rounded-full bg-foreground px-8 text-sm font-semibold tracking-wide text-background transition hover:bg-brand-pink-deep"
            >
              {items.length > 0 ? "Submit Order" : "Send Message"}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="group flex items-center gap-6 py-5 transition-colors">
      <span className="grid h-9 w-9 flex-none place-items-center rounded-full border border-foreground/15 text-foreground/70 transition-colors group-hover:border-brand-pink-deep group-hover:text-brand-pink-deep">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-foreground/45">
          {label}
        </div>
        <div className="mt-1 truncate text-[15px] font-medium text-foreground">
          {value}
        </div>
      </div>
    </div>
  );
  return href ? <a href={href} className="block">{content}</a> : content;
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