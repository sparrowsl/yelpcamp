<script>
	import Cookies from "js-cookie";
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

		const { data, token } = await res.json();
		Cookies.set("token", token);
		Cookies.set("user", JSON.stringify(data.user));
		goto("/campgrounds", { invalidateAll: true });
	}
</script>

<section class="mx-auto max-w-2xl">
	<h1 class="font-bold text-center text-3xl">Login</h1>

	<form action="" method="POST" on:submit|preventDefault={loginUser} class="">
		<fieldset class="grid gap-4">
			<FormInput label="Username" name="username" bind:value={newUser.username} />
			<FormInput type="password" label="Password" name="password" bind:value={newUser.password} />
			<Button class="w-fit">Login</Button>
		</fieldset>
	</form>
</section>
