import { NextRequest, NextResponse } from "next/server";
import { extractVideoUrl } from "@/lib/extract-video";

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "Please provide a LinkedIn post URL." },
        { status: 400 }
      );
    }

    const result = await extractVideoUrl(url.trim());

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Something went wrong. Please try again.";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
