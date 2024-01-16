import axios from "axios";
import { endpoint, key } from "../lib/api_lib";

export const getList = async (url: string) => {
	const data = await axios.get(`${endpoint}${url}${key}`).then((response) => {
		return response.data;
	});

	return data;
};
