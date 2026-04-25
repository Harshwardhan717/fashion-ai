"use client";

import { motion } from "framer-motion";
import { Truck, Sparkles, Shield, Headphones } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Express Delivery",
    description: "Get your orders delivered within 3-5 business days across India",
  },
  {
    icon: Sparkles,
    title: "Premium Quality",
    description: "Handpicked fabrics and expert craftsmanship in every piece",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "100% secure checkout with multiple payment options",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Our dedicated team is here to help you anytime",
  },
];

export function Features() {
  return (
    <section className="py-16 lg:py-20 bg-background border-y border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-14 h-14 lg:w-16 lg:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-7 h-7 lg:w-8 lg:h-8 text-primary" />
              </div>
              <h3 className="font-serif font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
