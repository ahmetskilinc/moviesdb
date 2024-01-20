import { endpoint } from "@/lib/api_lib";

export const Api = async (path: string) => {
	const url = endpoint + path;

	const res = await fetch(url, {
		headers: {
			"Content-Type": "application/json",
		},
	});

	return await res.json();
};
