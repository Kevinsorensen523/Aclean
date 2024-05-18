import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Theme from "./theme/theme";
import Fonts from "./utilities/fonts";
import { Home } from "./pages/Home";
import { DetailService } from "./pages/DetailService";
import { OrderService } from "./pages/OrderService";
import { TransactionHistory } from "./pages/TransactionHistory";
import { NotFound } from "./pages/404";
import { DetailTransaction } from "./pages/DetailTransaction";
import { MyService } from "./pages/MyService";
import { AboutUs } from "./pages/AboutUs";
import { DetailMyService } from "./pages/DetailMyService";
import { NewService } from "./pages/NewService";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/detail-service/:id",
    element: <DetailService />,
  },
  {
    path: "/order-service",
    element: <OrderService />,
  },
  {
    path: "/transaction-history",
    element: <TransactionHistory />,
  },
  {
    path: "/detail-transaction/:id",
    element: <DetailTransaction />,
  },
  {
    path: "/my-service",
    element: <MyService />,
  },
  {
    path: "/detail-my-service/:id",
    element: <DetailMyService />,
  },
  {
    path: "/new-service",
    element: <NewService />,
  },
  {
    path: "/about-us",
    element: <AboutUs />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return (
    <ChakraProvider theme={Theme}>
      <Fonts />
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
