import HttpError from "../HttpError";

async function handleErrors({ next }) {
  try {
    await next();
  } catch (err) {
    if (!(err instanceof HttpError)) {
      const details =
        process.env.NODE_ENV !== "production"
          ? JSON.parse(JSON.stringify(err, Object.getOwnPropertyNames(err)))
          : undefined;
      throw new HttpError(500, details);
    }
    throw err;
  }
}

export default handleErrors;
