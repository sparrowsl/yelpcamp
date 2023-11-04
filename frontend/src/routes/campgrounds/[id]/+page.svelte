<script>
	import { goto, invalidateAll } from "$app/navigation";
	import { PUBLIC_BASE_API } from "$env/static/public";
	import Button from "$lib/components/Button.svelte";
	import FormInput from "$lib/components/FormInput.svelte";
	import Textarea from "$lib/components/Textarea.svelte";

	/** @type {import("./$types").PageData} */
	export let data;
	$: campground = data.campground;

	const review = { rating: 3, body: "" };

	const submitReview = async () => {
		const res = await fetch(`${PUBLIC_BASE_API}/campgrounds/${campground.id}/reviews`, {
			method: "POST",
			headers: { "Content-Type": "application/json;charset=utf-8" },
			body: JSON.stringify(review),
		});

		if (!res.ok) return;

		// Reset form
		review.rating = 3;
		review.body = "";
		invalidateAll();
	};

	/** @param {string} reviewId */
	const deleteReview = async (reviewId) => {
		const res = await fetch(`${PUBLIC_BASE_API}/campgrounds/${campground.id}/reviews/${reviewId}`, {
			method: "DELETE",
		});

		if (res.ok) invalidateAll();
	};

	/** @param {string} campId */
	const deleteCampground = async (campId) => {
		const res = await fetch(`${PUBLIC_BASE_API}/campgrounds/${campground.id}`, {
			method: "DELETE",
		});

		if (res.ok) goto(`/campgrounds`);
	};
</script>

<article class="mx-auto max-w-5xl grid gap-10 grid-cols-2">
	<figure class="">
		<img
			src={campground.image}
			alt={campground.title}
			class="object-cover object-center h-95 w-full"
		/>

		<figcaption class="mt-2">
			<h1 class="font-bold text-3xl">{campground.title}</h1>
			<p class="text-sm text-gray-600">{campground.location}</p>
			<p class="text-sm">${campground.price}/night</p>
			<p class="whitespace-pre-wrap">{campground.description}</p>

			<div class="flex mt-4 gap-5 items-center">
				<a
					href="/campgrounds/{campground.id}/edit"
					class="rounded bg-blue-600 text-xs text-white py-2 px-4"
				>
					Edit
				</a>

				<form method="POST" on:submit|preventDefault={() => deleteCampground(campground.id)}>
					<Button class="bg-red-500 text-xs">Delete</Button>
				</form>
			</div>
		</figcaption>
	</figure>

	<section>
		<form method="POST" on:submit|preventDefault={submitReview} class="mb-5">
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

				<Button class="bg-teal-700 w-fit">Submit Review</Button>
			</fieldset>
		</form>

		{#each campground?.reviews as review (review.id)}
			<div class="border rounded mb-2 p-2">
				<h4 class="flex font-semibold text-gray-800 items-center justify-between">
					<span>Rating: {review.rating} </span>
					<form method="POST" on:submit|preventDefault={() => deleteReview(review.id)}>
						<button type="submit"><i class="text-xl text-red-500 i-mdi:delete"></i></button>
					</form>
				</h4>

				<p class="text-sm text-gray-800">Review: {review?.body}</p>
			</div>
		{/each}
	</section>
	<!-- <a href="/campgrounds">All Campgrounds</a> -->
</article>
