import { User } from "@/models/";
import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

function generateAvatarSvg(name: string): string {
  const initial = name.charAt(0).toUpperCase();
  const svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="50" fill="#3498db"/>
      <text x="50" y="50" font-family="Arial" font-size="40" fill="#ffffff" text-anchor="middle" dominant-baseline="central">${initial}</text>
    </svg>
  `;
  return `data:image/svg+xml;base64,${Buffer.from(svgContent).toString(
    "base64"
  )}`;
}

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();
    console.log(name, email, password);

    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email is already in use" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    const avatarUrl = generateAvatarSvg(name);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      image: avatarUrl,
    });

    await newUser.save();

    return NextResponse.json(
      { message: "User is registered successfully" },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error("Error saving user:", err);
    const errorMessage =
      err instanceof Error
        ? err.message
        : "An error occurred while registering the user";
    return NextResponse.json(
      {
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}
