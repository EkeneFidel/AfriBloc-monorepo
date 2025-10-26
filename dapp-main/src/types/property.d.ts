import { ApiResponse, UserData } from "./auth";

export interface Property {
  id: string;
  description: string;
  beds: number;
  rooms: string;
  landMeasurement: string;
  location: string;
  listingPrice: number;
  pricePerUnit: number;
  numberOfUnits: number;
  netRentalYield: string;
  annualizedROI: string;
  grossRentalYield: string;
  fundedDate: string;
  investmentCostBreakdown: {
    propertyCost: number;
    purchaseCosts: string;
    transactionFees: string;
    mofFees: string;
    totalInvestmentCost: number;
  };
  propertyDetails: {
    whatIsInIt: string[];
    amenities: string[];
    whyInvest: string[];
    propertyDocuments: string[];
  };
}

export type PropertyTypes = {
  id: string;
  title: string;
  description: string;
  type: string;
  kitchen: number;
  dining: number;
  bedrooms: number;
  livingRoom: number;
  bathroom: number;
  landMeasurement: string;
  location: string;
  pricePerUnit: string;
  numUnits: number;
  initialUnits: number;
  propertyPrice: string;
  purchaseCosts: string;
  transactionFees: string;
  mofFees: string;
  listingPrice: string;
  netRentalYieldPct: string;
  annualisedRoiPct: string;
  grossRentalYieldPct: string;
  fundedDate: string;
  features: string[];
  amenities: string[];
  whyInvest: string[];
  imageUrls: string[];
  currency: string;
  governorsConsentUrl: string | null;
  deedOfAssignmentUrl: string | null;
  surveyPlanUrl: string | null;
  tokenId: string;
  tokenSymbol: string;
  createdAt: string;
  updatedAt: string;
  investorsCount: number;
  unitsSold: number;
};

export type getAllPropertiesRsp = ApiResponse & { data: PropertyTypes[] };

export type OrderPropertyTypes = {
  propertyId: string;
  units: number;
};
export type OrderPropertyRsp = ApiResponse & { data: PropertyTypes[] };

export type PortfolioTypes = {
  id: string;
  userId: string;
  propertyId: string;
  currency: string;
  user: UserData;
  property: PropertyTypes;
  totalInvested: string;
  yield: string | null;
  unitsOwned: number;
  createdAt: string;
  updatedAt: string;
};

export type PortfolioStatTypes = {
  currency: string;
  totalPortfolio: string;
  totalIncome: string;
};

export type GetPortfolioRsp = ApiResponse & {
  data: {
    currentPage: string;
    pageSize: string;
    totalCount: number;
    totalPages: number;
    items: PortfolioTypes[];
    totals: PortfolioStatTypes;
  };
};
