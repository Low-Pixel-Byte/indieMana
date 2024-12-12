import { Developer } from "./typesDeveloper";

export type Game = {
  id: string;
  name: string;
  bannerUrl: string;
  description: String;
  xbox: String;
  psn: String;
  nintendo: String;
  steam: String;
  discord: String;
  developer: Developer[];
};

export type GameCreate = {
  name: string;
  bannerUrl?: string;
  description?: String;
  xbox?: String;
  psn?: String;
  nintendo?: String;
  steam?: String;
  discord?: String;
  developerId: string;
};
