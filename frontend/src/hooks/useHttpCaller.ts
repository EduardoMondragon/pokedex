import { useState, useEffect } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios, { AxiosError, AxiosResponse } from "axios";

interface Options {
	url: string;
	method?: "GET" | "POST" | "PUT" | "DELETE";
	params?: any;
	data?: any;
}

const useHttpCaller = (options: Options) => {
	const { url, method = "GET", params, data } = options;
	const [responseData, setResponseData] = useState<any>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<Error | null>(null);
	const uuid = window.localStorage.getItem("pokeUuid");

	useEffect(() => {
		console.log("EXCE. C.HOOK.");
		const fetchData = async () => {
			try {
				const axiosConfig: any = { method, url };
				if (method === "GET") {
					axiosConfig.params = params;
				} else {
					axiosConfig.data = { ...data, uuid };
					axiosConfig.headers = {
						"Content-Type": "application/x-www-form-urlencoded",
					};
				}
				const response: AxiosResponse = await axios(axiosConfig);
				console.log(response.data);
				setResponseData(response.data);
				setError(null);
			} catch (error: AxiosError | any) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, params]);
	return { responseData, loading, error };
};

export default useHttpCaller;
