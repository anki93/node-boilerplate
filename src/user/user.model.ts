import { capitalize, toLower, unset } from "lodash";
import mongoose, { Document } from "mongoose";
import Utils from "../core/utils";

export enum STATUS {
  ACTIVE = "ACTIVE",
  DELETED = "DELETED",
  INACTIVE = "INACTIVE",
  SUSPEND = "SUSPEND",
}

export interface IUser extends Document {
  firstName: string;
  lastName?: string;
  userName: string;
  email: string;
  password: string;
  profile: string;
  // rating: number;
  status: string;
}

let schema = {
  firstName: {
    type: String,
    set: capitalize,
  },
  lastName: {
    type: String,
    set: capitalize,
  },
  userName: {
    type: String,
    index: { unique: true, dropDups: true },
    set: toLower,
  },
  email: {
    type: String,
    index: { unique: true, dropDups: true },
  },
  password: {
    type: String,
    set: Utils.bcrypt,
    get: unset,
  },
  profile: {
    type: String,
  },
  isVerify: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: Object.values(STATUS),
    default: STATUS.ACTIVE,
  },
};

let UserSchema = new mongoose.Schema(schema, {
  timestamps: true,
});

// UserSchema.methods.compareSync = function (password: string) {
//   return Utils.compareSync(password, this.password)
// }

UserSchema.set("toJSON", {
  getters: true,
  virtuals: false,
});

export const User = mongoose.model<IUser>("User", UserSchema);
