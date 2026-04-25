"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { AlertCircle, Loader, CheckCircle, User, Mail, Phone, MapPin } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoggedIn, logout } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  // Check authentication
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    // Fetch user profile
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `https://fashion-ai-backend-2g7w.onrender.com/api/auth/user/${user?.id}`
        );
        const data = await response.json();

        if (data.success) {
          setProfile(data.user);
          setFormData({
            name: data.user.name || "",
            email: data.user.email || "",
            phone: data.user.phone || "",
            address: data.user.address || "",
            city: data.user.city || "",
            pincode: data.user.pincode || "",
          });
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchProfile();
    }
  }, [isLoggedIn, user, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateProfile = async () => {
    setUpdating(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch(
        `https://fashion-ai-backend-2g7w.onrender.com/api/auth/user/${user?.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.success) {
        setProfile(formData);
        setSuccess(true);
        setEditing(false);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(data.message || "Failed to update profile");
      }
    } catch (err) {
      setError("Connection error. Please try again.");
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader className="w-8 h-8 animate-spin" />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-serif font-bold mb-2">My Profile</h1>
              <p className="text-muted-foreground">Manage your account information</p>
            </div>

            {/* Error Alert */}
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Success Alert */}
            {success && (
              <Alert className="mb-6 border-green-500 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Profile updated successfully!
                </AlertDescription>
              </Alert>
            )}

            {/* Profile Card */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-serif font-bold">{profile?.name}</h2>
                    <p className="text-muted-foreground">{profile?.email}</p>
                  </div>
                </div>
                {!editing && (
                  <Button onClick={() => setEditing(true)} variant="outline">
                    Edit Profile
                  </Button>
                )}
              </div>

              {/* Profile Details */}
              {!editing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className="w-4 h-4 text-amber-600" />
                      <label className="text-sm font-medium text-muted-foreground">
                        Email
                      </label>
                    </div>
                    <p className="font-medium">{profile?.email}</p>
                  </div>

                  {/* Phone */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Phone className="w-4 h-4 text-amber-600" />
                      <label className="text-sm font-medium text-muted-foreground">
                        Phone
                      </label>
                    </div>
                    <p className="font-medium">{profile?.phone || "Not provided"}</p>
                  </div>

                  {/* Address */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-amber-600" />
                      <label className="text-sm font-medium text-muted-foreground">
                        Address
                      </label>
                    </div>
                    <p className="font-medium">{profile?.address || "Not provided"}</p>
                  </div>

                  {/* City */}
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      City
                    </label>
                    <p className="font-medium">{profile?.city || "Not provided"}</p>
                  </div>

                  {/* Pincode */}
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Pincode
                    </label>
                    <p className="font-medium">{profile?.pincode || "Not provided"}</p>
                  </div>
                </div>
              ) : (
                /* Edit Form */
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Full Name</label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={updating}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Email</label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        disabled
                        className="bg-gray-100"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Phone</label>
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={updating}
                        placeholder="Your phone number"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">City</label>
                      <Input
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        disabled={updating}
                        placeholder="Your city"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Address</label>
                      <Input
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        disabled={updating}
                        placeholder="Your address"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Pincode</label>
                      <Input
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        disabled={updating}
                        placeholder="Your pincode"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button
                      onClick={handleUpdateProfile}
                      disabled={updating}
                      className="flex-1"
                    >
                      {updating ? (
                        <>
                          <Loader className="w-4 h-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setEditing(false)}
                      disabled={updating}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Link href="/wishlist" className="w-full">
                <Button variant="outline" className="w-full">
                  My Wishlist
                </Button>
              </Link>
              <Link href="/orders" className="w-full">
                <Button variant="outline" className="w-full">
                  My Orders
                </Button>
              </Link>
              <Button
                variant="destructive"
                onClick={handleLogout}
                className="w-full"
              >
                Logout
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
