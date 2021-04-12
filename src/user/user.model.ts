import mongoose, { Document } from "mongoose"
import Utils from "../core/utils"

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


let schema = {
  firstname: {
    type: String,
    set: Utils.capitalize
  },
  lastname: {
    type: String,
    set: Utils.capitalize
  },
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    set: Utils.bcrypt
  },
  profile: {
    type: String
  },
  rating: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: Object.values(STATUS),
    default: STATUS.ACTIVE
  }
}

let UserSchema = new mongoose.Schema(schema, {
  timestamps: true
})

// UserSchema.methods.compareSync = function (password: string) {
//   return Utils.compareSync(password, this.password)
// }

UserSchema.set('toJSON', {
  getters: true,
  virtuals: false
})

export const User = mongoose.model<IUser>('User', UserSchema)
