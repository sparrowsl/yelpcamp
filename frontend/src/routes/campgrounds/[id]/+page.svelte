<script>
	/** @type {import("./$types").PageData} */
	export let data;
	const { campground } = data;
</script>

<a href="/campgrounds">view campgrounds...</a>

<section>
	<h1>{campground.title}</h1>
	<p>{campground.location}</p>
</section>
