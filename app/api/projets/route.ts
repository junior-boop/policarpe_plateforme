export const GET = async () => {
  const request = await fetch(`${process.env.SERVER_URL}/count`, {
    cache: "no-store",
  });
  const request_2 = await fetch(`${process.env.SERVER_URL}/lock`, {
    cache: "no-store",
  });

  const data = await request.json();
  const lock = await request_2.json();

  return new Response(
    JSON.stringify({
      message: "nombre",
      data,
      lock,
    })
  );
};
