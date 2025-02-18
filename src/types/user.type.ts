enum UserVerifyStatus {
  Unverified,
  Verified,
  Banned,
}

enum UserRole {
  Customer,
  Admin,
}

export interface UserType {
  _id: string;
  fullname: string;
  email: string;
  phone: string;
  password: string;
  created_at: Date;
  updated_at?: Date;
  email_verify_token?: string;
  forgot_password_token?: string;
  verify: UserVerifyStatus;
  role: UserRole;
}

enum TokenType {
  AccessToken,
  RefreshToken,
  ForgotPasswordToken,
  EmailVerifyToken,
}

export { UserVerifyStatus, UserRole, TokenType };
