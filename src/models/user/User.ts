import mongoose from 'mongoose'
import { helper } from '../../utils'
import { STATUS, IUser } from './IUser'

let schema = {
  firstname: {
    type: String,
    set: helper.capitalize
  },
  lastname: {
    type: String,
    set: helper.capitalize
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
    set: helper.bcrypt
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

UserSchema.methods.compareSync = function (password: string) {
  return helper.compareSync(password, this.password)
}

UserSchema.set('toJSON', {
  getters: true,
  virtuals: false
})

export const User =  mongoose.model<IUser>('User', UserSchema)
