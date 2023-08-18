import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../components/LoginPage";
import OAuthPage from "../components/OAuthPage";

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/oauth" element={<OAuthPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
