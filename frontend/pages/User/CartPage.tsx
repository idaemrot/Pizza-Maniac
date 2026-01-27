"use client";

import React, { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MinusCircle, PlusCircle, Trash2 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link here

interface CartProduct {
  productId: {
    _id: string;
    name: string;
    price: number;
  };
  quantity: number;
  price: number; // Price at the time of adding to cart
}

interface Cart {
  _id: string;
  userId: string;
  products: CartProduct[];
  totalAmount: number;
}

const CartPage = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await api.get('/cart');
      setCart(res.data);
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Failed to fetch cart.');
    }
  };

  const updateCartItem = async (productId: string, quantityChange: number) => {
    setMessage('');
    try {
      if (quantityChange > 0) {
        await api.post('/cart/add', { productId, quantity: quantityChange });
      } else {
        await api.post('/cart/remove', { productId, quantity: Math.abs(quantityChange) });
      }
      fetchCart();
      setMessage('Cart updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Failed to update cart.');
    }
  };

  const placeOrder = async () => {
    setMessage('');
    try {
      await api.post('/orders');
      setMessage('Order placed successfully! Redirecting to menu...');
      fetchCart(); // Clear cart after order
      setTimeout(() => {
        setMessage('');
        navigate('/user/menu'); // Changed redirection to /user/menu
      }, 2000);
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Failed to place order.');
    }
  };

  if (!cart) {
    return <div className="text-center text-gray-600">Loading cart...</div>;
  }

  return (
    <div className="p-4">
      <h3 className="text-4xl font-extrabold text-indigo-800 mb-8 text-center">Your Shopping Cart</h3>
      {message && <p className="text-center text-green-600 mb-4">{message}</p>}

      {cart.products.length === 0 ? (
        <Card className="rounded-xl shadow-md p-6 text-center">
          <CardTitle className="text-2xl text-gray-700">Your cart is empty.</CardTitle>
          <p className="text-gray-500 mt-2">Go to the <Link to="/user/menu" className="text-indigo-600 hover:underline">menu</Link> to add some items!</p>
        </Card>
      ) : (
        <Card className="rounded-xl shadow-md border-none">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-800">Items in Cart</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-indigo-50 hover:bg-indigo-100">
                  <TableHead className="w-[100px] text-indigo-700">Product</TableHead>
                  <TableHead className="text-indigo-700">Price</TableHead>
                  <TableHead className="text-center text-indigo-700">Quantity</TableHead>
                  <TableHead className="text-right text-indigo-700">Subtotal</TableHead>
                  <TableHead className="text-right text-indigo-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cart.products.map((item) => (
                  <TableRow key={item.productId._id} className="hover:bg-gray-50">
                    <TableCell className="font-medium text-gray-800">{item.productId.name}</TableCell>
                    <TableCell>${item.productId.price.toFixed(2)}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => updateCartItem(item.productId._id, -1)}
                          className="text-red-500 hover:text-red-700 rounded-full"
                        >
                          <MinusCircle size={18} />
                        </Button>
                        <span className="font-semibold text-gray-700">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => updateCartItem(item.productId._id, 1)}
                          className="text-green-500 hover:text-green-700 rounded-full"
                        >
                          <PlusCircle size={18} />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-semibold text-gray-800">${(item.quantity * item.productId.price).toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => updateCartItem(item.productId._id, item.quantity * -1)}
                        className="text-gray-500 hover:text-gray-700 rounded-full"
                      >
                        <Trash2 size={18} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-between items-center p-6 bg-indigo-50 rounded-b-xl">
            <h4 className="text-2xl font-bold text-indigo-800">Total: ${cart.totalAmount.toFixed(2)}</h4>
            <Button
              onClick={placeOrder}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors duration-200"
            >
              Place Order
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default CartPage;