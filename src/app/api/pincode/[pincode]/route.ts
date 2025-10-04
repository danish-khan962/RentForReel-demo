// src/app/api/pincode/[pincode]/route.ts
import { NextResponse, NextRequest } from "next/server";

interface PostOffice {
  Name: string;
}

interface PincodeApiResponse {
  PostOffice?: PostOffice[];
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Record<string, string> }
) {
  const { pincode } = params;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_PINCODE_URL}/${pincode}`);
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch pincode data" }, { status: res.status });
    }

    const data: PincodeApiResponse[] = await res.json();

    const localities = data[0]?.PostOffice?.map((po) => po.Name) || [];

    return NextResponse.json(localities);
  } catch (error) {
    console.error("Error from pincode route:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
