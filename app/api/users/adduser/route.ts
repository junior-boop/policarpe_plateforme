import { configProps, Users } from "@/types/general";
import { writeFileSync, readFileSync, existsSync } from "node:fs";
import { AddUserFormSchema } from "../../lib/definitions";
//@ts-ignore
import { v4 as uuidv4 } from "uuid";

import { PrismaClient, Projects, User } from "@prisma/client";

import * as bcrypt from "bcrypt";

type Permission = "level 1" | "level 2";
type Role = "owner" | "admin" | "editor" | "moderator";

const prisma = new PrismaClient();

export const POST = async (request: Request) => {
  const user = await request.formData();

  const config_data = readFileSync("config.json", {
    encoding: "utf8",
    flag: "r",
  });

  let config = JSON.parse(config_data) as configProps;

  const validatedFields = AddUserFormSchema.safeParse({
    name: user.get("name"),
    email: user.get("email"),
    password: user.get("password"),
    role: user.get("role"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password, role } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const permission: Permission = role === "admin" ? "level 1" : "level 2";

  const userData: Users = {
    Id: uuidv4(),
    name: name,
    email: email,
    password: hashedPassword,
    createdAt: new Date(),
    permission: permission,
    role: role as Role,
    updatedAt: new Date(),
  };

  config.users.push({
    name: name as string,
    email: email as string,
    Id: userData.Id,
    role: userData.role,
  });

  //   enregistrement dans la base de donnée via Prima
  const save = async () => {
    await prisma.user.create({
      data: {
        ...userData,
      } as User,
    });
  };

  save()
    .then(async () => await prisma.$disconnect())
    .catch(async (e) => {
      console.log(e);
      await prisma.$disconnect();
      process.exit(1);
    });

  // écriture dans le fichier config.json
  writeFileSync("config.json", JSON.stringify(config, null, "\t"), "utf8");

  const res = new Response(
    JSON.stringify({
      state: "completed",
      User: userData,
    })
  );

  console.log(res.status);

  return res;
};
