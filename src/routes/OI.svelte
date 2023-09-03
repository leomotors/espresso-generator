<script lang="ts">
  import { generateOI } from "$lib/espresso/generate";

  export let bitsOutput: number;

  $: oiData = generateOI(bitsOutput);
</script>

<table class="border-collapse">
  <thead>
    <tr>
      <th>Output</th>
      <th>Input (Decimal seperated by comma)</th>
    </tr>
  </thead>

  <tbody>
    {#each Object.keys(oiData).sort((a, b) => +a - +b) as input}
      <tr>
        <td>{input}</td>
        <td>
          <input class="input" type="text" bind:value={oiData[input]} />
        </td>
      </tr>
    {/each}
  </tbody>
</table>
