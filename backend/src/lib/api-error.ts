import type { Response } from "express"

import { statusCodes } from "@/config/http-status-codes"

export class ApiError extends Error {
  statusCode: number
  constructor(statusCode: number, message: string) {
    super(message)
    this.statusCode = statusCode

    Object.setPrototypeOf(this, new.target.prototype)
    Error.captureStackTrace(this, this.constructor)
  }

  static handle(err: ApiError, res: Response) {
    return res.status(err.statusCode || statusCodes.INTERNAL_SERVER_ERROR).json({
      message: err.message || 'Internal Server Error'
    })
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string = "Bad Request") {
    super(statusCodes.BAD_REQUEST, message)
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string = "Unauthorized") {
    super(statusCodes.UNAUTHORIZED, message)
  }
}

export class ForbiddenError extends ApiError {
  constructor(message: string = "Forbidden") {
    super(statusCodes.FORBIDDEN, message)
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string = "Not Found") {
    super(statusCodes.NOT_FOUND, message)
  }
}

export class TooManyRequestsError extends ApiError {
  constructor(message: string = "Too Many Requests Error") {
    super(statusCodes.TOO_MANY_REQUESTS, message)
  }
}

export class InternalServerError extends ApiError {
  constructor(message: string = "Internal Server Error") {
    super(statusCodes.INTERNAL_SERVER_ERROR, message)
  }
}

export const CustomError = {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  TooManyRequestsError,
  InternalServerError
}