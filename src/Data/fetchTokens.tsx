import axios, { AxiosResponse } from "axios";

// Define the interface for the response data
export interface TokenStats {
  symbol: string; // Trading pair (e.g., BTCUSDT)
  priceChangePercent: number; // 24-hour price change percentage
}

// Function to fetch 24-hour stats for all tokens
export async function fetch24HrStats(): Promise<TokenStats[]> {
  const baseURL = "https://api.binance.com";
  const endpoint = "/api/v3/ticker/24hr";

  try {
    const response: AxiosResponse<any> = await axios.get(baseURL + endpoint);

    if (response.status !== 200) {
      throw new Error(`Error: Received status code ${response.status}`);
    }

    // Filter and map the response to include only required fields
    return response.data.map((token: any) => ({
      symbol: token.symbol,
      priceChangePercent: parseFloat(token.priceChangePercent),
    }));
  } catch (error: any) {
    console.error("Failed to fetch 24-hour stats:", error.message);
    throw new Error("Could not retrieve data. Please try again later.");
  }
}
