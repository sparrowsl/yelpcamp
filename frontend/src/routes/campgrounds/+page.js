import { PUBLIC_BASE_API } from "$env/static/public";

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const res = await fetch(`${PUBLIC_BASE_API}/campgrounds`);
	const { data } = await res.json();

	return { campgrounds: data.campgrounds || [] };
}
