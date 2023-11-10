import { PUBLIC_BASE_API } from "$env/static/public";
import { token } from "$lib/token.js";
import { get } from "svelte/store";

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const res = await fetch(`${PUBLIC_BASE_API}/campgrounds`, {
		headers: { Authorization: `Bearer ${get(token)}` },
	});

	const { data } = await res.json();

	return { campgrounds: data?.campgrounds || [] };
}
