import { match } from "path-to-regexp";
import chainMiddlewares from "./chainMiddlewares";
import defaultMiddlewares from "./defaultMiddlewares";
import routing from "./defaultMiddlewares/routing";

function createRouter(name = "router") {
  return {
    name,
    routes: [],
    middlewares: [],

    use(...middlewares) {
      this.middlewares.push(...middlewares);
      return this;
    },

    route(method, path, ...middlewares) {
      const routeHandler = {
        method,
        path,
        pathMatcher: match(path, { decode: decodeURIComponent }),
        handler: chainMiddlewares(middlewares),
      };
      this.routes.push(routeHandler);
      return this;
    },

    get(path, ...middlewares) {
      return this.route("GET", path, ...middlewares);
    },

    post(path, ...middlewares) {
      return this.route("POST", path, ...middlewares);
    },

    put(path, ...middlewares) {
      return this.route("PUT", path, ...middlewares);
    },

    patch(path, ...middlewares) {
      return this.route("PATCH", path, ...middlewares);
    },

    delete(path, ...middlewares) {
      return this.route("DELETE", path, ...middlewares);
    },

    buildHandler() {
      this.routes = this.routes.map(route => {
        return {
          ...route,
          handler: chainMiddlewares([...this.middlewares, route.handler]),
        };
      });
      const handler = chainMiddlewares([...defaultMiddlewares, routing(this)]);
      return (req, res) => handler({ req, res });
    },
  };
}

export default createRouter;
