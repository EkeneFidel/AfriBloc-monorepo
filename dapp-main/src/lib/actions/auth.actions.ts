"use server";
import {
  changePasswordApi,
  getSumsumbTokenApi,
  sendOTPApi,
  signinApi,
  signupApi,
  verifyEmailApi,
} from "@/services/apis/auth.api";
import { logout, setCookie } from "@/services/session";
import {
  Login,
  SendOTP,
  SignUp,
  UpdatePassword,
  VerifyOTP,
} from "@/types/auth";
import { revalidateTag } from "next/cache";

export const signupAction = async (body: SignUp) => {
  try {
    const rsp = await signupApi(body);

    if (!rsp.ok) {
      return {
        error: true,
        message: rsp?.body?.message || "Something went wrong",
      };
    }

    const { accessToken, user } = rsp?.body;
    await setCookie({ access_token: accessToken, user });

    return {
      error: false,
      message: rsp?.body?.message || "Account created successfully",
    };
  } catch (error) {
    console.log(error);

    return {
      error: true,
      message: "Something went wrong",
    };
  }
};

export const signInAction = async (body: Login) => {
  try {
    const rsp = await signinApi(body);

    if (!rsp.ok) {
      return {
        error: true,
        message: rsp?.body?.message || "Something went wrong",
      };
    }

    const { accessToken, user } = rsp?.body;
    await setCookie({ access_token: accessToken, user });

    return {
      error: false,
      message: rsp?.body?.message || "User logged in successfully",
      data: rsp?.body,
    };
  } catch (error) {
    console.log(error);

    return {
      error: true,
      message: "Something went wrong",
    };
  }
};

export const sendOTPAction = async (body: SendOTP) => {
  try {
    const rsp = await sendOTPApi(body);

    if (!rsp.ok) {
      return {
        error: true,
        message: rsp?.body?.message || "Something went wrong",
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

export const verifyEmailAction = async (body: VerifyOTP) => {
  try {
    const rsp = await verifyEmailApi(body);

    if (!rsp.ok) {
      return {
        error: true,
        message: rsp?.body?.message || "Something went wrong",
      };
    }

    await setCookie({ access_token: rsp?.body?.access_token });

    return {
      error: false,
      message: rsp?.body?.message || "Email verified successfully",
    };
  } catch (error) {
    console.log(error);

    return {
      error: true,
      message: "Something went wrong",
    };
  }
};

export const changePasswordAction = async (body: UpdatePassword) => {
  try {
    const rsp = await changePasswordApi(body);

    if (!rsp.ok) {
      return {
        error: true,
        message: rsp?.body?.message || "Something went wrong",
      };
    }

    return {
      error: false,
      message: rsp?.body?.message || "Email verified successfully",
    };
  } catch (error) {
    console.log(error);

    return {
      error: true,
      message: "Something went wrong",
    };
  }
};

export const getSumsumbTokenAction = async () => {
  try {
    const rsp = await getSumsumbTokenApi();

    if (!rsp.ok) {
      return {
        error: true,
        message: rsp?.body?.message || "Something went wrong",
      };
    }

    return {
      error: false,
      message: rsp?.body?.message,
      data: rsp?.body?.data?.token,
    };
  } catch (error) {
    console.log(error);

    return {
      error: true,
      message: "Something went wrong",
    };
  }
};

export const revalidateProfileAction = async () => {
  try {
    revalidateTag("profile");
    return {
      error: false,
      message: "Profile data revalidated successfully",
    };
  } catch (error) {
    console.error("Error revalidating profile:", error);
    return {
      error: true,
      message: "Failed to revalidate profile data",
    };
  }
};

export const logoutAction = async () => {
  await logout();
};
