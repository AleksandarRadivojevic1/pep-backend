import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { configDotenv } from 'dotenv';
import { AppDataSource } from './db';
import { UserService } from './services/user.service';
import { AlbumService } from './services/album.service';
import { SongService } from './services/songs.service';
import { ArtistService } from './services/arist.service';
import { UserRoleService } from './services/user.role.service';



const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

configDotenv();
AppDataSource.initialize()
  .then(() => {
    console.log("Connected to Database!");
    const port = process.env.SERVER_PORT || 4000;

    app.listen(port, () => {
      console.log("App started and listening on " + port);
    });
  })
  .catch((e) => console.log(e));

app.get('/', async (req, res) => {
  res.json(await UserRoleService.getAllUserRoles());
});

app.get('*', (req, res) => {
  res.status(404).json({
    message: "Not found!"
  });
});


