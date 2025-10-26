"use server";

import { orderPropertyApi } from "@/services/apis/properties.api";
import { OrderPropertyTypes } from "@/types/property";

export const orderPropertyAction = async (body: OrderPropertyTypes) => {
  try {
    const rsp = await orderPropertyApi(body);

    if (!rsp.ok) {
      return {
        error: true,
        message: rsp?.body?.message,
      };
    }

    return {
      error: false,
      message: rsp?.body?.message,
    };
  } catch (error) {
    console.log(error);

    return {
      error: true,
      message: "Something went wrong",
    };
  }
};
