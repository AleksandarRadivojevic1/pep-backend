import { IsNull, Not } from "typeorm";
import { AppDataSource } from "../db";
import { Users } from "../entities/Users";

const repo = AppDataSource.getRepository(Users)

export class UserService {
    static async getAllUsers() {
        const data = await repo.find({
            where: {
                email: Not(IsNull())
            }
        })
        
        
        return data;
    } catch(e) {

        console.error('Error retrieving users:', e);
    }
}