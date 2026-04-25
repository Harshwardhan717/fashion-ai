"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

const newArrivals = [
  {
    id: 1,
    name: "Modern Banarasi Fusion Saree",
    price: 5499,
    originalPrice: 8999,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&q=80",
    rating: 5,
    reviews: 34,
    tag: "Just Arrived",
    arrivalDate: "2024-04-15",
  },
  {
    id: 2,
    name: "Velvet Embroidered Lehenga",
    price: 14999,
    originalPrice: 21999,
    image: "https://images.unsplash.com/photo-1594463750939-ebb28c3f7f75?w=500&q=80",
    rating: 5,
    reviews: 18,
    tag: "Hot New Item",
    arrivalDate: "2024-04-14",
  },
  {
    id: 3,
    name: "Contemporary Anarkali",
    price: 4299,
    originalPrice: 6999,
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500&q=80",
    rating: 4.8,
    reviews: 42,
    tag: "Fresh Drop",
    arrivalDate: "2024-04-13",
  },
  {
    id: 4,
    name: "Silk Blend Evening Gown",
    price: 7999,
    originalPrice: 11999,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80",
    rating: 4.9,
    reviews: 28,
    tag: "New In",
    arrivalDate: "2024-04-12",
  },
  {
    id: 5,
    name: "Gold Zari Saree",
    price: 6999,
    originalPrice: 10999,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&q=80",
    rating: 4.9,
    reviews: 56,
    tag: "Limited Stock",
    arrivalDate: "2024-04-11",
  },
  {
    id: 6,
    name: "Pearl Work Lehenga",
    price: 13499,
    originalPrice: 19999,
    image: "https://images.unsplash.com/photo-1594463750939-ebb28c3f7f75?w=500&q=80",
    rating: 5,
    reviews: 31,
    tag: "Exclusive",
    arrivalDate: "2024-04-10",
  },
  {
    id: 7,
    name: "Designer Straight Suit",
    price: 3999,
    originalPrice: 6499,
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500&q=80",
    rating: 4.7,
    reviews: 67,
    tag: "New Arrival",
    arrivalDate: "2024-04-09",
  },
  {
    id: 8,
    name: "Chiffon Saree",
    price: 3299,
    originalPrice: 5499,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&q=80",
    rating: 4.8,
    reviews: 73,
    tag: "Must Have",
    arrivalDate: "2024-04-08",
  },
  {
    id: 9,
    name: "Bridal Lehenga Set",
    price: 24999,
    originalPrice: 35999,
    image: "https://images.unsplash.com/photo-1594463750939-ebb28c3f7f75?w=500&q=80",
    rating: 5,
    reviews: 15,
    tag: "Premium",
    arrivalDate: "2024-04-07",
  },
  {
    id: 10,
    name: "Party Wear Suit",
    price: 4999,
    originalPrice: 7999,
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500&q=80",
    rating: 4.9,
    reviews: 52,
    tag: "Trending",
    arrivalDate: "2024-04-06",
  },
  {
    id: 11,
    name: "Festive Gown",
    price: 8999,
    originalPrice: 13999,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80",
    rating: 4.8,
    reviews: 41,
    tag: "Popular",
    arrivalDate: "2024-04-05",
  },
  {
    id: 12,
    name: "Traditional Silk Saree",
    price: 5999,
    originalPrice: 9499,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&q=80",
    rating: 4.9,
    reviews: 88,
    tag: "Best Seller",
    arrivalDate: "2024-04-04",
  },
];

export default function NewArrivalsPage() {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [displayCount, setDisplayCount] = useState(8);
  const [sortBy, setSortBy] = useState("newest");
  const [cartNotification, setCartNotification] = useState("");

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      quantity: 1
    });
    setCartNotification(`${product.name} added to cart!`);
    setTimeout(() => setCartNotification(""), 3000);
  };

  const handleAddToWishlist = (product: any) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      setCartNotification(`${product.name} removed from wishlist`);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image
      });
      setCartNotification(`${product.name} added to wishlist!`);
    }
    setTimeout(() => setCartNotification(""), 3000);
  };

  const sortedProducts = [...newArrivals].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.arrivalDate).getTime() - new Date(a.arrivalDate).getTime();
    } else if (sortBy === "price-low") {
      return a.price - b.price;
    } else if (sortBy === "price-high") {
      return b.price - a.price;
    } else if (sortBy === "rating") {
      return b.rating - a.rating;
    }
    return 0;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
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
                <span className="text-sm font-medium tracking-widest text-primary uppercase">
                  Fresh Drops
                </span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4">
                New Arrivals
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover our latest collection of premium ethnic wear
              </p>
            </motion.div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 lg:px-8">
            {/* Sort Options */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <div className="mb-4 sm:mb-0">
                <p className="text-sm text-muted-foreground">
                  Showing {displayCount} of {newArrivals.length} items
                </p>
              </div>
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

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {sortedProducts.slice(0, displayCount).map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <div className="group cursor-pointer h-full">
                    {/* Product Image */}
                    <div className="relative aspect-[3/4] overflow-hidden rounded-lg mb-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {product.tag && (
                          <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                            {product.tag}
                          </div>
                        )}
                      </div>
                      <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                        -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                      </div>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto">
                        <Button 
                          type="button"
                          className="w-[90%]"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(product);
                          }}
                        >
                          <ShoppingBag className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div>
                      <h3 className="font-semibold mb-2 line-clamp-2 h-14">
                        {product.name}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(product.rating)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          ({product.reviews})
                        </span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-lg font-bold">₹{product.price}</span>
                        <span className="text-sm text-muted-foreground line-through">
                          ₹{product.originalPrice}
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Button 
                          type="button"
                          className="flex-1" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(product);
                          }}
                        >
                          <ShoppingBag className="w-4 h-4 mr-1" />
                          Add
                        </Button>
                        <Button 
                          type="button" 
                          variant={isInWishlist(product.id) ? "default" : "outline"}
                          size="sm" 
                          className="flex-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToWishlist(product);
                          }}
                        >
                          <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Load More Button */}
            {displayCount < sortedProducts.length && (
              <div className="flex justify-center mt-12">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setDisplayCount(displayCount + 4)}
                >
                  Load More Products
                </Button>
              </div>
            )}

            {/* No More Products Message */}
            {displayCount >= sortedProducts.length && sortedProducts.length > 0 && (
              <div className="text-center mt-12">
                <p className="text-muted-foreground">
                  All products loaded. No more items to display.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
