function bitsToText(bits: string) {
  let text = "";

  for (let i = 0; i < bits.length; i++) {
    if (bits[i] === "1") {
      text += String.fromCharCode(65 + i);
    } else if (bits[i] === "0") {
      text += String.fromCharCode(65 + i) + "'";
    }
  }

  return text;
}

function countTerms(bits: string) {
  return bits.split("").filter((bit) => bit !== "-").length;
}

export function translate(text: string) {
  const lines = text.split("\n");

  let line = 5 - 1;

  const outputCircuit = {} as Record<number, string[]>;

  while (++line < lines.length) {
    if (lines[line].startsWith(".")) {
      break;
    }

    const [input, output] = lines[line].split(" ");

    for (let i = 0; i < output.length; i++) {
      if (output[i] === "1") {
        outputCircuit[i] ??= [];
        outputCircuit[i].push(input);
      }
    }
  }

  const outputText = Object.entries(outputCircuit)
    .map(
      ([key, value]) =>
        `${String.fromCharCode(97 + Number(key))} = ${value
          // This mutate outputCircuit
          .sort((a, b) => countTerms(a) - countTerms(b))
          .map(bitsToText)
          .join(" + ")}`,
    )
    .join("\n");

  return {
    raw: text,
    bits: outputCircuit,
    text: outputText,
  };
}
