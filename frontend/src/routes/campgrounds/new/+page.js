import { redirect } from "@sveltejs/kit";
import { get } from "svelte/store";
import { token } from "$lib/token.js";

/** @type {import('./$types').PageLoad} */
export async function load() {
	if (!get(token)) throw redirect(302, "/login");
}
