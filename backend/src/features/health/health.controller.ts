import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";

import type { Request, Response } from "express";

/*
    GET /api/v1/health - GET Health
*/
export async function health(req: Request, res: Response) {
  try {
    const status = mongoose.connection.readyState === 1

    if (!status) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "Database connection failed!"
      })
    }

    return res.status(StatusCodes.OK).json({
      message: "Server Active."
    })
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Failed to fetch health status!"
    })
  }
}