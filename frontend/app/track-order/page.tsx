"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Search, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId.trim()) {
      setSearched(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-muted py-12 lg:py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-2xl mx-auto"
            >
              <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4">Track Your Order</h1>
              <p className="text-muted-foreground">Enter your order number to track your shipment</p>
            </motion.div>
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 lg:px-8 max-w-2xl">
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              onSubmit={handleSearch}
              className="space-y-4"
            >
              <div className="flex gap-2">
                <Input
                  placeholder="Enter Order ID (e.g., ORD-1234567890)"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                />
                <Button type="submit">
                  <Search className="w-4 h-4 mr-2" />
                  Track
                </Button>
              </div>
            </motion.form>

            {searched && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-8"
              >
                <Alert className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    You're logged in. Your orders will be automatically available on your Profile page under "My Orders" section for easy tracking.
                  </AlertDescription>
                </Alert>

                <div className="bg-muted p-8 rounded-lg text-center">
                  <p className="text-muted-foreground mb-4">
                    To view and track all your orders, please visit your profile page.
                  </p>
                  <a href="/profile">
                    <Button>Go to My Profile</Button>
                  </a>
                </div>
              </motion.div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
