// src/app/api/users/auth/signout/route.js
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (session) {
    return NextResponse.redirect("/api/auth/signout");
  }
  return NextResponse.redirect("/");
}
