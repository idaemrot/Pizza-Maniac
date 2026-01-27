"use client";

import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Home, ShoppingCart, ListOrdered, LogOut } from 'lucide-react';

const UserDashboardLayout = () => {
  const { logout, user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 to-red-50">
      <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center rounded-b-xl">
        <h1 className="text-2xl font-bold text-red-700">Pizza Maniac</h1>
        <nav className="flex items-center space-x-6">
          <Link to="/user/menu" className="text-gray-700 hover:text-red-600 flex items-center gap-1 transition-colors">
            <Home size={18} /> Menu
          </Link>
          <Link to="/user/cart" className="text-gray-700 hover:text-red-600 flex items-center gap-1 transition-colors">
            <ShoppingCart size={18} /> Cart
          </Link>
          <Link to="/user/orders" className="text-gray-700 hover:text-red-600 flex items-center gap-1 transition-colors">
            <ListOrdered size={18} /> My Orders
          </Link>
          <Button onClick={logout} variant="ghost" className="text-red-600 hover:bg-red-50 hover:text-red-700 flex items-center gap-1 rounded-lg">
            <LogOut size={18} /> Logout
          </Button>
        </nav>
      </header>
      <main className="flex-grow p-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Hello, {user?.name}!</h2>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default UserDashboardLayout;