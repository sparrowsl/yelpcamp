<script>
	/** @type {import("./$types").PageData} */
	export let data;
</script>

<h1 class="text-3xl font-bold">All Campgrounds...</h1>
<a href="/campgrounds/new" class="text-blue underline mb-2 block">Add Campground</a>

<ul class="list-disc list-inside pl-4">
	{#each data.campgrounds as campground}
		<li>
			<a class="underline text-blue-500" href="/campgrounds/{campground.id}">{campground.title}</a>
		</li>
	{/each}
</ul>
