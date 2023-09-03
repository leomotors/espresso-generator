import type { RequestHandler } from "@sveltejs/kit";

export const POST = (async () => {
  return new Response();
}) satisfies RequestHandler;
