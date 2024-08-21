import { IsNull, Not } from "typeorm";
import { AppDataSource } from "../db";
import { Albums } from "../entities/Albums";
import { checkIfDefined } from "../utils";
import { NameModel } from "../models/name.model";


const repo = AppDataSource.getRepository(Albums)

export class AlbumService {
    static async getAllAlbums() {
        const data = await repo.find({
            select: {
                albumId: true,  
                albumImage: true,   
                albumName: true,
                releaseDate: true,
                artist: {
                    artistId: true,
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


    static async getAlbumById(id: number) {
        const data = await repo.findOne({
            select:{
                albumId: true,  
                albumImage: true,   
                albumName: true,
                releaseDate: true,
            },
            where: { 
                albumId: id 
            },

        });
        return checkIfDefined(data);
    }

    static async createAlbum(model: NameModel & { albumImage: string, releaseDate: Date, artistId: number }) {
        return await repo.save({
          albumName: model.name,
          albumImage: model.albumImage,
          releaseDate: model.releaseDate,
          artistId: model.artistId,
          createdAt: new Date(),
        });
      }

    static async updateAlbum(id: number, model: NameModel & { albumImage: string, releaseDate: Date, artistId: number}) {
        const data = await this.getAlbumById(id);
        data.albumName = model.name;
        data.albumImage = model.albumImage,
        data.releaseDate = model.releaseDate,
        data.artistId = model.artistId;

        return await repo.save(data);
    }

    static async deleteAlbum(id: number) {
        await repo.delete(id);
    }
}

