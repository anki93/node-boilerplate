import { Document } from "mongoose"

export enum STATUS {
  ACTIVE = 'ACTIVE',
  DELETED = 'DELETED',
  INACTIVE = 'INACTIVE',
  SUSPEND = 'SUSPEND',
}

export interface IUser extends Document {
  firstname: string;
  lastname?: string;
  username: string;
  email: string;
  password: string;
  profile: string;
  rating: number;
  status: string;
}
