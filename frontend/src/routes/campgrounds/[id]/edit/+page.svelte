<script>
	import { goto } from "$app/navigation";
	import { PUBLIC_BASE_API } from "$env/static/public";
	import Button from "$lib/components/Button.svelte";
	import FormInput from "$lib/components/FormInput.svelte";
	import Textarea from "$lib/components/Textarea.svelte";

	/** @type {import("./$types").PageData} */
	export let data;

	async function updateCampground() {
		const res = await fetch(`${PUBLIC_BASE_API}/campgrounds/${data.campground.id}`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json;charset=utf-8" },
			body: JSON.stringify(data.campground),
		});

		if (!res.ok) return;
		goto(`/campgrounds/${data.campground.id}`);
	}
</script>

<section class="max-w-3xl mx-auto">
	<h1 class="text-2xl font-bold text-center">Edit Campground</h1>

	<form action="" method="POST" on:submit|preventDefault={updateCampground}>
		<fieldset class="grid gap-4">
			<FormInput label="Title" name="title" bind:value={data.campground.title} />
			<FormInput label="Location" name="location" bind:value={data.campground.location} />
			<FormInput
				type="number"
				label="Price"
				id="price"
				name="price"
				bind:value={data.campground.price}
			/>
			<FormInput
				type="url"
				label="Image URL"
				id="image"
				name="image"
				bind:value={data.campground.image}
			/>

			<Textarea
				label="Description"
				name="description"
				id="description"
				bind:value={data.campground.description}
			/>

			<Button class="w-fit">Update Campground</Button>
		</fieldset>
	</form>

	<a href="/campgrounds" class="block text-blue-600 underline mt-5 w-fit">back to Campgrounds...</a>
</section>
