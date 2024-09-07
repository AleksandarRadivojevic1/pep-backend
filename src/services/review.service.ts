import { AppDataSource } from "../db";
import { Reviews } from "../entities/Reviews";
import { ReviewModel } from "../models/review.model";
import { checkIfDefined } from "../utils";

const repo = AppDataSource.getRepository(Reviews);

export class ReviewService {
    static async getAllReviews() {
        const data = await repo.find({
            select: {
                reviewId: true,
                rating: true,
                reviewText: true,
                moderationStatus: true,
                album: {
                    albumId: true,
                    albumName: true,
                },
                user: {
                    userId: true,
                    username: true,
                }
            },
            relations: {
                album: true,
                user: true,
            },
            where: {

            },
        });

        return checkIfDefined(data);
    }

    static async getReviewById(id: number) {
        const data = await repo.findOne({
            select:{
                reviewId: true,  
                rating: true,   
                reviewText: true,
                moderationStatus: true,
            },
            where: { 
                reviewId: id 
            },

        });
        return checkIfDefined(data);
    }

    static async createReview(model: ReviewModel){
        return await repo.save({
            rating: model.rating,
            reviewText: model.reviewText,
        });
    }


    static async updateReview(id : number, model:ReviewModel){
        const data = await this.getReviewById(id);
        data.rating = model.rating;
        data.reviewText = model.reviewText;

        return await repo.save(data);
    }


    static async deleteReview(id:number){
        await repo.delete(id);
    }
}
