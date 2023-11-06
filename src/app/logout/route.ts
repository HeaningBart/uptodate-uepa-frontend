import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const cookieStore = cookies();
  const auth_token = cookieStore.get("_r");
  if (auth_token) {
    cookieStore.set({
      name: "_r",
      value: "",
      expires: new Date("2016-10-05"),
    });
    return NextResponse.redirect(
      new URL("/login", process.env.NEXT_PUBLIC_WEBSITE_URL!)
    );
  } else {
    return NextResponse.redirect(process.env.NEXT_PUBLIC_WEBSITE_URL!);
  }
}
