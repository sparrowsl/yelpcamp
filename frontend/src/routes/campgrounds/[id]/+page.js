import { PUBLIC_BASE_API } from "$env/static/public";

export const prerender = false;

/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
	const res = await fetch(`${PUBLIC_BASE_API}/campgrounds/${params.id}/reviews`);
	const { data } = await res.json();

	return {
		/** @type {import("$lib/types.js").Campground} */
		campground: data?.campground || {},
	};
}
