import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import AnimatedOutlet from "./AnimatedOutlet";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col">
        <AnimatedOutlet>
          <Outlet />
        </AnimatedOutlet>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
