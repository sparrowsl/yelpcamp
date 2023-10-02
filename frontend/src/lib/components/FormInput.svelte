<script>
	export let type = "text";
	export let name = "";
	export let id = "";
	export let placeholder = "";
	export let label = "";
	export let required = true;
	export let value = "";
	/** @type {number|string} */
	export let min = 0;
	/** @type {number|string} */
	export let max = "";
</script>

<label for={id || name} class="block">
	{#if label.trim()}<span class="text-gray-600 text-sm">{label}</span>{/if}
	<input
		{type}
		{name}
		{min}
		{max}
		id={id || name}
		{placeholder}
		{required}
		{value}
		on:input={(/** @type {any} */ e) => (value = e.target.value)}
		class="{$$props.class} block rounded text-sm w-full"
	/>
</label>
