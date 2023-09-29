<script>
	import Button from "$lib/components/Button.svelte";

	/** @type {import("./$types").PageData} */
	export let data;
	const { campground } = data;
</script>

<section>
	<h1 class="font-bold text-3xl">{campground.title}</h1>
	<p class="text-xl">{campground.location}</p>
	<img src={campground.image} alt={campground.title} />
	<p>{campground.description}</p>

	<a href="/campgrounds/{campground.id}/edit">Edit campground</a>
	<br />
	<form action="/campgrounds/{campground.id}/delete" method="POST">
		<Button>Delete Campground</Button>
	</form>
	<a href="/campgrounds">All Campgrounds</a>
</section>
