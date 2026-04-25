"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Star, Filter, ChevronDown, X, Grid3X3, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

const categories = [
  { id: "all", name: "All Products" },
  { id: "saree", name: "Sarees" },
  { id: "lehenga", name: "Lehengas" },
  { id: "kurti", name: "Suits & Kurtis" },
  { id: "jewelry", name: "Jewelry" },
];

const sortOptions = [
  { id: "featured", name: "Featured" },
  { id: "price-low", name: "Price: Low to High" },
  { id: "price-high", name: "Price: High to Low" },
  { id: "rating", name: "Highest Rated" },
];

function ProductCard({ product, index, gridSize }: { product: any; index: number; gridSize: string }) {
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
      animate={{ opacity: 1, y: 0 }}
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

          <div className="absolute bottom-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            <Button
              size="icon"
              variant={isInWishlist(product._id) ? "default" : "secondary"}
              className="rounded-full shadow-lg"
              onClick={handleWishlist}
            >
              <Heart className={`w-4 h-4 ${isInWishlist(product._id) ? "fill-current" : ""}`} />
            </Button>
            <Button size="icon" className="rounded-full shadow-lg" onClick={handleAddToCart}>
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

export default function ProductsPage() {
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [gridSize, setGridSize] = useState<"small" | "large">("large");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  useEffect(() => {
    fetch("https://fashion-ai-backend-2g7w.onrender.com/api/products")
      .then(res => res.json())
      .then(data => { setAllProducts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filteredProducts = allProducts.filter((product) => {
    if (selectedCategory !== "all" && product.category !== selectedCategory) return false;
    if (priceRange.min && product.price < parseInt(priceRange.min)) return false;
    if (priceRange.max && product.price > parseInt(priceRange.max)) return false;
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low": return a.price - b.price;
      case "price-high": return b.price - a.price;
      case "rating": return (b.rating || 0) - (a.rating || 0);
      default: return 0;
    }
  });

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="bg-secondary py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-serif font-bold mb-4">Our Collection</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our curated selection of premium Indian ethnic wear,
              handcrafted with love for every special occasion.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 lg:px-8 py-8">
        {/* Filters Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-primary/10"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
              <Filter className="w-4 h-4 mr-2" /> Filters
            </Button>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-card border border-border rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>{option.name}</option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" />
            </div>

            <div className="hidden lg:flex items-center border border-border rounded-lg overflow-hidden">
              <button onClick={() => setGridSize("large")} className={`p-2 ${gridSize === "large" ? "bg-primary text-primary-foreground" : "bg-card"}`}>
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button onClick={() => setGridSize("small")} className={`p-2 ${gridSize === "small" ? "bg-primary text-primary-foreground" : "bg-card"}`}>
                <Grid3X3 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="lg:hidden bg-card rounded-xl p-6 mb-8 border border-border"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif font-bold">Filters</h3>
              <button onClick={() => setShowFilters(false)}><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Price Range</label>
                <div className="flex gap-2">
                  <Input type="number" placeholder="Min" value={priceRange.min} onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })} className="flex-1" />
                  <Input type="number" placeholder="Max" value={priceRange.max} onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })} className="flex-1" />
                </div>
              </div>
              <Button onClick={() => setPriceRange({ min: "", max: "" })} variant="outline" className="w-full">Clear Filters</Button>
            </div>
          </motion.div>
        )}

        <p className="text-sm text-muted-foreground mb-6">Showing {sortedProducts.length} products</p>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-[#8B4513] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : sortedProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">No products found.</p>
            <Button onClick={() => { setSelectedCategory("all"); setPriceRange({ min: "", max: "" }); }}>
              Clear All Filters
            </Button>
          </div>
        ) : (
          <div className={`grid gap-4 lg:gap-6 ${
            gridSize === "large"
              ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              : "grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
          }`}>
            {sortedProducts.map((product, index) => (
              <ProductCard key={product._id} product={product} index={index} gridSize={gridSize} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}