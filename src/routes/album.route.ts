import { Router } from "express";
import { handleRequest } from "../utils";
import { AlbumService } from "../services/album.service";

export const AlbumRoute = Router();

AlbumRoute.get('/', async (req, res) => {
    await handleRequest(res, AlbumService.getAllAlbums());
});

