import "./App.css";

import { Suspense } from "react";
import { useRoutes } from "react-router-dom";

import routers from "@/router/index";

function App() {
  const elements = useRoutes(routers);
  return <Suspense>{elements}</Suspense>;
}

export default App;
