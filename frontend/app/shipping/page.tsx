"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { Truck, Clock, MapPin, Package } from "lucide-react";

export default function ShippingPage() {
  const shippingInfo = [
    { icon: Truck, title: "Free Shipping", description: "On orders above ₹999" },
    { icon: Clock, title: "Fast Delivery", description: "5-7 business days (standard)" },
    { icon: MapPin, title: "Pan India", description: "We deliver across India" },
    { icon: Package, title: "Secure Packaging", description: "Your items arrive safely" },
  ];

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
              className="text-center"
            >
              <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4">Shipping Information</h1>
              <p className="text-muted-foreground">Learn about our fast and reliable delivery</p>
            </motion.div>
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {shippingInfo.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="p-6 border rounded-lg hover:shadow-lg transition-shadow"
                >
                  <item.icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-serif font-bold mb-4">Shipping Rates</h2>
                <div className="bg-muted p-6 rounded-lg space-y-3">
                  <div className="flex justify-between">
                    <span>Standard Shipping (5-7 days)</span>
                    <span className="font-semibold">Free above ₹999</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Express Shipping (2-3 days)</span>
                    <span className="font-semibold">₹149</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Overnight Shipping</span>
                    <span className="font-semibold">₹299</span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-serif font-bold mb-4">Delivery Areas</h2>
                <p className="text-muted-foreground mb-4">
                  We currently ship to all major cities across India including:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad", "Jaipur"].map((city) => (
                    <div key={city} className="px-4 py-2 bg-muted rounded">
                      {city}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
