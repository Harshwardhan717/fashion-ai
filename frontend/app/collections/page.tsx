"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, Star, Filter, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export default function CollectionsPage() {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const [collections, setCollections] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCollection, setSelectedCollection] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [toastNotification, setToastNotification] = useState<{ text: string; productId?: string } | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch from MongoDB
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => {
        setCollections(data);
        setFilteredProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch failed:", err);
        setLoading(false);
      });
  }, []);

  const categories = ["all", "saree", "lehenga", "kurti", "jewelry"];
  const collectionTypes = ["all", ...Array.from(new Set(collections.map((p: any) => p.collection).filter(Boolean)))];

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      quantity: 1,
    });
    setToastNotification({ text: `✓ ${product.name} added to cart!`, productId: product._id });
    setTimeout(() => setToastNotification(null), 3000);
  };

  const handleAddToWishlist = (product: any) => {
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
      setToastNotification({ text: `${product.name} removed from wishlist` });
    } else {
      addToWishlist({ id: product._id, name: product.name, price: product.price, image: product.image });
      setToastNotification({ text: `${product.name} added to wishlist!` });
    }
    setTimeout(() => setToastNotification(null), 3000);
  };

  const handleFilter = () => {
    let products = [...collections];

    if (selectedCategory !== "all") {
      products = products.filter(p => p.category === selectedCategory);
    }
    if (selectedCollection !== "all") {
      products = products.filter(p => p.collection === selectedCollection);
    }
    if (searchTerm) {
      products = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (sortBy === "price-low") products.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-high") products.sort((a, b) => b.price - a.price);
    else if (sortBy === "rating") products.sort((a, b) => b.rating - a.rating);

    setFilteredProducts(products);
  };

  useEffect(() => {
    handleFilter();
  }, [selectedCategory, selectedCollection, searchTerm, sortBy, collections]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Toast */}
        <AnimatePresence>
          {toastNotification && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 font-medium"
            >
              <Check className="w-5 h-5" />
              {toastNotification.text}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Page Header */}
        <section className="bg-muted py-8 lg:py-12">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4">Collections</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore our curated collections of premium Indian ethnic wear
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filters + Products */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-8">

              {/* Sidebar */}
              <div className={`${showFilters ? "block" : "hidden"} lg:block lg:w-64 flex-shrink-0`}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="font-serif font-bold mb-3">Search</h3>
                    <Input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <h3 className="font-serif font-bold mb-3">Category</h3>
                    <div className="space-y-2">
                      {categories.map(cat => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`w-full text-left px-3 py-2 rounded capitalize transition-colors ${
                            selectedCategory === cat ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-serif font-bold mb-3">Collection</h3>
                    <div className="space-y-2">
                      {collectionTypes.map(col => (
                        <button
                          key={col}
                          onClick={() => setSelectedCollection(col)}
                          className={`w-full text-left px-3 py-2 rounded capitalize transition-colors text-sm ${
                            selectedCollection === col ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                          }`}
                        >
                          {col}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-serif font-bold mb-3">Sort By</h3>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md text-sm"
                    >
                      <option value="featured">Featured</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Top Rated</option>
                    </select>
                  </div>
                </motion.div>
              </div>

              {/* Products */}
              <div className="flex-1">
                <div className="lg:hidden mb-6">
                  <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="w-full">
                    <Filter className="w-4 h-4 mr-2" />
                    {showFilters ? "Hide Filters" : "Show Filters"}
                  </Button>
                </div>

                <div className="mb-6 text-sm text-muted-foreground">
                  Showing {filteredProducts.length} products
                </div>

                {loading ? (
                  <div className="flex justify-center py-20">
                    <div className="w-10 h-10 border-4 border-[#8B4513] border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product, index) => (
                      <motion.div
                        key={product._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                      >
                        <div className="group cursor-pointer">
                          <div className="relative aspect-[3/4] overflow-hidden rounded-lg mb-4">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            {product.tag && (
                              <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                                {product.tag}
                              </div>
                            )}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto">
                              <Button
                                type="button"
                                className="w-[90%]"
                                onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}
                              >
                                <ShoppingBag className="w-4 h-4 mr-2" />
                                Add to Cart
                              </Button>
                            </div>
                          </div>

                          <div>
                            <p className="text-xs text-muted-foreground mb-1">{product.collection}</p>
                            <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>

                            <div className="flex items-center gap-2 mb-3">
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < Math.floor(product.rating || 4.5)
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-muted-foreground">({product.reviews || 0})</span>
                            </div>

                            <div className="flex items-center gap-2 mb-4">
                              <span className="text-lg font-bold">₹{product.price}</span>
                              {product.originalPrice > product.price && (
                                <>
                                  <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice}</span>
                                  <span className="text-xs text-green-600 font-semibold">
                                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                                  </span>
                                </>
                              )}
                            </div>

                            <div className="flex gap-2">
                              <Button
                                type="button"
                                className="flex-1"
                                size="sm"
                                onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}
                              >
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
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">No products found matching your filters</p>
                    <Button
                      variant="outline"
                      onClick={() => { setSelectedCategory("all"); setSelectedCollection("all"); setSearchTerm(""); }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}