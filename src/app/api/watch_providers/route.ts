import { endpoint, key } from "@/lib/api_lib";

export const revalidate = 60;
export const runtime = "edge";

export async function GET(request: Request, { params: { id } }: { params: { id: number } }) {
	const providersRes = await fetch(`${endpoint}watch/providers/regions?${key}`, {
		headers: {
			"Content-Type": "application/json",
		},
	});
	const providers = await providersRes.json();

	return Response.json(providers.results);
}
