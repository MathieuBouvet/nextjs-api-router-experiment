import createRouter from "../../../lib/createRouter";
import HttpError from "../../../lib/HttpError";

const testRouter = createRouter("test");

testRouter.use(async ({ next }) => {
  await new Promise(r => setTimeout(r, 1500));
  return next();
});

testRouter.use(async ({ next }) => {
  const res = await next();
  console.log("LOGGER", res);
  return res;
});

testRouter.use(async ({ next }) => {
  try {
    await next();
  } catch (err) {
    return "catched error!!!";
  }
});

testRouter.get("/", ({ req, res }) => {
  return "coucou";
});

testRouter.get("/coucou/:num", ({ req }) => {
  const num = req.params.num;
  if (num % 2 !== 0) {
    throw new HttpError(400, "Must be an even number!!!");
  }
  return {
    message: "all good",
    num,
  };
});

export default testRouter.buildHandler();
