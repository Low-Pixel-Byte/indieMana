import { Game } from "./typesGame";

export type Category = {
  id: string;
  name: string;
  games?: Game[];
};

export type CategoryCreate = {
  name: string;
};
