import { usePageTitle } from "../hooks/usePageTitle";
import { Link } from "react-router-dom";
import FlowyLines from "../components/FlowyLines";

const Landing = () => {
  usePageTitle("Landing");

  return (
    <div className="relative flex flex-col flex-grow bg-purple-500 overflow-hidden">
      {/* Animated particle lines */}
      <FlowyLines />

      <div className="hero flex-grow flex flex-row justify-end px-4">
        <div className="hero-content">
          <div className="text-right max-w-md relative z-10">
            <h1 className="text-5xl font-bold text-white">Welcome to Aegis</h1>
            <p className="py-4 text-purple-200">
              Full-stack Instagram clone built with React + ExpressJS + PostgreSQL + TailwindCSS.
            </p>
            <div className="flex flex-col items-end gap-3">
              <button className="btn btn-lg bg-white text-purple-600 hover:bg-purple-100 border-none">Join now!</button>
              <Link to="/login" className="link link-hover text-sm text-purple-200 hover:text-white">
                I already have an account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
