import { Route, Routes } from "react-router";
import Contact from "./Pages/Contact";
import Home from "./Pages/Home";

export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}
