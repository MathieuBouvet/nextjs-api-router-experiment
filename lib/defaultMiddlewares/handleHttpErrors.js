import HttpError from "../HttpError";

async function handleHttpErrors({ res, next }) {
  try {
    await next();
  } catch (err) {
    if (err instanceof HttpError) {
      res.status(err.status);
      res.json(err);
      return;
    }
    throw err;
  }
}

export default handleHttpErrors;
