import mongoose from "mongoose";

import type { Request, Response } from "express";

import { statusCodes } from "@/config/http-status-codes";
import { CustomError } from "@/lib/api-error";

/*
    GET /api/v1/health - GET Health
*/
export async function health(req: Request, res: Response) {
  try {
    const status = mongoose.connection.readyState === 1
    
    if (!status) {
      throw new CustomError.InternalServerError('Database connection failed.')
    }

    return res.status(statusCodes.OK).json({
      message: "Server Active."
    })
  } catch (error) {
    console.log('[HEALTH_ERROR] : ', error);
    throw new CustomError.InternalServerError('Failed to fetch health status.')
  }
}