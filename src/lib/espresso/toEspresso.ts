import { z } from "zod";

function bitsORabcdToBits(bitsORabcd: string, bitsOutput: number) {
  if (bitsORabcd === "-" || !bitsORabcd) {
    return "-".repeat(bitsOutput);
  }

  bitsORabcd = bitsORabcd.toLowerCase();

  if (!bitsORabcd.match(/[a-z]/)) {
    return bitsORabcd.padEnd(bitsOutput, "0");
  }

  return Array.from({ length: bitsOutput }, (_, i) =>
    bitsORabcd.includes(String.fromCharCode(97 + i)) ? "1" : "0",
  ).join("");
}

export function ioToEspresso(
  ioData: Record<string, string>,
  bitsOutput: number,
): [string, string][] {
  return Object.entries(ioData)
    .sort((a, b) => +a[0] - +b[0])
    .map(([key, value]) => [key, bitsORabcdToBits(value, bitsOutput)]);
}

const EspressoSchema = z.array(
  z.tuple([z.string().regex(/^[01]+$/), z.string().regex(/^[01-]+$/)]),
);

export function generateFullEspresso(data: [string, string][]) {
  EspressoSchema.parse(data);

  const bitsInput = data[0][0].length;
  const bitsOutput = data[0][1].length;

  const inputLabel = Array.from({ length: bitsInput }, (_, i) =>
    String.fromCharCode(65 + i),
  ).join(" ");

  const outputLabel = Array.from({ length: bitsOutput }, (_, i) =>
    String.fromCharCode(97 + i),
  ).join(" ");

  return `.i ${bitsInput}
.o ${bitsOutput}
.ilb ${inputLabel}
.ob ${outputLabel}
.p ${data.length}
${data.map(([input, output]) => `${input} ${output}`).join("\n")}
.e`;
}
