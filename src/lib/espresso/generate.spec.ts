import { describe, it, expect } from "vitest";
import { generateIO, generateOI } from "./generate";

describe("generate", () => {
  it("generateIO", () => {
    expect(generateIO(2)).toMatchSnapshot();
    expect(generateIO(3)).toMatchSnapshot();
    expect(generateIO(4)).toMatchSnapshot();
  });

  it("generateOI", () => {
    expect(generateOI(2)).toMatchSnapshot();
    expect(generateOI(3)).toMatchSnapshot();
    expect(generateOI(4)).toMatchSnapshot();
  });
});
