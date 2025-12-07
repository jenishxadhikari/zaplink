import { model, Schema, Types } from 'mongoose'

const urlSchema = new Schema(
  {
    title:{
      type: String
    },
    shortUrlKey: {
      type: String,
      unique: true,
      required: true
    },
    originalUrl: {
      type: String,
      required: true
    },
    isActive:{
      type: Boolean,
      default: true
    },
    clicks: {
      type: Number,
      default: 0,
      required: true
    },
    userId: {
      type: Types.ObjectId,
      ref: 'User',
      required: true
    },
    expiresAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
)

export const Url = model('Url', urlSchema)
