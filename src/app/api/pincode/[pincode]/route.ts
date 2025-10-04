// src/app/api/pincode/[pincode]/route.ts
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ pincode: string }> } 
) {
  const { pincode } = await params; 

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_PINCODE_URL}/${pincode}`);
    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch pincode data" },
        { status: res.status }
      );
    }
    const data = await res.json();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const localities = data[0]?.PostOffice?.map((po: any) => po.Name) || [];
    return NextResponse.json(localities);
  } catch (error) {
    console.error("Error from pincode route:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}