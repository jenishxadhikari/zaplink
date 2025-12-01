import { Navigate, Outlet } from "react-router-dom";
import { Loader } from "lucide-react";
import { useAuthContext } from "@/context/auth-provider";

export default function PublicRoute(){
  const { isAuthenticated, isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-[rgba(255,255,255,.2)] text-2xl">
        <Loader size="30px" className="animate-spin" />
        Loading...
      </div>
    );
  }

  return !isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};
