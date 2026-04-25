"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";

export default function TermsPage() {
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
              <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4">Terms of Service</h1>
              <p className="text-muted-foreground">Please read these terms carefully</p>
            </motion.div>
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="space-y-8 text-muted-foreground"
            >
              <div>
                <h2 className="text-2xl font-serif font-bold mb-4 text-foreground">1. Agreement to Terms</h2>
                <p>
                  By accessing and using RadhikaShoppy, you accept and agree to be bound by the terms and provision of this agreement.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-serif font-bold mb-4 text-foreground">2. Use License</h2>
                <p>
                  Permission is granted to temporarily download one copy of the materials (information or software) on RadhikaShoppy's website for personal, non-commercial transitory viewing only.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-serif font-bold mb-4 text-foreground">3. Product Availability</h2>
                <p>
                  While we maintain current information on our website, prices and availability are subject to change without notice. We reserve the right to limit quantities.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-serif font-bold mb-4 text-foreground">4. Limitation of Liability</h2>
                <p>
                  RadhikaShoppy shall not be liable for any damages resulting from use or inability to use the materials on its Internet web site.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-serif font-bold mb-4 text-foreground">5. Modifications</h2>
                <p>
                  RadhikaShoppy may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
                </p>
              </div>

              <div className="bg-muted p-6 rounded-lg">
                <p className="text-sm">
                  Last updated: April 2026. For questions about these terms, contact support@radhikashoppy.com.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
