<script lang="ts">
  import { ioToEspresso } from "$lib/espresso/toEspresso";
  import IO from "./IO.svelte";
  import OI from "./OI.svelte";

  let inputType = "input-output";

  let bitsInput = 1;
  let bitsOutput = 1;
  let useOptimization = false;

  let ioData = {} as Record<string, string>;
  let oiData = {} as Record<string, string>;

  let errors = "";
  let inputRaw = "";
  let outputRaw = "";
  let outputBits = {} as Record<string, string[]>;
  let outputText = "";
  let complexityText = "";

  async function getCoffee() {
    const espressoData =
      inputType === "input-output"
        ? ioToEspresso(ioData, bitsOutput)
        : ioToEspresso(ioData, bitsOutput);

    const res = await fetch("/api", {
      method: "POST",
      body: JSON.stringify({
        data: espressoData,
        useOptimization,
      }),
    });

    if (res.ok) {
      const { input, raw, bits, text, complexity } = await res.json();

      inputRaw = input;
      outputRaw = raw;
      outputBits = bits;
      outputText = text;
      complexityText = `OR: ${complexity.orGates}\nAND: ${complexity.andGates}\nWires: ${complexity.wires}`;
    } else {
      errors = await res.text();
    }
  }
</script>

<main class="flex flex-col items-center gap-4 p-8">
  <h1 class="text-3xl font-bold">☕️ Espresso Generator</h1>

  <p>
    <a
      href="https://github.com/Leomotors/espresso-generator"
      target="_blank"
      rel="noreferrer"
    >
      GitHub Link
    </a>
  </p>

  <div class="flex gap-4">
    <div>
      <label for="bits-input">Bits Input</label>
      <input
        id="bits-input"
        type="number"
        class="input"
        min="1"
        max="26"
        bind:value={bitsInput}
      />
    </div>

    <div>
      <label for="bits-output">Bits Output</label>
      <input
        id="bits-output"
        type="number"
        class="input"
        min="1"
        max="26"
        bind:value={bitsOutput}
      />
    </div>
  </div>

  <div>
    <label for="input-type">Input Type</label>
    <select id="input-type" class="input" bind:value={inputType}>
      <option value="input-output">Input to Output</option>
      <option value="output-input" disabled>Output to Input</option>
    </select>
  </div>

  {#if inputType === "input-output"}
    <IO {bitsInput} bind:ioData />
  {:else}
    <OI {bitsOutput} bind:oiData />
  {/if}

  <div>
    <input
      id="use-optimization"
      type="checkbox"
      bind:checked={useOptimization}
    />
    <label for="use-optimization">Use Optimization</label>
  </div>

  <button on:click={getCoffee}>Get Coffee</button>

  <p class="text-red text-2xl">{errors}</p>

  <table>
    <thead>
      <tr>
        <th>Input</th>
        <th>Output</th>
        <th>Bits</th>
        <th>Formula</th>
        <th>Complexity</th>
      </tr>
    </thead>

    <tbody>
      <tr class="whitespace-pre-line text-start">
        <td>{inputRaw}</td>
        <td>{outputRaw}</td>
        <td
          >{Object.entries(outputBits)
            .map(([key, val]) => `${key} = ${val.join(", ")}`)
            .join("\n")}</td
        >
        <td>{outputText}</td>
        <td>{complexityText}</td>
      </tr>
    </tbody>
  </table>
</main>
