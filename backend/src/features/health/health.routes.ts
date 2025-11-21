import { Router } from "express";

import { health } from "./health.controller"

const router = Router()

router.route("/health").get(health)

export { router as healthRouter }