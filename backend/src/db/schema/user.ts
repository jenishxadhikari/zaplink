import { model, Schema } from 'mongoose'

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    isVerified: {
      type: Boolean,
      default: false,
      required: true
    },
    is2FAEnabled: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  {
    timestamps: true
  }
)

export const User = model('User', userSchema)
