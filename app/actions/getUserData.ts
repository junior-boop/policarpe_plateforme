"use server";

import { PrismaClient } from "@prisma/client";
import projects from "../../projects.json";
import { Auteur } from "@/types/general";
const prisma = new PrismaClient();

interface User extends Auteur {
  ID: string;
  createdAt: string;
  updatedAt: string;
}

export async function getUserData(params: { user: string }) {
  const user = params.user;
  const userId = user.split("_")[1];
  const request = await fetch(`${process.env.SERVER_URL}/auteurs/${userId}`, {
    cache: "no-cache",
  });
  const auteurs = (await request.json()) as { message: string; data: User };

  return { user: auteurs.data };
}
