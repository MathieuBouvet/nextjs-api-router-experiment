import createRouter from "../../../lib/createRouter";

const anotherRouter = createRouter("test");

anotherRouter.get("/hello/:message?", ({ req }) => {
  return `Hello ${req.params.message ?? "World"} :)`
});

export default anotherRouter.buildHandler();
