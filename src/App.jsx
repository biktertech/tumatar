import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// home pages  & dashboard
//import Dashboard from "./pages/dashboard";
const Dashboard = lazy(() => import("./pages/dashboard"));
const Login = lazy(() => import("./pages/auth/login"));
const Register = lazy(() => import("./pages/auth/register"));

import Layout from "./layout/Layout";
import Loading from "@/components/Loading";
import { useSelector } from "react-redux";
import ProtectedRoute from "../ProtectedRoute";

function App() {
  const { isAuth } = useSelector((state) => state.layout);

  return (
    <main className="App  relative">
      <Routes>
        <Route
          path="/"
          element={
            isAuth ? (
              <Navigate to="/dashboard" />
            ) : (
              <Suspense fallback={<Loading />}>
                <Login />
              </Suspense>
            )
          }
        />
         <Route
          path="/register"
          element={
            isAuth ? (
              <Navigate to="/dashboard" />
            ) : (
              <Suspense fallback={<Loading />}>
                <Register />
              </Suspense>
            )
          }
        />
        <Route path="/*" element={<Layout />}>
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
