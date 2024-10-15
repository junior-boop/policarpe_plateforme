import { configProps, Users } from "@/types/general";
import { writeFileSync, readFileSync, existsSync } from "node:fs";
import { SigninFormSchema } from "../lib/definitions";
//@ts-ignore
import { v4 as uuidv4 } from "uuid";

import { PrismaClient, Projects, User } from "@prisma/client";

import * as bcrypt from "bcrypt";
import { createSession } from "@/lib/session";

const prisma = new PrismaClient();

export const POST = async (request: Request) => {
  const user = await request.formData();

  const validatedFields = SigninFormSchema.safeParse({
    email: user.get("email"),
    password: user.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  const newconnection = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  const hashedPassword = await bcrypt.compare(
    password,
    newconnection?.password as string
  );

  if (hashedPassword) {
    await createSession(newconnection?.Id as string);

    return new Response(
      JSON.stringify({
        state: "completed",
        user: newconnection,
      })
    );
  }

  return new Response(
    JSON.stringify({
      state: "failed",
    })
  );
};
