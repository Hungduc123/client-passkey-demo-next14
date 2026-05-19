import { NextRequest, NextResponse } from "next/server";

const UNISWAP_GRAPHQL_URL = "https://interface.gateway.uniswap.org/v1/graphql";

const V3_POOL_QUERY = `query V3Pool($chain: Chain!, $address: String!) {
    v3Pool(chain: $chain, address: $address) {
      id
      protocolVersion
      address
      feeTier
      token0 {
        ...SimpleTokenDetails
        ...TokenPrice
        __typename
      }
      token0Supply
      token1 {
        ...SimpleTokenDetails
        ...TokenPrice
        __typename
      }
      token1Supply
      txCount
      volume24h: cumulativeVolume(duration: DAY) {
        value
        __typename
      }
      historicalVolume(duration: WEEK) {
        value
        timestamp
        __typename
      }
      totalLiquidity {
        value
        __typename
      }
      totalLiquidityPercentChange24h {
        value
        __typename
      }
      __typename
    }
  }

  fragment SimpleTokenDetails on Token {
    ...TokenBasicInfoParts
    project {
      id
      isSpam
      logoUrl
      name
      safetyLevel
      __typename
    }
    ...TokenFeeDataParts
    ...TokenProtectionInfoParts
    __typename
  }

  fragment TokenBasicInfoParts on Token {
    id
    address
    chain
    decimals
    name
    standard
    symbol
    isBridged
    bridgedWithdrawalInfo {
      chain
      provider
      url
      __typename
    }
    __typename
  }

  fragment TokenFeeDataParts on Token {
    feeData {
      buyFeeBps
      sellFeeBps
      __typename
    }
    __typename
  }

  fragment TokenProtectionInfoParts on Token {
    protectionInfo {
      result
      attackTypes
      blockaidFees {
        buy
        sell
        transfer
        __typename
      }
      __typename
    }
    __typename
  }

  fragment TokenPrice on Token {
    id
    project {
      id
      markets(currencies: [USD]) {
        id
        price {
          id
          value
          __typename
        }
        __typename
      }
      logo {
        id
        url
        __typename
      }
      __typename
    }
    market(currency: USD) {
      id
      price {
        id
        value
        __typename
      }
      __typename
    }
    __typename
  }`;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const chain = searchParams.get("chain") ?? "BASE";
  const address =
    searchParams.get("address") ?? "0x6c561b446416e1a00e8e93e221854d6ea4171372";

  const body = {
    operationName: "V3Pool",
    variables: {
      chain,
      address,
    },
    query: V3_POOL_QUERY,
  };

  const res = await fetch(UNISWAP_GRAPHQL_URL, {
    method: "POST",
    headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.6",
      "content-type": "application/json",
      origin: "https://app.uniswap.org",
      referer: "https://app.uniswap.org/",
      "_dd-custom-header-graph-ql-operation-name": "V3Pool",
      "_dd-custom-header-graph-ql-operation-type": "query",
    },
    body: JSON.stringify(body),
  });
  console.log("🚀 ~ GET ~ res:", res)

  if (!res.ok) {
    return NextResponse.json(
      { error: `Upstream error: ${res.status}` },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
