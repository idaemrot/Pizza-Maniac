"use client";

import React, { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ShoppingCart } from 'lucide-react';

interface Product {
  _id: string;
  category: 'Pizza' | 'Drink';
  name: string;
  price: number;
  stock: number;
  isAvailable: boolean;
}

const MenuPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [message, setMessage] = useState('');
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products');
      setProducts(res.data);
      const initialQuantities: { [key: string]: number } = {};
      res.data.forEach((product: Product) => {
        initialQuantities[product._id] = 1;
      });
      setQuantities(initialQuantities);
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Failed to fetch products.');
    }
  };

  const handleQuantityChange = (productId: string, value: string) => {
    const quantity = parseInt(value);
    setQuantities((prev) => ({
      ...prev,
      [productId]: isNaN(quantity) || quantity < 1 ? 1 : quantity,
    }));
  };

  const addToCart = async (productId: string) => {
    setMessage('');
    try {
      const quantity = quantities[productId] || 1;
      await api.post('/cart/add', { productId, quantity });
      setMessage('Item added to cart!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Failed to add item to cart.');
    }
  };

  const pizzas = products.filter(p => p.category === 'Pizza');
  const drinks = products.filter(p => p.category === 'Drink');

  return (
    <div className="p-4">
      <h3 className="text-4xl font-extrabold text-indigo-800 mb-8 text-center">Our Delicious Menu</h3>
      {message && <p className="text-center text-green-600 mb-4">{message}</p>}

      <section className="mb-10">
        <h4 className="text-3xl font-bold text-indigo-700 mb-6 border-b-2 border-indigo-200 pb-2">Pizzas</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pizzas.map((product) => (
            <Card key={product._id} className="rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">{product.name}</CardTitle>
                <CardDescription className="text-gray-500">Freshly baked pizza</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-2xl font-bold text-indigo-600 mb-2">${product.price.toFixed(2)}</p>
                <p className={`text-sm ${product.isAvailable && product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.isAvailable && product.stock > 0 ? `In Stock: ${product.stock}` : 'Out of Stock'}
                </p>
              </CardContent>
              <CardFooter className="flex items-center justify-between gap-2">
                <Input
                  type="number"
                  min="1"
                  value={quantities[product._id] || 1}
                  onChange={(e) => handleQuantityChange(product._id, e.target.value)}
                  className="w-24 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  disabled={!product.isAvailable || product.stock === 0}
                />
                <Button
                  onClick={() => addToCart(product._id)}
                  disabled={!product.isAvailable || product.stock === 0}
                  className="flex-grow bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={18} /> Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h4 className="text-3xl font-bold text-indigo-700 mb-6 border-b-2 border-indigo-200 pb-2">Drinks</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {drinks.map((product) => (
            <Card key={product._id} className="rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">{product.name}</CardTitle>
                <CardDescription className="text-gray-500">Refreshing beverage</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-2xl font-bold text-indigo-600 mb-2">${product.price.toFixed(2)}</p>
                <p className={`text-sm ${product.isAvailable && product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.isAvailable && product.stock > 0 ? `In Stock: ${product.stock}` : 'Out of Stock'}
                </p>
              </CardContent>
              <CardFooter className="flex items-center justify-between gap-2">
                <Input
                  type="number"
                  min="1"
                  value={quantities[product._id] || 1}
                  onChange={(e) => handleQuantityChange(product._id, e.target.value)}
                  className="w-24 rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  disabled={!product.isAvailable || product.stock === 0}
                />
                <Button
                  onClick={() => addToCart(product._id)}
                  disabled={!product.isAvailable || product.stock === 0}
                  className="flex-grow bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={18} /> Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MenuPage;