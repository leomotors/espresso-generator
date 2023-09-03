import { json, type RequestHandler } from "@sveltejs/kit";
import { exec } from "$lib/server/exec";
import { translate } from "$lib/espresso/translate";

const espressoPath = process.env.ESPRESSO_PATH ?? "espresso-ubuntu";

export const POST = (async ({ request }) => {
  const { input } = await request.json();

  const { stdout } = await exec(`echo "${input}" | espresso/${espressoPath}`);

  return json(translate(stdout));
}) satisfies RequestHandler;
