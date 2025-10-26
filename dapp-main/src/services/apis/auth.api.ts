import {
  ApiResponse,
  AuthResponse,
  Login,
  SendOTP,
  SignUp,
  UpdatePassword,
  UserData,
  VerifyOTP,
  VerifyOTPResponse,
} from "@/types/auth";

import { Api } from "./api";

export const signupApi = (body: SignUp) => {
  return Api.post<SignUp, AuthResponse>("/auth/register", body, true);
};

export const signinApi = (body: Login) => {
  return Api.post<Login, AuthResponse>("/auth/login", body);
};

export const sendOTPApi = (body: SendOTP) => {
  return Api.post<SendOTP, VerifyOTPResponse>("/auth/generate-otp", body);
};

export const verifyEmailApi = (body: VerifyOTP) => {
  return Api.post<VerifyOTP, ApiResponse & { access_token: string }>(
    "/auth/verify-otp",
    body,
  );
};

export const getSumsumbTokenApi = () => {
  return Api.post<
    undefined,
    ApiResponse & {
      data: {
        token: string;
        userId: string;
      };
    }
  >("/kyc/access-token", undefined, true);
};

export const changePasswordApi = (body: UpdatePassword) => {
  return Api.post<UpdatePassword, ApiResponse & { access_token: string }>(
    "/auth/change-password",
    body,
    true,
  );
};

export const getCurrentUserApi = () => {
  return Api.get<ApiResponse & { user: UserData }>("/auth/profile", true, [
    "profile",
  ]);
};
