import React from 'react'
import ReactDOM from 'react-dom/client'
import Package from './pages/Package'
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Login from './pages/Login';
import Home from './pages/Home';
import Product from './pages/Product';
import User from './pages/User';
import Sale from './pages/Sale';
import BillSale from './pages/BillSales';
import SumSalePerDay from './pages/SumSalePerDay';
import Stock from './pages/Stock';
import ReportStock from './pages/ReportStock';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Package />,
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/home",
    element: <Home />
  },
  {
    path: "/product",
    element: <Product />
  },
  {
    path: "/user",
    element: <User />
  },
  {
    path: "/sale",
    element: <Sale />
  },
  {
    path: "/billSales",
    element: <BillSale />
  },
  {
    path: "/sumSalePerDay",
    element: <SumSalePerDay />
  },
  {
    path: "/stock",
    element: <Stock />
  },
  {
    path: "/reportstock",
    element: <ReportStock />
  },
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)