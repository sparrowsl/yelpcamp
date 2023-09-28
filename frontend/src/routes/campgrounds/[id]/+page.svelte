<script>
	/** @type {import("./$types").PageData} */
	export let data;
	const { campground } = data;
</script>

<a href="/campgrounds">view campgrounds...</a>
<a href="/campgrounds/{campground.id}/edit">edit campground</a>
<a href="/campgrounds/{campground.id}/delete">delete campground</a>

<section>
	<h1>{campground.title}</h1>
	<p>{campground.location}</p>
</section>
