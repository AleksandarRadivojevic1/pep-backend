import { IsNull, Not } from "typeorm";
import { AppDataSource } from "../db";
import { Albums } from "../entities/Albums";


const repo = AppDataSource.getRepository(Albums)

export class AlbumService {
    static async getAllAlbums() {
        const data = await repo.find({
            where: {
                albumId: Not(IsNull())
            }
        })
        
        
        return data;
    } catch(e) {

        console.error('Error retrieving albums:', e);
    }
}