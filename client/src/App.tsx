import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Landing from "./routes/Landing";
import Toast from "./components/Toast";
import { useToast } from "./hooks/useToast";
import api from "./lib/api";

function StatusChecker() {
  const { info } = useToast();

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await api.get("/status");
        if (response.data.success && response.data.data.isDevelopment) {
          info("Woah! You're seeing the magic in progress, you're in development mode!");
        }
      } catch (error) {
        // Silently fail - status check is informational
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
        </Route>
      </Routes>
      <Toast />
    </BrowserRouter>
  );
}

export default App;
