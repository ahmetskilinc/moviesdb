import { endpoint, key } from "@/lib/api_lib";

export const revalidate = 60;
export const runtime = "edge";

export async function GET(request: Request, { params: { id } }: { params: { id: number } }) {
	const tvRes = await fetch(`${endpoint}tv/${id}?${key}`, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	const tv = await tvRes.json();

	const tvCreditsRes = await fetch(`${endpoint}tv/${id}/credits?${key}`, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	const tvCredits = await tvCreditsRes.json();

	const tvRecommendationsRes = await fetch(`${endpoint}tv/${id}/recommendations?${key}`, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	const tvRecommendations = await tvRecommendationsRes.json();

	const tvExternalIdsRes = await fetch(`${endpoint}tv/${id}/external_ids?${key}`, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	const tvExternalIds = await tvExternalIdsRes.json();

	const tvReviewsRes = await fetch(`${endpoint}tv/${id}/reviews?${key}`, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	const tvReviews = await tvReviewsRes.json();

	const tvWatchProvidersRes = await fetch(`${endpoint}tv/${id}/watch/providers?${key}`, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	const tvWatchProviders = await tvWatchProvidersRes.json();

	return Response.json({
		tv,
		tvCredits,
		tvRecommendations,
		tvExternalIds,
		tvReviews,
		tvWatchProviders,
	});
}
