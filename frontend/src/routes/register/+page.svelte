<script>
	import Cookies from "js-cookie";
	import { goto } from "$app/navigation";
	import { PUBLIC_BASE_API } from "$env/static/public";
	import FormInput from "$lib/components/FormInput.svelte";
	import Button from "$lib/components/Button.svelte";

	const newUser = { username: undefined, email: undefined, password: undefined };

	async function registerUser() {
		const res = await fetch(`${PUBLIC_BASE_API}/users/register`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(newUser),
		});
		if (!res.ok) return;

		const { data, token } = await res.json();
		console.log(data);
		Cookies.set("token", token);

		// goto(`/campgrounds/${camp.id}`);
	}
</script>

<section class="max-w-2xl mx-auto">
	<h1 class="text-3xl font-bold text-center">Register</h1>

	<form action="" method="POST" on:submit|preventDefault={registerUser} class="">
		<fieldset class="grid gap-4">
			<FormInput label="Username" name="username" bind:value={newUser.username} />
			<FormInput label="Email" name="email" bind:value={newUser.email} />
			<FormInput type="password" label="Password" name="password" bind:value={newUser.password} />
			<Button class="w-fit">Register</Button>
		</fieldset>
	</form>
</section>
