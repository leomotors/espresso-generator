<script lang="ts">
  import { generateIO } from "$lib/espresso/generate";

  export let bitsInput: number;

  $: ioData = generateIO(bitsInput);
</script>

<table class="border-collapse">
  <thead>
    <tr>
      <th>Input</th>
      <th>Output (Bits or abcd)</th>
    </tr>
  </thead>

  <tbody>
    {#each Object.keys(ioData).sort((a, b) => +a - +b) as input}
      <tr>
        <td>{input}</td>
        <td>
          <input class="input" type="text" bind:value={ioData[input]} />
        </td>
      </tr>
    {/each}
  </tbody>
</table>
