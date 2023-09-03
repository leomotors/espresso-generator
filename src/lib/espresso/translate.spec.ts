import { describe, it, expect } from "vitest";

import { translate } from "./translate";

describe("translate", () => {
  it("7 segment", () => {
    expect(
      translate(`.i 4
.o 7
.ilb A B C D
.ob a b c d e f g
.p 9
-0-0 1001100
-0-1 0110000
--10 1001100
-01- 0101001
-1-0 0010011
--11 1110000
--00 0110010
-101 1011011
1--- 1001011
.e`),
    ).toMatchSnapshot();
  });
});
