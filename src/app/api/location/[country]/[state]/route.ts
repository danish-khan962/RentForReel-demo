// src/app/api/location/[country]/[state]/route.ts
import { NextResponse, NextRequest } from "next/server";

// Returns list of cities for a given state in India. Country param is ignored and defaults to India.
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ country: string; state: string }> }
) {
  const { state } = (await params) || ({} as { state?: string });

  if (!state) {
    return NextResponse.json({ error: "State is required" }, { status: 400 });
  }

  try {
    const response = await fetch(
      "https://countriesnow.space/api/v0.1/countries/state/cities",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country: "India", state }),
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch cities" },
        { status: response.status }
      );
    }

    const data = (await response.json()) as {
      error: boolean;
      msg: string;
      data: string[];
    };

    if (data.error) {
      return NextResponse.json({ error: data.msg }, { status: 500 });
    }

    return NextResponse.json({ country: "India", state, cities: data.data });
  } catch (error) {
    console.error("Error fetching cities:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
