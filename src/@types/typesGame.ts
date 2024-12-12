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
