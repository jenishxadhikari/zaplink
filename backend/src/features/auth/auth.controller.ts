import argon2 from "argon2";
import z from "zod";
import { Types } from "mongoose";

import type { Request, Response } from "express";

import { statusCodes } from "@/config/http-status-codes";
import { asyncHandler } from "@/lib/async-handler";
import { CustomError } from "@/lib/api-error";
import { UserQueries } from "@/features/user/user.queries";

import { AuthSchema } from "./auth.schema";
import { AuthService } from "./auth.service";
import { AuthQueries } from "./auth.queries";

/*
    POST /api/v1/auth/register - Register User
*/
const register = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password }: z.infer<typeof AuthSchema.registerSchema> = req.body

    const existingUser = await UserQueries.getUserByEmail(email)
    if (existingUser) {
      throw new CustomError.BadRequestError('User on this email already exists.')
    }

    const hashedPassword = await argon2.hash(password)
    const user = await UserQueries.createUser({
      name,
      email,
      password: hashedPassword
    })

    await AuthService.sendVerificationMail({
      id: new Types.ObjectId(user.id),
      email: user.email
    })

    return res.status(statusCodes.CREATED).json({
      message: 'Registration Successful. Verification mail sent.'
    })
  }
)

/*
    POST /api/v1/auth/login - Login User
*/
const login = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password }: z.infer<typeof AuthSchema.loginSchema> = req.body

    const user = await UserQueries.getUserByEmail(email)
    if (!user) {
      throw new CustomError.BadRequestError("Incorrect email or password.")
    }

    const verifyPassword = await argon2.verify(user.password, password)
    if (!verifyPassword) {
      throw new CustomError.BadRequestError("Incorrect email or password.")
    }

    if (!user.isVerified) {
      await AuthService.sendVerificationMail({
        id: new Types.ObjectId(user.id),
        email: user.email
      })

      throw new CustomError.ForbiddenError('Verification mail sent. Verify your email to login.')
    }

    const payload = {
      id: String(user._id)
    }

    const accessToken = AuthService.createAccessToken(payload)
    const refreshToken = await AuthService.createRefreshToken(user._id)

    return res
      .status(statusCodes.OK)
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      })
      .json({
        accessToken: accessToken,
        message: 'Logged in successfully.'
      })
  }
)

/*
    POST /api/v1/auth/logout - Logout User
*/
const logout = asyncHandler(
  async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) {
      return res
        .status(statusCodes.OK)
        .json({
          message: 'Logged out successfully.'
        })
    }

    await AuthQueries.deleteToken(refreshToken)

    return res
      .status(statusCodes.OK)
      .clearCookie('refreshToken', {
        httpOnly: true,
        secure: true
      })
      .json({
        message: 'Logged out successfully.'
      })
  }
)

/*
    GET /api/v1/auth/refresh - Generate new access token
*/
const refresh = asyncHandler(
  async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) {
      throw new CustomError.UnauthorizedError('Session expired. Please log in again.')
    }

    const payload = await AuthService.verifyRefreshToken(refreshToken)
    if (!payload) {
      throw new CustomError.UnauthorizedError('Session expired. Please log in again.')
    }

    const accessToken = AuthService.createAccessToken(payload)

    return res
      .status(statusCodes.OK)
      .json({
        accessToken: accessToken,
        message: 'Session refreshed successfully.'
      })
  }
)

/*
    GET /api/v1/auth/refresh - Generate current user
*/
const me = asyncHandler(
  async (req: Request, res: Response) => {
    const user = req.user
    const ip = req.ip
    const browser = req.headers["user-agent"]

    return res
      .status(statusCodes.OK)
      .json({
        ip: ip,
        browser: browser,
        data: {
          ...user
        },
        message: 'User data retrieved successfully.'
      })
  }
)

/*
    POST /api/v1/auth/email/verify - Verify user
*/
const verifyEmail = asyncHandler(
  async (req: Request, res: Response) => {
    const token = req.query.token?.toString()
    if (!token) {
      throw new CustomError.BadRequestError('This verification link is invalid or has expired.')
    }

    const tkn = await AuthQueries.getTokenByToken(token)
    if (!tkn) {
      throw new CustomError.BadRequestError('This verification link is invalid or has expired.')
    }

    const isValid = tkn.expiresAt > new Date()
    if (!isValid) {
      throw new CustomError.BadRequestError('This verification link is invalid or has expired.')
    }

    await UserQueries.updateUser({
      id: String(tkn.userId),
      isVerified: true
    })

    await AuthQueries.deleteToken(token)

    return res
      .status(statusCodes.OK)
      .json({
        message: "Your account has been verified."
      })
  }
)

/*
    POST /api/v1/auth/password/forgot - Request for password reset
*/
const forgotPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const { email }: z.infer<typeof AuthSchema.forgotPasswordSchema> = req.body

    const user = await UserQueries.getUserByEmail(email)
    if (!user) {
      throw new CustomError.BadRequestError("If an account with that email exists, we've sent password reset instructions.")
    }

    await AuthService.sendResetPasswordMail({
      id: user._id,
      email: user.email
    })

    return res
      .status(statusCodes.OK)
      .json({
        message: `If an account with that email exists, we've sent password reset instructions.`
      })
  }
)

/*
    POST /api/v1/auth/password/reset - Reset password
*/
const resetPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const { password }: z.infer<typeof AuthSchema.resetPasswordSchema> = req.body

    const token = req.query.token?.toString()
    if (!token) {
      throw new CustomError.BadRequestError('This verification link is invalid or has expired.')
    }

    const tkn = await AuthQueries.getTokenByToken(token)
    if (!tkn) {
      throw new CustomError.BadRequestError('This verification link is invalid or has expired.')
    }

    const isValid = tkn.expiresAt > new Date()
    if (!isValid) {
      throw new CustomError.BadRequestError('This verification link is invalid or has expired.')
    }

    const hashedPassword = await argon2.hash(password)

    await UserQueries.updateUser({
      id: String(tkn.userId),
      password: hashedPassword
    })

    await AuthQueries.deleteToken(token)

    return res
      .status(statusCodes.OK)
      .json({
        message: "Your password has been reset. Please log in."
      })
  }
)

export const AuthController = {
  register,
  login,
  logout,
  refresh,
  me,
  verifyEmail,
  forgotPassword,
  resetPassword
}