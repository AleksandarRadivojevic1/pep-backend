import { Router } from "express";
import { handleRequest } from "../utils";
import { SongService } from "../services/songs.service";

export const SongRoute = Router();

SongRoute.get('/', async (req, res) => {
    await handleRequest(res, SongService.getAllSongs());
});