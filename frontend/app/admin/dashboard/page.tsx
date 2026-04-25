"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogOut, UploadCloud, Loader2, Package, ShoppingBag } from "lucide-react";

const STATUS_COLORS: Record<string, string> = {
  pending:    "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  shipped:    "bg-purple-100 text-purple-700",
  delivered:  "bg-green-100 text-green-700",
  cancelled:  "bg-red-100 text-red-600",
};

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<"upload" | "orders">("upload");

  // Upload states
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [category, setCategory] = useState("");
  const [collection, setCollection] = useState("");
  const [tag, setTag] = useState("");
  const [stock, setStock] = useState("100");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // Orders states
  const [orders, setOrders] = useState<any[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;

  useEffect(() => {
    if (!token) router.push("/admin/loginadmin");
  }, []);

  useEffect(() => {
    if (tab === "orders") fetchOrders();
  }, [tab]);

  const fetchOrders = async () => {
    setOrdersLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/admin/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setOrders(data);
    } catch {
      console.error("Orders fetch failed");
    } finally {
      setOrdersLoading(false);
    }
  };

  const updateStatus = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    await fetch(`http://localhost:5000/api/admin/orders/${orderId}/status`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    setUpdatingId(null);
    fetchOrders();
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return setStatus("Please select an image first!");
    setIsUploading(true);
    setStatus("");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    if (originalPrice) formData.append("originalPrice", originalPrice);
    formData.append("category", category);
    if (collection) formData.append("collection", collection);
    if (tag) formData.append("tag", tag);
    formData.append("stock", stock);
    formData.append("description", description);
    formData.append("image", image);

    try {
      const res = await fetch("http://localhost:5000/api/admin/products", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("✨ Product Uploaded Successfully!");
        setName(""); setPrice(""); setOriginalPrice(""); setCategory("");
        setCollection(""); setTag(""); setStock("100"); setDescription(""); setImage(null);
      } else {
        setStatus(`❌ Upload Failed: ${data.message}`);
      }
    } catch {
      setStatus("❌ Server Error while uploading.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/admin/loginadmin");
  };

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Header */}
      <div className="bg-[#8B4513] px-8 py-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-white">Store Admin Dashboard</h1>
          <p className="text-[#e8d5c4] text-sm mt-1">RadhikaShoppy Management</p>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#8B4513] bg-white rounded-full hover:bg-gray-100 transition-colors shadow-sm">
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#8B4513]/10 bg-white px-8">
        <button
          onClick={() => setTab("upload")}
          className={`flex items-center gap-2 px-6 py-4 font-semibold text-sm border-b-2 transition-colors ${
            tab === "upload" ? "border-[#8B4513] text-[#8B4513]" : "border-transparent text-gray-500 hover:text-[#8B4513]"
          }`}
        >
          <UploadCloud className="w-4 h-4" /> Upload Product
        </button>
        <button
          onClick={() => setTab("orders")}
          className={`flex items-center gap-2 px-6 py-4 font-semibold text-sm border-b-2 transition-colors ${
            tab === "orders" ? "border-[#8B4513] text-[#8B4513]" : "border-transparent text-gray-500 hover:text-[#8B4513]"
          }`}
        >
          <ShoppingBag className="w-4 h-4" /> Orders
          {orders.length > 0 && (
            <span className="bg-[#8B4513] text-white text-xs px-2 py-0.5 rounded-full">{orders.length}</span>
          )}
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">

        {/* UPLOAD TAB */}
        {tab === "upload" && (
          <div className="bg-white border border-[#8B4513]/10 shadow-xl rounded-3xl overflow-hidden">
            <form onSubmit={handleUpload} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Product Name *</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full p-3 mt-1 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#8B4513] focus:border-transparent outline-none transition-all" placeholder="e.g., Pink Banarasi Silk Saree" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Category *</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} required className="w-full p-3 mt-1 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#8B4513] outline-none transition-all">
                    <option value="">Select Category...</option>
                    <option value="saree">Saree</option>
                    <option value="lehenga">Lehenga</option>
                    <option value="kurti">Kurti</option>
                    <option value="jewelry">Jewelry</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Selling Price (₹) *</label>
                  <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required className="w-full p-3 mt-1 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#8B4513] outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Original Price (₹)</label>
                  <input type="number" value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} placeholder="For discounts" className="w-full p-3 mt-1 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#8B4513] outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Stock Count</label>
                  <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} className="w-full p-3 mt-1 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#8B4513] outline-none transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Collection</label>
                  <input type="text" value={collection} onChange={(e) => setCollection(e.target.value)} placeholder="e.g., Summer 2026" className="w-full p-3 mt-1 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#8B4513] outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Product Tag</label>
                  <input type="text" value={tag} onChange={(e) => setTag(e.target.value)} placeholder="e.g., Best Seller, New" className="w-full p-3 mt-1 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#8B4513] outline-none transition-all" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700">Product Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="w-full p-3 mt-1 bg-gray-50 border border-gray-200 rounded-xl resize-none focus:bg-white focus:ring-2 focus:ring-[#8B4513] outline-none transition-all" placeholder="Describe the fabric, work, and occasion..." />
              </div>

              <div className="p-6 border-2 border-dashed border-[#8B4513]/30 rounded-2xl bg-[#faf8f5] hover:bg-[#f3ece6] transition-colors flex flex-col items-center justify-center">
                <UploadCloud className="w-10 h-10 text-[#8B4513] mb-3" />
                <label className="block text-sm font-semibold text-gray-700 mb-2 cursor-pointer">Upload High-Quality Image *</label>
                <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} required className="w-full max-w-xs text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#8B4513] file:text-white hover:file:bg-[#6b3410] cursor-pointer" />
              </div>

              {status && (
                <div className={`p-4 rounded-xl text-center font-bold text-[15px] ${status.includes("Failed") || status.includes("Error") ? "bg-red-50 text-red-600 border border-red-200" : "bg-[#eef5ed] text-[#2e5e2f] border border-[#d1e6d0]"}`}>
                  {status}
                </div>
              )}

              <button type="submit" disabled={isUploading} className="w-full py-4 text-lg font-bold text-white bg-[#8B4513] rounded-xl shadow-lg hover:bg-[#6b3410] hover:shadow-xl transition-all flex items-center justify-center gap-2">
                {isUploading ? <><Loader2 className="w-6 h-6 animate-spin" /> Uploading to Database...</> : "Publish Product"}
              </button>
            </form>
          </div>
        )}

        {/* ORDERS TAB */}
        {tab === "orders" && (
          <div>
            {ordersLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-10 h-10 animate-spin text-[#8B4513]" />
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <Package className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg">No orders yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order._id} className="bg-white rounded-2xl shadow border border-[#8B4513]/10 p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                      <div>
                        <p className="font-bold text-[#8B4513] text-lg">{order.orderNumber}</p>
                        <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleString("en-IN")}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[order.status] || "bg-gray-100 text-gray-600"}`}>
                          {order.status}
                        </span>
                        <select
                          value={order.status}
                          disabled={updatingId === order._id}
                          onChange={(e) => updateStatus(order._id, e.target.value)}
                          className="text-sm border border-[#8B4513]/30 rounded-lg px-2 py-1 focus:ring-2 focus:ring-[#8B4513] outline-none"
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                        {updatingId === order._id && <Loader2 className="w-4 h-4 animate-spin text-[#8B4513]" />}
                      </div>
                    </div>

                    {/* Address */}
                    <div className="bg-[#faf8f5] rounded-xl p-4 mb-4 text-sm">
                      <p className="font-semibold text-gray-700 mb-1">📦 Shipping Address</p>
                      <p className="text-gray-600">
                        {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                      </p>
                      <p className="text-gray-600">{order.shippingAddress.address}</p>
                      <p className="text-gray-600">{order.shippingAddress.city} — {order.shippingAddress.pincode}</p>
                      <p className="text-gray-600">{order.shippingAddress.phone} | {order.shippingAddress.email}</p>
                    </div>

                    {/* Items */}
                    <div className="mb-4">
                      <p className="font-semibold text-gray-700 text-sm mb-2">🛍️ Items</p>
                      <div className="space-y-2">
                        {order.items.map((item: any, i: number) => (
                          <div key={i} className="flex justify-between text-sm text-gray-600 border-b border-gray-100 pb-1">
                            <span>{item.name} × {item.quantity}</span>
                            <span>₹{item.price * item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Amount */}
                    <div className="flex justify-between items-center pt-2 border-t border-[#8B4513]/10">
                      <div className="text-sm text-gray-500">
                        Payment: <span className="font-semibold uppercase">{order.paymentMethod}</span>
                        {" · "}
                        <span className={order.paymentStatus === "paid" ? "text-green-600 font-semibold" : "text-yellow-600 font-semibold"}>
                          {order.paymentStatus}
                        </span>
                      </div>
                      <p className="text-lg font-bold text-[#8B4513]">₹{order.total}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}