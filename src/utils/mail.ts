// types/email.ts
export type OrderStatus = "pending" | "processing" | "completed" | "cancelled";

export interface OrderItem {
  name: string;
  size: string;
  quantity: number;
  price: number;
}

export interface OrderUser {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface OrderDetails {
  user: OrderUser;
  items: OrderItem[];
  status: OrderStatus;
  totalAmount: number;
}

export interface EmailOrder {
  status: OrderStatus;
  userEmail: string;
}

export type EmailType = "booking" | "status_update" | "cancellation";

import nodemailer, { TransportOptions, Transporter } from "nodemailer";

const transporter: Transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
} as TransportOptions);

export async function sendMail(
  order: EmailOrder,
  type: EmailType
): Promise<boolean> {
  let subject: string = "";
  let html: string = "";

  switch (type) {
    case "booking":
      subject =
        order.status === "pending"
          ? "Order Confirmation"
          : `Order Status Updated: ${order.status}`;

      html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #5046E5; text-align: center;">
            ${
              order.status === "pending"
                ? "Order Confirmation"
                : "Order Status Update"
            }
          </h1>
          <p>Dear Customer,</p>
          ${
            order.status === "pending"
              ? `<p>Thank you for your order! We've received your order and it's currently being processed.</p>`
              : `<p>Your order status has been updated to: <strong>${order.status}</strong></p>`
          }
          <p>You can track your order status in your account dashboard.</p>
          <div style="margin: 20px 0; padding: 15px; background-color: #f5f5f5; border-radius: 5px;">
            <p style="margin: 0;"><strong>Order Status:</strong> ${
              order.status
            }</p>
          </div>
          <p>If you have any questions, please don't hesitate to contact our customer service.</p>
          <p>Thank you for shopping with us!</p>
        </div>
      `;
      break;

    default:
      return false;
  }

  const mailOptions = {
    from: `${process.env.STORE_NAME} <${process.env.EMAIL_USER}>`,
    to: order.userEmail,
    subject: subject,
    html: html,
  } as const;

  try {
    await transporter.sendMail(mailOptions);
    console.log(`${type} email sent successfully to ${order.userEmail}`);
    return true;
  } catch (error) {
    console.error(`Error sending ${type} email:`, error);
    throw error;
  }
}

const statusColors: Record<OrderStatus, string> = {
  pending: "#FFA500",
  processing: "#4169E1",
  completed: "#32CD32",
  cancelled: "#DC143C",
};

export const getOrderStatusEmailTemplate = (order: OrderDetails): string => {
  const items = order.items
    .map(
      (item: OrderItem) => `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">
            ${item.name} (${item.size})
          </td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">
            ${item.quantity}
          </td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">
            ₹${item.price.toFixed(2)}
          </td>
          <td style="padding: 10px; border-bottom: 1px solid #eee;">
            ₹${(item.price * item.quantity).toFixed(2)}
          </td>
        </tr>
      `
    )
    .join("");

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #5046E5; padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0;">Order Status Update</h1>
      </div>
      
      <div style="padding: 20px;">
        <p>Dear ${order.user.name},</p>
        
        <div style="background-color: ${
          statusColors[order.status]
        }; color: white; padding: 10px; border-radius: 5px; text-align: center; margin: 20px 0;">
          <h2 style="margin: 0;">Order Status: ${order.status.toUpperCase()}</h2>
        </div>
        
        <h3>Order Details:</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background-color: #f8f9fa;">
              <th style="padding: 10px; text-align: left;">Item</th>
              <th style="padding: 10px; text-align: left;">Quantity</th>
              <th style="padding: 10px; text-align: left;">Price</th>
              <th style="padding: 10px; text-align: left;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${items}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" style="padding: 10px; text-align: right;"><strong>Total Amount:</strong></td>
              <td style="padding: 10px;"><strong>₹${order.totalAmount.toFixed(
                2
              )}</strong></td>
            </tr>
          </tfoot>
        </table>
        
        <div style="margin-top: 20px;">
          <h3>Shipping Details:</h3>
          <p style="margin: 5px 0;">Address: ${order.user.address}</p>
          <p style="margin: 5px 0;">Phone: ${order.user.phone}</p>
        </div>
        
        <div style="margin-top: 20px; padding: 15px; background-color: #f8f9fa; border-radius: 5px;">
          <p style="margin: 0;">If you have any questions about your order, please contact our customer support at ${
            process.env.SUPPORT_EMAIL
          }</p>
        </div>
      </div>
      
      <div style="background-color: #f8f9fa; padding: 20px; text-align: center; margin-top: 20px;">
        <p style="margin: 0;">Thank you for shopping with us!</p>
      </div>
    </div>
  `;
};

// Optional: Add type guard functions for runtime type checking
export const isOrderStatus = (status: string): status is OrderStatus => {
  return ["pending", "processing", "completed", "cancelled"].includes(status);
};

export const validateOrderDetails = (order: unknown): order is OrderDetails => {
  if (!order || typeof order !== "object") return false;

  const orderObject = order as Partial<OrderDetails>;

  return Boolean(
    orderObject.user &&
      typeof orderObject.user.name === "string" &&
      typeof orderObject.user.email === "string" &&
      typeof orderObject.user.phone === "string" &&
      typeof orderObject.user.address === "string" &&
      Array.isArray(orderObject.items) &&
      orderObject.items.every(
        (item) =>
          typeof item.name === "string" &&
          typeof item.size === "string" &&
          typeof item.quantity === "number" &&
          typeof item.price === "number"
      ) &&
      isOrderStatus(orderObject.status as string) &&
      typeof orderObject.totalAmount === "number"
  );
};

// Helper function to format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
};

// Error handling types
export class EmailError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly originalError?: unknown
  ) {
    super(message);
    this.name = "EmailError";
  }
}

// Email service error codes
export const EMAIL_ERROR_CODES = {
  INVALID_ORDER: "INVALID_ORDER",
  SEND_FAILED: "SEND_FAILED",
  TEMPLATE_ERROR: "TEMPLATE_ERROR",
  INVALID_STATUS: "INVALID_STATUS",
} as const;

// Type-safe email service configuration
export interface EmailServiceConfig {
  readonly storeName: string;
  readonly supportEmail: string;
  readonly fromEmail: string;
  readonly replyToEmail?: string;
  readonly templates: {
    readonly orderConfirmation: string;
    readonly statusUpdate: string;
    readonly cancellation: string;
  };
}
