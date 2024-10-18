// Ce fichier contient tous les types de base des fichers de base "config.js" et "projets.json"

import { imageData } from "@/app/dashboard/[user]/components/imagePicker";

export type FirebaseKeyProps = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
};

export type Projects = {
  Id: string;
  name: string;
  description: string;
  projectId: string;
  firebaseConfig: FirebaseKeyProps;
  createdAt: Date;
  updatedAt: Date;
  membres: {
    userId: string;
    userName: string;
    userRole: string;
  }[];
  lastUpdatedBy: {
    users: string;
    updatedAt: Date;
  }[];
  createdBy: {
    userId: string;
    userName: string;
    userRole: string;
  };
  membre_nbre: number;
};

export interface Auteur {
  name: string;
  surname: string;
  email: string;
  tel: string;
  socialNetwork: string;
  password: string;
}

export interface Articles {
  ID?: string;
  titre: string;
  slug: string;
  contenu: string;
  image: string;
  rubriqueID: string;
  auteurID: string;
  createdAt?: string;
  updatedAt?: string;
  articleID?: string;
  Auteur?: Auteur;
  rubrique?: Rubrique;
  article?: Articles;
  images?: imageData;
}

export interface Audio {
  ID?: string;
  name: string;
  format: string;
  taille: number;
  createdAt: Date;
  metadata: string;
  url: string;
  Podcast: Podcasts[];
  PodcastDraft: Podcasts[];
}

export interface Podcasts {
  ID?: string;
  titre: string;
  slug: string;
  contenu: string;
  image: string;
  audioID: string;
  auteurID: string;
  createdAt?: string;
  updatedAt?: string;
  podcastID?: string;
  Auteur?: Auteur;
  audio?: Audio;
  podcast?: Podcasts;
  images?: imageData;
}

export interface ApiResponse {
  message: string;
  data: User[];
}

export interface User {
  ID: string;
  name: string;
  surname: string;
  email: string;
  tel: string;
  password: string;
  socialNetwork: string;
  createdAt: string;
  updatedAt: string;
}

interface Rubrique {
  ID: string;
  name: string;
  slug: string;
}
