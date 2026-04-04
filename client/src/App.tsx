import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LandingView from "./views/LandingView";
import Toast from "./components/Toast";
import { useToast } from "./hooks/useToast";
import api from "./lib/api";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import NotFoundView from "./views/errors/NotFoundView";

function StatusChecker() {
  const { info, error } = useToast();

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await api.get("/status");
        if (response.data.success && response.data.data.isDevelopment) {
          info("Woah! You're seeing the magic in progress, you're in development mode!");
        }
      } catch (err) {
        error("Unable to connect to API");
      }
    };

    checkStatus();
  }, [info]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <StatusChecker />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingView />} />
          <Route path="login" element={<LoginView />} />
          <Route path="register" element={<RegisterView />} />
          <Route path="*" element={<NotFoundView />} />
        </Route>
      </Routes>
      <Toast />
    </BrowserRouter>
  );
}

export default App;
