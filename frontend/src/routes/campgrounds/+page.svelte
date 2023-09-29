<script>
	/** @type {import("./$types").PageData} */
	export let data;
</script>

<h1 class="text-3xl font-bold">All Campgrounds...</h1>
<a href="/campgrounds/new" class="text-blue underline mb-2 block">Add Campground</a>

<section class="list-disc list-inside pl-4">
	{#each data.campgrounds as campground (campground.id)}
		<figure class="flex gap-5 border">
			<img
				src={campground.image}
				alt={campground.title}
				loading="lazy"
				class="w-70 h-45 object-contain"
			/>

			<figcaption>
				<h3 class="font-bold text-lg">{campground.title}</h3>
				<p class="text-gray-900">{campground.description}</p>

				<p class="text-sm text-gray-600 my-2">{campground.location}</p>

				<a
					class="block text-white bg-blue-600 text-sm w-fit px-4 py-1 rounded"
					href="/campgrounds/{campground.id}"
				>
					View {campground.title}
				</a>
			</figcaption>
		</figure>
	{/each}
</section>
