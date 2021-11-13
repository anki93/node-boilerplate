import { capitalize, toLower } from "lodash";
import { model, Schema } from "mongoose";
import { IApp } from "@core/interface/app.common.interface";
import { Password } from "@core/utils/index";
import { IUserDocument, IUserModel, STATUS } from "./user.interface";

const schema = {
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
  role: {
    type: String,
    default: "USER",
  },
  status: {
    type: String,
    enum: Object.values(STATUS),
    default: STATUS.ACTIVE,
  },
};

const UserSchema = new Schema<IUserDocument>(schema, {
  timestamps: true,
});

// pre save document mapping
UserSchema.pre("save", async function (next) {
  if (this.isNew) {
    this.password = Password.decode(this.password!);
  }
  next();
});

UserSchema.methods.isValidPassword = function (password) {
  return Password.verify(password, this.password);
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
