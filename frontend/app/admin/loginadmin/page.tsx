"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ShieldCheck } from "lucide-react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const res = await fetch("https://fashion-ai-backend-2g7w.onrender.com/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("adminToken", data.token);
        router.push("/admin/dashboard");
      } else {
        setError(data.message || "Invalid credentials.");
      }
    } catch {
      setError("Server connection failed. Is backend running?");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#faf8f5]">
      <div className="p-10 bg-white shadow-2xl rounded-2xl w-[400px] border border-[#8B4513]/10">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <ShieldCheck className="w-10 h-10 text-[#8B4513]" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-[#8B4513]">RadhikaShoppy</h1>
          <p className="text-sm text-gray-500 mt-2">Admin Portal Login</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Admin Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-[#8B4513] focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
              placeholder="Enter username"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-[#8B4513] focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 text-center bg-red-50 p-2 rounded-lg">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 font-bold text-white bg-[#8B4513] rounded-xl shadow-lg hover:bg-[#6b3410] hover:shadow-xl transition-all flex justify-center items-center gap-2"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Secure Login"}
          </button>
        </form>
      </div>
    </div>
  );
}