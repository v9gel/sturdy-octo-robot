import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import users from "./users.json";
import { ISearchFormInput, IUser } from "./types";

const TIMEOUT = 5000;

dotenv.config({
  path: path.join(__dirname, "..", "..", ".env"),
});

const app: Express = express();
app.use(cors());
const port = process.env.PORT_BACKEND;

app.get(
  "/search",
  (req: Request<never, never, never, ISearchFormInput>, res: Response<IUser[]>) => {
    const { email, number } = req.query;

    setTimeout(() => {
      const searchResult = (users as IUser[]).filter((user) => {
        if (user.email !== email) {
          return false;
        }

        if (number && number !== user.number) {
          return false;
        }

        return true;
      });

      res.json(searchResult);
    }, TIMEOUT);
  }
);

app.listen(port, () => {
  console.log(`Backend is running at http://localhost:${port}`);
});
