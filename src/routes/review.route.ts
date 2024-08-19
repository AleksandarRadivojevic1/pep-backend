import { Router } from "express";
import { handleRequest } from "../utils";
import { ReviewService } from "../services/review.service";

export const ReviewRoute = Router();

ReviewRoute.get('/', async (req, res) => {
    await handleRequest(res, ReviewService.getAllReviews());
});