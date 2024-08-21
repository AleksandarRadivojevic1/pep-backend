import { NameModel } from "./name.model";


export interface ArtistModel extends NameModel{
    artistGenre : string
    artistBio : string
}