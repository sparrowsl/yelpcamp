<script>
	import { goto } from "$app/navigation";
	import { PUBLIC_BASE_API } from "$env/static/public";
	import Button from "$lib/components/Button.svelte";
	import { getCurrentUser, token } from "$lib/token.js";
	import CampReview from "./CampReview.svelte";

	/** @type {import("./$types").PageData} */
	export let data;
	$: campground = data.campground;

	/** @param {string|undefined} campId */
	const deleteCampground = async (campId) => {
		const res = await fetch(`${PUBLIC_BASE_API}/campgrounds/${campId}`, {
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
			<p class="text-sm text-gray-800">Submitted by {campground.user?.username}</p>
			<p class="text-sm">${campground.price}/night</p>
			<p class="whitespace-pre-wrap">{campground.description}</p>

			{#if $token && campground.user_id === getCurrentUser().id}
				<div class="flex mt-4 gap-5 items-center">
					<a
						href="/campgrounds/{campground.id}/edit"
						class="rounded bg-blue-600 text-xs text-white py-2 px-4"
					>
						Edit
					</a>

					<form method="POST" on:submit|preventDefault={() => deleteCampground(campground?.id)}>
						<Button class="bg-red-500 text-xs">Delete</Button>
					</form>
				</div>
			{/if}
		</figcaption>
	</figure>

	<CampReview {campground} />

	<!-- <a href="/campgrounds">All Campgrounds</a> -->
</article>
