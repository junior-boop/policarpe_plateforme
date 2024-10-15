export const GET = async () => {
  const request = await fetch(`${process.env.SERVER_URL}/image`, {
    cache: "no-store",
  });
  const result = await request.json();

  return new Response(
    JSON.stringify({
      message: "all images",
      statut: 1,
      data: result.data,
    })
  );
};
