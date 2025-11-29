import { model, Schema, Types } from 'mongoose'

const tokenSchema = new Schema(
  {
    token: {
      type: String,
      unique: true,
      required: true
    },
    userId: {
      type: Types.ObjectId,
      ref: 'User',
      required: true
    },
    type: {
      type: String,
      enum: ['verify', 'reset', '2fa', 'refreshToken'],
      required: true
    },
    expiresAt: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true
  }
)

export const Token = model('Token', tokenSchema)
