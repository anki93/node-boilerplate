import { Document, Model } from "mongoose";

export enum STATUS {
  ACTIVE = "ACTIVE",
  DELETED = "DELETED",
  INACTIVE = "INACTIVE",
  SUSPEND = "SUSPEND",
}

export enum ROLE {
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  USER = "USER",
}
export interface IUser extends Document {
  firstName: string;
  lastName?: string;
  userName: string;
  email: string;
  password: string;
  profile: string;
  // rating: number;
  role: string;
  status: string;
}

export interface IUserDocument extends IUser {
  isValidPassword: (str: string) => Boolean;
}
export interface IUserModel extends Model<IUserDocument> {
  findByEmailOrUserName: (str: string) => Promise<IUserDocument>;
}

export interface ISignInInput {
  userNameOrEmail: string;
  password: string;
}

export interface ISignUpInput {
  firstName: string;
  lastName?: string;
  userName: string;
  email: string;
  password: string;
  role?: string;
}
