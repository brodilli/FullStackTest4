import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidenav from "./components/dashboard/Sidenav";
// Public
import HomeScreen from "./pages/public/HomeScreen";
import LoginScreen from "./pages/public/LoginScreen";
import SignupScreen from "./pages/public/SignupScreen";
import VerificationAccountScreen from "./pages/public/VerificationAccountScreen";
import NotFound from "./pages/public/NotFound";
import ForgotPasswordScreen from "./pages/public/ForgotPasswordScreen";
// User
import UserScreen from "./pages/user/UserScreen";

import { AdminDashboard, AdviserDashboard } from "./layouts";
const App = () => {
  return (
    <main className="bg-[#F5F4F2]">
      <Router>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<LoginScreen />} exact />
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="/adviser/*" element={<AdviserDashboard />} />
          <Route path="/login" element={<LoginScreen />} exact />

          <Route
            path="/verify/:id/:verifyid"
            element={<VerificationAccountScreen />}
            exact
          />
          <Route
            path="/resetpass/:id/:verifyid"
            element={<ForgotPasswordScreen />}
            exact
          />
          <Route path="*" element={<NotFound />} exact />
          {/* COLLECTOR ROUTES 
            <Route path="/user" element={<UserScreen />} exact />*/}
        </Routes>
        <Footer />
      </Router>
    </main>
  );
};

export default App;
