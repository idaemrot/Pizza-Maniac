"use client";

import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LayoutDashboard, Package, ScrollText, LogOut } from 'lucide-react';

const AdminDashboardLayout = () => {
  const { logout, user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-red-50">
      <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center rounded-b-xl">
        <h1 className="text-2xl font-bold text-red-800">Pizza Maniac Admin</h1>
        <nav className="flex items-center space-x-6">
          <Link to="/admin/dashboard" className="text-gray-700 hover:text-red-600 flex items-center gap-1 transition-colors">
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          <Link to="/admin/products" className="text-gray-700 hover:text-red-600 flex items-center gap-1 transition-colors">
            <Package size={18} /> Products
          </Link>
          <Link to="/admin/orders" className="text-gray-700 hover:text-red-600 flex items-center gap-1 transition-colors">
            <ScrollText size={18} /> Orders
          </Link>
          <Button onClick={logout} variant="ghost" className="text-red-600 hover:bg-red-50 hover:text-red-700 flex items-center gap-1 rounded-lg">
            <LogOut size={18} /> Logout
          </Button>
        </nav>
      </header>
      <main className="flex-grow p-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Admin: {user?.name}</h2>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboardLayout;