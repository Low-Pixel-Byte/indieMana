import { Category } from "@prisma/client";
import { Developer } from "./typesDeveloper";

export type Game = {
  id: number;
  name: string;
  description: string;
  xboxUrl?: string;
  googlePlayUrl?: string;
  psnUrl?: string;
  nintendoUrl?: string;
  steamUrl?: string;
  bannerUrl: string;
  discord?: string;
  dateRelease: Date;
  trailerUrl: string;
  achivents: boolean;
  developers: Developer[];
  categories: Category[];
};

export type GameCreate = {
  name: string;
  description: string;
  xboxUrl?: string;
  googlePlayUrl?: string;
  psnUrl?: string;
  nintendoUrl?: string;
  steamUrl?: string;
  bannerUrl: string;
  discord?: string;
  dateRelease: Date;
  trailerUrl?: string;
  achivents: boolean;
  developers: string[];
  categories: number[];
};
