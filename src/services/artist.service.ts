import { AppDataSource } from "../db";
import { Artists } from "../entities/Artists";
import { NameModel } from "../models/name.model";
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


    static async getArtistById(id: number) {
        const data = await repo.findOne({
            select:{
                artistId: true,
                artistName: true,
                artistGenre: true,
                artistBio: true
            },
            where: { 
                artistId: id 
            }
        });
        
        return checkIfDefined(data);
    }

    static async createArtist(model: NameModel) {
        return await repo.save({
            artistName: model.name
        });
    }

    static async updateArtist(id: number, model: NameModel) {
        const data = await this.getArtistById(id);
        data.artistName = model.name;
        return await repo.save(data);
    }

    static async deleteArtist(id: number) {
        await repo.delete(id);
    }
}



