import { Router } from "express";
import { FallbackValidation } from "../schemas/aiSchemas.js";
import validateSchema from "../middlewares/validateSchema.js";
import { getAIFallback } from "../controllers/ai.js";

const aiRouter = Router();

aiRouter
  .route("/fallback")
  .post(validateSchema(FallbackValidation), getAIFallback);

export default aiRouter;
