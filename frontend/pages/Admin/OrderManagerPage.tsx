"use client";

import React, { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';

interface OrderProduct {
  productId: {
    _id: string;
    name: string;
    price: number;
  };
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
  };
  products: OrderProduct[];
  totalAmount: number;
  status: 'NEW' | 'PROCESSING' | 'DELIVERED';
  createdAt: string;
}

const OrderManagerPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get('/orders');
      setOrders(res.data);
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Failed to fetch orders.');
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: 'NEW' | 'PROCESSING' | 'DELIVERED') => {
    setMessage('');
    try {
      await api.put(`/orders/${orderId}`, { status: newStatus });
      setMessage(`Order ${orderId.substring(0, 8)}... status updated to ${newStatus}!`);
      fetchOrders();
      setTimeout(() => setMessage(''), 3000);
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Failed to update order status.');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'NEW':
        return 'bg-blue-100 text-blue-800';
      case 'PROCESSING':
        return 'bg-yellow-100 text-yellow-800';
      case 'DELIVERED':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4">
      <h3 className="text-4xl font-extrabold text-blue-800 mb-8 text-center">Order Manager</h3>
      {message && <p className="text-center text-green-600 mb-4">{message}</p>}

      {orders.length === 0 ? (
        <Card className="rounded-xl shadow-md p-6 text-center">
          <CardTitle className="text-2xl text-gray-700">No orders found.</CardTitle>
          <p className="text-gray-500 mt-2">There are no orders to manage at the moment.</p>
        </Card>
      ) : (
        <Card className="rounded-xl shadow-md border-none">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-800">All Customer Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-50 hover:bg-blue-100">
                  <TableHead className="text-blue-700">Order ID</TableHead>
                  <TableHead className="text-blue-700">Customer</TableHead>
                  <TableHead className="text-blue-700">Items</TableHead>
                  <TableHead className="text-blue-700">Total</TableHead>
                  <TableHead className="text-blue-700">Date</TableHead>
                  <TableHead className="text-blue-700">Status</TableHead>
                  <TableHead className="text-right text-blue-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order._id} className="hover:bg-gray-50">
                    <TableCell className="font-medium text-gray-800">{order._id.substring(0, 8)}...</TableCell>
                    <TableCell>{order.userId.name} ({order.userId.email})</TableCell>
                    <TableCell>
                      <ul className="list-disc list-inside text-sm text-gray-700">
                        {order.products.map((item, index) => (
                          <li key={index}>{item.productId.name} x {item.quantity}</li>
                        ))}
                      </ul>
                    </TableCell>
                    <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                    <TableCell>{format(new Date(order.createdAt), 'PPP')}</TableCell>
                    <TableCell>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Select value={order.status} onValueChange={(value: 'NEW' | 'PROCESSING' | 'DELIVERED') => updateOrderStatus(order._id, value)}>
                        <SelectTrigger className="w-[140px] rounded-lg">
                          <SelectValue placeholder="Update Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="NEW">NEW</SelectItem>
                          <SelectItem value="PROCESSING">PROCESSING</SelectItem>
                          <SelectItem value="DELIVERED">DELIVERED</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default OrderManagerPage;