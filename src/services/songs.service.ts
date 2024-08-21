import { AppDataSource } from "../db";
import { Songs } from "../entities/Songs";
import { NameModel } from "../models/name.model";
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


    static async getSongById(id: number) {
        const data = await repo.findOne({
            select:{
                songId: true,  
                name: true,   
                albumId: true,
            
            },
            where: { 
                songId: id 
            },

        });
        return checkIfDefined(data);
    }

    static async createSong(model: NameModel){
        return await repo.save({
            name : model.name
        })
    }

    static async updateSong(id: number, model: NameModel ) {
        const data = await this.getSongById(id);
        data.name = model.name;
        return await repo.save(data);
    }

    static async deleteSong(id: number) {
        await repo.delete(id);
    }
}

