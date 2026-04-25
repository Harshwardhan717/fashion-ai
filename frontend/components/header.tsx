"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, Search, ShoppingBag, User, Heart, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/products" },
  { name: "Collections", href: "/collections" },
  { name: "New Arrivals", href: "/new-arrivals" },
  { name: "About", href: "/about" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { cartCount } = useCart();
  const router = useRouter();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    const userData = localStorage.getItem("user");
    if (loggedIn === "true" && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    setIsDropdownOpen(false);
    setIsMenuOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/collections?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      {/* Announcement */}
      <div className="bg-primary text-primary-foreground text-center py-2 text-sm tracking-wide">
        Free Shipping on Orders Above ₹999 | Use Code: RADHIKA10 for 10% Off
      </div>

      {/* Search Bar Dropdown */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-background border-b border-border px-4 py-3"
          >
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex gap-2">
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search sarees, lehengas, kurtis..."
                className="flex-1 px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none text-sm bg-background"
              />
              <Button type="submit" size="sm">Search</Button>
              <Button type="button" variant="ghost" size="sm" onClick={() => setSearchOpen(false)}>
                <X className="w-4 h-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <h1 className="text-2xl lg:text-3xl font-serif font-bold tracking-tight text-foreground">
              Radhika<span className="text-primary">Shoppy</span>
            </h1>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors tracking-wide uppercase"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-2 lg:gap-4">
            {/* Search */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden lg:flex"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search className="w-5 h-5" />
            </Button>

            {/* User */}
            <div className="relative hidden lg:block">
              {isLoggedIn && user ? (
                <div>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition-colors"
                  >
                    <User className="w-5 h-5" />
                    <span className="text-sm font-medium truncate max-w-[100px]">
                      {user.name?.split(" ")[0]}
                    </span>
                  </button>
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg z-50"
                      >
                        <div className="p-4 border-b border-border">
                          <p className="text-sm font-semibold">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                        <div className="p-2 space-y-1">
                          <Link href="/profile" className="block px-4 py-2 text-sm hover:bg-muted rounded transition-colors" onClick={() => setIsDropdownOpen(false)}>My Profile</Link>
                          <Link href="/orders" className="block px-4 py-2 text-sm hover:bg-muted rounded transition-colors" onClick={() => setIsDropdownOpen(false)}>My Orders</Link>
                          <Link href="/wishlist" className="block px-4 py-2 text-sm hover:bg-muted rounded transition-colors" onClick={() => setIsDropdownOpen(false)}>My Wishlist</Link>
                          <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm hover:bg-muted rounded transition-colors text-red-600 flex items-center gap-2">
                            <LogOut className="w-4 h-4" /> Logout
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Link href="/login"><Button variant="outline" size="sm">Sign In</Button></Link>
                  <Link href="/signup"><Button size="sm">Sign Up</Button></Link>
                </div>
              )}
            </div>

            {/* Wishlist — fixed */}
            <Link href="/wishlist">
              <Button variant="ghost" size="icon">
                <Heart className="w-5 h-5" />
              </Button>
            </Link>

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-border"
            >
              <div className="py-4 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block py-3 px-4 text-foreground/80 hover:text-primary hover:bg-muted rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}

                <div className="pt-4 border-t border-border px-4 space-y-2">
                  {isLoggedIn && user ? (
                    <>
                      <div className="py-2 px-2 bg-muted rounded">
                        <p className="text-sm font-semibold">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                      <Link href="/profile" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="outline" className="w-full justify-start"><User className="w-4 h-4 mr-2" />My Profile</Button>
                      </Link>
                      <Link href="/orders" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="outline" className="w-full justify-start"><ShoppingBag className="w-4 h-4 mr-2" />My Orders</Button>
                      </Link>
                      <Link href="/wishlist" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="outline" className="w-full justify-start"><Heart className="w-4 h-4 mr-2" />My Wishlist</Button>
                      </Link>
                      <button onClick={handleLogout} className="w-full flex items-center justify-start px-4 py-2 text-sm hover:bg-muted rounded transition-colors text-red-600">
                        <LogOut className="w-4 h-4 mr-2" />Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link href="/login" className="block" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="outline" size="sm" className="w-full"><User className="w-4 h-4 mr-2" />Sign In</Button>
                      </Link>
                      <Link href="/signup" className="block" onClick={() => setIsMenuOpen(false)}>
                        <Button size="sm" className="w-full">Sign Up</Button>
                      </Link>
                    </>
                  )}
                </div>

                <div className="pt-4 border-t border-border flex gap-4 px-4">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => { setIsMenuOpen(false); setSearchOpen(true); }}>
                    <Search className="w-4 h-4 mr-2" />Search
                  </Button>
                  <Link href="/wishlist" className="flex-1" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full">
                      <Heart className="w-4 h-4 mr-2" />Wishlist
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}