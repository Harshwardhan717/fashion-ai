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
import { useAuth } from "@/context/AuthContext";

const ADMIN_USERNAME = "radhika_adminKOLHAPHUR";
const ADMIN_PASSWORD = "securepassword123456";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // ── ADMIN CHECK ──────────────────────────────────
    if (email === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/admin/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: email, password }),
        });
        const data = await res.json();
        if (res.ok) {
          localStorage.setItem("adminToken", data.token);
          setSuccess(true);
          setTimeout(() => router.push("/admin/dashboard"), 1000);
        } else {
          setError(data.message || "Admin login failed");
        }
      } catch {
        setError("Server connection failed.");
      } finally {
        setLoading(false);
      }
      return;
    }

    // ── USER LOGIN ────────────────────────────────────
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      const result = await login(email, password);
      if (result.success) {
        if (rememberMe) localStorage.setItem("rememberEmail", email);
        setSuccess(true);
        setTimeout(() => router.push("/"), 1500);
      } else {
        setError(result.message || "Login failed");
      }
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-serif font-bold mb-2">Welcome Back</h1>
              <p className="text-muted-foreground">Sign in to your Radhika Shoppy account</p>
            </div>

            {success && (
              <Alert className="mb-6 border-green-500 bg-green-50">
                <AlertDescription className="text-green-800">
                  Login successful! Redirecting...
                </AlertDescription>
              </Alert>
            )}

            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <Input
                  type="text"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading || success}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading || success}
                  className="w-full"
                />
              </div>

              <Button
                type="submit"
                className="w-full py-2"
                disabled={loading || success}
                size="lg"
              >
                {loading ? (
                  <><Loader className="w-4 h-4 mr-2 animate-spin" /> Signing in...</>
                ) : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/signup" className="text-primary font-medium hover:underline">
                  Sign up here
                </Link>
              </p>
            </div>

          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}