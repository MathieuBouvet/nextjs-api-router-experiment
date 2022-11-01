import createRouter from "../../../lib/createRouter";

const anotherRouter = createRouter("test");

anotherRouter
  .use(({ next }) => {
    console.log("router middleware");
    return next();
  })
  .get("/hello/me", () => {
    return "test order";
  })
  .get("/hello/:message?", ({ req }) => {
    return `Hello ${req.params.message ?? "World"} :)`;
  })
  .post("/hello/:message?", () => {
    return "test method";
  });

export default anotherRouter.buildHandler();
