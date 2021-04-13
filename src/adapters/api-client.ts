type ApiRequest = {
  method: string;
  body?: any;
};

export function client(
  endpoint: string,
  { method, body }: ApiRequest,
): Promise<any> {
  const headers = { 'Content-Type': 'application/json; charset=UTF-8' };

  const config = {
    method,
    headers: {
      ...headers,
    },
    body: body && JSON.stringify(body),
  };

  return window.fetch(`${endpoint}`, config).then(async response => {
    if (response.ok) {
      return await response.json();
    } else {
      const errorMessage = await response.text();
      return Promise.reject(new Error(errorMessage));
    }
  });
}
