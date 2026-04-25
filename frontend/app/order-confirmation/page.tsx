"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle, Package, Truck, Clock, Loader, AlertCircle } from "lucide-react";

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface ShippingAddress {
  firstName: string;
  lastName?: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
}

interface Order {
  _id: string;
  orderNumber: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: "cod" | "card";
  paymentStatus: "pending" | "paid" | "failed";
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
}

function OrderConfirmationLoadingState() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="py-12 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
            <div className="text-center py-20">
              <Loader className="w-10 h-10 mx-auto animate-spin mb-4 text-primary" />
              <h1 className="text-2xl font-serif font-bold mb-2">Loading your order</h1>
              <p className="text-muted-foreground">Fetching your latest order details...</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const queryOrderId = searchParams.get("orderId");
        const storedOrderId = localStorage.getItem("lastOrderId");
        const orderId = queryOrderId || storedOrderId;

        if (!orderId) {
          setError("No recent order was found. Please place an order first.");
          setLoading(false);
          return;
        }

        localStorage.setItem("lastOrderId", orderId);

        const response = await fetch(
          `https://fashion-ai-backend-2g7w.onrender.com/api/orders/${encodeURIComponent(orderId)}`
        );
        const data = await response.json();

        if (!response.ok || !data.success || !data.order) {
          throw new Error(data.message || "Unable to load order details");
        }

        setOrder(data.order);
      } catch (err) {
        console.error(err);
        setError("Unable to load your order confirmation right now.");
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [searchParams]);

  const orderDate = order ? new Date(order.createdAt) : new Date();
  const estimatedDelivery = new Date(orderDate);
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

  const paymentText =
    order?.paymentMethod === "card"
      ? "Paid online"
      : order?.paymentStatus === "pending"
        ? "Cash on delivery"
        : "Payment pending";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="py-12 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              {loading ? (
                <div className="text-center py-20">
                  <Loader className="w-10 h-10 mx-auto animate-spin mb-4 text-primary" />
                  <h1 className="text-2xl font-serif font-bold mb-2">Loading your order</h1>
                  <p className="text-muted-foreground">Fetching your latest order details...</p>
                </div>
              ) : error || !order ? (
                <div className="text-center py-20">
                  <AlertCircle className="w-16 h-16 mx-auto mb-6 text-destructive" />
                  <h1 className="text-3xl font-serif font-bold mb-4">Order not available</h1>
                  <p className="text-muted-foreground mb-8">
                    {error || "Unable to find the order."}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/checkout">
                      <Button size="lg">Back to Checkout</Button>
                    </Link>
                    <Link href="/orders">
                      <Button variant="outline" size="lg">
                        View Orders
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="mb-8 flex justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <CheckCircle className="w-20 h-20 text-green-600" />
                    </motion.div>
                  </div>

                  <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4">
                    Order Confirmed!
                  </h1>
                  <p className="text-lg text-muted-foreground mb-8">
                    Your order has been placed successfully and saved in your account.
                  </p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="bg-muted p-8 rounded-lg mb-8 text-left"
                  >
                    <div className="grid md:grid-cols-2 gap-8 mb-8 border-b pb-8 text-center md:text-left">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Order Number</p>
                        <p className="text-2xl font-bold">{order.orderNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Order Date</p>
                        <p className="text-2xl font-bold">
                          {orderDate.toLocaleDateString("en-IN")}
                        </p>
                      </div>
                    </div>

                    <div className="text-center mb-8 pb-8 border-b">
                      <p className="text-sm text-muted-foreground mb-2">Estimated Delivery</p>
                      <p className="text-3xl font-bold text-primary">
                        {estimatedDelivery.toLocaleDateString("en-IN")}
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-8 pb-8 border-b">
                      <div>
                        <h3 className="font-serif font-bold text-lg mb-4">Shipping Address</h3>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <p className="font-medium text-foreground">
                            {order.shippingAddress.firstName}{" "}
                            {order.shippingAddress.lastName || ""}
                          </p>
                          <p>{order.shippingAddress.address}</p>
                          <p>
                            {order.shippingAddress.city} - {order.shippingAddress.pincode}
                          </p>
                          <p>{order.shippingAddress.phone}</p>
                          <p>{order.shippingAddress.email}</p>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-serif font-bold text-lg mb-4">Payment Details</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between gap-4">
                            <span className="text-muted-foreground">Method</span>
                            <span className="font-medium uppercase">{order.paymentMethod}</span>
                          </div>
                          <div className="flex justify-between gap-4">
                            <span className="text-muted-foreground">Status</span>
                            <span className="font-medium capitalize">{order.paymentStatus}</span>
                          </div>
                          <div className="flex justify-between gap-4">
                            <span className="text-muted-foreground">Summary</span>
                            <span className="font-medium">{paymentText}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-8 pb-8 border-b">
                      <h3 className="font-serif font-bold text-lg mb-4">Items Ordered</h3>
                      <div className="space-y-3">
                        {order.items.map((item, index) => (
                          <div
                            key={`${item.id}-${index}`}
                            className="flex items-center justify-between gap-4 text-sm"
                          >
                            <div>
                              <p className="font-medium text-foreground">{item.name}</p>
                              <p className="text-muted-foreground">
                                Qty: {item.quantity} × ₹
                                {Number(item.price || 0).toLocaleString("en-IN")}
                              </p>
                            </div>
                            <p className="font-semibold">
                              ₹
                              {Number(
                                (item.price || 0) * (item.quantity || 0)
                              ).toLocaleString("en-IN")}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>₹{Number(order.subtotal || 0).toLocaleString("en-IN")}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Shipping</span>
                        <span>
                          {Number(order.shipping || 0) === 0
                            ? "FREE"
                            : `₹${Number(order.shipping || 0).toLocaleString("en-IN")}`}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tax</span>
                        <span>₹{Number(order.tax || 0).toLocaleString("en-IN")}</span>
                      </div>
                      <div className="flex justify-between pt-4 border-t text-base font-bold">
                        <span>Total</span>
                        <span>₹{Number(order.total || 0).toLocaleString("en-IN")}</span>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-background p-6 rounded-lg mb-8 border text-left"
                  >
                    <h3 className="font-serif font-bold text-lg mb-4">What Next?</h3>
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Your order has been stored successfully in the backend.</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>You can track this purchase from the orders page using your account.</span>
                      </li>
                      <li className="flex gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>Estimated delivery is usually within 5 days from the order date.</span>
                      </li>
                    </ul>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                    className="space-y-4 mb-8"
                  >
                    <div className="flex items-center gap-4 text-left">
                      <div className="flex-shrink-0 w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white">
                        <CheckCircle className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-semibold">Order Confirmed</p>
                        <p className="text-sm text-muted-foreground">
                          Your order was created successfully
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-left">
                      <div className="flex-shrink-0 w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600">
                        <Package className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-semibold">Processing</p>
                        <p className="text-sm text-muted-foreground">
                          The store will prepare your items next
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-left">
                      <div className="flex-shrink-0 w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600">
                        <Truck className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-semibold">Shipped</p>
                        <p className="text-sm text-muted-foreground">
                          Your package will be dispatched after processing
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-left">
                      <div className="flex-shrink-0 w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600">
                        <Clock className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-semibold">Delivered</p>
                        <p className="text-sm text-muted-foreground">
                          Delivery is expected by {estimatedDelivery.toLocaleDateString("en-IN")}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                  >
                    <Link href="/orders">
                      <Button size="lg">View My Orders</Button>
                    </Link>
                    <Link href="/collections">
                      <Button variant="outline" size="lg">
                        Continue Shopping
                      </Button>
                    </Link>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.35 }}
                    className="mt-12 pt-8 border-t"
                  >
                    <p className="text-sm text-muted-foreground">
                      Need help? Contact our customer support at{" "}
                      <a
                        href="mailto:support@radhikashoppy.com"
                        className="text-primary font-semibold"
                      >
                        support@radhikashoppy.com
                      </a>{" "}
                      or call{" "}
                      <a href="tel:+919876543210" className="text-primary font-semibold">
                        +91 98765 43210
                      </a>
                    </p>
                  </motion.div>
                </div>
              )}
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<OrderConfirmationLoadingState />}>
      <OrderConfirmationContent />
    </Suspense>
  );
}
