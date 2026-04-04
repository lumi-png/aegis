import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Landing from "./routes/Landing";
import Toast from "./components/Toast";
import { useToast } from "./hooks/useToast";
import api from "./lib/api";
import Login from "./routes/Login";
import Register from "./routes/Register";
import NotFound from "./routes/errors/NotFound";

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
          <Route index element={<Landing />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Toast />
    </BrowserRouter>
  );
}

export default App;
