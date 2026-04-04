import { useLocation } from "react-router-dom";
import type { ReactNode } from "react";

interface AnimatedOutletProps {
  children: ReactNode;
}

const AnimatedOutlet = ({ children }: AnimatedOutletProps) => {
  const location = useLocation();

  return (
    <div
      key={location.pathname}
      className="animate-fade-in flex flex-col flex-grow"
    >
      {children}
    </div>
  );
};

export default AnimatedOutlet;
