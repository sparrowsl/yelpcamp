<script>
	import { page } from "$app/stores";
	import { PUBLIC_BASE_API } from "$env/static/public";
	import Button from "$lib/components/Button.svelte";
	import FormInput from "$lib/components/FormInput.svelte";
	import Textarea from "$lib/components/Textarea.svelte";

	/** @type {import("./$types").PageData} */
	export let data;
	const { campground } = data;

	const review = { rating: 3, body: "" };

	const submitReview = async () => {
		const res = await fetch(`${PUBLIC_BASE_API}/campgrounds/${campground.id}/reviews`, {
			method: "POST",
			headers: { "Content-Type": "application/json;charset=utf-8" },
			body: JSON.stringify(review),
		});

		if (res.ok) window.location.href = $page.url.pathname;
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
			<p class="text-gray-600 text-sm">{campground.location}</p>
			<p class="text-sm">${campground.price}/night</p>
			<p class="whitespace-pre-wrap">{campground.description}</p>

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

	<section>
		<form action="" method="POST" on:submit|preventDefault={submitReview} class="mb-5">
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

		{#if campground.reviews}
			{#each campground.reviews as review (review.id)}
				<div class="border p-2 rounded mb-2">
					<h4 class="font-semibold text-gray-800 flex items-center justify-between">
						<span>Rating: {review.rating} </span>
						<form action="/campgrounds/{campground.id}/reviews/{review.id}" method="POST">
							<button type="submit"><i class="i-mdi:delete text-xl text-red-500"></i></button>
						</form>
					</h4>

					<p class="text-sm text-gray-800">Review: {review?.body}</p>
				</div>
			{/each}
		{/if}
	</section>
	<!-- <a href="/campgrounds">All Campgrounds</a> -->
</article>
