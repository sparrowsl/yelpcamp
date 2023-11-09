<script>
	import Cookies from "js-cookie";
	import { token } from "$lib/token.js";
	import { goto } from "$app/navigation";

	const logout = () => {
		Cookies.remove("token");
		Cookies.remove("user");
		goto("/login", { invalidateAll: true });
	};
</script>

<div class="bg-gray-700 text-white">
	<nav class="container flex font-roboto py-3 gap-10 items-center">
		<a href="/" class="font-bold text-2xl block">YelpCamp</a>

		<ul class="flex text-sm gap-5 items-center">
			<li><a href="/">Home</a></li>
			<li><a href="/campgrounds">Campgrounds</a></li>
			{#if $token}
				<li><a href="/campgrounds/new">New Campground</a></li>
			{/if}
		</ul>

		<ul class="flex ml-auto text-sm gap-5 items-center">
			{#if !$token}
				<li><a href="/login">Login</a></li>
				<li><a href="/register">Register</a></li>
			{:else}
				<li>
					<form action="" on:submit|preventDefault={logout}>
						<button>logout</button>
					</form>
				</li>
			{/if}
		</ul>
	</nav>
</div>
