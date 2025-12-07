import { createBrowserRouter, RouterProvider } from "react-router-dom";

import NotFound from "./pages/home/not-found/NotFound";

import Home from "./pages/home/Home";
import RootLayout from "./components/ui/RootLayout";
import SingleProduct from "./pages/home/products/SingleProduct";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: 'single-product/:id',
          element: <SingleProduct />
        },
      ],
    },

    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
}
