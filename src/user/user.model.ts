import { capitalize, toLower, unset } from "lodash";
import { model, Document, Schema, Model } from "mongoose";
import { IApp } from "../core/interface/app.common.interface";
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
  password?: string;
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
    // set: Utils.bcrypt,
    // get: unset,
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

interface IUserDocument extends IUser {
  isValidPassword: (str: string) => Boolean;
}
interface IUserModel extends Model<IUserDocument> {
  findByEmailOrUserName: (str: string) => Promise<IUserDocument>;
}

const UserSchema = new Schema<IUserDocument>(schema, {
  timestamps: true,
});

// pre save document mapping
UserSchema.pre("save", async function (next) {
  if (this.isNew) {
    this.password = Utils.bcrypt(this.password!);
  }
  next();
});

UserSchema.methods.isValidPassword = function (password) {
  return Utils.compareSync(password, this.password!);
};

UserSchema.statics.findByEmailOrUserName = function (str: string) {
  const criteria: IApp.IObject<any> = {
    $or: [{ userName: str }, { email: str }],
  };
  return this.findOne(criteria).exec();
};

UserSchema.set("toJSON", {
  getters: true,
  virtuals: false,
});

export const User = model<IUserDocument, IUserModel>("User", UserSchema);
