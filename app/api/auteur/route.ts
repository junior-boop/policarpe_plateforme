import { createSession } from "@/lib/session";

export const GET = async (req: Request) => {
  const request = await fetch(`${process.env.SERVER_URL}/auteurs`, {
    cache: "no-store",
  });

  const result = await request.json();
  return new Response(
    JSON.stringify({
      state: "completed",
      data: result.data,
    })
  );
};

export const POST = async (request: Request) => {
  const data = await request.formData();
  const sendData = await fetch(`${process.env.SERVER_URL}/auteurs`, {
    method: "POST",
    body: data,
  });

  const dataresult = await sendData.json();

  await createSession(dataresult.data.ID);

  return new Response(
    JSON.stringify({
      state: "completed",
      data: dataresult.data,
    })
  );
};
