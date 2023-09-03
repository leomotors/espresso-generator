import { describe, it, expect } from "vitest";
import { ioToEspresso } from "./toEspresso";

describe("toEspresso", () => {
  it("IO", () => {
    expect(
      ioToEspresso(
        {
          "0000": "ABCDEF",
          "0001": "BC",
          "0010": "ACDEG",
          "0011": "ABCDG",
          "0100": "BCFG",
          "0101": "ACDFG",
          "0110": "ACDEFG",
          "0111": "ABC",
          "1000": "ABCDEFG",
          "1001": "ABCDFG",
          "1010": "-",
          "1011": "-",
          "1100": "-",
          "1101": "-",
          "1110": "-",
          "1111": "-",
        },
        7,
      ),
    ).matchSnapshot();
  });

  it("OI", () => {});
});
