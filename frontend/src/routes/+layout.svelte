<script>
	import Cookies from "js-cookie";
	import { token } from "$lib/token.js";
	import { beforeNavigate } from "$app/navigation";
	import "@unocss/reset/tailwind.css";
	import "uno.css";
	import Navbar from "./Navbar.svelte";

	beforeNavigate(() => {
		$token = Cookies.get("token");
	});
</script>

<Navbar />
<main class="container font-roboto mt-5">
	<slot />
</main>
