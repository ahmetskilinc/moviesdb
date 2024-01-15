import axios from "axios";

export const getList = async (url: string) => {
	console.log("url:", url);
	const data = await axios.get(url).then((response) => {
		return response.data;
	});

	return data;
};
