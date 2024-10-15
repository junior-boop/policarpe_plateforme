export const GET = async () => {
  const request = await fetch(`${process.env.SERVER_URL}/articles/draft`, {
    cache: "no-store",
  });
  const article = await request.json();

  return new Response(
    JSON.stringify({
      statut: "completed",
      data: article,
    })
  );
};

export const PUT = async (req: Request) => {
  const url = new URL(req.url);
  const params = url.searchParams;

  console.log(params);

  return new Response(
    JSON.stringify({
      message: "text",
    })
  );
};
