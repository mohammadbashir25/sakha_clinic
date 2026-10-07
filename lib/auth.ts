import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const secret = process.env.AUTH_SECRET;

if (!secret) {
  throw new Error("AUTH_SECRET is not defined");
}

const encodedSecret = new TextEncoder().encode(secret);

export interface AdminSession {
  adminId: string;
  username: string;
}

export async function createSessionToken(session: AdminSession) {
  return new SignJWT({
    adminId: session.adminId,
    username: session.username,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedSecret);
}

export async function verifySessionToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, encodedSecret);

    if (!payload.adminId || !payload.username) {
      return null;
    }

    return {
      adminId: payload.adminId as string,
      username: payload.username as string,
    };
  } catch {
    return null;
  }
}

export async function getAdminSession() {
  const cookieStore = await cookies();

  const token = cookieStore.get("sakha_admin_session")?.value;

  if (!token) {
    return null;
  }

  return verifySessionToken(token);
}