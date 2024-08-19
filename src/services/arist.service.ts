import { AppDataSource } from "../db";
import { Artists } from "../entities/Artists";
import { checkIfDefined } from "../utils";

const repo = AppDataSource.getRepository(Artists);

export class ArtistService {
    static async getAllArtists(artistName?: string) {
        const data = await repo.find({
            select: {
                artistId: true,
                artistName: true,
                artistGenre: true,
                artistBio: true,
                albums: {
                    albumId: true,
                    albumName: true,
                }
            },
            relations: {
                albums: true,
            },
            where: artistName ? { artistName: artistName } : {},
        });

        return checkIfDefined(data);
    }
}
