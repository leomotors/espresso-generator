import { json, type RequestHandler } from "@sveltejs/kit";
import { exec } from "$lib/server/exec";
import { translate, translateMultiple } from "$lib/espresso/translate";
import { optimize } from "$lib/espresso/optimize";

const espressoPath = process.env.ESPRESSO_PATH ?? "espresso-ubuntu";

export const POST = (async ({ request }) => {
  const { input, useOptimization } = await request.json();

  if (!useOptimization) {
    const { stdout } = await exec(`echo "${input}" | espresso/${espressoPath}`);
    return json(translate(stdout));
  } else {
    const inputs = optimize(input);

    const outputs = (
      await Promise.all(
        inputs.map((input) =>
          exec(`echo "${input}" | espresso/${espressoPath}`),
        ),
      )
    ).map((o) => o.stdout);

    return json(translateMultiple(outputs));
  }
}) satisfies RequestHandler;
