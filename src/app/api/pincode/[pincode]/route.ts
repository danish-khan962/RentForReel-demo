import { NextResponse } from "next/server";

interface PostOffice {
  Name: string;
  [key: string]: unknown;
}

interface PincodeDataEntry {
  Status: string;
  Message: string;
  PostOffice: PostOffice[] | null;
}

type PincodeApiResponse = PincodeDataEntry[];

export async function GET(
  request: Request, 
  { params }: { params: { pincode: string } }
) {
  const { pincode } = params;
  
  if (!pincode || pincode.length !== 6 || isNaN(Number(pincode))) {
    return NextResponse.json({ error: "Invalid pincode format" }, { status: 400 });
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_PINCODE_URL}/${pincode}`);
    
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch pincode data" }, { status: res.status });
    }

    const data: PincodeApiResponse = await res.json();

    const postOffices = data[0]?.PostOffice;

    let localities: string[] = [];

    if (postOffices && postOffices.length > 0) {
        // Extract localities (PostOffice names)
        localities = postOffices.map(po => po.Name);
    }
    
    return NextResponse.json(localities);

  } catch (error) {
    console.error("Error from pincode route:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}