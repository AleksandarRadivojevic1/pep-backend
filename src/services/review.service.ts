import { AppDataSource } from "../db";
import { Reviews } from "../entities/Reviews";
import { checkIfDefined } from "../utils";

const repo = AppDataSource.getRepository(Reviews);

export class ReviewService {
    static async getAllReviews(albumId?: number, userId?: number) {
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
                // ...(albumId && { album: { albumId: albumId } }),
                // ...(userId && { user: { userId: userId } }),
            },
        });

        return checkIfDefined(data);
    }
}
