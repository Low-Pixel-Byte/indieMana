import { Game } from "./typesGame";

export type Developer = {
  id: string;
  name: string;
  email: string;
  website: string;
  twitter: string;
  instagram: string;
  about: string;
  games?: Game[];
};

export type DeveloperCreate = {
  name: string;
  email?: string;
  website?: string;
  twitter?: string;
  instagram?: string;
  about?: string;
};
