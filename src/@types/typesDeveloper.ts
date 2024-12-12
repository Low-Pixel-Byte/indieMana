export type Developer = {
  id: string;
  name: string;
  email: string;
  website: string;
  twitter: string;
  instagram: string;
  about: string;
};

export type DeveloperCreate = {
  name: string;
  email?: string;
  website?: string;
  twitter?: string;
  instagram?: string;
  about?: string;
};
