import { lazy } from "react";
const Home = lazy(() => import("@/views/home/index.tsx"));
const About = lazy(() => import("@/views/about/index.tsx"));

export default [
  {
    path: "/",
    meta: {
      title: "Home",
    },
    element: <Home />,
  },
  {
    path: "/about",
    meta: {
      title: "About",
    },
    element: <About />,
  },
];
