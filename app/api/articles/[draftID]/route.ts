import { NextRequest, NextResponse } from "next/server";
import { Articles } from "@/types/general";

export const PUT = async (
  req: NextRequest,
  p: { params: { draftID: string } }
) => {
  const draftID = p.params.draftID;
  const data = await req.formData();

  try {
    const request = await fetch(
      `${process.env.SERVER_URL}/articles/${draftID}`,
      {
        method: "PUT",
        body: data,
      }
    );

    const result = await request.json();
    return new Response(
      JSON.stringify({
        message: "save",
        data: result,
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "error",
        error,
      })
    );
  }
};
