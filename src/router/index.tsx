import type { RouteObject } from "react-router-dom";

const modules = import.meta.glob("./modules/**", {
  eager: true,
}) as Record<string, { default: RouteObject[] }>;

const routes = Object.keys(modules).map((s) => modules[s].default);

export default routes.flat();
