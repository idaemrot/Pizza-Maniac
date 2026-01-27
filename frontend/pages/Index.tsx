"use client";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Index = () => {
  const { isAuthenticated, isAdmin, isUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      if (isAdmin) {
        navigate("/admin/dashboard");
      } else if (isUser) {
        navigate("/user/menu");
      }
    } else {
      navigate("/login");
    }
  }, [isAuthenticated, isAdmin, isUser, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="text-center p-8 rounded-xl shadow-lg bg-white">
        <h1 className="text-4xl font-bold mb-4 text-indigo-800">Loading Application...</h1>
        <p className="text-xl text-gray-600">Redirecting you to the correct page.</p>
      </div>
    </div>
  );
};

export default Index;