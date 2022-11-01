import HttpError from "../HttpError";

const httpMethods = [
  "get",
  "post",
  "put",
  "delete",
  "patch",
  "options",
  "head",
];

function routing(router) {
  return async ({ req, res }) => {
    const method = req.method.toLowerCase();
    if (!httpMethods.includes(method)) {
      throw new HttpError(501); // invalid HTTP method
    }

    const path = `/${req.query?.[router.name]?.join("/") ?? ""}`;

    const matchingRoutes = router.routes.filter(route =>
      route.pathMatcher(path)
    );
    if (matchingRoutes.length === 0) {
      throw new HttpError(404);
    }

    const matchingRoutesAndMethod = matchingRoutes.filter(
      route => route.method === method
    );
    if (matchingRoutesAndMethod.length === 0) {
      throw new HttpError(405); // valid HTTP method, but not implemented for this ressource
    }

    const route = matchingRoutesAndMethod[0];

    req.params = route.pathMatcher(path).params;

    return route.handler({ req, res });
  };
}

export default routing;
