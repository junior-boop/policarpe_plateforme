export const POST = async (req: Request) => {
  const data = await req.formData();

  try {
    const request = await fetch(`${process.env.SERVER_URL}/articles`, {
      method: "POST",
      body: data,
    });

    const articleBase = await request.json();

    return new Response(
      JSON.stringify({
        message: "completed",
        data: articleBase.data,
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "il y a une erreur serveur",
        error,
      })
    );
  }
};

export const DELETE = async (req: Request) => {
  const data = await req.formData();
  const articleID = data.get("articleID");

  // console.log(articleID);

  try {
    const request = await fetch(
      `${process.env.SERVER_URL}/articles/draft/${articleID}`,
      {
        method: "DELETE",
        body: data,
      }
    );

    const articleBase = await request.json();

    return new Response(
      JSON.stringify({
        message: "deleted",
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "il y a une erreur serveur",
        error,
      })
    );
  }

  // return new Response(
  //   JSON.stringify({
  //     message: "deleted",
  //   })
  // );
};
