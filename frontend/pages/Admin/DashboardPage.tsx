"use client";

import React, { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Package, RefreshCcw, Truck } from 'lucide-react';

interface DashboardStats {
  totalOrders: number;
  new: number;
  processing: number;
  delivered: number;
  revenue: number;
}

const AdminDashboardPage = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const res = await api.get('/dashboard/stats');
      setStats(res.data);
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Failed to fetch dashboard stats.');
    }
  };

  if (!stats) {
    return <div className="text-center text-gray-600">Loading dashboard stats...</div>;
  }

  return (
    <div className="p-4">
      <h3 className="text-4xl font-extrabold text-blue-800 mb-8 text-center">Admin Dashboard</h3>
      {message && <p className="text-center text-red-600 mb-4">{message}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        <Card className="rounded-xl shadow-md border-none bg-white hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Orders</CardTitle>
            <Package className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-700">{stats.totalOrders}</div>
            <p className="text-xs text-gray-500 mt-1">All orders placed</p>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-md border-none bg-white hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">New Orders</CardTitle>
            <Package className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-700">{stats.new}</div>
            <p className="text-xs text-gray-500 mt-1">Orders awaiting processing</p>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-md border-none bg-white hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Processing Orders</CardTitle>
            <RefreshCcw className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-700">{stats.processing}</div>
            <p className="text-xs text-gray-500 mt-1">Orders currently being prepared</p>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-md border-none bg-white hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Delivered Orders</CardTitle>
            <Truck className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-700">{stats.delivered}</div>
            <p className="text-xs text-gray-500 mt-1">Orders successfully delivered</p>
          </CardContent>
        </Card>

        <Card className="rounded-xl shadow-md border-none bg-white hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-700">${stats.revenue.toFixed(2)}</div>
            <p className="text-xs text-gray-500 mt-1">Revenue from delivered orders</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardPage;