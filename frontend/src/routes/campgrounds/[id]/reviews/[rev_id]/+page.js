import { redirect } from "@sveltejs/kit";
import { PUBLIC_BASE_API } from "$env/static/public";

/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
	const res = await fetch(`${PUBLIC_BASE_API}/campgrounds/${params.id}/reviews/${params.rev_id}`, {
		method: "DELETE",
	});

	if (res.ok) throw redirect(307, `/campgrounds/${params.id}`);

	throw redirect(307, "/campgrounds");
}
