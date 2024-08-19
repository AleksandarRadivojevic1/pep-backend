import { IsNull, Not } from "typeorm";
import { AppDataSource } from "../db";
import { Albums } from "../entities/Albums";
import { checkIfDefined } from "../utils";


const repo = AppDataSource.getRepository(Albums)

export class AlbumService {
    static async getAllAlbums() {
        const data = await repo.find({
            select: {
                albumId: true,
                albumName: true,
                artistId: true,
                artist: {
                    artistName: true
                },
            },
            relations: {
                artist: true,
                reviews: true,
                songs: true,
            },
            where: {
                // Kasnije implementirati filtriranje
            },
        });

        return checkIfDefined(data);
    }
}