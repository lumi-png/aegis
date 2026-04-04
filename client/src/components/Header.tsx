import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, LogIn, UserPlus, Menu, X } from "lucide-react";
import aegisLogo from "../assets/aegis-logo_no_text.png";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="navbar bg-base-100 shadow-md px-4 relative">
        {/* Mobile hamburger */}
        <div className="flex-none md:hidden">
          <button className="btn btn-ghost btn-square" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Logo + Home */}
        <div className="flex-1 flex items-center gap-1">
          <Link to="/" className="btn btn-ghost normal-case text-xl p-0 hover:bg-transparent mr-4">
            <img
              src={aegisLogo}
              alt="Aegis"
              className="h-8 w-auto block"
            />
          </Link>
          <Link to="/" className="btn btn-ghost gap-1 hidden md:flex">
            <Home size={18} />
            Home
          </Link>
        </div>

        {/* Desktop auth buttons */}
        <div className="flex-none gap-2 hidden md:flex">
          <Link to="/" className="btn btn-sm btn-primary gap-1">
            <LogIn size={16} />
            Login
          </Link>
          <Link to="/" className="btn btn-sm btn-secondary gap-1">
            <UserPlus size={16} />
            Register
          </Link>
        </div>
      </header>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="bg-base-100 shadow-lg flex flex-col p-4 gap-2 md:hidden border-t">
          <Link to="/" className="btn btn-ghost gap-2 justify-start" onClick={() => setMobileOpen(false)}>
            <Home size={18} />
            Home
          </Link>
          <hr />
          <Link to="/" className="btn btn-ghost gap-2 justify-start" onClick={() => setMobileOpen(false)}>
            <LogIn size={16} />
            Login
          </Link>
          <Link to="/" className="btn btn-ghost gap-2 justify-start" onClick={() => setMobileOpen(false)}>
            <UserPlus size={16} />
            Register
          </Link>
        </div>
      )}
    </>
  );
};

export default Header;
