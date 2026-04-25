"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { CheckCircle, Users, Truck, Award, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const values = [
  {
    icon: Award,
    title: "Quality",
    description: "Premium materials and craftsmanship in every piece"
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Quick and reliable shipping across India"
  },
  {
    icon: Users,
    title: "Customer Care",
    description: "24/7 support for all your queries"
  },
  {
    icon: Heart,
    title: "Handcrafted",
    description: "Supporting local artisans and communities"
  }
];

const team = [
  {
    name: "Radhika",
    role: "Founder & Designer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80"
  },
  {
    name: "Priya",
    role: "Operations Manager",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80"
  },
  {
    name: "Anjali",
    role: "Customer Success",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80"
  },
  {
    name: "Divya",
    role: "Creative Lead",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80"
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-12 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4">
                About Radhika Shoppy
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Celebrating the timeless elegance of Indian ethnic wear with modern flair
              </p>
            </motion.div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-6">
                  Our Story
                </h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Radhika Shoppy was born out of a passion for preserving the rich heritage of Indian ethnic wear while embracing contemporary fashion. Founded in 2020, we believe that every piece tells a story of tradition, craftsmanship, and cultural pride.
                </p>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  We partner with local artisans and weavers across India to bring you authentic, beautifully crafted garments. From hand-embroidered sarees to intricately designed lehengas, each product is a testament to the skill and dedication of our craftspeople.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our mission is simple: to make premium ethnic wear accessible to everyone while celebrating the artisans who create them.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80"
                  alt="Our Story"
                  className="rounded-lg shadow-lg"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-muted py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4">
                Our Values
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                These principles guide everything we do
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-background p-6 rounded-lg"
                >
                  <value.icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="font-serif font-bold text-lg mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4">
                Our Team
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Passionate individuals dedicated to bringing you the best
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="mb-4 overflow-hidden rounded-lg">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <h3 className="font-serif font-bold text-lg">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-primary text-primary-foreground py-12 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {[
                { number: "50K+", label: "Happy Customers" },
                { number: "500+", label: "Products" },
                { number: "100+", label: "Artisans" },
                { number: "2000+", label: "5-Star Reviews" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <h3 className="text-3xl lg:text-4xl font-bold mb-2">{stat.number}</h3>
                  <p className="text-sm opacity-90">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-muted">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-4">
                Join Our Community
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                Discover the perfect ethnic wear for your special moments
              </p>
              <Button size="lg">
                Shop Now
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
