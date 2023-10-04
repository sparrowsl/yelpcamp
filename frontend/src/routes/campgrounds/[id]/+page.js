import { PUBLIC_BASE_API } from "$env/static/public";

/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
	async function getReviews() {
		const res = await fetch(`${PUBLIC_BASE_API}/campgrounds/${campground.id}/reviews`);
		const { data } = await res.json();

		return data.reviews;
	}

	const res = await fetch(`${PUBLIC_BASE_API}/campgrounds/${params.id}`);
	// prettier-ignore
	const { data: { campground } } = await res.json();

	return { campground, reviews: getReviews() };
}
