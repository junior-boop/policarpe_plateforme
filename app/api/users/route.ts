import { configProps, Users } from "@/types/general";
import { writeFileSync, readFileSync, existsSync } from "node:fs";
import { SignupFormSchema } from "../lib/definitions";
//@ts-ignore
import { v4 as uuidv4 } from "uuid";

import { PrismaClient, Projects, User } from "@prisma/client";

import * as bcrypt from "bcrypt";
import { createSession } from "@/lib/session";

const prisma = new PrismaClient();

export const GET = async (request: Request) => {
  const membres = await prisma.user.findMany();

  return new Response(JSON.stringify(membres));
};

export const POST = async (request: Request) => {
  const user = await request.formData();

  const config_data = readFileSync("config.json", {
    encoding: "utf8",
    flag: "r",
  });

  let config = JSON.parse(config_data) as configProps;
  const check_if_there_are_user = config.users.length !== 0 ? true : false;

  const validatedFields = SignupFormSchema.safeParse({
    name: user.get("name"),
    email: user.get("email"),
    password: user.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  // regarder s'il y a un utilisateur déjà enregistré
  if (!check_if_there_are_user) {
    const owner: Users = {
      Id: uuidv4(),
      name: name,
      email: email,
      password: hashedPassword,
      createdAt: new Date(),
      permission: "level 1",
      role: "owner",
      updatedAt: new Date(),
    };

    config.users.push({
      name: name as string,
      email: email as string,
      Id: owner.Id,
      role: owner.role,
    });

    // enregistrement dans la base de donnée via Prima
    const user = async () => {
      await prisma.user.create({
        data: {
          ...owner,
        } as User,
      });
    };

    user()
      .then(async () => await prisma.$disconnect())
      .catch(async (e) => {
        console.log(e);
        await prisma.$disconnect();
        process.exit(1);
      });

    await createSession(owner.Id);

    // écriture dans le fichier config.json
    writeFileSync("config.json", JSON.stringify(config, null, "\t"), "utf8");

    return new Response(
      JSON.stringify({
        state: "completed",
        User: owner,
      })
    );
  }

  return new Response(
    JSON.stringify({
      state: "completed",
    })
  );
};
