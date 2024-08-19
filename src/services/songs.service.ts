import { AppDataSource } from "../db";
import { Songs } from "../entities/Songs";
import { checkIfDefined } from "../utils";

const repo = AppDataSource.getRepository(Songs);

export class SongService {
    static async getAllSongs(albumId?: number) {
        const data = await repo.find({
            select: {
                songId: true,
                name: true,
                album: {
                    albumId: true,
                    albumName: true,
                }
            },
            relations: {
                album: true,
            },
            where: albumId ? { album: { albumId: albumId } } : {},
        });

        return checkIfDefined(data);
    }
}
