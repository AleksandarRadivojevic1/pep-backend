import { Router } from "express";
import { ArtistService } from "../services/artist.service";
import { handleRequest } from "../utils";





export const ArtistRoute = Router();

ArtistRoute.get('/', async (req, res) => {
    await handleRequest(res, ArtistService.getAllArtists());
});
