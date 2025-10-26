import { ApiResponse } from "@/types/auth";
import { Api } from "./api";
import {
  getAllPropertiesRsp,
  GetPortfolioRsp,
  OrderPropertyRsp,
  OrderPropertyTypes,
  PropertyTypes,
} from "@/types/property";

export const getAllProperties = () => {
  return Api.get<getAllPropertiesRsp>("/properties", true);
};

export const getPropertyById = (id: string) => {
  return Api.get<ApiResponse & { data: PropertyTypes }>(
    `/properties/${id}`,
    true,
  );
};

export const orderPropertyApi = (body: OrderPropertyTypes) => {
  return Api.post<OrderPropertyTypes, OrderPropertyRsp>(
    `/properties/purchase`,
    body,
    true,
  );
};

export const getRates = (from: string, to: string) => {
  return Api.get<
    ApiResponse & {
      data: {
        from: string;
        to: string;
        rate: number;
      };
    }
  >(`/rates/${from}/${to}`);
};

export const getHBARRates = (to: string) => {
  return Api.get<
    ApiResponse & {
      data: {
        from: string;
        to: string;
        rate: number;
      };
    }
  >(`/rates/hbar/${to}`);
};

export const getPortofolio = ({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
}) => {
  return Api.get<GetPortfolioRsp>(
    `/portfolio?page=${page}&limit=${limit}`,
    true,
  );
};
