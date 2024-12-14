import { Category } from "@prisma/client";
import { Developer } from "./typesDeveloper";

export type Game = {
  id: number;
  name: string;
  description: String;
  xboxUrl?: String;
  googlePlayUrl?: String;
  psnUrl?: String;
  nintendoUrl?: String;
  steamUrl?: String;
  bannerUrl: String;
  discord?: String;
  dateRelease: Date;
  trailerUrl: String;
  achivents: Boolean;
  developers: Developer[];
  categories: Category[];
};

export type GameCreate = {
  name: string;
  description: String;
  xboxUrl?: String;
  googlePlayUrl?: String;
  psnUrl?: String;
  nintendoUrl?: String;
  steamUrl?: String;
  bannerUrl: String;
  discord?: String;
  dateRelease: Date;
  trailerUrl?: String;
  achivents: Boolean;
  developers: Developer[];
  categories: Category[];
};
