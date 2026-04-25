"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { AlertCircle, Loader } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, clearCart, total, subtotal, tax, shipping } = useCart();
  const { user, isLoggedIn } = useAuth();

  // Safeguard against NaN values
  const safeSub = Number.isFinite(subtotal) ? Math.floor(subtotal) : 0;
  const safeTax = Number.isFinite(tax) ? Math.floor(tax) : 0;
  const safeShip = Number.isFinite(shipping) ? Math.floor(shipping) : 0;
  const safeTotal = Number.isFinite(total) ? Math.floor(total) : 0;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("cod"); // "cod" or "card"
  const [formData, setFormData] = useState({
    firstName: user?.name?.split(" ")[0] || "",
    lastName: user?.name?.split(" ")[1] || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    cardNumber: "",
    cardExpiry: "",
    cardCVC: "",
  });

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="mb-4">Please log in to continue checkout</p>
            <Link href="/login">
              <Button size="lg">Go to Login</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="mb-4">Your cart is empty</p>
            <Link href="/collections">
              <Button size="lg">Continue Shopping</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.firstName || !formData.email || !formData.phone || !formData.address) {
      setError("Please fill in all required fields");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email");
      return;
    }

    if (step === 1) {
      setStep(2);
      return;
    }

    // Step 2: Payment validation
    if (paymentMethod === "card") {
      if (!formData.cardNumber || !formData.cardExpiry || !formData.cardCVC) {
        setError("Please fill in all payment details");
        return;
      }
    }

    setLoading(true);

    try {
      // Create order object
      const shippingAddress = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        pincode: formData.pincode,
      };

      const orderData = {
        userId: String(user?.id || ""),
        items: cartItems,
        shippingAddress,
        subtotal: safeSub,
        shipping: safeShip,
        tax: safeTax,
        total: safeTotal,
        paymentMethod,
        paymentStatus: paymentMethod === "cod" ? "pending" : "paid",
      };

      // Submit order to backend
      const response = await fetch("https://fashion-ai-backend-2g7w.onrender.com/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (data.success && data.order?._id) {
        localStorage.setItem("lastOrderId", data.order._id);
        localStorage.setItem("lastOrderNumber", data.order.orderNumber || "");
        clearCart();
        router.push(`/order-confirmation?orderId=${encodeURIComponent(data.order._id)}`);
      } else {
        setError(data.message || "Failed to create order");
      }
    } catch (err) {
      setError("Connection error. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="bg-muted py-8 lg:py-12">
          <div className="container mx-auto px-4 lg:px-8">
            <h1 className="text-3xl font-serif font-bold">Checkout</h1>
            <p className="text-muted-foreground">Step {step} of 2</p>
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-2"
              >
                {error && (
                  <Alert variant="destructive" className="mb-6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmitOrder} className="space-y-6">
                  {step === 1 ? (
                    <div>
                      <h2 className="text-2xl font-serif font-bold mb-6">Delivery Address</h2>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">First Name *</label>
                          <Input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Last Name</label>
                          <Input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Email *</label>
                          <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Phone *</label>
                          <Input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="10 digit number"
                            required
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium mb-2">Address *</label>
                          <Input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="Street address"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">City *</label>
                          <Input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Pincode *</label>
                          <Input
                            type="text"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleInputChange}
                            placeholder="6 digit pincode"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h2 className="text-2xl font-serif font-bold mb-6">Payment Method</h2>

                      <div className="space-y-4 mb-8">
                        <div
                          onClick={() => setPaymentMethod("cod")}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            paymentMethod === "cod"
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-5 h-5 rounded-full border-2 mt-1 ${
                                paymentMethod === "cod"
                                  ? "border-primary bg-primary"
                                  : "border-border"
                              }`}
                            />
                            <div className="flex-1">
                              <h3 className="font-semibold">Cash on Delivery</h3>
                              <p className="text-sm text-muted-foreground">
                                Pay when your order arrives. No charges for now!
                              </p>
                            </div>
                          </div>
                        </div>

                        <div
                          onClick={() => setPaymentMethod("card")}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            paymentMethod === "card"
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-5 h-5 rounded-full border-2 mt-1 ${
                                paymentMethod === "card"
                                  ? "border-primary bg-primary"
                                  : "border-border"
                              }`}
                            />
                            <div className="flex-1">
                              <h3 className="font-semibold">Credit/Debit Card</h3>
                              <p className="text-sm text-muted-foreground">
                                Secure payment via card. Instant order processing.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {paymentMethod === "card" && (
                        <div className="space-y-4 p-4 bg-muted rounded-lg">
                          <div>
                            <label className="block text-sm font-medium mb-2">Card Number *</label>
                            <Input
                              type="text"
                              name="cardNumber"
                              value={formData.cardNumber}
                              onChange={handleInputChange}
                              placeholder="1234 5678 9012 3456"
                              maxLength={19}
                              required={paymentMethod === "card"}
                            />
                          </div>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">Expiry Date *</label>
                              <Input
                                type="text"
                                name="cardExpiry"
                                value={formData.cardExpiry}
                                onChange={handleInputChange}
                                placeholder="MM/YY"
                                maxLength={5}
                                required={paymentMethod === "card"}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">CVC *</label>
                              <Input
                                type="text"
                                name="cardCVC"
                                value={formData.cardCVC}
                                onChange={handleInputChange}
                                placeholder="123"
                                maxLength={3}
                                required={paymentMethod === "card"}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex gap-4 pt-6">
                    {step === 2 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep(1)}
                        disabled={loading}
                      >
                        Back
                      </Button>
                    )}
                    <Button type="submit" className="flex-1" size="lg" disabled={loading}>
                      {loading ? (
                        <>
                          <Loader className="w-4 h-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : step === 1 ? (
                        "Continue to Payment"
                      ) : paymentMethod === "cod" ? (
                        "Place Order - Pay on Delivery"
                      ) : (
                        "Place Order - Pay with Card"
                      )}
                    </Button>
                  </div>
                </form>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="h-fit sticky top-20"
              >
                <div className="border rounded-lg p-6 bg-muted/30">
                  <h2 className="text-xl font-serif font-bold mb-6">Order Summary</h2>

                  <div className="space-y-3 mb-6 pb-6 border-b max-h-64 overflow-y-auto">
                    {cartItems.map((item) => {
                      const itemPrice = Number.isFinite(item.price) ? item.price : 0;
                      const itemQty = Number.isFinite(item.quantity) ? item.quantity : 0;
                      const itemTotal = Math.floor(itemPrice * itemQty);

                      return (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {item.name} x {itemQty}
                          </span>
                          <span>₹{itemTotal.toLocaleString()}</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>₹{safeSub.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span>{safeShip === 0 ? "FREE" : `₹${safeShip}`}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax (18%)</span>
                      <span>₹{safeTax.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex justify-between mb-6 pt-6 border-t">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-xl">₹{safeTotal.toLocaleString()}</span>
                  </div>

                  <div className="text-xs text-muted-foreground space-y-2">
                    <p>✓ Secure checkout</p>
                    <p>✓ Easy returns within 7 days</p>
                    <p>✓ 24/7 customer support</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
