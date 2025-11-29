import { Router } from "express";

import { validation } from "@/middlewares/validation";
import { authentication } from "@/middlewares/authentication";

import { AuthController } from "./auth.controller";
import { AuthSchema } from "./auth.schema";

const router = Router()

router
  .route('/auth/register')
  .post(
    validation(
      AuthSchema.registerSchema
    ),
    AuthController.register
  )

router
  .route('/auth/login')
  .post(
    validation(
      AuthSchema.loginSchema
    ),
    AuthController.login
  )

router
  .route('/auth/email/verify')
  .post(
    AuthController.verifyEmail
  )

router
  .route('/auth/password/forgot')
  .post(
    validation(
      AuthSchema.forgotPasswordSchema
    ),
    AuthController.forgotPassword
  )

router
  .route('/auth/password/reset')
  .post(
    validation(
      AuthSchema.resetPasswordSchema
    ),
    AuthController.resetPassword
  )

router
  .route('/auth/logout')
  .post(
    authentication,
    AuthController.logout
  )

router
  .route('/auth/me')
  .get(
    authentication,
    AuthController.me
  )

export { router as AuthRouter }