import { generateFullEspresso, ioToEspresso } from "./toEspresso";

export function optimize(espresso: string) {
  const lines = espresso.split("\n");
  const raw = lines.slice(5, lines.length - 1);

  const bitsOutput = raw[0].split(" ")[1].length;

  const espressoes = [] as string[];

  for (let i = 0; i < bitsOutput; i++) {
    const ioData = {} as Record<string, string>;

    for (const [input, output] of raw.map((line) => line.split(" "))) {
      if (output[i] !== "0") {
        ioData[input] = output[i];
      }
    }

    espressoes.push(generateFullEspresso(ioToEspresso(ioData, 1)));
  }

  return espressoes;
}
