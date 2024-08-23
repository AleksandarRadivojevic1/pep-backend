import { NameModel } from './name.model';

export interface AlbumModel extends NameModel {
    albumId: number;
    albumImage: string;
    albumGenre: string;
    releaseDate: Date;
    artistId: number;
}