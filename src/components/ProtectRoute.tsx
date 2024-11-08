import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";

import { useAuth } from "../hooks/useAuth";

const ProtectRoute = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user === null) {
      navigate("/");
    } else if (user) {
      setLoading(false);
    }
  }, [user, navigate]);

  return loading ? (
    <div className="flex items-center justify-center p-10">
      <PulseLoader color="white" size={10} />
    </div>
  ) : (
    <Outlet />
  );
};

export default ProtectRoute;
