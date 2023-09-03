<script lang="ts">
  import IO from "./IO.svelte";
  import OI from "./OI.svelte";

  let inputType = "input-output";

  let bitsInput = 1;
  let bitsOutput = 1;
</script>

<main class="flex flex-col items-center gap-4 p-8">
  <h1 class="text-3xl font-bold">☕️ Espresso Generator</h1>

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
      <option value="output-input">Output to Input</option>
    </select>
  </div>

  {#if inputType === "input-output"}
    <IO {bitsInput} />
  {:else}
    <OI {bitsOutput} />
  {/if}
</main>
