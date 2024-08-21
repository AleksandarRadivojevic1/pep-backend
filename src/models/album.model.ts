import { NameModel } from './name.model';

export interface AlbumModel extends NameModel {
    albumId: number;
    albumImage: string;
    releaseDate: Date;
    artistId: number;
}