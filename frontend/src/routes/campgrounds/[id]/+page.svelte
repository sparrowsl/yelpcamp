<script>
	import Button from "$lib/components/Button.svelte";

	/** @type {import("./$types").PageData} */
	export let data;
	const { campground } = data;
</script>

<section>
	<figure class="max-w-2xl mx-auto">
		<img
			src={campground.image}
			alt={campground.title}
			class="h-95 object-cover object-center w-full"
		/>

		<figcaption class="mt-2">
			<h1 class="font-bold text-3xl">{campground.title}</h1>
			<p>{campground.description}</p>
			<p class="text-gray-600 text-sm">{campground.location}</p>
			<p class="text-sm">${campground.price}/night</p>

			<div class="flex items-center gap-5 mt-4">
				<a
					href="/campgrounds/{campground.id}/edit"
					class="text-xs bg-blue-600 text-white px-4 py-2 rounded"
				>
					Edit
				</a>

				<form action="/campgrounds/{campground.id}/delete" method="POST">
					<Button class="text-xs bg-red-500">Delete</Button>
				</form>
			</div>
		</figcaption>
	</figure>

	<!-- <a href="/campgrounds">All Campgrounds</a> -->
</section>
