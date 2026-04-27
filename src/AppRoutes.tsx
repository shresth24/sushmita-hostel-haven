import { Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import BranchPage from "./pages/BranchPage";
import NotFound from "./pages/NotFound";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/:slug" element={<BranchPage />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
