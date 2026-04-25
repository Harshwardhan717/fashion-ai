"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const categories = [
  {
    name: "Sarees",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80",
    count: "120+ Products",
    href: "/products?category=sarees",
  },
  {
    name: "Lehengas",
    image: "https://images.unsplash.com/photo-1594463750939-ebb28c3f7f75?w=600&q=80",
    count: "85+ Products",
    href: "/products?category=lehengas",
  },
  {
    name: "Suits & Kurtis",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&q=80",
    count: "200+ Products",
    href: "/products?category=suits",
  },
  {
    name: "Gowns",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80",
    count: "60+ Products",
    href: "/products?category=gowns",
  },
];

export function Categories() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <span className="text-sm font-medium tracking-[0.3em] text-primary uppercase">
            Categories
          </span>
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-serif font-bold mt-2 mb-4">
            Our Collections
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our curated selection of traditional Indian ethnic wear, 
            crafted with love and designed for every special occasion.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={category.href} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-4 lg:p-6">
                    <div className="flex items-end justify-between">
                      <div>
                        <h3 className="text-lg lg:text-xl font-serif font-bold text-primary-foreground">
                          {category.name}
                        </h3>
                        <p className="text-sm text-primary-foreground/80">
                          {category.count}
                        </p>
                      </div>
                      <div className="w-10 h-10 bg-card rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        <ArrowUpRight className="w-5 h-5 text-foreground" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
