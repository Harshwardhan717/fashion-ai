"use client";

import { motion } from "framer-motion";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Banarasi Silk Saree",
    price: 4999,
    originalPrice: 7999,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&q=80",
    rating: 4.9,
    reviews: 128,
    tag: "Bestseller",
  },
  {
    id: 2,
    name: "Embroidered Lehenga",
    price: 12999,
    originalPrice: 18999,
    image: "https://images.unsplash.com/photo-1594463750939-ebb28c3f7f75?w=500&q=80",
    rating: 4.8,
    reviews: 89,
    tag: "New Arrival",
  },
  {
    id: 3,
    name: "Designer Anarkali Suit",
    price: 3499,
    originalPrice: 5999,
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500&q=80",
    rating: 4.7,
    reviews: 156,
    tag: "Trending",
  },
  {
    id: 4,
    name: "Georgette Party Gown",
    price: 6999,
    originalPrice: 9999,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80",
    rating: 4.9,
    reviews: 67,
    tag: "Sale",
  },
  {
    id: 5,
    name: "Chanderi Cotton Saree",
    price: 2499,
    originalPrice: 3999,
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=500&q=80",
    rating: 4.6,
    reviews: 203,
    tag: "Popular",
  },
  {
    id: 6,
    name: "Bridal Red Lehenga",
    price: 24999,
    originalPrice: 35999,
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500&q=80",
    rating: 5.0,
    reviews: 45,
    tag: "Exclusive",
  },
  {
    id: 7,
    name: "Printed Kurti Set",
    price: 1299,
    originalPrice: 1999,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&q=80",
    rating: 4.5,
    reviews: 312,
    tag: "Budget Pick",
  },
  {
    id: 8,
    name: "Sequin Work Gown",
    price: 8999,
    originalPrice: 12999,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80",
    rating: 4.8,
    reviews: 78,
    tag: "Party Wear",
  },
];

function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group"
    >
      <div className="relative bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Tag */}
          <div className="absolute top-3 left-3">
            <span className="inline-block bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
              {product.tag}
            </span>
          </div>

          {/* Discount Badge */}
          <div className="absolute top-3 right-3">
            <span className="inline-block bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded">
              -{discount}%
            </span>
          </div>

          {/* Quick Actions */}
          <div className="absolute bottom-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            <Button size="icon" variant="secondary" className="rounded-full shadow-lg">
              <Heart className="w-4 h-4" />
            </Button>
            <Button size="icon" className="rounded-full shadow-lg">
              <ShoppingBag className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <Star className="w-4 h-4 fill-accent text-accent" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-sm text-muted-foreground">({product.reviews})</span>
          </div>

          {/* Name */}
          <h3 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-2 mt-2">
            <span className="text-lg font-bold text-primary">
              ₹{product.price.toLocaleString()}
            </span>
            <span className="text-sm text-muted-foreground line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function FeaturedProducts() {
  return (
    <section className="py-16 lg:py-24 bg-secondary">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-12"
        >
          <div>
            <span className="text-sm font-medium tracking-[0.3em] text-primary uppercase">
              Latest Drops
            </span>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-serif font-bold mt-2">
              Featured Products
            </h2>
          </div>
          <Button asChild variant="outline" className="w-fit">
            <Link href="/products">View All Products</Link>
          </Button>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
