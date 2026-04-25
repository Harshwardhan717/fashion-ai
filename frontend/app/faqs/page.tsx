"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How long does delivery take?",
    answer: "We offer free shipping on orders above ₹999. Standard delivery takes 5-7 business days. Express delivery (2-3 days) is available for an additional charge."
  },
  {
    question: "What is your return policy?",
    answer: "We offer easy returns within 7 days of purchase. Items must be unworn and in original condition with tags intact."
  },
  {
    question: "How do I track my order?",
    answer: "You can track your order using the order number from your confirmation email on the Track Order page, or visit your profile to view all orders."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Currently, we ship within India only. We're expanding our services soon!"
  },
  {
    question: "Can I modify or cancel my order?",
    answer: "Yes, you can modify or cancel orders within 2 hours of placement. Please contact our support team immediately."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept Card payments and Cash on Delivery (COD). More payment options coming soon!"
  },
  {
    question: "How do I contact customer support?",
    answer: "You can reach us at support@radhikashoppy.com or call +91 98765 43210. We're available Monday-Friday, 10 AM - 6 PM."
  },
  {
    question: "Do you have a physical store?",
    answer: "Our headquarters are in Mumbai, Maharashtra. Contact us to schedule a visit!"
  }
];

export default function FAQsPage() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-muted py-12 lg:py-16">
          <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4">Frequently Asked Questions</h1>
              <p className="text-muted-foreground">Find answers to common questions about RadhikaShoppy</p>
            </motion.div>
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="border rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted transition-colors text-left"
                  >
                    <h3 className="font-semibold">{faq.question}</h3>
                    <ChevronDown
                      className={`w-5 h-5 text-primary transition-transform ${
                        expandedIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {expandedIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-6 py-4 bg-muted/50 border-t text-muted-foreground"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-12 text-center bg-muted p-8 rounded-lg"
            >
              <h2 className="text-2xl font-serif font-bold mb-4">Didn't find your answer?</h2>
              <p className="text-muted-foreground mb-6">
                Contact our support team - we're here to help!
              </p>
              <a href="/contact">
                <Button>Contact Support</Button>
              </a>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
