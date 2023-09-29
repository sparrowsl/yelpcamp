<script>
	import { goto } from "$app/navigation";
	import { PUBLIC_BASE_API } from "$env/static/public";
	import FormInput from "$lib/components/FormInput.svelte";
	import Button from "$lib/components/Button.svelte";

	const campground = { title: "", location: "", description: "", price: 0 };

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

<h1>New Campground</h1>
<a href="/">back home</a>

<form action="" method="POST" on:submit|preventDefault={createCampground}>
	<FormInput label="Title" id="title" name="title" bind:value={campground.title} />
	<FormInput label="Location" id="location" name="location" bind:value={campground.location} />

	<Button>Add Campground</Button>
</form>
