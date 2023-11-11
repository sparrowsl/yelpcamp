import { PUBLIC_BASE_API } from "$env/static/public";
import { getCurrentUser } from "$lib/token.js";
import { redirect } from "@sveltejs/kit";

export const prerender = false;

/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
	const res = await fetch(`${PUBLIC_BASE_API}/campgrounds/${params.id}`);
	const { data } = await res.json();

	// Check if the user has access to edit
	if (getCurrentUser().id !== data?.campground.user_id) {
		throw redirect(302, `/campgrounds/${params.id}`);
	}

	return { campground: data?.campground || {} };
}
