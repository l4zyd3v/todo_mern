import { Home, Login, Signup } from "./views";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </>,
  ),
);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
