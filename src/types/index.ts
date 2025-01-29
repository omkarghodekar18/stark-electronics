export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  specifications: string[];
  components: string[];
}

export interface OrderFormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  state: string;
  district: string;
  pinCode: string;
  quantity: number;
}

export interface PriceBreakdown {
  basePrice: number;
  deliveryFee: number;
  gst: number;
  total: number;
}