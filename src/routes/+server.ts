import { json, type RequestHandler } from "@sveltejs/kit";
import { execute } from "$lib/server/exec";
import { translate, translateMultiple } from "$lib/espresso/translate";
import { optimize } from "$lib/espresso/optimize";
import { generateFullEspresso } from "$lib/espresso/toEspresso";

const espressoPath = process.env.ESPRESSO_PATH ?? "espresso-ubuntu";

export const POST = (async ({ request }) => {
  const { data, useOptimization } = await request.json();

  const input = generateFullEspresso(data);

  if (!useOptimization) {
    const stdout = await execute(`espresso/${espressoPath}`, input);
    return json({ input, ...translate(stdout) });
  } else {
    const inputs = optimize(input);

    const outputs = await Promise.all(
      inputs.map((input) => execute(`espresso/${espressoPath}`, input)),
    );

    return json({ input, ...translateMultiple(outputs) });
  }
}) satisfies RequestHandler;
