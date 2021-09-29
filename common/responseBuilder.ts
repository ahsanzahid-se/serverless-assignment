export const HttpStatusCode = {
  400: "Bad Request",
  500.19: "Configuration Error",
  403: "Forbidden",
  500: "Internal Server Error",
  404: "Not Found",
  401: "UnAuthurized",
};

export const success = (res) => ({
  statusCode: 200,
  body: JSON.stringify(res),
});

export const error = (status: number) => ({
  statusCode: status,
  body: HttpStatusCode[status],
});
