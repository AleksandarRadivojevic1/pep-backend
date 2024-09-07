import { Router } from "express";
import { UserService } from "../services/user.service";
import { handleRequest } from "../utils";


export const UserRoute = Router();

UserRoute.get('/', async (req, res) => {
    await handleRequest(res, UserService.getAllUsers());
});