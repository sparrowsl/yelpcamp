<script>
	export let type = "text";
	export let name = "";
	export let id = "";
	export let placeholder = "";
	export let label = "";
	export let required = true;
	export let value = "";
</script>

<label for={id || name} class="block">
	{#if label.trim()}<span>{label}</span>{/if}
	<input
		{type}
		{name}
		id={id || name}
		{placeholder}
		{required}
		{value}
		on:input={(/** @type {any} */ e) => (value = e.target.value)}
		class="{$$props.class} block rounded text-sm"
	/>
</label>
