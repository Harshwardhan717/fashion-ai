"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";

export default function PrivacyPage() {
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
              <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4">Privacy Policy</h1>
              <p className="text-muted-foreground">Your privacy is important to us</p>
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
                <h2 className="text-2xl font-serif font-bold mb-4 text-foreground">1. Introduction</h2>
                <p>
                  RadhikaShoppy ("we," "us," or "our") operates the website. This page informs you of our policies regarding the collection, use, and disclosure of personal data.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-serif font-bold mb-4 text-foreground">2. Information Collection</h2>
                <p className="mb-3">We collect information you provide directly, including:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Name, email address, and phone number</li>
                  <li>Shipping and billing address</li>
                  <li>Payment information (processed securely)</li>
                  <li>Account preferences and browsing history</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-serif font-bold mb-4 text-foreground">3. Use of Information</h2>
                <p>We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2 mt-3">
                  <li>Process and fulfill your orders</li>
                  <li>Send order updates and customer support messages</li>
                  <li>Improve our services and website</li>
                  <li>Send marketing communications (with your consent)</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-serif font-bold mb-4 text-foreground">4. Data Security</h2>
                <p>
                  We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-serif font-bold mb-4 text-foreground">5. Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us at support@radhikashoppy.com.
                </p>
              </div>

              <div className="bg-muted p-6 rounded-lg">
                <p className="text-sm">
                  Last updated: April 2026. This policy may be updated periodically. Continued use of our website indicates your acceptance of any changes.
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
