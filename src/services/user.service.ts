
import { AppDataSource } from "../db";
import { Users } from "../entities/Users";
import { checkIfDefined } from "../utils";

const repo = AppDataSource.getRepository(Users)

export class UserService{
    static async getAllUsers() {
        const data = await repo.find({
            select: {
                userId: true,
                username: true,
                email:true,
                active: true,
                createdAt: true,
                userRoleId: true
            },
            where: {
                active: true
            },
        });

        return checkIfDefined(data)
    }
}