<script>
	import Button from "$lib/components/Button.svelte";
	import FormInput from "$lib/components/FormInput.svelte";
	import Textarea from "$lib/components/Textarea.svelte";

	/** @type {import("./$types").PageData} */
	export let data;
	const { campground } = data;

	const review = { rating: "", body: "" };

	const submitReview = async () => {
		console.log(review);
	};
</script>

<article class="max-w-5xl mx-auto grid grid-cols-2 gap-10">
	<figure class="">
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

	<form action="" method="POST" class="" on:submit|preventDefault={submitReview}>
		<fieldset class="grid gap-4">
			<FormInput
				label="Rating"
				type="range"
				name="rating"
				min="1"
				max="5"
				bind:value={review.rating}
			/>
			<Textarea label="Review" name="body" class="text-gray-600" bind:value={review.body} />

			<Button class="w-fit bg-teal-700">Submit Review</Button>
		</fieldset>
	</form>

	<!-- <a href="/campgrounds">All Campgrounds</a> -->
</article>
