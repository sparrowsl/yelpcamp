<script>
	import "@unocss/reset/tailwind.css";
	import "uno.css";
	import Navbar from "./Navbar.svelte";
</script>

<Navbar />
<main class="container font-roboto mt-5">
	<slot />
</main>
