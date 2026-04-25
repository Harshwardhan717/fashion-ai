"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";

export default function ReturnsPage() {
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
              <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4">Returns & Exchange</h1>
              <p className="text-muted-foreground">Easy returns and exchange policy for your peace of mind</p>
            </motion.div>
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl space-y-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-serif font-bold mb-4">Return Policy</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong>Duration:</strong> Items can be returned within 7 days of purchase.
                  </p>
                  <p>
                    <strong>Condition:</strong> Products must be unworn, unused, and in original condition with all tags attached.
                  </p>
                  <p>
                    <strong>Process:</strong> Contact our support team with your order number to initiate a return.
                  </p>
                  <p>
                    <strong>Refund:</strong> Refunds will be processed within 5-7 business days after we receive and inspect your return.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-serif font-bold mb-4">Exchange Policy</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <strong>Duration:</strong> Exchanges are available within 14 days of purchase for size or color changes.
                  </p>
                  <p>
                    <strong>Process:</strong> Notify us of the size/color you'd like within 7 days. We'll arrange pickup.
                  </p>
                  <p>
                    <strong>Shipping:</strong> Free exchange shipping is provided for size/color swaps.
                  </p>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-3">Non-Returnable Items</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Customized or personalized items</li>
                  <li>• Items purchased during final sale</li>
                  <li>• Items with visible signs of wear</li>
                  <li>• Items without original tags</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-serif font-bold mb-4">How to Return</h2>
                <ol className="space-y-3 text-muted-foreground">
                  <li><strong>1.</strong> Contact support@radhikashoppy.com with order details</li>
                  <li><strong>2.</strong> We'll provide a prepaid return label</li>
                  <li><strong>3.</strong> Pack the item securely in original packaging</li>
                  <li><strong>4.</strong> Drop off at your nearest courier center</li>
                  <li><strong>5.</strong> Receive your refund upon inspection</li>
                </ol>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
