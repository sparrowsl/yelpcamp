<script>
	/** @type {"submit"|"reset"|"button"} */
	export let type = "submit";
</script>

<button
	{type}
	class="{$$props.class} block bg-gray-800 text-white rounded-sm text-sm py-2 px-6"
	on:click
>
	<slot>Click Me</slot>
</button>
