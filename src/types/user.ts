export type UserRole = "user" | "admin" | "seller";
export type AuthProvider = "email" | "google" | "kakao";

export type User = {
  id: string;
  email: string;
  userName: string;
  phoneNumber: string;
  role: UserRole;
  provider: AuthProvider;
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  availableCredit: number;
};
export type SignupForm = {
  userName: string;
  email: string;
  phoneNumber: string;
  password: string;
  passwordConfirm: string;
};

export type SignUpInput = {
  email: string;
  password: string;
  userName: string;
  phoneNumber: string;
};
export type UserInfo = {
  id: string;
  email: string;
  userName: string;
  phoneNumber: string;
  availableCredit: number;
};

export type LoginInput = Pick<SignUpInput, "email" | "password">;
