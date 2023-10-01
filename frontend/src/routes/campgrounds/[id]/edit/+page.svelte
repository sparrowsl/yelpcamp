<script>
	import { goto } from "$app/navigation";
	import { PUBLIC_BASE_API } from "$env/static/public";
	import Button from "$lib/components/Button.svelte";
	import FormInput from "$lib/components/FormInput.svelte";

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

<h1>Edit Campground</h1>

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

		<label for="description">
			<span>Description</span>
			<textarea
				name="description"
				id="description"
				class="rounded block w-full min-h-10 max-h-50 text-sm"
				bind:value={data.campground.description}
			></textarea>
		</label>

		<Button class="w-fit">Update Campground</Button>
	</fieldset>
</form>

<a href="/campgrounds" class="block text-blue-600 underline mt-5 w-fit">back to Campgrounds...</a>
