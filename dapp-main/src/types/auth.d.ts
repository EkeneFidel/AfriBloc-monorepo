type SignUp = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export type EncryptData = {
  userData: UserDataAndAccessToken;
  expires: Date;
};

export type UserSession = {
  userData: UserDataAndAccessToken;
  expires: Date;
  iat: number;
  exp: number;
};

export type ResetPassword = {
  email: string;
  otp: string;
  password: string;
};

export type UpdatePassword = {
  oldPassword: string;
  newPassword: string;
};

export type ApiResponse = {
  success: boolean;
  statusCode?: number;
  message: string;
};

export type SendOTP = {
  email: string;
};

export type SendOTP = {
  email: string;
};

export type VerifyOTP = {
  email: string;
  otp: string;
};

export type VerifyOTPResponse = ApiResponse;

export type Login = {
  identifier: string;
  password: string;
};

export type UserData = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string | null;
  emailVerifiedAt: string | null;
  phoneVerifiedAt: string | null;
  passwordResetToken: string | null;
  passwordResetExpires: string | null;
  middleName: string | null;
  dateOfBirth: string | null;
  gender: string | null;
  nationality: string | null;
  placeOfBirth: string | null;
  kycStatus: string;
  kycApplicantId: string | null;
  kycCompletedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type AccessToken = { accessToken: string };
export type AuthResponse = ApiResponse & { user: UserData } & AccessToken;

export type UserDataAndAccessToken = {
  access_token: string;
  user?: UserData;
};

export type RequestPasswordReset = {
  identifier: string;
};

export type ActionFormStatus = {
  error: boolean;
  message: string;
};
