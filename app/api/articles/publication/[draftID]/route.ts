import { NextRequest } from "next/server";

export const PUT = async (
  req: NextRequest,
  p: { params: { draftID: string } }
) => {
  const request = await fetch(
    `${process.env.SERVER_URL}/articles/publish/${p.params.draftID}`,
    {
      method: "PUT",
      body: await req.formData(),
    }
  );

  if (request.ok) {
    return new Response(
      JSON.stringify({
        message: "je suis dans la place",
      })
    );
  } else {
    return new Response(
      JSON.stringify({
        message: "il y a une erreur",
      })
    );
  }
};
