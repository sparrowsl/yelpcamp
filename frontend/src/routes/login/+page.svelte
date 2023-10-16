<script>
	import { goto } from "$app/navigation";
	import { PUBLIC_BASE_API } from "$env/static/public";
	import FormInput from "$lib/components/FormInput.svelte";
	import Button from "$lib/components/Button.svelte";

	const newUser = { username: undefined, password: undefined };

	async function loginUser() {
		const res = await fetch(`${PUBLIC_BASE_API}/users/login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(newUser),
		});
		if (!res.ok) return;

		const data = await res.json();
		console.log(data);
		// goto(`/campgrounds/${camp.id}`);
	}
</script>

<section class="max-w-2xl mx-auto">
	<h1 class="text-3xl font-bold text-center">Login</h1>

	<form action="" method="POST" on:submit|preventDefault={loginUser} class="">
		<fieldset class="grid gap-4">
			<FormInput label="Username" name="username" bind:value={newUser.username} />
			<FormInput type="password" label="Password" name="password" bind:value={newUser.password} />
			<Button class="w-fit">Login</Button>
		</fieldset>
	</form>
</section>
