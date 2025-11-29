import type { Request, Response, NextFunction } from "express";

import { CustomError } from "@/lib/api-error";
import { AuthService, TokenPayload } from "@/features/auth/auth.service";
import { statusCodes } from "@/config/http-status-codes";
import { UserQueries } from "@/features/user/user.queries";

export async function authentication(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new CustomError.UnauthorizedError('You need to login to continue.')
  }

  const accessToken = authHeader.split(' ')[1]
  let payload: TokenPayload
  try {
    payload = AuthService.verifyAccessToken(accessToken)
  } catch (error) {
    return res.status(statusCodes.UNAUTHORIZED).json({
      message: "Your session has expired. Please login again."
    })
  }

  const user = await UserQueries.getUserById(payload.id)
  console.log(user);
  
  if (!user) {
    return res.status(statusCodes.UNAUTHORIZED).json({
      message: "Please login again to continue."
    })
  }

  req.user = user
  next()
}

