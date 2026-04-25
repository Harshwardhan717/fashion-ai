"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export default function NewArrivalsPage() {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(8);
  const [sortBy, setSortBy] = useState("newest");
  const [cartNotification, setCartNotification] = useState("");

  useEffect(() => {
    fetch("https://fashion-ai-backend-2g7w.onrender.com/api/products")
      .then(res => res.json())
      .then(data => { setProducts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      quantity: 1,
    });
    setCartNotification(`${product.name} added to cart!`);
    setTimeout(() => setCartNotification(""), 3000);
  };

  const handleAddToWishlist = (product: any) => {
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
      setCartNotification(`${product.name} removed from wishlist`);
    } else {
      addToWishlist({ id: product._id, name: product.name, price: product.price, image: product.image });
      setCartNotification(`${product.name} added to wishlist!`);
    }
    setTimeout(() => setCartNotification(""), 3000);
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
    return 0;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Toast */}
        {cartNotification && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg font-medium">
            ✓ {cartNotification}
          </div>
        )}

        {/* Page Header */}
        <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-8 lg:py-12">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
                <span className="text-sm font-medium tracking-widest text-primary uppercase">Fresh Drops</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4">New Arrivals</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover our latest collection of premium ethnic wear
              </p>
            </motion.div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <p className="text-sm text-muted-foreground mb-4 sm:mb-0">
                Showing {Math.min(displayCount, sortedProducts.length)} of {sortedProducts.length} items
              </p>
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium">Sort By:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border rounded-md text-sm"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center py-20">
                <div className="w-10 h-10 border-4 border-[#8B4513] border-t-transparent rounded-full animate-spin" />
              </div>
            ) : sortedProducts.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                No products yet. Check back soon!
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {sortedProducts.slice(0, displayCount).map((product, index) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <div className="group cursor-pointer h-full">
                      <div className="relative aspect-[3/4] overflow-hidden rounded-lg mb-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {product.tag && (
                          <div className="absolute top-4 left-4">
                            <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                              {product.tag}
                            </div>
                          </div>
                        )}
                        {product.originalPrice > product.price && (
                          <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto">
                          <Button type="button" className="w-[90%]" onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}>
                            <ShoppingBag className="w-4 h-4 mr-2" /> Add to Cart
                          </Button>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating || 4.5) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">({product.reviews || 0})</span>
                        </div>
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-lg font-bold">₹{product.price}</span>
                          {product.originalPrice > product.price && (
                            <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice}</span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button type="button" className="flex-1" size="sm" onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}>
                            <ShoppingBag className="w-4 h-4 mr-1" /> Add
                          </Button>
                          <Button
                            type="button"
                            variant={isInWishlist(product._id) ? "default" : "outline"}
                            size="sm"
                            className="flex-1"
                            onClick={(e) => { e.stopPropagation(); handleAddToWishlist(product); }}
                          >
                            <Heart className={`w-4 h-4 ${isInWishlist(product._id) ? "fill-current" : ""}`} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {displayCount < sortedProducts.length && (
              <div className="flex justify-center mt-12">
                <Button variant="outline" size="lg" onClick={() => setDisplayCount(displayCount + 4)}>
                  Load More Products
                </Button>
              </div>
            )}

            {displayCount >= sortedProducts.length && sortedProducts.length > 0 && (
              <div className="text-center mt-12">
                <p className="text-muted-foreground">All products loaded.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}