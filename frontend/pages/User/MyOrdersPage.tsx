"use client";

import React, { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

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
  userId: string;
  products: OrderProduct[];
  totalAmount: number;
  status: 'NEW' | 'PROCESSING' | 'DELIVERED';
  createdAt: string;
}

const MyOrdersPage = () => {
  console.log('MyOrdersPage rendering...');
  const [orders, setOrders] = useState<Order[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    console.log('MyOrdersPage useEffect triggered.');
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    console.log('Fetching orders...');
    try {
      const res = await api.get('/orders');
      console.log('API response for orders:', res.data);
      setOrders(res.data);
      if (res.data.length === 0) {
        setMessage('No orders found. Start by browsing our menu!');
      } else {
        setMessage(''); // Clear message if orders are found
      }
    } catch (error: any) {
      console.error('Error fetching orders:', error);
      setMessage(error.response?.data?.message || 'Failed to fetch orders.');
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

  console.log('Current orders state:', orders);
  console.log('Current message state:', message);

  return (
    <div className="p-4">
      <h3 className="text-4xl font-extrabold text-indigo-800 mb-8 text-center">My Orders</h3>
      {message && <p className="text-center text-red-600 mb-4">{message}</p>}

      {orders.length === 0 ? (
        <Card className="rounded-xl shadow-md p-6 text-center">
          <CardTitle className="text-2xl text-gray-700">You haven't placed any orders yet.</CardTitle>
          <p className="text-gray-500 mt-2">Start by browsing our <Link to="/user/menu" className="text-indigo-600 hover:underline">menu</Link>!</p>
        </Card>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order._id} className="rounded-xl shadow-md border-none">
              <CardHeader className="bg-indigo-50 rounded-t-xl flex flex-row justify-between items-center">
                <div>
                  <CardTitle className="text-xl font-semibold text-indigo-800">Order ID: {order._id.substring(0, 8)}...</CardTitle>
                  <p className="text-sm text-gray-600">Placed on: {format(new Date(order.createdAt), 'PPP p')}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </CardHeader>
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 hover:bg-gray-100">
                      <TableHead className="text-gray-700">Item</TableHead>
                      <TableHead className="text-gray-700">Quantity</TableHead>
                      <TableHead className="text-right text-gray-700">Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {order.products.map((item, index) => (
                      <TableRow key={index} className="hover:bg-gray-50">
                        <TableCell className="font-medium text-gray-800">{item.productId.name}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="text-right mt-4 text-xl font-bold text-indigo-700">
                  Total Amount: ${order.totalAmount.toFixed(2)}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrdersPage;