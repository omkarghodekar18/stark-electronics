"use client";

import { useState, useEffect } from "react";
import { Minus, Plus, Send, Trash2, CheckCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/stores/cart-store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { SearchableSelect } from "@/components/ui/searchable-select";
import { useToast } from "@/hooks/use-toast";
import {
  LocationState,
  LocationCity,
  getIndianStates,
  getCitiesByState,
  getStateCodeByName,
} from "@/utils/location";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  state: string;
  district: string;
  pinCode: string;
}

interface PriceBreakdown {
  subtotal: number;
  deliveryFee: number;
  gst: number;
  total: number;
}

export default function CartPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } =
    useCartStore();

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    state: "",
    district: "",
    pinCode: "",
  });

  const [states, setStates] = useState<LocationState[]>([]);
  const [cities, setCities] = useState<LocationCity[]>([]);
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Load states on component mount
  useEffect(() => {
    const indianStates = getIndianStates();
    setStates(indianStates);
  }, []);

  // Load cities when state changes
  useEffect(() => {
    if (formData.state) {
      const stateCode = getStateCodeByName(formData.state);
      if (stateCode) {
        const stateCities = getCitiesByState(stateCode);
        setCities(stateCities);
        setFormData((prev) => ({ ...prev, district: "" }));
      }
    }
  }, [formData.state]);

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(itemId);
      return;
    }
    updateQuantity(itemId, newQuantity);
  };

  const getPriceBreakdown = (): PriceBreakdown => {
    const subtotal = getTotalPrice();
    const deliveryFee = 0; // Free delivery over ₹2000
    const gst = 0;
    const total = subtotal + deliveryFee + gst;

    return {
      subtotal,
      deliveryFee,
      gst,
      total,
    };
  };

  const validatePinCode = (pinCode: string): boolean => {
    const pinCodeRegex = /^[1-9][0-9]{5}$/;

    if (!pinCodeRegex.test(pinCode)) {
      toast({
        title: "Invalid PIN Code",
        description: "Please enter a valid 6-digit PIN code",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const formatOrderDetails = (
    formData: FormData,
    items: CartItem[],
    priceBreakdown: PriceBreakdown
  ): string => {
    let message = `*New Order*\n\n`;

    // Customer Details
    message += `*Customer Details:*\n`;
    message += `*Name:* ${formData.fullName}\n`;
    message += `*Email:* ${formData.email}\n`;
    message += `*Phone:* ${formData.phone}\n\n`;

    // Shipping Details
    message += `*Shipping Address:*\n`;
    message += `${formData.address}\n`;
    message += `${formData.district}, ${formData.state}\n`;
    message += `PIN Code: ${formData.pinCode}\n\n`;

    // Order Items
    message += `*Order Items:*\n`;
    items.forEach((item) => {
      message += `• ${item.name}\n`;
      message += `  Quantity: ${item.quantity}\n`;
      message += `  Price: ₹${item.price} × ${item.quantity} = ₹${
        item.price * item.quantity
      }\n\n`;
    });

    // Price Breakdown
    message += `*Price Breakdown:*\n`;
    message += `Subtotal: ₹${priceBreakdown.subtotal.toFixed(2)}\n`;
    message += `Delivery Fee: ${
      priceBreakdown.deliveryFee === 0
        ? "FREE"
        : `₹${priceBreakdown.deliveryFee.toFixed(2)}`
    }\n`;
    message += `GST (18%): ₹${priceBreakdown.gst.toFixed(2)}\n`;
    message += `*Total Amount: ₹${priceBreakdown.total.toFixed(2)}*`;

    return message;
  };

  const sendOrderToWhatsApp = (
    formData: FormData,
    items: CartItem[],
    priceBreakdown: PriceBreakdown
  ) => {
    const phoneNumber = "917666596339"; // Replace with your WhatsApp business number
    const message = formatOrderDetails(formData, items, priceBreakdown);
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const validateForm = () => {
    if (!items.length) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checking out",
        variant: "destructive",
      });
      return false;
    }

    const requiredFields: (keyof FormData)[] = [
      "fullName",
      "email",
      "phone",
      "address",
      "state",
      "district",
      "pinCode",
    ];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      toast({
        title: "Missing information",
        description: `Please fill in: ${missingFields.join(", ")}`,
        variant: "destructive",
      });
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return false;
    }

    // Phone validation (10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid 10-digit phone number",
        variant: "destructive",
      });
      return false;
    }

    if (!validatePinCode(formData.pinCode)) {
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const priceBreakdown = getPriceBreakdown();
      sendOrderToWhatsApp(formData, items, priceBreakdown);
      setOrderPlaced(true);
      clearCart();
    } catch (error) {
      toast({
        title: "Error",
        description: `Something went wrong. Please try again,${error}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="container mx-auto py-16 px-4">
        <Card className="max-w-md mx-auto p-6 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-600 mb-6">
            Your order has been sent via WhatsApp. We&apos;ll process it right
            away.
          </p>
          <Button
            onClick={() => {
              setOrderPlaced(false);
              router.push("/");
            }}
            className="w-full"
          >
            Continue Shopping
          </Button>
        </Card>
      </div>
    );
  }

  const priceBreakdown = getPriceBreakdown();

  return (
    <div className="container mx-auto py-16 mt-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.length === 0 ? (
            <Card className="p-6">
              <div className="text-center space-y-4">
                <p className="text-gray-500">Your cart is empty</p>
                <Button onClick={() => router.push("/")}>
                  Continue Shopping
                </Button>
              </div>
            </Card>
          ) : (
            items.map((item) => (
              <Card key={item.id} className="p-6">
                <div className="flex gap-4">
                  <div className="relative w-24 h-24">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-semibold">{item.name}</h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Price: ₹{item.price}
                    </p>
                    <div className="mt-4 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
                          }
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="font-semibold">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Checkout Form */}
        {items.length > 0 && (
          <div className="lg:col-span-1">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">Checkout</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="10-digit mobile number"
                      value={formData.phone}
                      onChange={(e) => {
                        const value = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 10);
                        setFormData({ ...formData, phone: value });
                      }}
                      maxLength={10}
                    />
                  </div>
                </div>

                {/* Shipping Information */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="address">Delivery Address</Label>
                    <Textarea
                      id="address"
                      placeholder="Enter your full address"
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="state">State</Label>
                    <SearchableSelect
                      options={states.map((state) => ({
                        value: state.name,
                        label: state.name,
                      }))}
                      value={formData.state}
                      placeholder="Search and select your state"
                      onValueChange={(value) =>
                        setFormData({ ...formData, state: value })
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="district">City</Label>
                    <SearchableSelect
                      options={cities.map((city) => ({
                        value: city.name,
                        label: city.name,
                      }))}
                      value={formData.district}
                      placeholder={
                        formData.state
                          ? "Search and select your city"
                          : "Select state first"
                      }
                      onValueChange={(value) =>
                        setFormData({ ...formData, district: value })
                      }
                      disabled={!formData.state}
                    />
                  </div>

                  <div>
                    <Label htmlFor="pinCode">PIN Code</Label>
                    <Input
                      id="pinCode"
                      value={formData.pinCode}
                      onChange={(e) => {
                        const value = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 6);
                        setFormData({ ...formData, pinCode: value });
                      }}
                      placeholder="Enter 6-digit PIN code"
                      maxLength={6}
                    />
                  </div>
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-3">
                  <h3 className="font-semibold">Order Summary</h3>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>₹{priceBreakdown.subtotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Delivery Fee
                      </span>
                      <span>
                        {priceBreakdown.deliveryFee === 0 ? (
                          <span className="text-green-600">FREE</span>
                        ) : (
                          `₹${priceBreakdown.deliveryFee.toFixed(2)}`
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">GST (18%)</span>
                      <span>₹{priceBreakdown.gst.toFixed(2)}</span>
                    </div>

                    {priceBreakdown.deliveryFee === 0 && (
                      <div className="text-xs text-green-600 pt-1">
                        Free delivery applied on orders above ₹2000
                      </div>
                    )}

                    <Separator className="my-2" />

                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>₹{priceBreakdown.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="space-y-3">
                  <Button
                    type="submit"
                    className="w-full bg-[#25D366] hover:bg-[#22bf5b] text-white"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Processing...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        Place Order via WhatsApp
                      </div>
                    )}
                  </Button>

                  <div className="text-center">
                    <p className="text-xs text-muted-foreground space-x-1">
                      By placing this order, you agree to our
                      <button
                        type="button"
                        className="text-primary hover:underline"
                        onClick={() => router.push("/terms")}
                      >
                        Terms of Service
                      </button>
                      and
                      <button
                        type="button"
                        className="text-primary hover:underline"
                        onClick={() => router.push("/privacy")}
                      >
                        Privacy Policy
                      </button>
                    </p>
                  </div>
                </div>
              </form>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
