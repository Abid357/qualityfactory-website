import { Route, Routes } from "react-router";
import Home from "./Pages/Home";
import Catalog from "./Pages/Catalog";
import Certificates from "./Pages/Certificates";
import Designer from "./Pages/Designer";

export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/designer" element={<Designer />} />
      </Routes>
    </>
  );
}
