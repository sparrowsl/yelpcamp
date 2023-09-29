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
<a href="/campgrounds">All Campgrounds...</a>

<form action="" method="POST" on:submit|preventDefault={updateCampground}>
	<FormInput label="Title" name="title" bind:value={data.campground.title} />
	<FormInput label="Location" name="location" bind:value={data.campground.location} />

	<Button>Update Campground</Button>
</form>
