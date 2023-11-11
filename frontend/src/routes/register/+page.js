import { getCurrentUser, token } from "$lib/token.js";
import { redirect } from "@sveltejs/kit";
import { get } from "svelte/store";

/** @type {import('./$types').PageLoad} */
export async function load() {
	if (get(token) || getCurrentUser()) throw redirect(302, "/campgrounds");
}
