import { IsNull, Not } from "typeorm";
import { AppDataSource } from "../db";
import { Artists } from "../entities/Artists";

const repo = AppDataSource.getRepository(Artists)

export class ArtistService {
    static async getAllArtists() {
        const data = await repo.find({
            where: {
                artistName: Not(IsNull())
            }
        })
        
        
        return data;
    } catch(e) {

        console.error('Error retrieving artists:', e);
    }
}