export function generateIO(bitsInput: number) {
  const keys = Array.from({ length: 2 ** bitsInput }, (_, i) =>
    i.toString(2).padStart(bitsInput, "0"),
  );

  return Object.fromEntries(keys.map((key) => [key, ""]));
}

export function generateOI(bitsOutput: number) {
  const keys = Array.from({ length: bitsOutput }, (_, i) =>
    String.fromCharCode(97 + i),
  );

  return Object.fromEntries(keys.map((key) => [key, ""]));
}
