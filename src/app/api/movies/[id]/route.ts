import { endpoint, key } from "@/lib/api_lib";
import { Api } from "../../api";

export const revalidate = 60;
export const runtime = "edge";

export async function GET(request: Request, { params: { id } }: { params: { id: number } }) {
	const movie = await Api(
		`movie/${id}?${process.env.NEXT_PUBLIC_TMDB_KEY}&append_to_response=videos,credits,recommendations,external_ids,reviews,watch/videos`
	);

	return Response.json(movie);
}
