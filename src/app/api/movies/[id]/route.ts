import { endpoint, key } from "@/lib/api_lib";

export const revalidate = 60;
export const runtime = "edge";

export async function GET(request: Request, { params: { id } }: { params: { id: number } }) {
	const movieRes = await fetch(`${endpoint}movie/${id}?${key}`, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	const movie = await movieRes.json();

	const movieCreditsRes = await fetch(`${endpoint}movie/${id}/credits?${key}`, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	const movieCredits = await movieCreditsRes.json();

	const movieRecommendationsRes = await fetch(`${endpoint}movie/${id}/recommendations?${key}`, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	const movieRecommendations = await movieRecommendationsRes.json();

	const movieExternalIdsRes = await fetch(`${endpoint}movie/${id}/external_ids?${key}`, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	const movieExternalIds = await movieExternalIdsRes.json();

	const movieReviewsRes = await fetch(`${endpoint}movie/${id}/reviews?${key}`, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	const movieReviews = await movieReviewsRes.json();

	const movieWatchProvidersRes = await fetch(`${endpoint}movie/${id}/watch/providers?${key}`, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	const movieWatchProviders = await movieWatchProvidersRes.json();

	return Response.json({
		movie,
		movieCredits,
		movieRecommendations,
		movieExternalIds,
		movieReviews,
		movieWatchProviders,
	});
}
