<script>
	export let name = "";
	export let id = "";
	export let placeholder = "";
	export let label = "";
	export let required = true;
	export let value = "";
</script>

<label for="description" class="block">
	{#if label.trim()}<span class="text-gray-600 text-sm">{label}</span>{/if}
	<textarea
		{name}
		id={id || name}
		class="{$$props.class} block rounded w-full min-h-24 max-h-50 text-sm"
		{placeholder}
		{required}
		{value}
		on:input={(/** @type {any} */ e) => (value = e.target.value)}
	></textarea>
</label>
