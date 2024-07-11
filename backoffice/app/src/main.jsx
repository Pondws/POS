import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home';
import ReportMember from './pages/ReportMember.jsx';
import ReportChangePackage from './pages/ReportChangePackage.jsx';
import ReportSumSalePerDay from './pages/ReportSumSalePerDay.jsx';
import ReportSumSalePerMonth from './pages/ReportSumSalePerMonth.jsx';
import ReportSumSalePerYear from './pages/ReportSumSalePerYear.jsx';
import Admin from './pages/Admin.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    element: <Home />
  },
  {
    path: "/reportMember",
    element: <ReportMember />
  },
  {
    path: "/reportChangePackage",
    element: <ReportChangePackage />
  },
  {
    path: "/reportSumSalePerDay",
    element: <ReportSumSalePerDay />
  },
  {
    path: "/reportSumSalePerMonth",
    element: <ReportSumSalePerMonth />
  },
  {
    path: "/reportSumSalePerYear",
    element: <ReportSumSalePerYear />
  },
  {
    path: "/admin",
    element: <Admin />
  },

]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
