function chainMiddlewares(middlewares) {
  const reversedMiddlewares = [...middlewares].reverse();

  if (reversedMiddlewares.length === 0) {
    throw new TypeError("Middlewares list cannot be empty");
  }

  return reversedMiddlewares.reduce((previous, currentMiddleware) => {
    return async ({ req, res }) => {
      return currentMiddleware({
        req,
        res,
        next: async () => previous({ req, res }),
      });
    };
  });
}

export default chainMiddlewares;
