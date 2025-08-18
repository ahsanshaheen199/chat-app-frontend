import { createBrowserRouter, RouterProvider } from "react-router";
import { LoginPage } from "./pages/login";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <div>Hello World</div>,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
