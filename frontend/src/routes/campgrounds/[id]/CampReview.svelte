<script>
	import { invalidateAll } from "$app/navigation";
	import { PUBLIC_BASE_API } from "$env/static/public";
	import Button from "$lib/components/Button.svelte";
	import FormInput from "$lib/components/FormInput.svelte";
	import Textarea from "$lib/components/Textarea.svelte";
	import { token } from "$lib/token.js";

	/** @type {import("$lib/types.js").Campground} */
	export let campground;

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
</script>

<section>
	<form method="POST" on:submit|preventDefault={submitReview} class="mb-5">
		<fieldset class="grid gap-4">
			<FormInput
				label={"Rating " + review.rating}
				type="range"
				name="rating"
				min="1"
				max="5"
				bind:value={review.rating}
			/>
			<Textarea label="Review" name="body" class="text-gray-600" bind:value={review.body} />

			{#if $token}
				<Button class="bg-teal-700 w-fit">Submit Review</Button>
			{/if}
		</fieldset>
	</form>

	{#each campground?.reviews as review (review?.id)}
		<div class="border rounded mb-2 p-2">
			<h4 class="flex font-semibold text-gray-800 items-center justify-between">
				<span>Rating: {review?.rating} </span>
				<form method="POST" on:submit|preventDefault={() => deleteReview(review?.id)}>
					<button type="submit"><i class="text-xl text-red-500 i-mdi:delete"></i></button>
				</form>
			</h4>

			<p class="text-sm text-gray-800">Review: {review?.body}</p>
		</div>
	{/each}
</section>
