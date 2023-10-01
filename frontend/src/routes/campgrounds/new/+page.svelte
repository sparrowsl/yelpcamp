<script>
	import { goto } from "$app/navigation";
	import { PUBLIC_BASE_API } from "$env/static/public";
	import FormInput from "$lib/components/FormInput.svelte";
	import Button from "$lib/components/Button.svelte";
	import Textarea from "$lib/components/Textarea.svelte";

	const campground = { title: "", location: "", image: "", description: "", price: undefined };

	async function createCampground() {
		const res = await fetch(`${PUBLIC_BASE_API}/campgrounds`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(campground),
		});
		if (!res.ok) return;

		// prettier-ignore
		const { data: { campground: camp } } = await res.json();
		goto(`/campgrounds/${camp.id}`);
	}
</script>

<section class="max-w-2xl mx-auto">
	<h1 class="text-3xl font-bold text-center">New Campground</h1>

	<form action="" method="POST" on:submit|preventDefault={createCampground} class="">
		<fieldset class="grid gap-4">
			<FormInput label="Title" id="title" name="title" bind:value={campground.title} />
			<FormInput label="Location" id="location" name="location" bind:value={campground.location} />
			<FormInput
				type="number"
				label="Price"
				id="price"
				name="price"
				bind:value={campground.price}
			/>
			<FormInput
				type="url"
				label="Image URL"
				id="image"
				name="image"
				bind:value={campground.image}
			/>

			<Textarea
				label="Description"
				name="description"
				id="description"
				bind:value={campground.description}
			/>

			<Button class="w-fit">Add Campground</Button>
		</fieldset>

		<a href="/campgrounds" class="block mt-3 text-blue-500 underline">all campgrounds</a>
	</form>
</section>
