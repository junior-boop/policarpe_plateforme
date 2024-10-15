import { createSession } from "@/lib/session";
import { ApiResponse } from "@/types/general";

export const GET = async (req: Request) => {};

export const POST = async (req: Request) => {
  const data = (await req.formData()).get("email");

  const request = await fetch(`${process.env.SERVER_URL}/auteurs`, {
    cache: "no-cache",
  });

  const result = (await request.json()) as ApiResponse;

  const filter = result.data.filter((el) => el.email === data)[0];
  await createSession(filter.ID);

  return new Response(
    JSON.stringify({
      state: "completed",
      data: filter,
    })
  );
};
