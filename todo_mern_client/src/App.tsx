import { Home, SignIn } from "./views";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<SignIn />} />
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
