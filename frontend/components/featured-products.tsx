"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

function ProductCard({ product, index }: { product: any; index: number }) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const discount = product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      quantity: 1,
    });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist({ id: product._id, name: product.name, price: product.price, image: product.image });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group"
    >
      <div className="relative bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {product.tag && (
            <div className="absolute top-3 left-3">
              <span className="inline-block bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                {product.tag}
              </span>
            </div>
          )}

          {discount > 0 && (
            <div className="absolute top-3 right-3">
              <span className="inline-block bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded">
                -{discount}%
              </span>
            </div>
          )}

          {/* Quick Actions */}
          <div className="absolute bottom-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            <Button
              size="icon"
              variant={isInWishlist(product._id) ? "default" : "secondary"}
              className="rounded-full shadow-lg"
              onClick={handleWishlist}
            >
              <Heart className={`w-4 h-4 ${isInWishlist(product._id) ? "fill-current" : ""}`} />
            </Button>
            <Button
              size="icon"
              className="rounded-full shadow-lg"
              onClick={handleAddToCart}
            >
              <ShoppingBag className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-1 mb-2">
            <Star className="w-4 h-4 fill-accent text-accent" />
            <span className="text-sm font-medium">{product.rating || 4.5}</span>
            <span className="text-sm text-muted-foreground">({product.reviews || 0})</span>
          </div>
          <h3 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-lg font-bold text-primary">₹{product.price?.toLocaleString()}</span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-muted-foreground line-through">
                ₹{product.originalPrice?.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function FeaturedProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fashion-ai-backend-2g7w.onrender.com/api/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data.slice(0, 8));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="py-16 lg:py-24 bg-secondary">
      <div className="container mx-auto px-4 lg:px-8">
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
            <Link href="/collections">View All Products</Link>
          </Button>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-[#8B4513] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            No products yet. Admin can add products from dashboard.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {products.map((product, index) => (
              <ProductCard key={product._id} product={product} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}