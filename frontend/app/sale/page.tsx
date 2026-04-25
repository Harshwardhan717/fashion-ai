"use client";

import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function SalePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-5xl lg:text-6xl font-serif font-bold mb-4">MEGA SALE</h1>
              <p className="text-xl mb-6 opacity-90">Up to 60% OFF on Selected Items</p>
              <Link href="/collections">
                <Button size="lg" variant="secondary">
                  Shop Sale Now
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Sarees", discount: "Up to 40% OFF" },
                { title: "Lehengas", discount: "Up to 50% OFF" },
                { title: "Suits & Kurtis", discount: "Up to 45% OFF" },
              ].map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center p-8 border rounded-lg hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-2xl font-serif font-bold mb-2">{category.title}</h3>
                  <p className="text-primary font-semibold text-lg mb-4">{category.discount}</p>
                  <Link href="/collections">
                    <Button variant="outline">Browse</Button>
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-12 bg-muted p-8 rounded-lg text-center"
            >
              <p className="text-muted-foreground">
                Limited time offer! Sale ends soon. Use code <span className="font-semibold text-primary">SALE60</span> for additional discounts.
              </p>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
