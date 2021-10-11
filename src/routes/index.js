import express from "express"

import healthRouter from "./healthRouter"
// Don't forget to import new routers above

const router = express.Router()

router.use("/health", healthRouter)
router.use("/games", gameRouter)

export default router
