import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: NextRequest) {
  const cookieStore = cookies();
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (token) {
    cookieStore.set("_r", token, {
      maxAge: 30 * 24 * 60 * 60,
    });
    redirect(`${process.env.NEXT_PUBLIC_WEBSITE_URL!}/auth?reload=true`);
  } else {
    redirect(`${process.env.NEXT_PUBLIC_WEBSITE_URL!}/auth`);
  }
}
