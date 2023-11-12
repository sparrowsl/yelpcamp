<script>
	import { goto } from "$app/navigation";
	import { PUBLIC_BASE_API } from "$env/static/public";
	import FormInput from "$lib/components/FormInput.svelte";
	import Button from "$lib/components/Button.svelte";
	import Textarea from "$lib/components/Textarea.svelte";
	import { token } from "$lib/token.js";

	const campground = { title: "", location: "", image: "", description: "", price: undefined };

	async function createCampground() {
		const res = await fetch(`${PUBLIC_BASE_API}/campgrounds`, {
			method: "POST",
			headers: { "Content-Type": "application/json", Authorization: `Bearer ${$token}` },
			body: JSON.stringify(campground),
		});
		if (!res.ok) return;

		// prettier-ignore
		const { data: { campground: camp } } = await res.json();
		goto(`/campgrounds/${camp.id}`);
	}
</script>

<section class="mx-auto max-w-2xl">
	<h1 class="font-bold text-center text-3xl">New Campground</h1>

	<form method="POST" on:submit|preventDefault={createCampground} enctype="multipart/form-data">
		<fieldset class="grid gap-4">
			<FormInput label="Title" id="title" name="title" bind:value={campground.title} />
			<FormInput label="Location" id="location" name="location" bind:value={campground.location} />
			<FormInput type="number" label="Price" name="price" bind:value={campground.price} />
			<FormInput type="url" label="Image URL" name="image" bind:value={campground.image} />
			<Textarea label="Description" name="description" bind:value={campground.description} />
			<Button class="w-fit">Add Campground</Button>
		</fieldset>

		<a href="/campgrounds" class="mt-3 text-blue-500 block underline">all campgrounds</a>
	</form>
</section>
