import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { store } from './store/store'
import { Provider } from 'react-redux'
import App from './App';
import ErrorPage from './components/ErrorPage'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import BankPage from './pages/BankPage';
import ReturnsPage from './pages/ReturnsPage';
import PaymentPage from './pages/PaymentPage';
import ReceiptPage from './pages/ReceiptPage';
import ReportPage from './pages/ReportPage';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "bank",
        element: <BankPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "returns",
        element: <ReturnsPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "payment",
        element: <PaymentPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "receipt",
        element: <ReceiptPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "report",
        element: <ReportPage />,
        errorElement: <ErrorPage />,
      },
    ]
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

