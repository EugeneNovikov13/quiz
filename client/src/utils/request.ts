type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
export type ResponseType<T> = {
	data?: T | null;
	error?: string | null;
};

export async function request<T>(
	url: string,
	method?: HttpMethod,
	data?: object,
): Promise<ResponseType<T>> {
	const res = await fetch(url, {
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		method: method || 'GET',
		body: data ? JSON.stringify(data) : undefined,
	});
	return await res.json();
}
