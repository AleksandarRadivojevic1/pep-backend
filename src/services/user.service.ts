import { AppDataSource } from "../db";
import { Users } from "../entities/Users";

const repo = AppDataSource.getRepository(Users)

export class UserService {
    static async GetAllUsers() {
        const data = repo.find({
            where: {
                // deletedAt: isNull()
            }
        })
    }
}