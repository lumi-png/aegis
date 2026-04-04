import { usePageTitle } from "../../hooks/usePageTitle";
import { Link } from "react-router-dom";
import { Home, ArrowLeft, Frown } from "lucide-react";
import FlowyLines from "../../components/FlowyLines";

const NotFound = () => {
  usePageTitle("Page Not Found");

  return (
    <div className="relative flex flex-col flex-grow bg-purple-500 overflow-hidden">
      {/* Animated particle lines */}
      <FlowyLines />

      <div className="hero flex-grow flex items-center justify-center px-4">
        <div className="hero-content text-center relative z-10">
          <div className="max-w-md">
            <Frown className="w-24 h-24 mx-auto text-purple-200 mb-4" />
            <h1 className="text-7xl font-bold text-white">404</h1>
            <h2 className="text-2xl font-semibold text-white mt-2">Page Not Found</h2>
            <p className="py-4 text-purple-200">
              {"We're so sorry! We couldn't find what you were looking for :<"}
            </p>
            <div className="flex flex-col items-center gap-3">
              <div className="flex gap-3">
                <Link
                  to="/"
                  className="btn bg-white text-purple-600 hover:bg-purple-100 border-none"
                >
                  <Home className="w-4 h-4" />
                  Go Home
                </Link>
                <button
                  onClick={() => window.history.back()}
                  className="btn bg-white text-purple-600 hover:bg-purple-100 border-none"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
