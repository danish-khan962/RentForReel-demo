// app/api/state/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // The actual API you were trying to call
    const externalUrl = "https://rentforreel-lister-frontend.vercel.app/api/state";
    const res = await fetch(externalUrl, { cache: "no-store" });
    const data = await res.json();

    // Return the data back to your frontend
    return NextResponse.json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json({ error: "Failed to fetch states" }, { status: 500 });
  }
}
