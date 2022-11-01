const statuses = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  500: "Internal Server Error",
  501: "Not Implemented",
};

class HttpError extends Error {
  constructor(status, details) {
    const statusText =
      statuses[status] ?? "***statusText configuration missing***";

    super(`${status} - ${statusText}`);

    this.status = status;
    this.statusText = statusText;
    if (details != null) {
      this.details = details;
    }
  }
}

export default HttpError;