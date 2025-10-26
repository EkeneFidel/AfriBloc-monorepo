export function getCurrencySymbol(currencyCode: string): string {
  const currencySymbols: { [key: string]: string } = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
    NGN: "₦",
  };
  return currencySymbols[currencyCode] || currencyCode;
}

export const formatCurrency = (value: number, currencyCode: string = "USD") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

// Placeholder for real-time exchange rates. In a real application, this would
// fetch data from a currency exchange API (e.g., ExchangeRate-API, Open Exchange Rates).
// For now, we'll use a static rate.
const EXCHANGE_RATES: { [key: string]: { [key: string]: number } } = {
  NGN: {
    USD: 0.00065, // Example rate: 1 NGN = 0.00065 USD
  },
  USD: {
    NGN: 1570, // Example rate: 1 USD = 1570 NGN
  },
};

export const convertCurrency = (
  amount: number,
  fromCurrency: string,
  toCurrency: string
): number => {
  if (fromCurrency === toCurrency) {
    return amount;
  }

  const rate = EXCHANGE_RATES[fromCurrency]?.[toCurrency];

  if (rate === undefined) {
    // Fallback or error handling if rate is not found
    console.warn(
      `Exchange rate not found for ${fromCurrency} to ${toCurrency}. Returning original amount.`
    );
    return amount;
  }

  return amount * rate;
};
