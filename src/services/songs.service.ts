import { IsNull, Not } from "typeorm";
import { AppDataSource } from "../db";
import { Songs } from "../entities/Songs";






const repo = AppDataSource.getRepository(Songs)


export class SongsService {
    static async getAllSongs() {
        const data = await repo.find({
            where: {
                name: Not(IsNull())
            }
        })
        
        
        return data;
    } catch(e) {

        console.error('Error retrieving songs:', e);
    }
}