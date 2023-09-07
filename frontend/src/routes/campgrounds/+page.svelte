<script>
	/** @type {import("./$types").PageData} */
	export let data;
</script>

<h1>All Campgrounds...</h1>
<a href="/">back home</a>

<ul>
	{#each data.campgrounds as campground}
		<li><a href="/campgrounds/{campground.id}">{campground.title}</a></li>
	{/each}
</ul>
