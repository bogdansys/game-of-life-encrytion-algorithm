import { Home, BarChart2 } from "lucide-react";
import Index from "./pages/Index.jsx";
import TestResults from "./pages/TestResults.jsx";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <Home className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Test Results",
    to: "/test-results",
    icon: <BarChart2 className="h-4 w-4" />,
    page: <TestResults />,
  },
];