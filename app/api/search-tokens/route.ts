import { NextRequest, NextResponse } from "next/server";

const UNISWAP_SEARCH_URL =
  "https://interface.gateway.uniswap.org/v2/Search.v1.SearchService/SearchTokens";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch(UNISWAP_SEARCH_URL, {
      method: "POST",
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.5",
        "connect-protocol-version": "1",
        "content-type": "application/json",
        origin: "https://app.uniswap.org",
        "x-request-source": "uniswap-web",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Uniswap API error: ${response.status} ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Search tokens error:", error);
    return NextResponse.json(
      { error: "Failed to fetch from Uniswap" },
      { status: 500 }
    );
  }
}
