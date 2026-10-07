import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import Admin from "@/models/Admin";
import { createSessionToken } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    await connectDB();

    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { message: "Username and password are required" },
        { status: 400 }
      );
    }

    const admin = await Admin.findOne({ username });

    if (!admin) {
      return NextResponse.json(
        { message: "Invalid username or password" },
        { status: 401 }
      );
    }

    const passwordIsValid = await bcrypt.compare(
      password,
      admin.passwordHash
    );

    if (!passwordIsValid) {
      return NextResponse.json(
        { message: "Invalid username or password" },
        { status: 401 }
      );
    }

    const token = await createSessionToken({
      adminId: admin._id.toString(),
      username: admin.username,
    });

    const response = NextResponse.json(
      {
        message: "Login successful",
        admin: {
          id: admin._id.toString(),
          username: admin.username,
        },
      },
      { status: 200 }
    );

    response.cookies.set("sakha_admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}