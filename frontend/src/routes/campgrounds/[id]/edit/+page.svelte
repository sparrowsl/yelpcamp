<script>
	import { goto } from "$app/navigation";
	import { PUBLIC_BASE_API } from "$env/static/public";

	/** @type {import("./$types").PageData} */
	export let data;
	const { campground } = data;

	async function updateCampground() {
		const res = await fetch(`${PUBLIC_BASE_API}/campgrounds`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(campground),
		});
		// if (!res.ok) return;

		// prettier-ignore
		const {data: { campgrounds: camp }} = await res.json();
		console.log(camp);
		// goto(`/campgrounds/${camp.id}`);
	}
</script>

<h1>New Campground</h1>
<a href="/campgrounds">view campgrounds...</a>

<form action="" method="POST" on:submit|preventDefault={updateCampground}>
	<div>
		<label for="title">Title</label>
		<input type="text" id="title" name="title" required bind:value={campground.title} />
	</div>

	<div>
		<label for="location">Location</label>
		<input type="text" id="location" name="location" required bind:value={campground.location} />
	</div>

	<button type="submit">Update Campground</button>
</form>
