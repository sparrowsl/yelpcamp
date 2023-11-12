<script>
	import { goto } from "$app/navigation";
	import { PUBLIC_BASE_API } from "$env/static/public";
	import Button from "$lib/components/Button.svelte";
	import FormInput from "$lib/components/FormInput.svelte";
	import Textarea from "$lib/components/Textarea.svelte";
	import { token } from "$lib/token.js";

	/** @type {import("./$types").PageData} */
	export let data;

	async function updateCampground() {
		const res = await fetch(`${PUBLIC_BASE_API}/campgrounds/${data.campground.id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
				Authorization: `Bearer ${$token}`,
			},
			body: JSON.stringify(data.campground),
		});

		if (!res.ok) return;
		goto(`/campgrounds/${data.campground.id}`);
	}
</script>

<section class="mx-auto max-w-3xl">
	<h1 class="font-bold text-center text-2xl">Edit Campground</h1>

	<form action="" method="POST" on:submit|preventDefault={updateCampground}>
		<fieldset class="grid gap-4">
			<FormInput label="Title" name="title" bind:value={data.campground.title} />
			<FormInput label="Location" name="location" bind:value={data.campground.location} />
			<FormInput type="number" label="Price" name="price" bind:value={data.campground.price} />
			<FormInput type="url" label="Image URL" name="image" bind:value={data.campground.image} />
			<Textarea label="Description" name="description" bind:value={data.campground.description} />
			<Button class="w-fit">Update Campground</Button>
		</fieldset>
	</form>

	<a href="/campgrounds" class="mt-5 w-fit text-blue-600 block underline">back to Campgrounds...</a>
</section>
