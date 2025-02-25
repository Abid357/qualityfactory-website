import { Route, Routes } from "react-router";
import Home from "./Pages/Home";

export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}
